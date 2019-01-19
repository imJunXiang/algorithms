var a = require("../../utils/tools.js"), e = getApp();

Page({
    data: {
        nickName: "",
        avatarUrl: "",
        showInfo: !0,
        uid: "",
        wordAdv: [],
        picAdv: [],
        unPayOrder: {},
        freePay: {},
        wh: wx.getSystemInfoSync().windowHeight
    },
    onLoad: function(a) {
        e.setPageColor(this);
    },
    onReady: function() {},
    handleToPayOrder: function() {
        wx.navigateTo({
            url: "/pages/orderdetails/orderdetails?orderid=" + this.data.unPayOrder.orderid + "&movieName=" + this.data.unPayOrder.moviename
        });
    },
    handleLogin: function() {
        "temp" == this.data.uidType && this.setData({
            showlogin: !0
        });
    },
    handleToPage: function(a) {
        if ("temp" != this.data.uidType) {
            var e = a.currentTarget.dataset.url;
            wx.navigateTo({
                url: e
            });
        } else this.setData({
            showlogin: !0
        });
    },
    pageInit: function() {
        var e = this;
        (0, a._post)("v1/user/getUserCenterInfo", {
            uid: this.data.uid
        }, "mine-adv", !1).then(function(a) {
            e.setData({
                wordAdv: a.word_adver,
                picAdv: a.pic_adver,
                unPayOrder: a.unPayOrder,
                freePay: a.freePay
            });
        });
    },
    avatarErr: function(a) {
        var e = wx.getStorageSync("3rd_session"), t = "/images/" + this.data.colors.iconsrc + "/logo.png";
        e.headurl = t, this.setData({
            avatarUrl: t
        }), wx.setStorage({
            key: "3rd_session",
            data: e
        });
    },
    onShow: function() {
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: this.data.colors.minenavcolor
        }), e.setPageUid(this).then(function() {
            if ("temp" == a.data.uidType) return a.setData({
                nickName: "未登录",
                avatarUrl: "/images/" + a.data.colors.iconsrc + "/defaultLogo.png"
            }), void a.setData({
                wordAdv: [],
                picAdv: [],
                unPayOrder: {}
            });
            var e = wx.getStorageSync("3rd_session");
            a.setData({
                nickName: e.nickname,
                avatarUrl: e.headurl
            }), a.pageInit();
        });
    },
    onHide: function() {},
    onUnload: function() {},
    hideSheet: function() {
        this.setData({
            showlogin: !1
        });
    },
    loginend: function() {
        var a = this;
        e.setPageUid(this).then(function() {
            var e = wx.getStorageSync("3rd_session");
            a.setData({
                nickName: e.nickname,
                avatarUrl: e.headurl
            }), a.hideSheet(), a.pageInit();
        });
    }
});