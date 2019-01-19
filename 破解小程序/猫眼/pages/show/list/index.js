function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var _user = require("../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), _activity = require("../../../scripts/show/activity"), _activity2 = _interopRequireDefault(_activity), _activityTag = require("../../../scripts/show/activityTag"), app = getApp(), bannerType = {
    1: "ychbanner",
    2: "tyssbanner",
    3: "xqysbanner",
    4: "hjgjbanner",
    5: "wdblbanner",
    6: "yyhbanner",
    7: "qzycbanner",
    8: "gdjcbanner",
    9: "xxzlbanner"
};

app.MoviePage({
    jumpToActivity: _activity2.default,
    data: {
        performances: [],
        recommendPerformances: [],
        topBannerViewDot: "b_93din34b",
        categoryId: null,
        hasReportedAds: [],
        sort: 0,
        sortMap: {
            0: "智能排序",
            3: "距离最近",
            4: "销量最高"
        },
        swiperOptions: {
            indicatorDots: !0,
            autoplay: !0,
            circular: !0,
            interval: 5e3,
            duration: 500
        },
        showSortPanel: !1,
        scrollTop: 0,
        fetchKey: "performances",
        emptyList: !1
    },
    getParameterByName: function(t, e) {
        try {
            t = t.replace(/[[]]/g, "\\$&");
            var a = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)"), n = a.exec(e);
            return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null;
        } catch (t) {
            console.log(t);
        }
    },
    getId: function(t, e) {
        try {
            var a = {
                1: "activityId",
                2: "showId",
                3: "shopId",
                4: "performanceId"
            }, n = /(op|i)\.meituan\.com/, i = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/, r = /show-detail/, s = t || (e.currentTarget.dataset.webView || {}).link, o = null, c = {};
            if (s && n.test(s)) {
                var d = s.split("/");
                d.length > 1 && (o = {
                    id: d[d.length - 2],
                    type: 1
                });
            } else s && i.test(s) && r.test(s) ? o = {
                id: this.getParameterByName("data", s),
                type: 2
            } : e && e.currentTarget.dataset.id && (o = {
                id: e.currentTarget.dataset.id,
                type: parseInt(e.currentTarget.dataset.type)
            });
            return o && (c[a[o.type]] = o.id), o ? c : null;
        } catch (t) {
            console.log(t);
        }
    },
    bannerClickDot: function(t) {
        this.jumpToActivity(t);
        var e = this.getId(t.currentTarget.dataset.webView.link), a = t.currentTarget.dataset.index, n = {
            cityId: this.data.city ? this.data.city.id : 0,
            index: a
        };
        this.data.categoryId && (n.categoryId = this.data.categoryId), Object.assign(n, e), 
        this.stats("b_dcq4bhuq", n);
    },
    initTopBannerViewDot: function(t) {
        if (this.data.banners.length > 0) {
            this.data.hasReportedAds = [];
            var e = {
                cityId: this.data.city ? this.data.city.id : 0,
                categoryId: t,
                index: 0
            }, a = this.getId(this.data.banners[0].link);
            Object.assign(e, a), this.data.hasReportedAds.push(0), this.stats(this.data.topBannerViewDot, e);
        }
    },
    onBannerChange: function(t) {
        var e = t.detail.current, a = {
            cityId: this.data.city ? this.data.city.id : 0,
            categoryId: this.data.categoryId,
            index: e
        };
        if (this.data.hasReportedAds.indexOf(e) < 0) {
            var n = this.getId(this.data.banners[e].link);
            Object.assign(a, n), this.data.hasReportedAds.push(e), this.stats(this.data.topBannerViewDot, a);
        }
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            sort: 0,
            performances: [],
            fetchIndex: 0,
            fetchMore: !0,
            options: t
        }), this.city = app.$location.city || app.$location.locationCity, this.user = (0, 
        _user2.default)(app.$user) || {}, app.request().config("loading", 1).get("https://wx.maoyan.com/maoyansh/myshow/ajax/performance/navigation").query({
            cityId: this.city ? this.city.id || 0 : 0,
            sellChannel: 7,
            token: this.user.token
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(a) {
            (a || []).forEach(function(t) {
                a.filter(function(e) {
                    return e.categoryId === t.categoryId;
                }).length || a.push(t);
            });
            var n = a.filter(function(e) {
                return e.categoryId == t.categoryId;
            })[0];
            a.filter(function(t) {
                return 8 === t.categoryId;
            })[0].categoryName = "更多精彩", e.setData({
                categories: a,
                category: n
            }), e.onLoadMore(), e.loadBanner(n.categoryId);
        });
    },
    onShow: function() {
        (0, _activityTag.refreshActivityTag)(_activityTag.activityTag.STATS_TAG, this.data.options && this.data.options[_activityTag.activityTag.STATS_TAG]), 
        this.setData({
            menu: ""
        });
    },
    loadBanner: function(t) {
        var e = this;
        bannerType[t] && app.request().get("https://wx.maoyan.com/maoyansh/myshow/ajax/advertisements/" + bannerType[t]).query({
            cityId: this.city ? this.city.id || 0 : 0,
            sellChannel: 7,
            token: this.user.token
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(a) {
            e.setData({
                categoryId: t,
                banners: a
            }), e.initTopBannerViewDot(t);
        });
    },
    onLoadMore: function() {
        var t = this;
        if ((void 0 === this.data.fetchMore || this.data.fetchMore) && !this.data.listLoading) {
            this.setData({
                listLoading: !0
            });
            var e = this.data.fetchIndex + 1, a = this.data, n = a.sort, i = a.category;
            return app.request().config("loading", 1 === e ? 1 : 0).get("https://wx.maoyan.com/maoyansh/myshow/ajax/performances/" + i.categoryId + ";p=" + e + ";s=20;st=" + n).query({
                cityId: this.city ? this.city.id || 0 : 0,
                lat: this.city ? this.city.lat || 0 : 0,
                lng: this.city ? this.city.lng || 0 : 0,
                sellChannel: 7,
                token: this.user.token
            }).end().then(function(e) {
                return t.setData({
                    listLoading: !1
                }), {
                    list: e.body.data,
                    hasMore: !!e.body.paging && e.body.paging.hasMore
                };
            }).then(function(a) {
                var n = a.list, i = a.hasMore;
                if (n && n.length) {
                    var r = {}, s = t.data.fetchKey, o = [], c = [];
                    1 !== e || i ? o = t.data[s].concat(n) : n.forEach(function(t) {
                        1 === t.isCurrentCity ? o.push(t) : c.push(t);
                    }), t.data.fetchIndex++, r.fetchIndex = e, r[s] = o, r.fetchMore = i, r.emptyList = !1, 
                    r.recommendPerformances = c, t.setData(r);
                } else 1 === e && t.setData({
                    emptyList: !0
                });
            });
        }
    },
    onReachBottom: function() {
        this.onLoadMore();
    },
    onTapMenu: function(t) {
        var e = t.target.dataset.kind;
        e && this.data.menu != e || (e = ""), this.setData({
            menu: e
        });
    },
    onTapSort: function(t) {
        this.setData({
            showSortPanel: !this.data.showSortPanel
        });
    },
    onTapSortItem: function(t) {
        var e = t.target.dataset.sort;
        this.setData({
            sort: e,
            menu: "",
            showSortPanel: !1,
            scrollTop: 0,
            performances: [],
            fetchIndex: 0,
            fetchMore: !0
        }), this.onLoadMore();
    },
    onTapCategory: function(t) {
        var e = t.target.dataset.category;
        this.setData({
            category: e,
            menu: "",
            scrollTop: 0,
            performances: [],
            fetchIndex: 0,
            fetchMore: !0
        }), this.onLoadMore(), this.loadBanner(e.categoryId);
    },
    onShareAppMessage: function() {
        return {
            title: "【猫眼演出】为你多渠道网罗各种精彩演出",
            desc: "不再错过你爱豆的任何一场演出，快来点击吧！",
            path: "/pages/show/list/index?categoryId=" + this.data.category.categoryId
        };
    }
});