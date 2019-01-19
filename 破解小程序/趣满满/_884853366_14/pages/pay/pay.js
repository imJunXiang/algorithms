function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e, o = require("../../utils/tools.js"), a = getApp();

Page({
    data: (e = {
        orderinfor: "",
        timeFlag: 1,
        minute: "",
        second: "",
        orderid: "",
        openid: "",
        sumprice: "",
        radio: 0,
        actionStatus: !0,
        showBto: !1,
        page: 0
    }, t(e, "radio", ""), t(e, "idInfo", []), t(e, "cdname", ""), t(e, "cdType", []), 
    t(e, "cdChannel", []), t(e, "kindArr", []), t(e, "codeDes", "获取验证码"), t(e, "code", ""), 
    t(e, "phone", ""), t(e, "time", 60), t(e, "cdkey", ""), t(e, "codeStatus", !1), 
    t(e, "isStatus", null), t(e, "indexInfo", []), t(e, "count", []), t(e, "cdkeyid", ""), 
    t(e, "timer", null), t(e, "timerStatus", null), e),
    handleToMore: function() {},
    removeArritem: function(t, e) {
        return t.forEach(function(o, a) {
            o == e && t.splice(a, 1);
        }), t;
    },
    radioChange: function(t) {
        console.log(t, "==");
        var e = t.detail, o = e.id, a = e.channel, i = e.type, n = this.data.lottery, d = this.data.orderinfor.number, s = function() {
            n.forEach(function(t) {
                1 == t.is && (t.is = 0);
            });
        }, r = function() {
            n.forEach(function(t) {
                t.id == o && t.cdkey_channel == a && t.cdkey_type == i && 0 == t.is && (t.is = 1);
            });
        };
        0 == n.length ? console.log("null") : n.forEach(function(t, e) {
            if (t.id == o && t.cdkey_channel == a && t.cdkey_type == i && 1 == t.is) t.is = 0; else if (t.id == o && t.cdkey_channel == a && t.cdkey_type == i && 0 == t.is) if (2 != t.userkey_type || 1 == d) s(), 
            r(); else {
                var c = n.filter(function(t) {
                    return 1 == t.is;
                });
                c.length > 0 && 2 != c[0].userkey_type ? (s(), r()) : c.length == d ? wx.showToast({
                    icon: "none",
                    title: "最多可选" + d + "张通兑券",
                    duration: 1e3
                }) : r();
            }
        }), this.setData({
            lottery: n
        }), console.log(this.data.lottery);
    },
    addDiscount: function() {
        this.setData({
            showBto: !this.data.showBto
        });
    },
    confirmUse: function(t) {
        var e = this;
        if ("card" !== t.currentTarget.dataset.use) {
            var a = this.data.orderinfor.number, i = this.data.lottery, n = "", d = "", s = "", r = "", c = [];
            if (i.forEach(function(t, e) {
                1 == t.is && c.push(t);
            }), 0 == c.length ? (n = 0, d = 0, s = 0) : c.forEach(function(t, e) {
                n = 0 == e ? t.id : n + "," + t.id, d = 0 == e ? t.cdkey_channel : d + "," + t.cdkey_channel, 
                s = 0 == e ? t.cdkey_type : s + "," + t.cdkey_type, r += t.userkey_type;
            }), -1 != r.indexOf(1) && -1 != r.indexOf(2)) return wx.showModal({
                title: "提示",
                content: "红包与优惠券不能同时使用",
                showCancel: !1
            }), console.log(i, c), !1;
            if (c.length > a) return wx.showModal({
                title: "提示",
                content: "优惠券使用数量大于购买座位数",
                showCancel: !1
            }), console.log(i, c), !1;
            if ("11" == r) return wx.showModal({
                title: "提示",
                content: "红包只能使用一个",
                showCancel: !1
            }), console.log(i, c), !1;
            (0, o._post)("v1/movieticket/unsetordercdkeyid", {
                cdkeyid: n,
                cdkey_channel: d,
                cdkey_type: s,
                orderid: this.data.orderid,
                uid: this.data.uid
            }, "使用优惠券").then(function(t) {
                e.setData({
                    orderinfor: t,
                    orderid: t.orderid
                }), e.setData({
                    actionStatus: !e.data.actionStatus
                });
            });
        } else {
            var u = this.data.cardlist.filter(function(t) {
                return 1 == t.is_selected;
            });
            u = u[0], console.log(u, "==");
            var h = {
                cdkeyid: 0,
                cdkey_channel: 0,
                cdkey_type: 0,
                orderid: this.data.orderid,
                card_id: u ? u.card_id : 0,
                uid: this.data.uid
            };
            (0, o._post)("v1/movieticket/unsetordercdkeyid", h, "使用观影卡").then(function(t) {
                e.setData({
                    orderinfor: t,
                    orderid: t.orderid
                }), e.setData({
                    actionStatus: !e.data.actionStatus
                });
            });
        }
    },
    actionSheetbindchange: function() {
        this.setData({
            actionStatus: !this.data.actionStatus
        });
    },
    listenerRadioGroup: function(t) {
        console.log(t.detail.value);
    },
    handleToDiscount: function() {
        var t = this;
        (0, o._post)("v1/user/user_lottery", {
            cdkeyid: this.data.orderinfor.cdkey.cdkeyid,
            cdkey_channel: this.data.orderinfor.cdkey.cdkey_channel,
            cdkey_type: this.data.orderinfor.cdkey.cdkey_type,
            uid: this.data.uid,
            page: this.data.page,
            orderid: this.data.orderid
        }).then(function(e) {
            var o = e.lottery;
            if (t.setData({
                showCard: !1
            }), 0 == o.length) console.log("no"), t.setData({
                showBto: !0
            }); else {
                var a = [], i = [], n = [], d = [], s = [];
                e.lottery.forEach(function(t) {
                    t.from = "pay", 2 == t.status ? a.push(t) : 1 == t.status ? i.push(t) : 3 == t.status ? n.push(t) : 0 == t.status && (1 == t.is ? s.push(t) : d.push(t));
                });
                var r = s.concat(d).concat(n).concat(a).concat(i);
                t.setData({
                    lottery: r
                });
            }
            t.actionSheetbindchange();
        });
    },
    handleToMovieCard: function() {
        var t = this;
        (0, o._post)("v1/movieCard/getUsableCard", {
            user_id: this.data.uid,
            orderid: Number(this.data.orderid)
        }).then(function(e) {
            var a = e.result, i = a.usable_data, n = [];
            a.usable_count > 0 && (i.forEach(function(t, e) {
                t.from = "pay", t.index = e;
                var a = 1e3 * Number(t.end_time);
                t.expire_time = (0, o.formatTime)(new Date(a)), t.status = 0;
            }), n = i), t.setData({
                showCard: !0,
                cardlist: n
            }), t.actionSheetbindchange();
        });
    },
    usecard: function(t) {
        var e = t.detail.index, o = this.data.cardlist, a = o[e];
        1 == a.is_selected ? a.is_selected = 0 : (o.forEach(function(t) {
            t.is_selected = 0;
        }), a.is_selected = 1), this.setData({
            cardlist: o
        });
    },
    loadData: function(t, e, a) {
        var i = this;
        console.log(t, a);
        var n = e, d = {
            uid: this.data.uid,
            orderid: t,
            cdkeyid: a
        };
        (0, o._post)(n, d).then(function(t) {
            0 == t.error && (i.setData({
                orderinfor: t,
                orderid: t.orderid
            }), i.getTime(t.overtime));
        });
    },
    onLoad: function(t) {
        var e = this;
        a.setPageColor(this), console.log(t), this.setData({
            orderid: t.orderid,
            cdkeyid: t.cdkeyid
        }), a.setPageUid(this).then(function() {
            1 == t.flag && e.loadData(t.orderid, "v1/movieticket/buyticket", t.cdkeyid);
        });
    },
    onReady: function() {},
    onShow: function() {
        "00" != this.data.minute && "00" != this.data.second && "no" == this.data.timerStatus && this.loadData(this.data.orderid, "v1/movieticket/buyticket", this.data.cdkeyid);
    },
    onHide: function() {
        this.setData({
            timerStatus: "no"
        }), clearInterval(this.data.timer);
    },
    onUnload: function() {},
    getTime: function(t) {
        console.log(t, "-=-=");
        var e = this;
        if (t < 0) return e.setData({
            timeFlag: 0,
            minute: "00",
            second: "00"
        }), !1;
        e.data.timer = setInterval(function() {
            var o = 0, a = 0, i = 10, n = 0;
            t > 0 && (o = Math.floor(t / 86400), a = Math.floor(t / 3600) - 24 * o, i = Math.floor(t / 60) - 24 * o * 60 - 60 * a, 
            n = Math.floor(t) - 24 * o * 60 * 60 - 60 * a * 60 - 60 * i), i <= 9 && (i = "0" + i), 
            n <= 9 && (n = "0" + n), --t > 0 ? e.setData({
                minute: i,
                second: n
            }) : (0 == t || t < 0) && e.setData({
                timeFlag: 0,
                minute: "00",
                second: "00"
            });
        }, 1e3), "no" == e.data.timer && clearInterval(e.data.timer);
    },
    confirm: function(t) {
        var e = this, a = this.data.orderinfor.sumprice, i = this.data.orderid;
        if (0 == this.data.timeFlag) return wx.showToast({
            title: "订单已超时",
            icon: "none"
        }), !1;
        !parseFloat(a) > 0 ? (0, o._post)("v1/movieticket/meigonghepay", {
            orderid: i
        }).then(function() {
            wx.redirectTo({
                url: "../orderdetails/orderdetails?orderid=" + i + "&movieName=" + e.data.orderinfor.moviename
            });
        }) : wx.login({
            success: function(t) {
                (0, o._post)("v2/weixinpay/weixinpayh5", {
                    code: t.code,
                    orderid: i
                }).then(function(t) {
                    if (0 == t.error && void 0 != t.paymsg) return wx.showModal({
                        title: "提示",
                        content: t.paymsg,
                        showCancel: !1
                    }), !1;
                    wx.requestPayment({
                        timeStamp: t.timeStamp,
                        nonceStr: t.nonceStr,
                        package: t.package,
                        signType: t.signType,
                        paySign: t.paySign,
                        success: function(t) {
                            console.log(e.data), console.log(e.data.orderinfor), wx.redirectTo({
                                url: "../orderdetails/orderdetails?orderid=" + i + "&movieName=" + e.data.orderinfor.moviename
                            });
                        },
                        fail: function(t) {
                            console.log("fail:"), console.log(t);
                        },
                        complete: function(t) {
                            console.log("complete:"), console.log(t);
                        }
                    });
                });
            }
        });
    },
    showTooltip: function(t) {
        wx.showModal({
            title: "提示",
            content: t
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
        var t = this;
        return /^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.data.phone) ? !this.data.codeStatus && void (0, 
        o._post)("v1/user/get_sms_code", {
            phone: this.data.phone
        }).then(function(e) {
            200 === e.status && (t.setData({
                codeStatus: !0
            }), t.timeReduce());
        }) : (this.showTooltip("请输入正确的手机号！"), !1);
    },
    handleTakeCdkey: function() {
        var t = this;
        return console.log(this.data.uid), "" === this.data.cdkey ? (this.showTooltip("请输入兑换码！"), 
        !1) : "" === this.data.phone ? (this.showTooltip("请输入手机号！"), !1) : "" === this.data.code ? (this.showTooltip("请输入验证码！"), 
        !1) : void (0, o._post)("v1/user/exchange_cdkey", {
            uid: this.data.uid,
            cdkey: this.data.cdkey,
            code: this.data.code,
            phone: this.data.phone
        }).then(function(e) {
            0 == e.msgStatus ? t.showTooltip(e.msg) : (t.setData({
                showBto: !1,
                actionStatus: !t.data.actionStatus
            }), setTimeout(function() {
                t.handleToDiscount();
            }, 500));
        });
    },
    handleCancel: function() {
        this.setData({
            showBto: !this.data.showBto,
            actionStatus: !this.data.actionStatus
        });
    }
});