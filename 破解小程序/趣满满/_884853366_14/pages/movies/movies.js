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
        actionSheetHidden: !0,
        userInfo: {},
        soon: 0,
        hotPage: 0,
        featurePage: 0,
        hotMovie: null,
        featureMovie: null,
        isFirstLoad: !0,
        selectBack: null,
        movieList1HasNo: !1
    },
    handleToSearch: function() {
        wx.navigateTo({
            url: "../search/search?cityid=" + this.data.cityid
        });
    },
    onLoad: function() {
        var t = this;
        a.setPageColor(this), a.setPageUid(this).then(function() {
            return "" != wx.getStorageSync("location") || a.getLocation();
        }).then(function() {
            a.setPageCityId(t), t.loadData();
        });
    },
    bindViewTap: function(t) {
        var e = this, a = t.currentTarget.dataset.soon;
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), this.setData({
            soon: Number(a)
        }, function() {
            e.loadData();
        });
    },
    onPullDownRefresh: function() {
        var e, a = this.data.soon;
        this.setData((e = {}, t(e, 0 === a ? "hotPage" : "featurePage", 0), t(e, 0 === a ? "hotMovieHasNo" : "featureMovieHasNo", 0), 
        e)), this.loadData().then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.loadData();
    },
    loadData: function() {
        var t = this;
        return new Promise(function(a) {
            var o = t.data.soon, i = null, n = null;
            if (0 === o) {
                if (t.data.hotMovieHasNo) return void console.log("正在热映的影片已无数据");
                i = "v2/movies/get_showing_movies", n = t.data.hotPage;
            }
            if (1 === o) {
                if (t.data.featureMovieHasNo) return void console.log("即将上映影片已无数据");
                i = "v2/movies/get_latershow_movies", n = t.data.featurePage;
            }
            var s = {
                uid: t.data.uid,
                cityid: t.data.cityid,
                page: n
            };
            (0, e._post)(i, s, "获取电影列表", !1).then(function(e) {
                if (0 === o) {
                    var i = e.movies;
                    t.setData({
                        hotMovie: 0 == n ? i : t.data.hotMovie.concat(i),
                        hotPage: n + 1
                    }), 0 == i.length && t.setData({
                        hotMovieHasNo: !0
                    });
                } else if (1 === o) {
                    if (void 0 == e.count || 0 == e.count || 0 == e.months.length || void 0 == e.months) return void t.setData({
                        featureMovieHasNo: !0
                    });
                    var s = e.months[0].dates, r = null;
                    if (0 == n) r = s; else {
                        var u = t.data.featureMovie, c = u[u.length - 1], l = s[0];
                        c.date == l.date && (c.movies = c.movies.concat(l.movies), s.shift()), r = u.concat(s);
                    }
                    r.forEach(function(t) {
                        var e = t.date;
                        t.movies.forEach(function(t) {
                            t.date = e;
                        });
                    }), t.setData({
                        featureMovie: r,
                        featurePage: n + 1
                    });
                }
                a();
            }).catch(function(e) {
                console.log(e, "--页面发生错误"), t.setData({
                    hotMovieHasNo: !0,
                    featureMovieHasNo: !0
                });
            });
        });
    },
    togo: function(t) {
        var e = t.currentTarget.dataset.movie.id, a = t.currentTarget.dataset.movie.name;
        wx.navigateTo({
            url: "../cinema/cinema?movieid=" + e + "&movieName=" + a
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "最近片单奉上，总有一部适合你~~~"
        };
    }
});