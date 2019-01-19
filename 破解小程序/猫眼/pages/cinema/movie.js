var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
    }
    return e;
}, app = getApp(), Date2 = require("../../scripts/date2.js"), searchBar = require("../search/_search-bar"), selectBar = require("./_select-bar"), LocateBanner = require("../../tpl/locate-banner"), AccessLimit = require("../../tpl/access-limit"), apiConfig = require("../../scripts/api-config"), api = apiConfig.getApiUrl(), xHost = apiConfig.getApiUrl("cinema"), _app$require = app.require("scripts/movie"), commentv2 = _app$require.commentv2, delComment = _app$require.delComment, egg = _app$require.egg, defaultPaging = {
    offset: 0,
    limit: 10,
    hasMore: !0
}, SCORE_TEXT = [ "超烂啊", "超烂啊", "超烂啊", "比较差", "比较差", "一般般", "一般般", "比较好", "比较好", "棒极了", "完美" ];

app.MoviePage(_extends({}, searchBar, selectBar, {
    needCity: !0,
    data: _extends({}, searchBar.data, selectBar.data, {
        movie: {},
        dates: void 0,
        cinemas: null,
        day: null,
        pagingMap: {},
        paging: defaultPaging,
        selectBarFixed: !1,
        ci: 255
    }),
    onLoad: function(e) {
        var t = this;
        this.options = e, this.movieId = e.movieId, this.isLogin = !(!app.$user || !app.$user.token), 
        app._forceMovieCinemaLocate ? (app.checkLocationAuth().catch(function() {}).then(function() {
            t.initCity(e);
        }), delete app._forceMovieCinemaLocate) : this.initCity(e), this.on("toggleSelectBar", function(e) {
            e && !t.data.selectBarFixed && t.scrollToTop();
        }), this.on("refreshCinemas", function(e) {
            t.getCinemas();
        }), this.locateBanner = new LocateBanner({
            page: this,
            show: !1
        }), this.locateBanner.render(), this.accessLimit = new AccessLimit({
            page: this
        }), this.accessLimit.onConfirm = this.onPullDownRefresh.bind(this), wx.hideShareMenu && wx.hideShareMenu(), 
        this.onPullDownRefresh = this.onPullDownRefresh.bind(this), app.models.location.on("locationChange", this.onPullDownRefresh), 
        this.setData({
            ci: app.$location.city ? app.$location.city.id : 254
        });
    },
    onUnload: function() {
        this.offCityEvent(), app.models.location.off("locationChange", this.onPullDownRefresh);
    },
    onShow: function() {
        var e = app.$location.city, t = this.data.city || {
            id: this.options.cityId,
            nm: this.options.cityName
        };
        e || !this.isLogin && app.$user && app.$user.token ? (wx.showShareMenu && wx.showShareMenu(), 
        !this.data.cinemas || t.id !== e.id || !this.isLogin && app.$user && app.$user.token ? (this.isLogin = !(!app.$user || !app.$user.token), 
        this.onPullDownRefresh()) : (this.getMovie(), this.fetchComment()), this.setCity(e)) : wx.hideShareMenu && wx.hideShareMenu();
    },
    getMyCommentListAndDeleteComment: function() {
        var e = this;
        app.request().header({
            token: app.$user.token
        }).get("/review/v1/comments/mine.json").query({
            limit: 1e3
        }).host("api").end().then(function(t) {
            var i = t.body, a = i.data, n = e.data.movie.id;
            if (a && a.length) for (var o = 0, s = a.length; o < s; o++) a[o].movieId == n && delComment(a[o].id);
        }).then(function() {
            e.data.movie.mysc = 0, e.setData({
                icm: !1,
                movie: e.data.movie
            });
        }).catch(function() {
            e.toast("网络错误");
        });
    },
    onTapLike: function(e) {
        var t = this;
        app.checkLogin({
            warn: "添加想看前请先登录",
            ignoreLogin: !0,
            success: function() {
                if (t.data.icm) return void t.dialog({
                    title: "是否取消看过？",
                    content: "若取消看过，你的评分和讨论内容都将被删除",
                    confirmText: "确认删除",
                    callback: function(e, i) {
                        i.confirm && t.getMyCommentListAndDeleteComment();
                    }
                });
                var e = {
                    MAOYAN: 1,
                    MEITUAN: 2
                }, i = {
                    userId: app.$user.id,
                    token: app.$user.token,
                    type: 1 ^ t.data.movie.wishst,
                    business: e.MEITUAN,
                    clientType: "touch",
                    uuid: app.$uuid
                }, a = i.type ? "post" : "delete";
                "post" === a && wx.vibrateShort({}), app.request(a, "/hostproxy/mmdb/user/movie/" + t.data.movie.id + "/wish.json").query({
                    clientType: "wechat_small_program",
                    channelId: app.channelId,
                    ci: app.$location.city ? app.$location.city.id : 0,
                    uuid: app.$uuid
                }).send("post" == a ? i : {}).header({
                    token: app.$user.token,
                    "x-host": xHost
                }).end().then(function(e) {
                    return e.body.data.id;
                }).then(function(e) {
                    var a = t.data.movie;
                    e === a.id ? (a.wishst = i.type, a.wish = a.wish + (a.wishst ? 1 : -1), t.setData({
                        movie: a
                    }), wx.hideToast(), wx.showToast({
                        title: "已" + (i.type ? "标记" : "取消") + "想看",
                        icon: "success",
                        duration: 1e3
                    })) : t.toast((i.type ? "标记" : "取消") + "想看失败", 1e3);
                });
            }
        });
    },
    scrollToTop: function() {
        wx.pageScrollTo && wx.pageScrollTo({
            scrollTop: app.rpx2px(444)
        });
    },
    onPageScroll: function(e) {
        var t = e.scrollTop, i = this.data.selectBarFixed;
        t >= 220 ? !i && this.setData({
            selectBarFixed: !0
        }) : i && this.setData({
            selectBarFixed: !1
        });
    },
    dayChangeHandler: function(e) {
        var t = e.currentTarget.dataset, i = t.date, a = t.index;
        this.setData({
            day: i,
            paging: this.data.pagingMap[i] || defaultPaging,
            dateScrollLeft: app.rpx2px(190 * a - 250)
        }), this.closeModal(), this.getCinemas(!1), this.getSelectItemsByDate(i);
    },
    getMovie: function() {
        var e = this;
        app.request().get("/mmdb/movie/v5/" + this.movieId + ".json").header({
            token: app.$user.token
        }).host("api").query({
            ci: app.$location.city ? app.$location.city.id : 1
        }).end().then(function(t) {
            if (200 === t.statusCode && t.body.data) {
                var i = t.body.data.movie;
                app.title(i.nm);
                var a = null;
                i.mysc && (a = {}, a.score = i.mysc, a.scoreText = i.mysc + "分，" + SCORE_TEXT[i.mysc]), 
                i.egg ? egg(i.id).then(function(t) {
                    i.eggInfo = t, e.setData({
                        movie: e.formatMovie(i),
                        icm: a
                    });
                }).catch(function() {
                    e.setData({
                        movie: e.formatMovie(i),
                        icm: a
                    });
                }) : e.setData({
                    movie: e.formatMovie(i),
                    icm: a
                });
            }
        }).catch(function(e) {});
    },
    formatMovie: function(e) {
        return e.img = app.img(e.img, 220, 300), e["3d"] = /3D/.test(e.ver), e.imax = /IMAX/.test(e.ver), 
        e.sc && (e.sc = e.sc.toFixed(1), e.snum && (e.scDesc = e.snum > 9999 ? (e.snum / 1e4).toFixed(1) + "万人评" : e.snum + "人评")), 
        e;
    },
    getShowDates: function(e) {
        var t = this, i = app.$location, a = app.$user;
        app.request().get("/mmcs/show/v1/movie/showdays.json").query({
            cityId: i.city ? i.city.id : 1,
            movieId: this.movieId,
            channelId: app.channelId
        }).proxyhost("api").header({
            token: a.token
        }).end().then(function(i) {
            if (200 === i.statusCode && i.body.data) {
                var a = i.body.data.dates, n = a.map(function(e) {
                    return e.date;
                }), o = t.options.day, s = n.indexOf(o);
                -1 === s && (o = n[0], s = 0), t.setData({
                    dates: t.formatDates(a),
                    day: o,
                    dateScrollLeft: app.rpx2px(190 * s)
                }), e();
            }
        }).catch(function(e) {
            var i = AccessLimit.getAttachFromError(e);
            if (i) return t.accessLimit.render(i), void t.accessLimit.show();
            t.handleError(e, "page");
        });
    },
    getCinemas: function() {
        var e = this, t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], a = this.data, n = a.day, o = a.pagingMap, s = app.$location, c = app.$user, r = o[n] || defaultPaging;
        i || (r = defaultPaging, this.loading(t));
        var d = _extends({
            ci: s.city ? s.city.id : 1,
            cityId: s.city ? s.city.id : 1,
            movieId: this.movieId,
            channelId: app.channelId,
            showDate: n || void 0,
            offset: r.offset,
            limit: r.limit,
            userid: c.userId,
            utm_term: 7.5,
            client: "iphone"
        }, this.data.selectedItems);
        s && s.latitude && (d.lng = s.longitude, d.lat = s.latitude), app.request().get("/mmcs/cinema/v1/select/movie/cinemas.json").query(d).proxyhost("api").header({
            token: c.token
        }).end().then(function(t) {
            if (e.loading(!1), 200 === t.statusCode && t.body.data) {
                var a = t.body.data, o = e.data.cinemas || [], s = e.formatCinemas(a.cinemas);
                o = i ? o.concat(s) : s, a.paging.offset += a.paging.limit, e.data.pagingMap[n] = a.paging, 
                e.setData({
                    cinemas: o,
                    paging: a.paging
                });
            } else 200 === t.statusCode && 108 === t.body.code && e.setData({
                cinemas: []
            });
        }).catch(function(t) {
            if (!i) {
                var a = AccessLimit.getAttachFromError(t);
                if (a) return e.accessLimit.render(a), void e.accessLimit.show();
            }
            e.handleError(t, i ? void 0 : "page");
        });
    },
    tapShow: function(e) {
        var t = e.currentTarget.dataset, i = t.seqno;
        if (!t.status) return this.toast("因系统原因，该场次暂停售票，请稍后再试", 1500);
        app.goto("seat?seqNo=" + i);
    },
    formatDates: function(e) {
        return e.map(function(e, t) {
            return {
                isPredate: e.isPredate,
                day: e.date,
                text: new Date2(e.date).toString("EM月d日")
            };
        });
    },
    formatCinemas: function(e) {
        var t = app.$location;
        return e.map(function(e) {
            return e.showPrice = !!+e.sellPrice, t.locationCity && t.city && t.city.id === t.locationCity.id ? parseFloat(e.distance) < 1 && (e.distance = 1e3 * parseFloat(e.distance) + "m") : delete e.distance, 
            e.labels && e.labels.forEach(function(t) {
                "超级会员" === t.name && (e.tag.svip = "超级会员");
            }), e;
        });
    },
    fetchComment: function() {
        var e = this, t = this.data.movie;
        t && t.id && commentv2(t.id).then(function(t) {
            var i = t.icm;
            i.score *= 2, i.scoreText = i.score + "分，" + SCORE_TEXT[i.score], e.setData({
                icm: i
            });
        });
    },
    getSelectItemsByDate: function(e) {
        this.getSelectItems(this.movieId, e);
    },
    onPullDownRefresh: function() {
        var e = this;
        this.getMovie(), this.getShowDates(function() {
            e.getCinemas(!1), e.getSelectItemsByDate(e.data.dates[0].day);
        });
    },
    onReachBottom: function() {
        this.getCinemas(!1, !0);
    },
    onShareAppMessage: function() {
        var e = this.data.day, t = app.$location.city, i = {
            cityId: t.id,
            cityName: t.nm
        }, a = "/pages/cinema/movie?" + app.shareParams(_extends({}, this.options, {
            day: e
        }, i));
        a = encodeURIComponent(a);
        var n = "pages/movie/index?redirect=" + a;
        return {
            title: "《" + this.data.movie.nm + "》上映啦，赶紧抢票吧！",
            desc: "猫眼小程序特惠选座，一起看电影吧",
            path: n
        };
    }
}));