var t = require("../../utils/tools.js"), e = getApp();

Page({
    data: {
        phone: "",
        codeStatus: !1,
        code: "",
        codeDes: "获取验证码",
        time: 60
    },
    showTooltip: function(t) {
        wx.showModal({
            title: "提示",
            content: t
        });
    },
    getPhone: function(t) {
        this.setData({
            phone: t.detail.value,
            phoneInput: !0
        });
    },
    getCode: function(t) {
        "" == t.detail.value ? this.setData({
            codeInput: !1
        }) : this.setData({
            code: t.detail.value,
            codeInput: !0
        });
    },
    timeReduce: function() {
        var t = this;
        if (0 == this.data.time) return this.setData({
            codeDes: "点击重新发送",
            time: 60,
            codeStatus: !1,
            phoneInput: !1,
            codeInput: !1
        }), !1;
        this.setData({
            time: this.data.time - 1,
            codeDes: this.data.time + "s后重新发送"
        }), setTimeout(function() {
            t.timeReduce();
        }, 1e3);
    },
    requestCode: function() {
        var e = this, o = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
        return console.log(o.test(this.data.phone)), o.test(this.data.phone) ? !this.data.codeStatus && void (0, 
        t._post)("v1/user/get_sms_code", {
            phone: this.data.phone
        }).then(function(t) {
            200 === t.status && (e.setData({
                codeStatus: !0
            }), e.timeReduce());
        }) : (this.showTooltip("请输入正确的手机号！"), !1);
    },
    login: function() {
        var e = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
        if (console.log(e.test(this.data.phone)), !e.test(this.data.phone)) return this.showTooltip("请输入正确的手机号！"), 
        !1;
        if ("" == this.data.code) return this.showTooltip("请输入验证码"), !1;
        var o = {
            phone: this.data.phone,
            code: this.data.code,
            iconsrc: this.data.colors.iconsrc
        };
        (0, t.loginFn)("phone", o).then(function(t) {
            "error" == t ? wx.showModal({
                title: "提示",
                content: "登录失败，请核对信息是否填写完整正确。",
                showCancel: !1
            }) : wx.switchTab({
                url: "/pages/index/index"
            });
        });
    },
    onLoad: function(t) {
        e.setPageColor(this);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});