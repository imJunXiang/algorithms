var t = require("../../utils/tools.js"), a = getApp();

Page({
    data: {},
    onLoad: function(t) {
        a.setPageColor(this), a.setPageUid(this), this.getCoupon();
    },
    cancode: function() {
        var t = this;
        console.log(111), wx.scanCode({
            success: function(a) {
                console.log(a);
                var e = a.result;
                t.setData({
                    card_no: e
                }), t.addCard();
            }
        });
    },
    getCoupon: function() {
        var a = this;
        (0, t._post)("v1/movieCard/getMyCardList", {
            user_id: this.data.uid
        }, "获取观影卡列表", !1).then(function(e) {
            var i = e.result, o = i.explain_text.split("\n"), n = i.purchase_tel;
            i.card_list.forEach(function(a, e) {
                a.from = "viewcard", a.index = e;
                var i = 1e3 * Number(a.end_time);
                a.expire_time = (0, t.formatTime)(new Date(i));
            }), a.setData({
                msg: o,
                phone: n,
                cardlist: i.card_list
            });
        });
    },
    inputKey: function(t) {
        var a = t.detail.value;
        this.setData({
            card_no: a
        });
    },
    addCard: function() {
        var a = this, e = this.data.card_no;
        "" != (e = e ? e.trim() : "") ? (0, t._post)("v1/movieCard/cardBinding", {
            user_id: this.data.uid,
            card_no: e
        }).then(function(t) {
            wx.showToast({
                title: t.msg,
                icon: "none",
                success: function() {
                    200 == t.code && a.onLoad();
                }
            });
        }) : wx.showToast({
            title: "请输入兑换码",
            icon: "none"
        });
    },
    cardview: function(t) {
        var a = t.detail.index, e = this.data.cardlist[a].rules;
        wx.showModal({
            title: "使用规则",
            content: e,
            showCancel: !1,
            confirmText: "知道了"
        });
    }
});