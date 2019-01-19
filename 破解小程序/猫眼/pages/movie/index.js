var _extends = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, app = getApp(), _app$require = app.require("scripts/movie"), hotV4 = _app$require.hotV4, moreHotList = _app$require.moreHotList, version = _app$require.version, store = require("../../scripts/store"), searchBar = require("../search/_search-bar"), AdBanner = require("../../tpl/ad-banner"), loginScript = require("../../scripts/login"), MovieRemindModal = require("../../tpl/movie-remind-modal"), MovieRemindCard = require("../../tpl/movie-remind-card"), SpecialTopic = require("../../tpl/operation/embedded-component/special-topic"), favouriteAPI = require("../../scripts/favourite"), advertHandler = require("../../scripts/advert"), MYT = require("../../constant/myt"), mge_bid = MYT.mge_bid, mpt_bid = MYT.mpt_bid;

app.MoviePage(_extends({}, searchBar, {
    needCity: !0,
    hasShownRedirect: !1,
    hasShowModal: !1,
    scrollTop: null,
    hasShowPassAd: !1,
    data: _extends({}, searchBar.data, {
        limit: 10,
        activeTab: "hot",
        movies: app.get("_cache-hot-movies"),
        hasFetchMovies: !1,
        mostExpected: [],
        coming: [],
        hotMovieIds: [],
        comingMovieIds: [],
        showGameEntry: !1,
        isShowSigninVideo: !1,
        showGuid: !1,
        showScore: !1,
        hasShowButton: !1,
        firstLogin: !1,
        passAd: [],
        showAddMiniRemind: !1
    }),
    onLoad: function(t) {
        wx.hideShareMenu();
        var i = this.options, e = i.activeTab, o = i.redirect;
        return this.options = t, this.specialTopic = new SpecialTopic({
            page: this
        }), this.adBanner = new AdBanner({
            page: this,
            positionIds: "1034",
            params: {
                movieId: t.movieId
            }
        }), this.movieRemindModal = new MovieRemindModal({
            page: this
        }), this.movieRemindCard = new MovieRemindCard({
            page: this
        }), e && this.setData({
            activeTab: e
        }), o ? this.indexRedirect(t) : t.scene ? this.bargainLogic() : (this.initCity(t), 
        void this.setShowTopRemind(!0));
    },
    onShow: function() {
        var t = this;
        this.setData({
            showGuid: !1,
            showScore: !1,
            firstLogin: !1
        });
        var i = this.data.city, e = (app.models.location.get() || {}).city;
        this.adBanner || (this.adBanner = new AdBanner({
            page: this,
            positionIds: "1034"
        }));
        var o = function() {
            var o = i && i.id !== e.id;
            t.setCity(e), t.data.hasFetchMovies && !o || (t.data.movies || t.loading(), t.onPullDownFetchData());
            var a = {
                cityId: app.getPropSafely("$location.city.id", app, 1),
                userId: (app.getUser() || {}).userId || ""
            };
            t.adBanner.render(a), loginScript.openId().then(function() {
                t.getOperationPositions();
            }), t.getGameEntry();
        };
        e ? o() : this.hasShownRedirect && (this.initCity(this.options), o()), wx.showShareMenu(), 
        MYT.initStats(app), advertHandler.fetch({
            positionIds: 1135
        }, function(i) {
            i.length && (MYT.props.stats(mpt_bid, {
                positionId: 1135,
                ad_id: i[0].adId,
                materialId: i[0].materialId
            }), t.setData({
                adsHeaderBg: i
            }));
        }), app.$user.token && this.isFirstLogin(), this.growthDeal(), this.getPassAds(), 
        app.$user.token && this.movieRemindCard.init();
    },
    onHide: function() {
        this.movieRemindCard.clearAllInterval(), this.closeSigninVideo();
    },
    growthDeal: function() {
        var t = store.get("growth-activeTab");
        "" != t ? (store.remove("growth-activeTab"), "hot" == t ? this.switchToHot() : "coming" == t && this.switchToComing(), 
        this.setData({
            hasShowButton: !0
        }), wx.pageScrollTo && wx.pageScrollTo({
            scrollTop: 0
        })) : this.setData({
            hasShowButton: !1
        });
    },
    indexRedirect: function(t) {
        var i = this;
        this.stats("b_j9ygxrr8");
        var e = this.options, o = e.redirect, a = e.widgetData, s = e.wxParamData, n = decodeURIComponent(o);
        if (a && s) {
            var r = "widgetData=" + a + "&wxParamData=" + s, d = /\S\?\S*=/, h = /\?/;
            n = o + (d.test(n) ? "&" : h.test(n) ? "" : "?") + r;
        }
        return wx.navigateTo({
            url: n,
            complete: function() {
                i.needCity = !1, i.hasShownRedirect = !0;
            }
        });
    },
    bargainLogic: function() {
        var t = this.options, i = decodeURIComponent(t.scene);
        i = "?" + i;
        var e = function(t, i) {
            return new RegExp("[?&]" + t + "=([^&#]*)", "gim").test(i) ? RegExp.$1 : "";
        }, o = e("activity_id", i), a = e("goods_id", i), s = e("employment", i);
        if (o && a) {
            this.stats("b_p2vrshy3");
            var n = "/pages/bargain/detail/index?activity_id=" + o + "&goods_id=" + a;
            t.redirect = encodeURIComponent(n), this.indexRedirect(t);
        } else s && (t.redirect = encodeURIComponent("/pages/employment/index/index"), this.indexRedirect(t));
    },
    onTapAdBanner: function(t) {
        this.adBanner.onTapAdBanner(t);
    },
    onBannerChagne: function(t) {
        this.adBanner.onBannerChagne(t.detail.current);
    },
    getPassAds: function() {
        var t = this;
        advertHandler.fetch({
            positionIds: 1086
        }, function(i) {
            i.length ? (t.hasShowPassAd = !1, t.setData({
                passAd: i
            })) : t.setData({
                passAd: []
            });
        });
    },
    onPageScroll: function(t) {
        var i = t.scrollTop;
        if (!this.hasShowPassAd && this.data.passAd.length && i > 500) {
            var e = this.data.passAd;
            this.hasShowPassAd = !0, MYT.initStats(app), MYT.props.stats(MYT.mpt_bid, {
                positionId: 1086,
                ad_id: e[0].adId,
                materialId: e[0].materialId
            });
        }
        this.setData({
            showPassAd: i > 100 && i < 2e3,
            showAddMiniRemind: !(i > 100) && this.data.showAddMiniRemind
        }), this.adBanner.onPageScroll(i);
    },
    onUnload: function() {
        this.offCityEvent(), this.movieRemindCard.hideCardModal();
    },
    onTapAds: function(t) {
        MYT.props.stats(MYT.mge_bid, {
            positionId: 1086,
            ad_id: this.data.passAd[0].adId,
            materialId: this.data.passAd[0].materialId
        }), this.onTapNavi(t);
    },
    getGameEntry: function() {
        var t = this;
        app.request().get("/hideActivityModal").end().then(function(i) {
            var e = i.body.scene;
            Array.isArray(e) ? e.includes("all") || e.includes(app.scene) ? t.setData({
                showGameEntry: !1
            }) : (t.stats("b_r4950pi2"), t.setData({
                showGameEntry: !0
            })) : t.setData({
                showGameEntry: !1
            });
        }).catch(function(i) {
            t.setData({
                showGameEntry: !1
            });
        });
    },
    onReachBottom: function() {
        "hot" === this.data.activeTab ? this.data.movies && this.data.movies.length && this.fetchMovies() : this.data.comingMovieIds.length > 0 && this.getMoreComingMovies();
    },
    onPullDownRefresh: function() {
        this.setData({
            showPassAd: !1
        }), this.onPullDownFetchData(), this.getOperationPositions(), this.getPassAds(), 
        this.setShowTopRemind();
    },
    onPullDownFetchData: function() {
        if (!app.$location.city) return this.loading(!1), wx.stopPullDownRefresh();
        this.fetchMovies(0), "coming" === this.data.activeTab && (this.getMostExpectedMovies(), 
        this.getComingMovies()), this.adBanner.refresh();
    },
    fetchMovies: function(t) {
        function i() {
            o.loading(!1), wx.stopPullDownRefresh();
        }
        var e = this, o = this, a = this.data, s = a.hotMovieIds, n = a.city, r = a.limit;
        if (void 0 !== n && (void 0 === t && (t = this.data.offset || 0), 0 === t && (this.data.movies && (this.data.movies = []), 
        this.data.hasMore = !0), this.data.hasMore)) {
            var d = void 0;
            if (0 === t) d = hotV4(n.id).then(function(t) {
                var i = t.hot, o = t.movieIds, a = void 0 === o ? [] : o;
                return e.setData({
                    hotMovieIds: a,
                    offset: i.length,
                    hasMore: a.length > i.length
                }), i;
            }); else {
                var h = s.slice(t, t + r);
                d = moreHotList(h.join(","), n.id).then(function(i) {
                    var o = i.movies;
                    return t += o.length, e.setData({
                        offset: t,
                        hasMore: s.length > t
                    }), o;
                });
            }
            d.then(function(t) {
                i();
                var o = e.formatJumpUrl((e.data.movies || []).concat(t));
                app.set("_cache-hot-movies", o.slice(0, r)), e.setData({
                    movies: o,
                    hasFetchMovies: !0
                }), e.timeoutID && (clearTimeout(e.timeoutID), e.timeoutID = null, setTimeout(function() {
                    e.setData({
                        firstLogin: !1
                    });
                }, 2e3));
            }).catch(function(t) {
                i(), e.handleError(t);
            });
        }
    },
    formatJumpUrl: function(t) {
        return t ? t.map(function(t) {
            return t.itemJumpUrl = t.vodPlay ? "/pages/vod/detail/index?movieId=" + t.id : "", 
            t;
        }) : t;
    },
    onShareAppMessage: function() {
        var t = {
            cityId: this.data.city.id,
            cityName: this.data.city.nm
        };
        return {
            title: "最近上映的这些电影你都看了吗？",
            path: "pages/movie/index?" + app.shareParams(_extends({}, this.options, t, {
                activeTab: this.data.activeTab
            }))
        };
    },
    switchToHot: function() {
        this.switchTab("hot");
    },
    switchToComing: function() {
        this.switchTab("coming");
    },
    switchTab: function(t) {
        var i = (app.models.location.get() || {}).city;
        "coming" === t && !this.data.mostExpected.length && i && (this.getMostExpectedMovies(), 
        this.getComingMovies()), this.data.activeTab === t || this.setData({
            activeTab: t
        });
    },
    getMostExpectedMovies: function() {
        var t = this;
        this.loading(!0), app.request().get("/mmdb/movie/v1/list/wish/order/coming.json").query({
            ci: this.data.city ? this.data.city.id : 1,
            limit: 30,
            offset: 0
        }).header({
            token: app.$user.token
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(i) {
            t.loading(!1), wx.stopPullDownRefresh(), i.coming.map(function(t) {
                t.img = app.img(t.img, 170, 230), t.date = t.comingTitle.replace(" ", "").split("周")[0];
            }), t.setData({
                mostExpected: i.coming
            });
        }).catch(function(i) {
            t.loading(!1), t.data.mostExpected.length ? t.handleError(i) : t.handleError(i, "page");
        });
    },
    getComingMovies: function() {
        var t = this;
        this.loading(!0), app.request().get("/mmdb/movie/v2/list/rt/order/coming.json").query({
            ci: this.data.city ? this.data.city.id : 1,
            limit: 10
        }).header({
            token: app.$user.token
        }).end().then(function(t) {
            return t.body.data;
        }).then(function(i) {
            t.loading(!1), wx.stopPullDownRefresh(), t.setData({
                coming: t.groupMoviesByDate(i.coming, !0),
                comingMovieIds: (i.movieIds || []).slice(10)
            });
        }).catch(function(i) {
            t.loading(!1), t.data.coming.length ? t.handleError(i) : t.handleError(i, "page");
        });
    },
    getMoreComingMovies: function() {
        var t = this, i = this.data, e = i.comingMovieIds, o = i.city, a = e.slice(0, 10).join(",");
        moreHotList(a, o.id).then(function(i) {
            e.splice(0, 10), t.setData({
                coming: t.groupMoviesByDate(i.movies),
                comingMovieIds: e
            });
        }).catch(function(i) {
            t.handleError(i);
        });
    },
    groupMoviesByDate: function(t, i) {
        var e = i ? [] : this.data.coming, o = e.length - 1;
        return t.map(function(t) {
            t.version = version(t.ver), t.img = app.img(t.img, 128, 180), t.showInfo = "", t.showTimeInfo = "", 
            t.score = parseFloat(t.sc).toFixed(1), 0 === e.length ? e[++o] = {
                comingTitle: t.comingTitle,
                movies: [].concat(t)
            } : t.comingTitle === e[o].comingTitle ? e[o].movies.push(t) : e[++o] = {
                comingTitle: t.comingTitle,
                movies: [].concat(t)
            };
        }), e;
    },
    toggleWishFromComing: function(t) {
        this.toggleWishStatus(t);
    },
    toggleWishFromMostExpected: function(t) {
        this.toggleWishStatus(t);
    },
    toggleWishStatus: function(t) {
        var i = this, e = t.currentTarget.dataset, o = e.wishst, a = e.movieid, s = e.index, n = e.subindex, r = this.data, d = r.mostExpected, h = r.coming;
        app.checkLogin({
            warn: "添加想看前请先登录",
            ignoreLogin: !0,
            success: function() {
                var t = {
                    MAOYAN: 1,
                    MEITUAN: 2
                }, e = {
                    userId: app.$user.userId,
                    token: app.$user.token,
                    type: 1 ^ o,
                    business: t.MEITUAN,
                    clientType: "touch",
                    channelId: app.channelId
                }, r = e.type ? "post" : "delete";
                "post" === r && wx.vibrateShort({});
                var c = e.type ? "已标记想看" : "已取消想看";
                app.request(r, "/hostproxy/mmdb/user/movie/" + a + "/wish.json").send("post" === r ? e : {}).header({
                    token: app.$user.token,
                    "x-host": "http://maoyanapi.vip.sankuai.com"
                }).query({
                    channelId: app.channelId,
                    uuid: app.$uuid,
                    ci: app.$location.city ? app.$location.city.id : 0
                }).end().then(function(t) {
                    return t.body.data.id;
                }).then(function(t) {
                    if (t === a) {
                        var o = void 0;
                        o = void 0 !== n ? h[s].movies[n] : d[s], o.wishst = e.type, e.type ? o.wish++ : o.wish--, 
                        i.setData({
                            coming: h,
                            mostExpected: d
                        }), wx.hideToast(), wx.showToast({
                            title: c,
                            icon: "success",
                            duration: 1e3
                        });
                    }
                }).catch(function(t) {
                    i.handleError(t);
                });
            }
        });
    },
    checkVisitSignin: function() {
        var t = this;
        app.get("isVisitedSignin") || !1 || this.setData({
            isShowSigninVideo: !0,
            disableScroll: "fixed"
        }, function() {
            "pages/movie/index" === app.page().is && (t.signinVideoCtx = wx.createVideoContext("signInVideo"), 
            t.dialogSigninVideo = t.selectComponent("#dialogSigninVideo"), t.dialogSigninVideo && t.dialogSigninVideo.show({
                hideCallback: function(i) {
                    i && i.fromClick && t.stats("b_ifda504n"), t.setData({
                        disableScroll: "relative"
                    });
                },
                buttons: [ {
                    text: "去签到",
                    clickFunc: function() {
                        t.closeSigninVideo(), app.goto("/pages/signin/detail/index"), t.stats("b_118nqivb");
                    }
                } ]
            }), t.signinVideoCtx.play(), t.stats("b_9ffjk9mu"), app.set("isVisitedSignin", !0));
        });
    },
    closeSigninVideo: function() {
        this.dialogSigninVideo && this.dialogSigninVideo.hide(), this.setData({
            isShowSigninVideo: !1,
            disableScroll: "relative"
        });
    },
    closeFavourite: function() {
        this.setData({
            showGuid: !1
        });
    },
    isFirstLogin: function() {
        var t = this;
        this.isToday(new Date()) || (store.set("firstLoginDate", new Date().toLocaleDateString()), 
        this.setData({
            firstLogin: !0
        }), this.timeoutID = setTimeout(function() {
            t.setData({
                firstLogin: !1
            });
        }, 2e3));
    },
    isToday: function(t) {
        var i = store.get("firstLoginDate"), t = new Date(t).toLocaleDateString();
        return i == t;
    },
    closeRemind: function() {
        var t = this;
        this.stats("b_j60qxkub"), app.set("isNotFirstComeIn", !0), this.setData({
            closeRemind: !0
        }), setTimeout(function() {
            t.setData({
                showAddMiniRemind: !1
            });
        }, 750);
    },
    setShowTopRemind: function(t) {
        app.get("isNotFirstComeIn") || (t && this.stats("b_5em48stt"), this.setData({
            showAddMiniRemind: !0
        }));
    }
}));