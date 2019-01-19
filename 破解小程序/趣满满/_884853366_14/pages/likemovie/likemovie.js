var t = require("../../utils/tools.js"), i = getApp();

Page({
    data: {},
    onLoad: function(t) {
        i.setPageUid(this), i.setPageCityId(this);
    },
    onShow: function() {
        this.getMovie();
    },
    onReachBottom: function() {},
    getMovie: function() {
        var i = this;
        (0, t._post)("v2/movies/user_like_movies", {
            cityid: this.data.cityid,
            uid: this.data.uid
        }, "获取收藏的影片").then(function(t) {
            t.dates && t.dates.length > 0 ? i.setData({
                movies: t.dates
            }) : i.setData({
                hasnone: !0
            });
        });
    }
});