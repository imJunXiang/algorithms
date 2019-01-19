function migrateWarnMid(t) {
    var e = this, a = t.currentTarget.dataset.migrateWarn;
    return this.options.sourceOrderId && a ? new Promise(function(t, a) {
        wx.showModal({
            content: "确定要退出本次改签",
            showCancel: !0,
            success: function(i) {
                i.confirm ? (delete e.options.sourceOrderId, delete e.options.seatCount, e.setData({
                    sourceOrderId: "",
                    seatCount: ""
                }), t(!0)) : a();
            },
            fail: function() {
                a();
            }
        });
    }) : Promise.resolve(!0);
}

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, app = getApp(), Date2 = app.require("scripts/date2"), Finger = app.require("vendors/finger"), modal = app.require("scripts/modal"), AccessLimit = require("../../tpl/access-limit"), _require = require("./_cinema-item"), formatCinemas = _require.formatCinemas, Deal = require("../../tpl/deal.js"), dealListTopingDisplayBid = "b_5cyzd9xw", dealListTopingClickBid = "b_dq1utycd", dealListDisplayBid = "b_fn1y31i6", dealClickBid = "b_a605z3gu", buyBtnClickBid = "b_lpafj9nw", pictureClickBid = "b_l5q1qwd7", drawerLookBid = "b_r3tbr1ta", drawerClickBid = "b_e64owniy", copyWrittingBid = "b_qs95cx2t", copyWrittingClickBid = "b_yxelsqzg", dealCenterBid = "b_pazycdhh";

app.MoviePage({
    val_cid: "pages/cinema/cinema",
    data: {
        movie: {},
        movies: [],
        cinema: {},
        vipInfo: void 0,
        cityCardInfo: [],
        dates: [],
        show: {},
        plist: [],
        scrollLeft: 0,
        animation: !1,
        dealList: [],
        preInfo: [],
        preDetail: {},
        showPage: !1,
        recommendNumMap: {
            1: "单人",
            2: "双人",
            3: "三人"
        },
        logined: !0,
        bid: {
            dealClickBid: dealClickBid,
            dealListTopingClickBid: dealListTopingClickBid,
            buyBtnClickBid: buyBtnClickBid,
            pictureClickBid: pictureClickBid,
            drawerClickBid: drawerClickBid,
            copyWrittingClickBid: copyWrittingClickBid
        },
        showingAllDealList: !0,
        couponListIsLastPage: !1
    },
    nextPageNum: 1,
    onLoad: function(t) {
        var e = this;
        this.setData({
            needLogin: !0,
            isLogin: !(!app.$user || !app.$user.token)
        }), this.options = t;
        var a = this;
        this.movieId = +t.movieId, this.cinemaId = +t.cinemaId, this.data.day = t.day, this.accessLimit = new AccessLimit({
            page: this
        }), this.deal = new Deal({
            page: this
        }), this.accessLimit.onConfirm = this.onShow.bind(this), app.$user && app.$user.token || this.setData({
            logined: !1
        }), app.systemInfo().then(function(i) {
            e.baseSize = app.$systemInfo.windowWidth / 375 * (375 === app.$systemInfo.windowWidth ? 100 : 99), 
            e.finger = new Finger({
                pressMove: function(t) {
                    a.setData({
                        scrollLeft: Math.floor(a.data.scrollLeft + t.deltaX),
                        animation: !1
                    }), this.timeStamp && (this.speed = t.deltaX / (t.timeStamp - this.timeStamp)), 
                    this.timeStamp = t.timeStamp;
                },
                touchEnd: function(t) {
                    this.speed = this.speed || 0;
                    var e = parseInt((-1 * (a.data.scrollLeft + 60 * this.speed) + a.baseSize / 2) / a.baseSize, 10);
                    this.speed = 0, a.movieChange(e);
                }
            }), modal(e, {
                activityListModal: {
                    height: "auto"
                },
                activityDetailModal: {
                    height: "auto"
                },
                couponListModal: {
                    height: "auto"
                }
            }), t.sourceOrderId && e.setData({
                sourceOrderId: t.sourceOrderId,
                source: t.source,
                seatCount: t.seatCount
            }), e.loading(!0);
        }), this.options.sourceOrderId || this.getDealList();
    },
    onShow: function() {
        this.getCinema(), this.getShows(), this.getCouponList();
    },
    onPullDownRefresh: function() {
        this.onShow();
    },
    showMap: function() {
        wx.openLocation({
            latitude: this.data.cinema.lat,
            longitude: this.data.cinema.lng,
            name: this.data.cinema.nm,
            address: this.data.cinema.addr
        });
    },
    showActivityCell: function() {
        if (this.data.preInfo.length > 1) this.activityListModal.show(); else {
            var t = this.data.preInfo[0].preInfoUrl;
            this.getPreInfoDetail(t);
        }
    },
    hideActivityListModal: function() {
        this.activityListModal.hide();
    },
    showCouponListCell: function() {
        this.couponListModal.show();
    },
    hideCouponListModal: function() {
        this.couponListModal.hide();
    },
    hideActivityDetailModal: function() {
        this.activityDetailModal.hide();
    },
    tapMovie: function(t) {
        var e = parseInt(-1 * this.data.scrollLeft / this.baseSize + .5, 10), a = parseInt((t.detail.x + 60) / app.$systemInfo.windowWidth * 375 / 100, 10) - 2;
        this.setData({
            dateScrollLeft: 0
        }), 0 !== a && this.movieChange(e + a);
    },
    movieChange: function(t) {
        t < 0 && (t = 0), t > this.data.movies.length - 1 && (t = this.data.movies.length - 1);
        var e = this.data.movies[t];
        this.movieId = e.id;
        var a = e.shows[0].showDate, i = e.shows[0];
        this.setData({
            scrollLeft: -1 * this.baseSize * t,
            animation: !0,
            movie: e,
            preInfo: i.preInfo || [],
            dates: this.formatDates(e.shows),
            plist: this.formatPlist(i.plist, e.dur, a),
            day: a
        });
    },
    getCinema: function() {
        var t = this, e = app.$user;
        app.request().get("/hostproxy/mmcs/cinema/v1/cinema.json").query({
            cinemaId: this.cinemaId,
            channelId: app.channelId
        }).header("token", e.token).header("x-host", "http://maoyanapi.vip.sankuai.com").end().then(function(e) {
            if (t.loading(!1), 200 === e.statusCode && e.body.success) {
                var a = e.body.data;
                if (a.sc = a.s.toFixed(1), a.saleInfo && t.stats("b_wg7uov9b", {
                    cinemaid: a.cinemaId
                }), a.saleInfo && a.saleInfo.content && a.saleInfo.specialContent) {
                    var i = a.saleInfo.content.indexOf(a.saleInfo.specialContent);
                    i >= 0 && (a.saleInfo.content = a.saleInfo.content.slice(0, i));
                }
                t.setData({
                    cinema: a
                }), t.data.cinema.sell || t.getRecommendcinema(), wx.setNavigationBarTitle({
                    title: e.body.data.nm
                });
            }
        }).catch(function(e) {
            t.loading(!1);
        });
    },
    getRecommendcinema: function() {
        var t = this, e = app.$user, a = app.$location;
        app.request().get("/hostproxy/mmcs/cinema/v1/recommend/cinemas.json").query({
            cityId: a.city ? a.city.id : 1,
            channelId: app.channelId,
            cinemaId: this.cinemaId
        }).header({
            token: e.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(e) {
            200 === e.statusCode && e.body.success && t.setData({
                cinemas: formatCinemas(e.body.data.cinemas),
                showPage: !0
            });
        });
    },
    getShows: function() {
        var t = this, e = app.$location, a = app.$user;
        app.request().get("/hostproxy/mmcs/show/v2/cinema/shows.json").query({
            cinemaId: this.cinemaId,
            ci: e.city ? e.city.id : 1,
            uuid: app.$uuid,
            channelId: app.channelId,
            userid: app.$user.userId
        }).header({
            token: a.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(e) {
            if (t.loading(!1), wx.stopPullDownRefresh(), 200 === e.statusCode && e.body.success && e.body.data.sell) {
                var a = e.body.data.movies, i = a[0], n = 0, o = new Date2(Date.now()).toString("yyyy-MM-dd"), s = [];
                a.forEach(function(e, a) {
                    if (e.img = app.img(e.img, 180, 250), e.shows[0].showDate > o && (e.shows = [ {
                        hasShow: !1,
                        plist: [],
                        showDate: o,
                        preferential: 0
                    } ].concat(e.shows)), e.id === t.movieId && (i = e, n = a), e.hasScore = 0 !== parseFloat(e.sc), 
                    a < 10) {
                        var d = {
                            service_type: 19,
                            cinema_name: t.data.cinema.nm,
                            movie_name: e.nm,
                            is_on_sale: !0
                        };
                        s.push(d);
                    }
                });
                var d = void 0, r = void 0, c = void 0, p = void 0;
                i && (d = i.shows[0].showDate, r = i.shows[0], i.shows.forEach(function(e, a) {
                    e.showDate === t.data.day && (r = e, d = t.data.day, c = a);
                }), p = r.preInfo || []), t.setData({
                    movies: e.body.data.movies,
                    movie: i,
                    vipInfo: e.body.data.vipInfo && e.body.data.vipInfo.map(function(t) {
                        "wallet" === app.appName && (t.url = encodeURIComponent(t.url));
                        var e = /membercard%2Fdetail%2F(\d+)%3F_v_/.exec(t.url);
                        return e && (t.id = e[1]), t;
                    }),
                    cityCardInfo: e.body.data.cityCardInfo && e.body.data.cityCardInfo.map(function(t) {
                        "wallet" === app.appName && (t.url = encodeURIComponent(t.url)), t.title && (t.title = t.title.split(/[{|}]/));
                        var e = /cityCardId%3D(\d+)%26/.exec(t.url);
                        return e && e.length > 1 && (t.cityCardId = e[1]), t;
                    }),
                    scrollLeft: -1 * t.baseSize * n,
                    animation: !0,
                    dates: i && t.formatDates(i.shows),
                    preInfo: p,
                    plist: i && t.formatPlist(r.plist, i.dur, d),
                    show: r,
                    day: d,
                    dateScrollLeft: app.rpx2px(190 * c),
                    showPage: !0
                }, function() {
                    t.setData({
                        scopeDataList: s
                    });
                });
            }
        }).catch(function(e) {
            if (t.loading(!1), t.data.movies && 0 !== t.data.movies.length) t.handleError(e); else {
                var a = AccessLimit.getAttachFromError(e);
                if (a) return t.accessLimit.render(a), void t.accessLimit.show();
                t.handleError(e, "page");
            }
        });
    },
    getCouponList: function() {
        var t = this, e = app.$location;
        this.data.couponListIsLastPage || app.request().get("/proxy/market/coupon/center/cinema/list.json").header({
            token: app.$user.token,
            "x-ta": 1,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).query({
            channelId: app.channelId,
            ci: e.city ? e.city.id : 1,
            cinemaId: this.cinemaId,
            platformType: 1,
            enterType: 1,
            pageNum: this.nextPageNum
        }).end().then(function(e) {
            var a = e.body, i = a.data;
            if (a.success && (i.lastPage ? t.setData({
                couponListIsLastPage: !0
            }) : t.nextPageNum += 1, i.list.length > 0)) {
                var n = i.list.map(function(t) {
                    var e = new Date(t.endTime);
                    return t.endTime = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate(), 
                    t;
                }), o = (t.data.couponList || []).concat(n);
                t.setData({
                    couponList: o
                });
            }
        });
    },
    drawCoupon: function(t) {
        var e = this, a = app.$location, i = t.currentTarget.dataset, n = i.aid, o = i.acode, s = i.index;
        app.getFingerprint().then(function(t) {
            app.request().post("/proxy/market/user/center/draw.json").header({
                "x-host": "http://maoyanapi.vip.sankuai.com",
                uuid: app.$uuidV2
            }).send({
                channelId: app.channelId,
                token: app.$user.token,
                ci: a.city ? a.city.id : 1,
                enterType: 1,
                activityCode: o,
                activityId: n,
                clientType: 9,
                version: app.version,
                fingerprint: t
            }).end().then(function(t) {
                var a = t.body, i = a.success, n = a.errMsg, o = a.code, d = e.data.couponList;
                i ? (d[s].status = 1, e.toast("领取成功")) : 7 == o ? e.toast("你不是新客哦～") : 6 == o || 4 == o ? (e.toast("券已抢光，下次赶早哦~"), 
                d[s].status = 2) : 1 == o || 3 == o || 9 == o ? e.toast(n) : e.toast("领取失败"), e.setData({
                    couponList: d
                });
            }).catch(function(t) {
                e.handleError(t);
            });
        });
    },
    gotoUse: function() {
        this.hideCouponListModal();
    },
    dayChangeHandler: function(t) {
        var e = this, a = t.currentTarget.dataset, i = a.date, n = a.index;
        this.data.movie.shows.forEach(function(t) {
            t.showDate === i && e.setData({
                day: t.showDate,
                show: t,
                dateScrollLeft: app.rpx2px(190 * n - 250),
                preInfo: t.preInfo || [],
                plist: e.formatPlist(t.plist, e.data.movie.dur, t.showDate)
            });
        });
    },
    formatDates: function(t) {
        return t.map(function(t, e) {
            return {
                day: t.showDate,
                preferential: t.preferential,
                text: new Date2(t.showDate).toString("EM月d日")
            };
        });
    },
    formatPlist: function(t, e, a) {
        return t.map(function(t) {
            var i = t.tm.split(":"), n = +i[1] + +e, o = +i[0] + parseInt(n / 60, 10);
            return n %= 60, o %= 24, n < 10 && (n = "0" + n), o < 10 && (o = "0" + o), t.etm = o + ":" + n, 
            t.nextDay = a !== t.dt, t.showId = +t.seqNo.slice(8), t.seqNo = t.seqNo, t;
        });
    },
    onTapNavigator: function(t) {
        var e = t.currentTarget.dataset.tip;
        e ? this.toast(e, 1e3) : this.onTapNavi(t);
    },
    touchstart: function(t) {
        this.finger.start(t);
    },
    touchmove: function(t) {
        this.finger.move(t);
    },
    touchend: function(t) {
        this.finger.end(t);
    },
    touchcancel: function(t) {
        this.finger.cancel(t);
    },
    getDealList: function() {
        var t = this, e = app.$user, a = app.$location;
        app.request().get("/hostproxy/goods/queryDealList.json").query({
            cinemaId: this.cinemaId,
            channel: 12,
            channelId: app.channelId,
            uuid: app.$uuid,
            ci: a.city ? a.city.id : 1,
            userid: e.userId
        }).header({
            token: e.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(e) {
            if (200 === e.statusCode && e.body.success && e.body.data.dealList) {
                var a = t.cinemaId, i = [];
                e.body.data.divideDealList && t.changeDealData(e.body.data.divideDealList, e.body.data.totalCount, i);
                var n = e.body.data.dealList.filter(function(t) {
                    return !t.groupDealFlag;
                }).map(function(e, i) {
                    return e.imageUrl = app.img(e.imageUrl, 190, 190), t.stats("b_h9y71d6k", {
                        index: i,
                        cinemaid: a
                    }), e;
                });
                e.body.data.activity && e.body.data.activity.jumpUrl && t.stats(copyWrittingBid, {
                    cinemaid: a
                }), e.body.data.activity && e.body.data.activity.cinemaChannelBanner && e.body.data.activity.cinemaChannelBanner.imageUrl && t.stats("b_wvrzcnyy", {
                    cinemaid: a
                }), i.forEach(function(e) {
                    "推荐" == e ? t.stats(dealListTopingDisplayBid, {
                        cinemaid: a,
                        maipin_category: e
                    }) : t.stats(dealListDisplayBid, {
                        cinemaid: a,
                        maipin_category: e
                    });
                }), i.length || t.stats(dealListDisplayBid, {
                    cinemaid: a
                }), t.setData(_extends({}, e.body.data, {
                    dealList: n
                }));
            }
        });
    },
    changeDealData: function(t, e, a) {
        var i = this;
        t.forEach(function(t) {
            a.push(t.title), t.restTitle = t.title.slice(0, -1), t.dealList = t.dealList.filter(function(t) {
                return !t.groupDealFlag;
            }).map(function(t, e) {
                return t.imageUrl = app.img(t.imageUrl, 190, 190), t;
            }), t.sliceList = [], e > 7 && t.total > t.showCount && (i.stats(drawerLookBid, {
                cinemaid: i.data.cinema.cinemaId,
                maipin_category: t.title
            }), t.sliceList = t.dealList.slice(0, t.showCount));
        });
    },
    tapCell: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = e.tip;
        e.redirect;
        a ? app.goto(a) : this.toast(i || "很抱歉，无法进入在线选座");
    },
    gotoDealCenter: function(t) {
        var e = t.currentTarget.dataset.valLab;
        this.stats(dealCenterBid, e), app.goto("/pages/dealsub/deal-center?cinemaId=" + this.cinemaId);
    },
    showActDetail: function(t) {
        var e = t.currentTarget.dataset.url;
        this.getPreInfoDetail(e);
    },
    getPreInfoDetail: function(t) {
        t = t.replace("http://", "https://"), wx.canIUse("web-view") ? app.goto(t) : this.toast("微信版本过低，请升级后查看");
    },
    naviMiddlewares: [ migrateWarnMid ],
    doNothing: function() {},
    onShareAppMessage: function() {
        var t = this.data, e = t.day, a = t.movie, i = t.cinema, n = a.id, o = "/pages/cinema/cinema?" + app.shareParams(_extends({}, this.options, {
            day: e,
            movieId: n
        }));
        o = encodeURIComponent(o);
        var s = "pages/movie/index?redirect=" + o;
        return {
            title: "想去" + i.nm + "看个电影，一起吗？",
            path: s
        };
    }
});