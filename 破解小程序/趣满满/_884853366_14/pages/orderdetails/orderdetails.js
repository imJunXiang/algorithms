var t = require("../../utils/tools.js"), e = getApp(), a = null, i = null;

Page({
    data: {
        moviename: "",
        orderid: "",
        uid: "",
        orderinfo: {},
        cinamLat: "",
        cianmLon: "",
        hiddenmodal: !0,
        desMsg: "",
        sms: [],
        flag: null,
        timeStr: "0天00:00:00",
        text: []
    },
    takeclip: function(t) {
        var e = this, a = (t = t.currentTarget.dataset).piaoma, i = t.index;
        wx.setClipboardData({
            data: a,
            success: function() {
                wx.showToast({
                    title: "复制成功"
                }), e.setData({
                    clipactive: i
                });
            }
        });
    },
    smstouchend: function(t) {
        this.setData({
            clipactive: -1
        });
    },
    onLoad: function(a) {
        var i = this, n = getCurrentPages(), o = n[n.length - 2];
        o && "pages/seat/seat" == o.route && o.setData({
            navBack: !0
        }), e.setPageColor(this), e.setPageUid(this), this.setData({
            moviename: a.movieName,
            orderid: a.orderid
        });
        var s = {
            uid: this.data.uid,
            orderid: this.data.orderid
        };
        (0, t._post)("v1/movieticket/user_ticket_info", s, "获取订单详情").then(function(t) {
            0 == t.error && (i.setPageData(t), 5 == t.status && i.pollingOrder());
        });
    },
    pollingOrder: function() {
        var e = this;
        i = setTimeout(function() {
            var a = {
                uid: e.data.uid,
                orderid: e.data.orderid
            };
            (0, t._post)("v1/movieticket/user_ticket_info", a, "获取订单详情", !1).then(function(t) {
                0 == t.error ? 5 != t.status ? (2 == t.status && wx.showToast({
                    title: "出票成功！"
                }), e.setPageData(t)) : e.pollingOrder() : wx.showModal({
                    title: "加载失败",
                    content: t.errMsg || "请点击左上角返回后返回重新打开本页面",
                    showCancel: !1,
                    confirmText: "知道了"
                });
            });
        }, 5e3);
    },
    setPageData: function(e) {
        var i = this, n = e.pos.split(","), o = e.sms.split("\n"), s = e.text.split("#");
        this.setData({
            orderinfo: e,
            sms: o,
            cinamLat: n[1],
            cinamLon: n[0],
            text: s
        });
        var r = e.finish_time;
        0 == r || (a = setInterval(function() {
            r--, i.setData({
                finish_time: r,
                timeStr: (0, t.cleantime)(r)
            }), 0 == r && clearInterval(a);
        }, 1e3));
    },
    draw: function(t) {
        console.log(t), this.setData({
            drawpath: t.detail.path
        });
    },
    onShareAppMessage: function() {
        var t = this.data.orderinfo;
        if (t.groupid > 0 && void 0 != t.groupid && t.finish_time > 0) {
            var e = this.data.uid, a = JSON.stringify(t.share_param);
            return console.log("group/pages/groupinfo/groupinfo?transData=" + a + "&from=share&share_uid=" + e), 
            {
                title: "我正在参加《" + t.moviename + "》的拼团活动",
                path: "group/pages/groupinfo/groupinfo?transData=" + a + "&from=share&share_uid=" + e,
                imageUrl: this.data.drawpath
            };
        }
        return {
            title: "一键比价，优惠多多，省时省钱",
            path: "/pages/index/index",
            imageUrl: "https://manfile1.oss-cn-beijing.aliyuncs.com/image/xiaochengxu/zhuyefenxiangtu.png"
        };
    },
    openMap: function(t) {
        console.log(t);
        var e = this;
        wx.openLocation({
            latitude: Number(t.currentTarget.dataset.lat),
            longitude: Number(t.currentTarget.dataset.lon),
            scale: 28,
            name: e.data.orderinfo.cinemaname,
            success: function(t) {
                console.log(t);
            }
        });
    },
    makePhoneCall: function(t) {
        console.log(t.target.dataset.tel), wx.makePhoneCall({
            phoneNumber: t.target.dataset.tel
        });
    },
    backmoney: function() {
        wx.showModal({
            title: "提示",
            content: this.data.orderinfo.text_content,
            showCancel: !1,
            confirmText: "知道了"
        });
    },
    paytail: function() {
        var e = this;
        wx.login({
            success: function(a) {
                (0, t._post)("v2/weixinpay/weixinpayh5", {
                    code: a.code,
                    orderid: e.data.orderid,
                    is_tail: 1
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
                            e.setData({
                                tail_end: !0
                            });
                        },
                        fail: function(t) {
                            console.log("fail:"), console.log(t);
                        }
                    });
                });
            }
        });
    },
    onUnload: function() {
        5 == this.data.orderinfo.status && clearTimeout(i);
    }
});