var app = getApp(), Tpl = require("../scripts/tpl");

module.exports = Tpl.extends({
    key: "MobileConfirm",
    code: "",
    mobile: "",
    action: "setbindmobile",
    data: {
        count: 0,
        showPhone: !1,
        sendSmsDisable: !0,
        showImage: !1,
        showImageAlert: !1,
        imgUrl: "",
        defaultMobile: ""
    },
    bindEvent: function() {
        var e = this;
        this.page.verifySms = this.verifySms.bind(this), this.page.getSms = this.getSms.bind(this), 
        this.page.hidePhoneVerify = function() {
            e.setData({
                showPhone: !1,
                sendSmsDisable: !0
            }), e.mobile = "";
        }, this.page.hideImageVerify = function() {
            e.setData({
                showImage: !1,
                sendSmsDisable: !1,
                showImageAlert: !1
            });
        }, this.page.checkMobile = this.checkMobile.bind(this), this.page.getImage = this.getImage.bind(this), 
        this.page.verifyImage = this.verifyImage.bind(this);
    },
    show: function(e) {
        var t = this.isMobileValid(e);
        t && (this.mobile = e, this.action = "login"), this.setData({
            showPhone: !0,
            defaultMobile: e,
            sendSmsDisable: !t
        });
    },
    showImage: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        this.setData({
            showImage: !0,
            imgUrl: e
        });
    },
    isMobileValid: function(e) {
        return /^1[3|4|5|7|8][0-9]{9}$/.test(e);
    },
    checkMobile: function(e) {
        var t = e.detail.value, i = this.data.count;
        this.mobile = t, this.setData({
            sendSmsDisable: !(this.isMobileValid(t) && 0 === i),
            defaultMobile: t
        });
    },
    getSms: function(e) {
        var t = this, i = void 0;
        i = e && e.detail && e.detail.value ? e.detail.value.mobile : this.mobile, this.setData({
            sendSmsDisable: !0
        }), this.verifyLoading(!0), app.request().get("/user/sendsms").query({
            mobile: i,
            uuid: app.$uuid,
            action: this.action
        }).end(function(e, i) {
            if (t.verifyLoading(!1), e && "null" !== e.message) t.page.toast(e.message), t.setData({
                sendSmsDisable: !1
            }); else if (i.body.success) t.page.toast("验证码已发送"), t.countDown(); else {
                var s = i.body, a = s.verifyUrl, o = s.request_code;
                t.code = o, t.setData({
                    showImage: !0,
                    imgUrl: a
                });
            }
        });
    },
    countDown: function() {
        var e = this;
        if (0 === this.data.count) {
            var t = this, i = 60;
            this.setData({
                count: i
            }), this.timer = setInterval(function() {
                if (i -= 1, e.setData({
                    count: i
                }), 0 === i) {
                    clearInterval(t.timer);
                    var s = /^1[3|4|5|7|8][0-9]{9}$/;
                    e.setData({
                        sendSmsDisable: !s.test(t.mobile)
                    });
                }
            }, 1e3);
        }
    },
    getImage: function() {
        var e = this;
        app.request().get("/user/getcapcha").header({
            token: app.$user && app.$user.token
        }).query({
            uuid: app.$uuid,
            userId: app.$user.userId,
            action: this.action
        }).end().then(function(t) {
            var i = t.body, s = i.src, a = i.requestCode;
            e.setData({
                imgUrl: s
            }), e.code = a;
        }).catch(function(t) {
            console.error(t), e.page.toast(t.message);
        });
    },
    verifySms: function(e) {
        var t = e.detail.value, i = t.mobile, s = t.smscode;
        if (!i || !s) return void this.page.toast("手机或验证码不能为空！");
        "login" === this.action ? this.silentLoginRequest({
            mobile: i,
            mobileValidCode: s
        }) : this.verifySmsRequest(i, s);
    },
    silentLoginRequest: function(e) {
        var t = this;
        return this.verifyLoading(!0), delete app.silentLogin.requestLocked, app.silentLogin(e).then(function() {
            t.verifyLoading(!1);
        });
    },
    verifySmsRequest: function(e, t) {
        var i = this;
        this.verifyLoading(!0);
        var s = app.store.get("temp_userId");
        app.request().post("/user/verifysms").header({
            token: app.$user && app.$user.token,
            userId: app.$user && app.$user.userId || s
        }).send({
            mobile: e,
            smscode: t,
            userId: app.$user.userId,
            uuid: app.$uuid,
            action: this.action
        }).end().then(function(t) {
            i.verifyLoading(!1);
            var s = t.body, a = s.success, o = s.errMsg, n = s.responseCode;
            if (!a) return void i.page.toast(o);
            n && i.silentLoginRequest({
                mobile: e,
                mobileResponseCode: n
            }), i.setData({
                showPhone: !1
            }), i.emit("success", i.mobile);
        }).catch(function(e) {
            i.verifyLoading(!1), i.page.toast(e.message), console.error(e);
        });
    },
    verifyImage: function(e) {
        var t = this, i = e.detail.value.captchacode;
        if (!i) return void this.page.toast("请输入验证码！");
        this.verifyLoading(!0), app.request().post("/user/verifycapcha").send({
            captchacode: i,
            code: this.code,
            action: this.action
        }).end().then(function(e) {
            t.verifyLoading(!1), t.setData({
                showImage: !1,
                showImageAlert: !1
            }), t.getSms();
        }).catch(function(e) {
            t.verifyLoading(!1), t.setData({
                showImageAlert: !0
            }), t.page.toast(e.message);
        });
    },
    verifyLoading: function(e) {
        e ? wx.showLoading({
            title: "正在验证..."
        }) : wx.hideLoading();
    }
});