function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

var _domainSet = require("./../../scripts/domainSet"), _utils = require("../../scripts/utils"), _utils2 = _interopRequireDefault(_utils), _axios = require("../../scripts/axios"), _api = require("../../scripts/activity/api"), AdBanner = require("../../tpl/ad-banner"), store = require("../../scripts/store"), apiConfig = require("../../scripts/api-config"), app = getApp(), api = apiConfig.getApiUrl(), _app$require = app.require("scripts/movie"), movie = _app$require.movie, celebrity = _app$require.celebrity, comment = _app$require.comment, commentv2 = _app$require.commentv2, commentv2_layered = _app$require.commentv2_layered, delComment = _app$require.delComment, format = _app$require.format, egg = _app$require.egg, tips = _app$require.tips, _require = require("./_comment"), formatComments = _require.formatComments, approveRequest = _require.approveRequest, setShareShow = _require.setShareShow, screen = _require.screen, recordAudioContext = wx.createInnerAudioContext(), advertHandler = require("../../scripts/advert"), stats = require("../../scripts/stats"), CREDITS_TYPE = {
    1: "演员",
    2: "导演",
    3: "副导演",
    4: "编剧",
    5: "制片人",
    6: "监制",
    7: "原创音乐",
    8: "摄影",
    9: "剪辑",
    10: "艺术指导",
    11: "美术设计",
    12: "服装设计",
    13: "化妆",
    14: "特效",
    15: "视觉效果",
    16: "武术指导",
    17: "翻译",
    18: "特别顾问"
}, statsChannel = "rediantong", mge_bid = "b_xmm5sgjk", mpt_bid = "b_cy70t5em", SCORE_TEXT = [ "超烂啊", "超烂啊", "超烂啊", "比较差", "比较差", "一般般", "一般般", "比较好", "比较好", "棒极了", "完美" ], TYPE_NAME = [ "自定义跳转", "无跳转", "彩蛋" ];

app.MoviePage({
    data: {
        screenHeight: "100%",
        collapse: !0,
        theme: app.$theme,
        collapseTip: !0,
        tags: [],
        showCard: !1,
        cardInfo: null,
        showType: "init",
        playStatus: "ready",
        time: "",
        orderInfo: null
    },
    tipShowCount: 0,
    props: {
        val_cid: "c_hw1gt8n5"
    },
    initStats: function() {
        this.hasReportedAds = [], stats({
            channel: statsChannel,
            appnm: app.lxAppname || app.appName,
            noPending: !0,
            uid: function() {
                return app.$user.userId;
            }
        })(this.props);
    },
    onLoad: function(t) {
        var e = this;
        this.options = t, this.loading(), t.utm_source && (app._forceMovieCinemaLocate = !0), 
        "wechat_search" === t.utm_source && t.cityId && (app.$location.city = {
            id: Number(t.cityId),
            nm: t.cityName
        });
        var o = app.system();
        this.setData({
            screenHeight: o.windowHeight + 100 + "px"
        }), this.modal = this.createModal("myModalDialog", {
            overlay: !0
        }), movie(t.movieId).then(format).then(function(t) {
            return e.setData({
                scopeData: {
                    service_type: 19,
                    movie_name: t.nm,
                    release_time: t.rt,
                    is_on_sale: !!t.buy
                }
            }), t.img = app.img(t.img), t.scoreText = t.mysc + "分，" + SCORE_TEXT[t.mysc], t.snum = app.num(t.snum), 
            t.proScoreNum = app.num(t.proScoreNum), t.wish = t.wish + (t.wishst ? 1 : 0), t.globalReleased ? t.sc && t.proScore ? t.scoreStyle = "movie-score-style8" : t.sc ? t.scoreStyle = "movie-score-style6" : t.proScore ? t.scoreStyle = "movie-score-style7" : t.proScore && t.sc || (t.scoreStyle = "movie-score-style5") : t.proScore && t.sc ? t.scoreStyle = "movie-score-style4" : t.sc ? t.scoreStyle = "movie-score-style2" : t.proScore ? t.scoreStyle = "movie-score-style3" : t.proScore && t.sc || (t.scoreStyle = "movie-score-style1"), 
            tips(t.id).then(function(o) {
                var a = [], i = [];
                if (o.length > 0) {
                    o.filter(function(t) {
                        return TYPE_NAME.indexOf(t.tipName) > -1;
                    }).splice(0, 4).forEach(function(t) {
                        t.tipJumpURL ? a.push(t) : i.push(t);
                    });
                }
                var n = i.concat(a);
                e.setData({
                    tips: n
                }), n.length && e.stats("b_19q1qzot", {
                    movie_id: t.id,
                    tip_type: n[0].tipName
                });
            }), t.egg && egg(t.id).then(function(t) {
                return e.setData({
                    egg: t
                });
            }), e.loading(!1), t;
        }).then(function(t) {
            e.setData({
                movie: t
            }), t && t.vodPlay && e.getVodPlayDetail();
        }).catch(this.handleError.bind(this, "page")).then(this.getPhotos.bind(this)), celebrity(t.movieId).then(function(t) {
            var e = -1;
            return t = [].concat.apply([], t).filter(function(t) {
                return !!~[ 1, 2 ].indexOf(t.cr);
            }).map(function(t) {
                return t.showType = t.cr !== e, e = t.cr, t.type = CREDITS_TYPE[t.cr], t.avatar = app.img(t.avatar, {
                    e: 1
                }), t.cnm = (t.cnm || "").trim(), t.enm = (t.enm || "").trim(), t.roles = (t.roles || "").trim(), 
                t;
            });
        }).then(function(t) {
            return e.setData({
                celebrities: t
            });
        }).catch(this.handleError.bind(this)), app.request().get(api + "/mmdb/comments/pro/movie/" + t.movieId + ".json").query({
            limit: 3
        }).end().then(function(t) {
            var o = t.body.data;
            o = formatComments(o), e.setData({
                procomments: o,
                proTotal: t.body.paging.total
            });
        }).catch(this.handleError.bind(this)), app.request().get(api + "/mmdb/movie/" + t.movieId + "/feature/v1/mbox.json").end().then(function(t) {
            return t.body;
        }).then(function(t) {
            var e = t.mbox, o = t.globalRelease, a = {
                lastDayRank: "昨日票房排行",
                firstWeekBox: "首周票房(万)",
                sumBox: o ? "累计票房(万)" : "点映票房(万)",
                firstWeekOverSeaBox: "海外首周末票房(万美元)",
                sumOverSeaBox: "海外累计票房(万美元)"
            }, i = Object.keys(a).map(function(t) {
                return {
                    text: a[t],
                    rank: e[t]
                };
            });
            return e.sumBox + e.sumOverSeaBox > 0 ? e.sumBox ? i.slice(~~!e.lastDayRank, 3) : i.slice(3) : [];
        }).then(function(t) {
            return e.setData({
                mbox: t
            });
        }).catch(this.handleError.bind(this)), this.adBanner = new AdBanner({
            page: this,
            positionIds: "1036",
            params: {
                movieId: t.movieId
            }
        }), this.setData({
            ci: app.$location.city ? app.$location.city.id : 0
        }), this.options.cardId && app.request().get(_axios.sevenDayDomain + "/qixi/card/" + this.options.cardId + ".json?movieId=" + this.options.movieId).header({
            token: app.$user.token,
            "content-type": "application/json"
        }).end(function(t, o) {
            o.body.success && e.setData({
                cardInfo: o.body.data,
                orderInfo: o.body.order,
                time: (0, _axios.formatTime)(o.body.data.created, "Y-M-D")
            }, function() {
                setTimeout(function() {
                    e.setData({
                        showCard: !0
                    }, function() {
                        o.body.data.audioUrl && e.playAudio();
                    });
                }, 2e3);
            });
        }).catch(function(t) {
            console.log(t);
        }), this.loadMovieActivity(), app.request().get(_domainSet.reserveEntriceDomain + "/vod/video/detailEntrance.json").query({
            movieId: this.options.movieId,
            channelId: app.channelId
        }).end(function(t, o) {
            var a = o.body;
            a && a.success && a.data.bindId && e.setData({
                reserveEntryData: a.data
            });
        });
    },
    getVodPlayDetail: function() {
        var t = this;
        app.request().get("/mmdb/vod/video/combination.json").header({
            token: _utils2.default.safeGet(app, "$user.token", ""),
            ci: _utils2.default.getCityAlter().id,
            clientType: "wechat_small_program",
            channel: app.channelId,
            uuid: app.$uuid
        }).query({
            movieId: this.data.movie.id,
            channelId: app.channelId
        }).end().then(function(e) {
            var o = e.body;
            o.data && o.data.buyButton && o.data.groupButton && t.setData({
                buyButton: o.data.buyButton,
                groupButton: o.data.groupButton,
                available: o.data.available
            });
        }).catch(function(t) {
            console.log("error", t);
        });
    },
    loadMovieActivity: function() {
        var t = this, e = this.options.movieId, o = void 0 === e ? 0 : e;
        o > 0 && _api.activityApi.getMovieActivity(o).then(function(e) {
            var o = e.data;
            t.setData({
                activityList: o.slice(0, 3)
            });
        });
    },
    activityItemTap: function(t) {
        var e = t.currentTarget.dataset.position, o = this.data.activityList;
        if (o) {
            var a = o[e];
            a && _api.activityGoto.gotoActivity(a);
        }
    },
    gotoMoreActivityTap: function(t) {
        _api.activityGoto.gotoActivityList();
    },
    onBuyFormSubmit: function(t) {
        this.collectFormIds(t), this.onTapNavi(t);
    },
    onShow: function() {
        var t = this;
        this.setData({
            uId: app.$user.userId || ""
        });
        var e = this.options.movieId, o = (app.models.location.get() || {}).city;
        if (e && this.getComments(), this.getTags(), o) {
            var a = {
                cityId: app.getPropSafely("$location.city.id", app, 1),
                userId: (app.getUser() || {}).userId || "",
                params: {
                    movieId: this.options.movieId
                }
            };
            this.adBanner.render(a);
        }
        this.initStats(), advertHandler.fetch({
            positionIds: 1079,
            movieId: this.options ? this.options.movieId : 0
        }, function(e) {
            e.length > 0 && (t.props.stats(mpt_bid, {
                movie_id: t.options.movieId,
                positionId: 1079,
                ad_id: e[0].adId,
                materialId: e[0].materialId
            }), t.setData({
                adsMiddle: e
            }));
        }), advertHandler.fetch({
            positionIds: 1080,
            movieId: this.options ? this.options.movieId : 0
        }, function(e) {
            e.length > 0 && (t.props.stats(mpt_bid, {
                movie_id: t.options.movieId,
                positionId: 1080,
                ad_id: e[0].adId,
                materialId: e[0].materialId
            }), t.setData({
                adsHang: e
            }));
        });
    },
    getComments: function(t) {
        var e = this, o = {
            movieId: this.options.movieId,
            level: 1,
            userId: app.$user.userId,
            type: 3,
            containSelfComment: !0,
            tag: 0,
            ts: 0,
            offset: 0,
            limit: 10
        };
        commentv2_layered(o).then(function(o) {
            var a = o.data, i = a.myComment, n = a.hotComments, r = a.comments, s = a.total, d = a.t2total, c = s - d, p = i && 0 !== parseInt(i.movieId, 10) && 0 !== parseInt(i.userId, 10), m = null;
            p && i.score > 0 && (m = i, m.scoreText = m.score + "分，" + SCORE_TEXT[m.score]);
            var u = p && "" != i.content;
            if (u && (i = formatComments(i)), !t) {
                if (n.length >= 3) r = n; else {
                    r = [].concat(_toConsumableArray(n), _toConsumableArray(r)), u && (r = screen(i.userId, r));
                    var h = [], l = !0, v = !1, y = void 0;
                    try {
                        for (var f, g = r[Symbol.iterator](); !(l = (f = g.next()).done); l = !0) {
                            var I = f.value, _ = !1, S = !0, b = !1, w = void 0;
                            try {
                                for (var T, C = h[Symbol.iterator](); !(S = (T = C.next()).done); S = !0) {
                                    T.value.id === I.id && (_ = !0);
                                }
                            } catch (t) {
                                b = !0, w = t;
                            } finally {
                                try {
                                    !S && C.return && C.return();
                                } finally {
                                    if (b) throw w;
                                }
                            }
                            _ || h.push(I);
                        }
                    } catch (t) {
                        v = !0, y = t;
                    } finally {
                        try {
                            !l && g.return && g.return();
                        } finally {
                            if (v) throw y;
                        }
                    }
                    r = h;
                }
                return r = formatComments(r.slice(0, 3)), e.setData({
                    comments: r,
                    myComment: i,
                    isHasMyComment: u,
                    total: s,
                    t1total: c,
                    t2total: d,
                    commentScore: m
                }), r;
            }
            e.setData({
                myComment: i,
                commentScore: m
            }), t && t(i);
        }).catch(this.handleError.bind(this));
    },
    getTags: function() {
        var t = this;
        return app.request().get(api + "/review/v2/comments/movie/tag.json").header({
            token: app.$user.token
        }).query({
            movieId: this.options.movieId
        }).end().then(function(e) {
            t.setData({
                tags: e.body.data
            });
        });
    },
    onTapMovieImage: function() {
        var t = this.data.movie;
        t.vd || wx.previewImage({
            urls: [ t.img ]
        });
    },
    onTapIntro: function(t) {
        this.setData({
            collapse: !this.data.collapse
        });
    },
    onTapTip: function(t) {
        var e = this;
        this.data.collapseTip && this.data.tips.forEach(function(t, o) {
            o > 0 && e.stats("b_19q1qzot", {
                movie_id: e.data.movie.id,
                tip_type: t.tipName
            });
        }), this.data.collapseTip && this.setData({
            collapseTip: !this.data.collapseTip
        });
    },
    onTapLike: function(t) {
        var e = this;
        this.collectFormIds(t), app.checkLogin({
            ignoreLogin: !0,
            warn: "添加想看前请先登录",
            success: function() {
                if (e.data.commentScore) return void e.dialog({
                    title: "是否取消看过？",
                    content: "若取消看过，你的评分和讨论内容都将被删除",
                    confirmText: "确认删除",
                    callback: function(t, o) {
                        o.confirm && delComment(e.data.commentScore.id).then(function(t) {
                            e.data.movie.mysc = 0, e.getComments(), e.setData({
                                movie: e.data.movie
                            });
                        });
                    }
                });
                e.getComments();
                var t = {
                    MAOYAN: 1,
                    MEITUAN: 2
                }, o = {
                    userId: app.$user.id,
                    token: app.$user.token,
                    type: 1 ^ e.data.movie.wishst,
                    business: t.MEITUAN,
                    clientType: "touch",
                    uuid: app.$uuid
                }, a = o.type ? "post" : "delete";
                "post" === a && wx.vibrateShort({}), app.request(a, "/hostproxy/mmdb/user/movie/" + e.data.movie.id + "/wish.json").query({
                    clientType: "wechat_small_program",
                    channelId: app.channelId,
                    ci: app.$location.city ? app.$location.city.id : 0,
                    uuid: app.$uuid
                }).send("post" === a ? o : {}).header({
                    token: app.$user.token,
                    "x-host": "http://maoyanapi.vip.sankuai.com"
                }).end().then(function(t) {
                    return t.body.data.id;
                }).then(function(t) {
                    var a = e.data.movie;
                    t === a.id ? (a.wishst = o.type, a.wish = a.wish + (a.wishst ? 1 : -1), e.setData({
                        movie: a
                    }), wx.hideToast(), wx.showToast({
                        title: "已" + (o.type ? "标记" : "取消") + "想看",
                        icon: "success",
                        duration: 1e3
                    })) : e.toast((o.type ? "标记" : "取消") + "想看失败", 1e3);
                });
            }
        });
    },
    onTapCelebrity: function(t) {
        var e = t.currentTarget.dataset;
        this.setData({
            celebrity: e
        }), this.modal.show();
    },
    onTapPhoto: function(t) {
        void 0 !== this.data.photos && wx.previewImage({
            current: this.data.photos[t.currentTarget.dataset.index],
            urls: this.data.photos
        });
    },
    onTapAdBanner: function(t) {
        this.adBanner.onTapAdBanner(t);
    },
    onTapAd: function(t) {
        var e = this.data.movie;
        this.stats("b_2zj514c4", {
            movie_id: e.id,
            tip_type: t.currentTarget.dataset.name
        }), this.onTapNavi(t);
    },
    onTapAdsMiddle: function(t) {
        this.props.stats(mge_bid, {
            positionId: 1079,
            ad_id: this.data.adsMiddle[0].adId,
            materialId: this.data.adsMiddle[0].materialId
        }), this.onTapNavi(t);
    },
    onTapAdsHang: function(t) {
        this.props.stats(mge_bid, {
            positionId: 1080,
            ad_id: this.data.adsHang[0].adId,
            materialId: this.data.adsHang[0].materialId
        }), this.onTapNavi(t);
    },
    onMge: function(t) {
        var e = this.data.movie;
        this.stats("b_2zj514c4", {
            movie_id: e.id,
            tip_type: t.currentTarget.dataset.name
        });
    },
    onBannerChagne: function(t) {
        this.adBanner.onBannerChagne(t.detail.current);
    },
    photoStats: function() {
        var t = this, e = wx.getSystemInfoSync().windowWidth;
        wx.createSelectorQuery().selectAll(".img-photo-stats").boundingClientRect().exec(function(o) {
            if (!o[0]) return !1;
            o[0].forEach(function(o, a) {
                var i = o.width / 2;
                o.left > 0 - i && o.left < e - i && !t.photosStatsMap[a] && (t.stats("b_1otr2f42", {
                    movie_id: t.options.movieId
                }), t.photosStatsMap[a] = !0);
            });
        });
    },
    getPhotos: function() {
        var t = this;
        return app.request().get(api + "/mmdb/movie/photos/" + this.options.movieId + "/list.json").query({}).end().then(function(e) {
            var o = e.body.data.photos.map(function(t) {
                return app.img(t.olink);
            }).slice(0, t.data.movie.photos.length);
            t.data.movie.photos = o.map(function(t) {
                return app.img(t, 220, 190);
            }), t.setData({
                photos: o,
                movie: t.data.movie
            });
        }).catch(this.handleError.bind(this));
    },
    approveCollect: function(t) {
        this.collectFormIds(t);
    },
    toggleApprove: function(t) {
        var e = this, o = t.currentTarget.dataset, a = o.cid, i = o.likedbycurrentuser, n = o.index, r = o.type;
        this.tipShowCount > 0 ? this.setShare(a, "", !0) : app.checkLogin({
            warn: "点赞前请先登录",
            success: function() {
                approveRequest(t);
                var o = void 0;
                o = parseInt(n, 10) >= 0 ? e.data[r][n] : e.data[r], o.likedByCurrentUser = !i, 
                o.likedByCurrentUser && wx.vibrateShort({}), o.likedByCurrentUser ? (o.upCount += 1, 
                "procomments" === r && app.set("pro-comment-" + o.id + "-approved", 1, {
                    expires: 604800
                })) : (o.upCount >= 1 && (o.upCount -= 1), "procomments" === r && app.remove("pro-comment-" + o.id + "-approved")), 
                o.animation = !0, e.setData({
                    myComment: "myComment" === r ? o : e.data.myComment,
                    comments: e.data.comments,
                    procomments: e.data.procomments
                });
            }
        });
    },
    onScroll: function(t) {
        var e = t.detail.scrollTop;
        app.title(e > 220 ? this.data.movie.nm : "影片详情");
    },
    onShareAppMessage: function() {
        var t = this.data.movie, e = t.nm, o = t.sc, a = t.proScore, i = t.wish, n = t.pubDesc, r = t.globalReleased, s = [], d = o ? "观众评分" + o.toFixed(1) : "", c = a ? "专业评分" + a.toFixed(1) : "";
        if (r && (d || c)) s = [ d, c ]; else {
            s = [ i ? i + "人想看" : "", n ];
        }
        var p = "/pages/movie/movie?movieId=" + this.options.movieId + "&" + app.shareParams();
        p = encodeURIComponent(p);
        var m = "pages/movie/index?redirect=" + p;
        return {
            title: "《" + e + "》" + s.filter(function(t) {
                return !!t;
            }).join("，"),
            path: m
        };
    },
    collectFormIds: function(t) {
        app.collectFormId(t.detail.formId);
    },
    onImageLoaded: function(t) {},
    setShare: function(t, e, o) {
        var a = this.data, i = a.comments, n = a.myComment;
        o ? (i = setShareShow(i, t, o, this), n = setShareShow(n, t, o, this), this.setData({
            myComment: n,
            comments: i
        })) : "comments" === e ? (i = setShareShow(i, t, o, this), this.setData({
            comments: i
        })) : (n = setShareShow(n, t, o, this), this.setData({
            myComment: n
        }));
    },
    toggleShowShare: function(t) {
        var e = t.currentTarget.dataset, o = e.cid, a = e.type;
        this.tipShowCount > 0 ? this.setShare(o, "", !0) : this.setShare(o, a);
    },
    shareTap: function(t) {
        var e = this;
        app.checkLogin({
            warn: "操作前请先登录",
            success: function() {
                var o = t.currentTarget.dataset, a = o.cid, i = o.index, n = o.type;
                if ("1" === o.tag) e.getComments(), e.setShare(a, n), e.dialog("提示", "确定举报当前评论吗", function(t, o) {
                    o.confirm && app.request().post(api + "/review/v1/comment/spamreport.json").header({
                        token: app.$user.token,
                        uuid: app.$uuid
                    }).send({
                        userId: app.$user.userId,
                        commentId: a,
                        channelId: app.channelId,
                        ci: app.$location.city ? app.$location.city.id : 0
                    }).end().then(function(t) {
                        e.toast("举报成功");
                    }).catch(e.handleError.bind(e));
                }); else {
                    var r = {};
                    if (r = "myComment" === n ? e.data.myComment : e.data[n][i]) {
                        if (0 === parseInt(r.score, 10)) return void e.toast("此评论暂无评分，暂不支持分享呦");
                        store.set("_share_comment", r), setTimeout(function() {
                            e.setShare(a, n), wx.navigateTo({
                                url: "/pages/reviewsub/review-share?movieId=" + e.options.movieId + "&source=list"
                            });
                        }, 100);
                    }
                }
            }
        });
    },
    gotoComment: function(t) {
        var e = t.currentTarget.dataset, o = e.cid, a = e.relay;
        this.tipShowCount > 0 ? this.setShare(o, "", !0) : wx.navigateTo({
            url: "/pages/commentsub/comment-detail?cid=" + o + "&mname=" + this.data.movie.nm + (a ? "&relay=1" : "")
        });
    },
    myReplyTap: function(t) {
        var e = this;
        if (this.tipShowCount > 0) return void this.setShare("", "", !0);
        wx.getNetworkType({
            success: function(t) {
                "none" != t.networkType ? void 0 != e.data.diy ? wx.navigateTo({
                    url: e.data.diy.reviewPage + "?movieId=" + e.data.movie.id + "&required=comment"
                }) : app.checkLogin({
                    warn: "写短评前请先登录",
                    success: function() {
                        e.getComments(function(t) {
                            wx.navigateTo({
                                url: "/pages/reviewsub/review?movieId=" + e.data.movie.id + "&required=comment"
                            });
                        });
                    }
                }) : e.toast("网络异常，请检查网络");
            }
        });
    },
    tagTap: function(t) {
        this.tipShowCount > 0 ? this.setShare("", "", !0) : this.onTapNavi(t);
    },
    closeCard: function() {
        var t = this;
        this.setData({
            showCard: !1
        }, function() {
            t.stopPlayRecord();
        });
    },
    playAudio: function() {
        var t = this.data, e = t.cardInfo;
        "ready" === t.playStatus ? (recordAudioContext.src = e.audioUrl, recordAudioContext.obeyMuteSwitch = !1, 
        recordAudioContext.play()) : recordAudioContext.stop();
    },
    changeShowType: function() {
        "init" === this.data.showType ? (this.playAudio(), this.setData({
            showType: "surprise"
        })) : this.setData({
            showType: "init"
        });
    },
    closeTip: function() {
        this.tipShowCount > 0 && this.setShare("", "", !0);
    },
    stopPlayRecord: function() {
        recordAudioContext && (recordAudioContext.stop(), recordAudioContext.destroy(), 
        recordAudioContext = null);
    },
    onHide: function() {
        this.stopPlayRecord();
    },
    buyOnlineVideo: function(t) {
        var e = t.detail.target.dataset.url;
        app.goto(e);
    }
});