function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function n(i, r) {
                try {
                    var o = e[i](r), s = o.value;
                } catch (t) {
                    return void a(t);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(s);
            }
            return n("next");
        });
    };
}

function encodeLink(t) {
    return t.link = encodeURIComponent(t.link), t;
}

var _slicedToArray = function() {
    function t(t, e) {
        var a = [], n = !0, i = !1, r = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(n = (o = s.next()).done) && (a.push(o.value), 
            !e || a.length !== e); n = !0) ;
        } catch (t) {
            i = !0, r = t;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (i) throw r;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _user = require("../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), _activity = require("../../../scripts/show/activity"), _activity2 = _interopRequireDefault(_activity), _adBanner = require("../../../tpl/ad-banner"), _adBanner2 = _interopRequireDefault(_adBanner), _activityTag = require("../../../scripts/show/activityTag"), app = getApp(), categoryMap = {
    1: "https://p0.meituan.net/moviesh/d077942a36df5eb122fda256730257221188.png",
    2: "https://p0.meituan.net/moviesh/dde9c8727af2f920266f7a70cdf7472b2788.png",
    3: "https://p0.meituan.net/moviesh/3727ba98ae64fe4daf8617054ea3f5c61628.png",
    4: "https://p0.meituan.net/moviesh/7114b1529182c0a123d8c58b00a7bad61410.png",
    5: "https://p1.meituan.net/moviesh/38dbbe07f64eca5244f4f5c8207938511228.png",
    6: "https://p1.meituan.net/moviesh/cc10a9b65e4635ff0bacd656e592891e1220.png",
    7: "https://p1.meituan.net/moviesh/5663680e1ba859f0edf9ab1c18925ddb1434.png",
    8: "https://p0.meituan.net/moviesh/cef66f030cff78b39981c6d5f61290661149.png",
    9: "https://p1.meituan.net/moviesh/94fdb69cda72112e0b26e2bc06dbf0bb1329.png",
    10: "https://p1.meituan.net/myvideodistribute/9a828a65baa62b1b9406bc9253aa7dbb4647.png",
    998: "https://static.meituan.net/bs/MYFE/wxapp-wallet/file/images/show/wangfeng.png",
    999: "https://p1.meituan.net/moviesh/342ae341691d8cab4ae5ce7ccb3ea06a1551.png"
};

app.MoviePage({
    jumpToActivity: _activity2.default,
    data: {
        zhangxueyoustyle: "position: relative; top: -3.4px",
        hotTheatreViewDot: "b_wurknpf4",
        topBannerViewDot: "b_ndj7d48v",
        ztViewDot: "b_7rb5gk5m",
        rb1ViewDot: "b_wmz2x07f",
        rb2ViewDot: "b_6oaseqyw",
        hasReportedAds: [],
        canIUseWebView: wx.canIUse("web-view"),
        swiperOptions: {
            indicatorDots: !0,
            autoplay: !0,
            circular: !0,
            interval: 5e3,
            duration: 500
        },
        sortTypes: [ {
            sortType: 4,
            name: "当前热门",
            subs: []
        }, {
            sortType: 1,
            name: "最新上架",
            subs: []
        }, {
            sortType: 5,
            name: "折扣演出",
            subs: []
        }, {
            sortType: -1,
            name: "全部时间",
            subs: [ {
                subId: 0,
                name: "全部时间"
            }, {
                subId: 1,
                name: "今天"
            }, {
                subId: 2,
                name: "明天"
            }, {
                subId: 3,
                name: "本周末"
            }, {
                subId: 4,
                name: "一周内"
            }, {
                subId: 5,
                name: "一个月内"
            } ]
        } ],
        subSorts: [],
        sortType: 4,
        subId: 0,
        showSortPanel: !1,
        paging: {
            pageNo: 1,
            pageSize: 10,
            hasMore: !0
        },
        performances: [],
        recommendPerformances: [],
        canNaviWxapp: wx.canIUse("navigateToMiniProgram"),
        activityTag: _activityTag.activityTag
    },
    onLoad: function(t) {
        this.setData({
            options: t
        }), this.user = (0, _user2.default)(app.$user) || {}, this.adBanner = new _adBanner2.default({
            page: this,
            positionIds: "1037"
        });
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                var a = Math.floor(84 * t.screenWidth / 750), n = a / 86 * 93, i = n - a;
                e.setData({
                    zhangxueyoustyle: "position: relative; top: -" + i + "px"
                });
            }
        });
    },
    onShow: function() {
        var t = this;
        (0, _activityTag.refreshActivityTag)(_activityTag.activityTag.STATS_TAG, this.data.options && this.data.options[_activityTag.activityTag.STATS_TAG]);
        var e = app.models.location.get() || {};
        e.city || e.locationCity ? this.setAndGetDatas() : app.models.location.fetch().then(function(e) {
            t.setAndGetDatas();
        });
    },
    getCategories: function() {
        return app.request().config("loading", 1).get("/maoyansh/myshow/ajax/performance/navigation").query({
            sellChannel: 7,
            token: this.user.token
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(t) {
            return t = t.map(function(t) {
                return t.icon = categoryMap[t.categoryId], t;
            }), app.set("categories", t, {
                expires: 36e5
            }), t;
        });
    },
    noop: function() {},
    onClickNavi: function(t) {
        var e = t.currentTarget.dataset, a = e.url, n = e.categoryId, i = e.val_lab, r = e.val_bid, o = a || "/pages/show/list/index?categoryId=" + n;
        if (!_activityTag.activityTag.STATS_TAG_REGX.test(o)) {
            var s = _activityTag.activityTag.STATS_TAG + "=" + _activityTag.activityTag.GOLD_EMPLACEMENT;
            s = -1 !== o.indexOf("?") ? "&" + s : "?" + s, o = "" + o + s;
        }
        var c = /^sceneryWxApp:/;
        c.test(o) ? wx.navigateToMiniProgram({
            appId: "wx4fa555703dced95c",
            path: o.replace(c, "")
        }) : wx.navigateTo({
            url: o
        }), this.stats(r, i);
    },
    getHotTheatres: function() {
        var t = this;
        app.request().config("loading", 1).get("/maoyansh/myshow/ajax/hotShop/hotShopList").query({
            pageNo: 1,
            pageSize: 2,
            performanceNumber: 2,
            sellChannel: 7,
            token: this.user.token,
            cityId: this.data.city ? this.data.city.id : 0
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(e) {
            var a = e && e[0] && e[0].firstPagePerformance, n = e && e[1] && e[1].firstPagePerformance, i = !!(a && n && a.length >= 2 && n.length >= 2);
            t.setData({
                hasHot: i,
                theatres: e
            }), i && (t.stats(t.data.hotTheatreViewDot, {
                cityId: t.data.city ? t.data.city.id : 0,
                shopId: e[0].shopId,
                index: 0
            }), t.stats(t.data.hotTheatreViewDot, {
                cityId: t.data.city ? t.data.city.id : 0,
                shopId: e[1].shopId,
                index: 1
            }));
        });
    },
    getRecommendList: function(t, e) {
        var a = this;
        app.request().config("loading", 1).get("/maoyansh/myshow/ajax/performances/0;st=" + t + ";p=1;s=10;tft=0").query({
            pageNo: 1,
            pageSize: 2,
            performanceNumber: 2,
            sellChannel: 7,
            token: this.user.token,
            cityId: this.data.city ? this.data.city.id : 0
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(t) {
            var e = t && t[0] && t[0].firstPagePerformance, a = t && t[1] && t[1].firstPagePerformance;
            return {
                hasHot: e && e.length >= 2 && a && a.length >= 2,
                theatres: t
            };
        }).then(function(t) {
            var e = t.hasHot, n = t.theatres;
            a.setData({
                hasHot: e,
                theatres: n
            });
        });
    },
    initTopBannerViewDot: function() {
        if (this.data.hasReportedAds.indexOf(0) < 0 && this.data.banners && this.data.banners.length > 0) {
            var t = {
                cityId: this.data.city ? this.data.city.id : 0,
                index: 0
            }, e = this.getId(this.data.banners[0].link);
            Object.assign(t, e), this.data.hasReportedAds.push(0), this.stats(this.data.topBannerViewDot, t);
        }
    },
    onBannerChagne: function(t) {
        var e = t.detail.current, a = {
            cityId: this.data.city ? this.data.city.id : 0
        };
        if (this.data.hasReportedAds.indexOf(e) < 0) {
            var n = this.getId(this.data.banners[e].link);
            Object.assign(a, n), a.index = e, this.data.hasReportedAds.push(e), this.stats(this.data.topBannerViewDot, a);
        }
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
            }, n = /(op|i)\.meituan\.com/, i = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/, r = /show-detail/, o = t || (e.currentTarget.dataset.webView || {}).link, s = null, c = {};
            if (o && n.test(o)) {
                var d = o.split("/");
                d.length > 1 && (s = {
                    id: d[d.length - 2],
                    type: 1
                });
            } else o && i.test(o) && r.test(o) ? s = {
                id: this.getParameterByName("data", o),
                type: 2
            } : e && e.currentTarget.dataset.id && (s = {
                id: e.currentTarget.dataset.id,
                type: parseInt(e.currentTarget.dataset.type)
            });
            return s && (c[a[s.type]] = s.id), s ? c : null;
        } catch (t) {
            console.log(t);
        }
    },
    clickDotAndJump: function(t) {
        var e = t.currentTarget.dataset.bid, a = this.getId("", t), n = t.currentTarget.dataset.index, i = {
            cityId: this.data.city ? this.data.city.id : 0
        };
        n && (i.index = n), Object.assign(i, a), console.log("e.type: " + t.type), console.log("params: " + JSON.stringify(i)), 
        this.stats(e, i), (t.currentTarget.dataset.webView || {}).link && this.jumpToActivity(t);
        var r = t.currentTarget.dataset.url;
        if (r) {
            var o = t.currentTarget.dataset.activitySetTag, s = _activityTag.activityTag.STATS_TAG + "=" + o;
            -1 !== r.indexOf("?") && o && (r = r + "&" + s), -1 === r.indexOf("?") && o && (r = r + "?" + s), 
            this.jumpToActivity(r);
        }
    },
    commonShowDot: function(t, e) {
        var a = this;
        t.forEach(function(t, n) {
            var i = {
                cityId: a.data.city ? a.data.city.id : 0,
                index: n
            }, r = a.getId(t && t.link || "");
            Object.assign(i, r), a.stats(e, i);
        });
    },
    getOperationData: function() {
        return app.request().config("loading", 1).get("/maoyansh/myshow/ajax/advertisements/batchFetch?positionList=SI-1,my_homepage_zhongtong,my_homepage_rb1,my_homepage_rb2").query({
            sellChannel: 7,
            cityId: this.data.city ? this.data.city.id : 0
        }).end().then(function(t) {
            return t.body.data;
        });
    },
    formatOperationData: function(t) {
        var e = t.my_homepage_zhongtong, a = t.my_homepage_rb1, n = t.my_homepage_rb2;
        this.setData({
            banners: t["SI-1"],
            my_homepage_zhongtong: e.slice(0, 3),
            my_homepage_rb1: a.slice(0, 2),
            my_homepage_rb2: n.slice(0, 3)
        }), this.initTopBannerViewDot(), e.length >= 1 && this.commonShowDot(e, this.data.ztViewDot), 
        a.length >= 2 && this.commonShowDot(a, this.data.rb1ViewDot), n.length >= 3 && this.commonShowDot(n, this.data.rb2ViewDot);
    },
    formatCategories: function(t, e) {
        var a = void 0, n = e.gold_emplacement_mini_program;
        if (n && n.length > 0) a = n.map(function(e, a) {
            var n = t.filter(function(t) {
                return !!t.categoryId && t.categoryId === e.categoryId;
            }), i = n.length > 0 ? n[0] : e, r = e.categoryName, o = e.icon, s = e.url;
            return i.categoryName = r || i.categoryName, i.icon = o || i.icon, i.url = s || i.url, 
            i;
        }); else {
            var i;
            t = t.filter(function(t) {
                return !!t.categoryId && 8 != t.categoryId;
            }).map(function(t) {
                return t.icon = categoryMap[t.categoryId], t;
            }), (i = t).push.apply(i, [ {
                categoryId: 999,
                categoryName: "汪峰来了",
                icon: categoryMap[998],
                special: !0,
                url: "/pages/showsubs/webview/webview?url=https%3A%2F%2Fi.meituan.com%2Fawp%2Fhfe%2Fblock%2F63b273aec6b0baf676ef%2F23296%2Findex.html%3FfromTag%3Dyanchuicon"
            }, {
                categoryId: 8,
                categoryName: "更多精彩",
                icon: categoryMap[8]
            } ]);
            var r = t.findIndex(function(t) {
                return 2 == t.categoryId;
            });
            t.splice(r, 1);
            var o = t.findIndex(function(t) {
                return 10 == t.categoryId;
            });
            t.splice(o, 1), t.splice(7, -1, {
                categoryId: -1,
                categoryName: "开心麻花",
                icon: "https://p0.meituan.net/moviesh/810d5973f130d066f41d6766722b94d42605.png",
                url: "/pages/show/search/index?key=%E5%BC%80%E5%BF%83%E9%BA%BB%E8%8A%B1"
            }), a = t;
        }
        app.set("categories", a, {
            expires: 36e5
        }), this.setData({
            categories: a
        });
    },
    setAndGetDatas: function() {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function e() {
            var a, n, i, r, o, s, c, d, h, p, u, g, y;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (a = t.data.city, n = app.$location, i = n.city, r = n.address, o = n.latitude, 
                    s = n.longitude, c = n.locationCity, d = i || c || {}, d.lat = o, d.lng = s, !a || a.id != d.id) {
                        e.next = 7;
                        break;
                    }
                    return e.abrupt("return");

                  case 7:
                    return t.setData({
                        city: d
                    }), e.next = 10, Promise.all([ t.getCategories(), t.getOperationData(), t.getHotTheatres(), t.onPullDownRefresh() ]);

                  case 10:
                    h = e.sent, p = _slicedToArray(h, 2), u = p[0], g = p[1], t.formatCategories(u, g), 
                    t.formatOperationData(g), y = {
                        cityId: d.id,
                        userId: (app.getUser() || {}).userId || "theatres"
                    }, t.data.city && t.data.city.id !== d.id && t.adBanner.fetch(y), t.adBanner.render(y);

                  case 19:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    onPullDownRefresh: function() {
        this.getFirstPage();
    },
    onReachBottom: function() {
        this.data.paging.hasMore && this.getNextPage();
    },
    getNextPage: function() {
        this.data.paging.pageNo++, this._getShows();
    },
    getFirstPage: function() {
        this.data.paging.pageNo = 1, this._getShows(!0);
    },
    _getShows: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], a = this.data, n = a.paging, i = n.pageNo, r = n.pageSize, o = a.sortType, s = a.subId, c = a.city, d = c.id, h = c.lat, p = c.lng;
        if (!a.listLoading) return this.setData({
            listLoading: !0
        }), app.request().config("loading", e ? 1 : 0).get("/maoyansh/myshow/ajax/performances/0;st=" + o + ";tft=" + s + ";p=" + i + ";s=" + r).query({
            cityId: d || 0,
            lat: h || 0,
            lng: p || 0,
            sellChannel: 7,
            token: this.user.token
        }).end().then(function(a) {
            var n = a.body, i = n.code, r = n.data, o = void 0 === r ? [] : r, s = n.paging;
            if (s.pageNo, s.hasMore, t.setData({
                listLoading: !1
            }), 200 === i) {
                var c = [], d = [];
                e ? o.forEach(function(t) {
                    1 === t.isCurrentCity ? c.push(t) : d.push(t);
                }) : c = t.data.performances.concat(o), t.setData({
                    performances: c,
                    recommendPerformances: d,
                    showSortPanel: !1,
                    paging: a.body.paging
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "猫眼演出赛事",
            desc: "演出赛事一网打尽，精彩生活现在开始~",
            path: "/pages/show/index/index"
        };
    },
    filterRecommendList: function(t) {
        var e = t.currentTarget, a = this.data, n = (a.sortTypes, a.showSortPanel), i = e.dataset.sortItem, r = i.sortType, o = i.subs;
        -1 === r ? this.setData({
            subSorts: o,
            showSortPanel: !n
        }) : (this.setData({
            subSorts: o,
            sortType: r,
            showSortPanel: !1
        }), this.getFirstPage());
    },
    sortRecommendList: function(t) {
        var e = t.currentTarget, a = this.data, n = (a.subSorts, a.sortTypes), i = e.dataset.subItem, r = i.subId, o = i.name, s = n.map(function(t) {
            return -1 === t.sortType && (t.name = o), t;
        });
        this.setData({
            subId: r,
            sortTypes: s
        }), this.getFirstPage();
    },
    showSortPanel: function() {
        this.setData({
            showSortPanel: !0
        });
    },
    hideSortPanel: function() {
        this.setData({
            showSortPanel: !1
        });
    },
    toggleSortPanel: function() {
        this.setData({
            showSortPanel: !this.data.showSortPanel
        });
    }
});