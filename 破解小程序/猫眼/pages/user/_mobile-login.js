function MobileLogin() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.key = "MobileLogin", this.data = {
        inputMobile: "",
        codeBtnDisabled: !0,
        codeBtnMsg: CODE_BTN_MSG,
        inputCode: "",
        submitDisabled: !0,
        showMobileDel: !1,
        codeHasSent: !1
    }, this.page = t.page || app.page(), this.key = t.key || this.key, this.setData(this.data), 
    this.bindEvent();
}

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }
    return t;
}, app = getApp(), counter = app.require("scripts/counter.js"), CODE_BTN_MSG = "获取验证码";

MobileLogin.prototype = {
    bindEvent: function() {
        this.page.onInputMobile = this.onInputMobile.bind(this), this.page.onInputCode = this.onInputCode.bind(this), 
        this.page.onDeleteMobile = this.onDeleteMobile.bind(this);
    },
    onInputMobile: function(t) {
        this.data.inputMobile = t.detail.value, this.updateDelBtnStatus(), this.updateCodeBtnStatus(), 
        this.updateSubmitBtnStatus();
    },
    onInputCode: function(t) {
        this.data.inputCode = t.detail.value, this.updateSubmitBtnStatus();
    },
    getCode: function(t) {
        var e = this;
        return app.uuid().then(function(i) {
            var n = {
                uuid: i,
                mobile: e.data.inputMobile
            };
            return t && (n.captcha = t), app.request().config("barLoading", !0).post("/proxy/api/v1/account/mobilelogincode").header("x-host", "http://passport.vip.sankuai.com").send(n).end().then(function(t) {
                return e.counter = counter.init({
                    key: "mobile-login",
                    tick: function(t) {
                        e.setData({
                            codeBtnMsg: t + "s后重试",
                            codeBtnDisabled: !0,
                            codeHasSent: !0
                        });
                    },
                    end: function() {
                        e.setData({
                            codeBtnMsg: CODE_BTN_MSG
                        }), e.updateCodeBtnStatus();
                    }
                }), t;
            });
        });
    },
    login: function() {
        var t = this.data, e = t.inputMobile, i = t.inputCode;
        return app.request().config("barLoading", !0).post("/proxy/api/v1/account/mobilelogin").header("x-host", "http://passport.vip.sankuai.com").send({
            mobile: e,
            code: i
        }).end();
    },
    clearCode: function() {
        this.setData({
            inputCode: ""
        }), this.updateSubmitBtnStatus();
    },
    updateSubmitBtnStatus: function() {
        this.setData({
            submitDisabled: !(11 === String(this.data.inputMobile).length && this.data.inputCode)
        });
    },
    updateCodeBtnStatus: function() {
        this.setData({
            codeBtnDisabled: !(11 === String(this.data.inputMobile).length && !this.isCounting()),
            codeHasSent: this.isCounting()
        });
    },
    updateDelBtnStatus: function() {
        this.setData({
            showMobileDel: !!this.data.inputMobile.length
        });
    },
    onDeleteMobile: function() {
        this.setData({
            inputMobile: "",
            showMobileDel: !1
        }), this.updateCodeBtnStatus();
    },
    isCounting: function() {
        return !!(this.counter && this.counter.total > 0);
    },
    setData: function(t) {
        this.data = _extends({}, this.data, t);
        var e = {};
        e[this.key] = this.data, this.page.setData(e);
    }
}, MobileLogin.prototype.constructor = MobileLogin, module.exports = MobileLogin;