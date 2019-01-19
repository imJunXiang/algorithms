var n = require("../../utils/tools.js"), e = getApp();

Page({
    data: {
        nickName: "",
        avatarUrl: "",
        wxlogin: !1,
        phonelogin: !1,
        hidden: null
    },
    handleToPhoneLogin: function() {
        wx.navigateTo({
            url: "/pages/phoneLogin/phoneLogin"
        });
    },
    getUserInfoFun: function() {
        wx.login({
            success: function(e) {
                wx.getUserInfo({
                    success: function(o) {
                        (0, n.loginFn)("wechat", {
                            userinfo: o,
                            wxlogin: e
                        }).then(function() {
                            wx.switchTab({
                                url: "/pages/index/index"
                            });
                        });
                    }
                });
            }
        });
    },
    loginOut: function() {
        wx.removeStorageSync("3rd_session"), e.setPageUid(this), this.setData({
            nickName: "未登录",
            avatarUrl: "../../images/" + this.data.colors.iconsrc + "/defaultLogo.png",
            wxlogin: !1,
            phonelogin: !1,
            hidden: !1
        });
    },
    onLoad: function(n) {
        e.setPageColor(this);
    },
    onShow: function() {
        var n = wx.getStorageSync("3rd_session"), e = n.nickname, o = n.headurl;
        this.setData({
            nickName: e,
            avatarUrl: o,
            wxlogin: "wechat" == n.login_type,
            phonelogin: "wechat" != n.login_type,
            hidden: !0
        });
    }
});