function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = require("../../utils/tools.js"), a = getApp();

Page({
    data: {
        showStatus: !1,
        codeStatus: !1,
        exchange: !1,
        isLoad: !0,
        page: 0,
        uId: "",
        orderId: "",
        cdkey: "",
        code: "",
        phone: "",
        time: 60,
        codeDes: "获取验证码",
        lottery: null,
        flag: null,
        hiddenmodal: !0,
        desc: []
    },
    confirm: function() {
        this.setData({
            hiddenmodal: !0,
            exchange: !1
        });
    },
    handleUse: function(t) {
        var e = t.currentTarget.dataset.desc;
        e = e.replace(/\\n/g, ""), this.setData({
            hiddenmodal: !1,
            desc: e.split(" ")
        });
    },
    showTooltip: function(t) {
        wx.showModal({
            title: "提示",
            content: t
        });
    },
    handleExchange: function() {
        this.setData({
            showStatus: !0
        });
    },
    getCdkey: function(t) {
        this.setData({
            cdkey: t.detail.value
        });
    },
    getPhone: function(t) {
        this.setData({
            phone: t.detail.value
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
        var e = this;
        if (this.data.exchange) {
            var a;
            return this.setData((a = {
                time: 60,
                cdkey: "",
                code: "",
                phone: "",
                codeDes: "获取验证码"
            }, t(a, "time", 60), t(a, "showStatus", !1), t(a, "codeStatus", !1), t(a, "exchange", !1), 
            a)), !1;
        }
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
            e.timeReduce();
        }, 1e3);
    },
    requestCode: function() {
        var t = this, a = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
        return console.log(a.test(this.data.phone)), a.test(this.data.phone) ? !this.data.codeStatus && void (0, 
        e._post)("v1/user/get_sms_code", {
            phone: this.data.phone
        }).then(function(e) {
            200 === e.status && (t.setData({
                codeStatus: !0
            }), t.timeReduce());
        }) : (this.showTooltip("请输入正确的手机号！"), !1);
    },
    getListInfo: function() {
        var t = this;
        this.data.nodata || this.data.isLoad && (this.setData({
            isLoad: !1
        }), (0, e._post)("v1/user/user_lottery", {
            uid: this.data.uid,
            page: this.data.page,
            orderid: this.data.orderId,
            couponStatus: ""
        }).then(function(e) {
            var a = t.data.lottery;
            if (null == a) a = e.lottery; else {
                if (0 == e.lottery.length) return void t.setData({
                    nodata: !0
                });
                a = a.concat(e.lottery);
            }
            var o = t.couponSotr(a);
            t.setData({
                page: t.data.page + 1,
                lottery: o,
                isLoad: !0
            });
        }));
    },
    handleTakeCdkey: function() {
        var t = this;
        return "" === this.data.cdkey ? (this.showTooltip("请输入兑换码！"), !1) : "" === this.data.phone ? (this.showTooltip("请输入手机号！"), 
        !1) : "" === this.data.code ? (this.showTooltip("请输入验证码！"), !1) : void (0, e._post)("v1/user/exchange_cdkey", {
            uid: this.data.uid,
            cdkey: this.data.cdkey,
            code: this.data.code,
            phone: this.data.phone
        }).then(function(e) {
            if (0 != e.error || e.msg) wx.showModal({
                title: "提示",
                content: e.msg,
                showCancel: !1
            }); else {
                wx.showModal({
                    title: "提示",
                    content: "兑换成功",
                    showCancel: !1
                });
                var a = e.lottery, o = t.couponSotr(a);
                t.setData({
                    lottery: o,
                    cdkey: "",
                    code: "",
                    phone: "",
                    codeDes: "获取验证码",
                    time: 60,
                    showStatus: !1,
                    exchange: !0
                });
            }
        });
    },
    onLoad: function(t) {
        a.setPageColor(this), a.setPageUid(this), this.getListInfo();
    },
    onReady: function() {},
    onShow: function() {},
    cancelMask: function() {
        this.setData({
            showMask: !1
        });
    },
    bangdingCoupon: function() {
        this.setData({
            showStatus: !0,
            showMask: !1,
            cdkey: this.data.clipCoupon,
            phone: this.data.phone
        });
    },
    onHide: function() {},
    onUnload: function() {},
    handleToMore: function() {
        this.getListInfo();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    catchmove: function() {},
    couponSotr: function(t) {
        var e = [], a = [], o = [], s = [];
        return t.forEach(function(t) {
            2 == t.status ? e.push(t) : 1 == t.status ? a.push(t) : 3 == t.status ? o.push(t) : 0 == t.status && s.push(t);
        }), s.concat(o).concat(e).concat(a);
    }
});