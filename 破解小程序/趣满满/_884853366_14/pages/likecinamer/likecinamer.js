var t = require("../../utils/tools.js"), a = getApp();

Page({
    data: {},
    page: 0,
    onLoad: function() {
        a.setPageUid(this), this.location = wx.getStorageSync("location");
    },
    onShow: function() {
        var a = this;
        (0, t._post)("v2/movies/collect", {
            uid: this.data.uid,
            page: this.page,
            step: 100,
            pos: this.location
        }, "获取收藏的影院").then(function(t) {
            t.cinemas && t.cinemas.length > 0 ? a.setData({
                cinemas: t.cinemas
            }) : a.setData({
                hasnone: !0
            });
        });
    }
});