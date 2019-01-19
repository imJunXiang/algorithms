function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];
        return o;
    }
    return Array.from(t);
}

var _movie = require("../../scripts/movie"), store = require("../../scripts/store"), apiConfig = require("../../scripts/api-config"), app = getApp(), api = apiConfig.getApiUrl(), _require = require("./_comment"), formatComments = _require.formatComments, approveRequest = _require.approveRequest, setShareShow = _require.setShareShow, screen = _require.screen, SCORE_TEXT = [ "超烂啊", "超烂啊", "超烂啊", "比较差", "比较差", "一般般", "一般般", "比较好", "比较好", "棒极了", "完美" ];

app.MoviePage({
    data: {
        tag: 0,
        theme: app.$theme,
        topTipShow: !1,
        firstComing: !1,
        fixedClass: "",
        isHasNothingTag: !1
    },
    backupComments: [],
    tipShowCount: 0,
    onLoad: function(t) {
        this.options = t, this.setData({
            movieId: t.movieId,
            movieName: t.movieName,
            tag: t.tag
        }), wx.setNavigationBarTitle({
            title: "精选讨论-" + t.movieName
        });
    },
    onShow: function() {
        this.setData({
            ci: app.$location.city.id || 0,
            uId: app.$user.userId || ""
        }), this.getTags(), this.showLoading(), this.changeTagGetdata(this.data.tag);
    },
    getComments: function(t, e) {
        var o = this, a = this.data, s = a.movieId, i = a.offset, n = void 0 === i ? t : i, r = a.limit, m = void 0 === r ? 10 : r, h = a.ts, d = void 0 === h ? 0 : h, p = a.tag, c = void 0 === p ? 0 : p, u = {
            movieId: s,
            level: 1,
            userId: app.$user.userId,
            type: 3,
            containSelfComment: !0,
            tag: c,
            ts: 0 === n ? 0 : d,
            offset: n,
            limit: m
        };
        (0, _movie.commentv2_layered)(u).then(function(a) {
            wx.hideLoading(), store.get("firstComing") || (store.set("firstComing", !0), o.stats("b_o6f1qe6y", {
                movieId: s
            }), o.setData({
                firstComing: !0,
                fixedClass: "_fixed"
            })), wx.stopPullDownRefresh();
            var i = a.data, n = i.myComment, r = i.hotComments, m = i.comments, h = i.total, d = i.t2total, p = a.paging, c = p.hasMore, v = p.offset, g = p.limit, f = h - d, C = a.ts;
            u.offset > 0 && (n = o.data.myComment);
            var l = n && 0 !== parseInt(n.movieId, 10) && 0 !== parseInt(n.userId, 10) && "" != n.content;
            l && (n.scoreText = n.score + "分，" + SCORE_TEXT[n.score], n = formatComments(n));
            var w = !(f > 0 || l);
            e ? (o.setData({
                myComment: n,
                isHasNothingTag: w
            }), e(n)) : (0 === t && o.setData({
                total: o.data.tag ? o.data.total : h,
                t1total: f,
                t2total: d,
                isHasNothingTag: w
            }), l && (r = screen(n.userId, r), m = screen(n.userId, m)), r = formatComments(r), 
            m = formatComments(m), o.backupComments = [].concat(_toConsumableArray(o.backupComments), _toConsumableArray(m)), 
            v > 0 && (m = [].concat(_toConsumableArray(o.data.comments), _toConsumableArray(m))), 
            o.setData({
                myComment: n,
                isHasMyComment: l,
                comments: m,
                hotComments: r,
                offset: v + g,
                ts: C,
                limit: g,
                hasMore: c
            }), e && e());
        }).catch(function(t) {
            o.data.comments.length ? o.handleError(t) : o.handleError(t, "page");
        });
    },
    onPullDownRefresh: function() {
        this.getTags(), this.setData({
            ts: 0,
            offset: 0
        }), this.backupComments = [], this.getComments(0);
    },
    onReachBottom: function() {
        this.data.hasMore && this.getComments();
    },
    changeTag: function(t) {
        if (this.tipShowCount > 0) return void this.setShare("", "", !0);
        if (this.data.topTipShow) return void this.setTopTipShow();
        this.showLoading();
        var e = t.currentTarget.dataset.tag;
        this.changeTagGetdata(e);
    },
    changeTagGetdata: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.setData({
            tag: parseInt(t, 10),
            hasMore: !1,
            offset: 0,
            ts: 0
        }), this.getComments(0);
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
    setMycomment: function(t) {
        t ? this.getComments(0, t, !0) : this.getComments();
    },
    onShareAppMessage: function() {
        return {
            title: "看完《" + this.options.movieName + "》，猫眼观众这样说",
            path: "pages/movie/comment?" + app.shareParams(this.options)
        };
    },
    setShare: function(t, e, o) {
        if (o) {
            var a = setShareShow(this.data.myComment, t, o, this), s = setShareShow(this.data.hotComments, t, o, this), i = setShareShow(this.data.comments, t, o, this);
            this.setData({
                myComment: a,
                hotComments: s,
                comments: i
            });
        } else if ("hotComments" === e) {
            var n = setShareShow(this.data.hotComments, t, o, this);
            this.setData({
                hotComments: n
            });
        } else if ("comments" === e) {
            var r = setShareShow(this.data.comments, t, o, this);
            this.setData({
                comments: r
            });
        } else {
            var m = setShareShow(this.data.myComment, t, o, this);
            this.setData({
                myComment: m
            });
        }
    },
    toggleShowShare: function(t) {
        if (this.data.topTipShow) return void this.setTopTipShow();
        var e = t.currentTarget.dataset, o = e.cid, a = e.type;
        this.tipShowCount > 0 ? this.setShare(o, "", !0) : this.setShare(o, a);
    },
    approveCollect: function(t) {
        app.collectFormId(t.detail.formId);
    },
    toggleApprove: function(t) {
        var e = this, o = t.currentTarget.dataset, a = o.cid, s = o.likedbycurrentuser, i = o.index, n = o.type;
        return this.tipShowCount > 0 ? void this.setShare(a, "", !0) : this.data.topTipShow ? void this.setTopTipShow() : void app.checkLogin({
            warn: "点赞前请先登录",
            success: function() {
                approveRequest(t);
                var o = void 0;
                o = parseInt(i, 10) >= 0 ? e.data[n][i] : e.data[n], o.likedByCurrentUser = !s, 
                o.likedByCurrentUser && wx.vibrateShort({}), o.likedByCurrentUser ? o.upCount += 1 : o.upCount >= 1 && (o.upCount -= 1), 
                o.animation = !0, e.setData({
                    myComment: "myComment" === n ? o : e.data.myComment,
                    comments: e.data.comments,
                    hotComments: e.data.hotComments
                });
            }
        });
    },
    shareTap: function(t) {
        var e = this;
        app.checkLogin({
            warn: "操作前请先登录",
            success: function() {
                var o = t.currentTarget.dataset, a = o.cid, s = o.type, i = o.index;
                if ("1" === o.tag) e.setMycomment(), e.setShare(a, s), e.dialog("提示", "确定举报当前评论吗", function(t, o) {
                    o.confirm && app.request().post(api + "/review/v1/comment/spamreport.json").header({
                        token: app.$user.token,
                        uuid: app.$uuid
                    }).send({
                        userId: app.$user.userId,
                        commentId: a,
                        channelId: app.channelId,
                        ci: app.$location.city.id || 0
                    }).end().then(function(t) {
                        e.toast("举报成功");
                    }).catch(e.handleError.bind(e));
                }); else {
                    var n = {};
                    if (n = "myComment" === s ? e.data.myComment : e.data[s][i]) {
                        var r = parseInt(n.score);
                        if (isNaN(r) || 0 === r) return void e.toast("此评论暂无评分，暂不支持分享呦");
                        store.set("_share_comment", n), setTimeout(function() {
                            e.setShare(a, s), wx.navigateTo({
                                url: "/pages/reviewsub/review-share?movieId=" + e.data.movieId + "&source=list"
                            });
                        }, 100);
                    }
                }
            }
        });
    },
    gotoComment: function(t) {
        var e = t.currentTarget.dataset, o = e.cid, a = e.relay;
        return this.tipShowCount > 0 ? void this.setShare(o, "", !0) : this.data.topTipShow ? void this.setTopTipShow() : void wx.navigateTo({
            url: "/pages/commentsub/comment-detail?cid=" + o + "&mname=" + this.options.movieName + (a ? "&relay=1" : "")
        });
    },
    myReplyTap: function(t) {
        var e = this;
        return this.tipShowCount > 0 ? void this.setShare("", "", !0) : this.data.topTipShow ? void this.setTopTipShow() : void wx.getNetworkType({
            success: function(t) {
                "none" != t.networkType ? void 0 != e.data.diy ? wx.navigateTo({
                    url: e.data.diy.reviewPage + "?movieId=" + e.data.movieId + "&required=comment"
                }) : app.checkLogin({
                    warn: "写短评前请先登录",
                    success: function() {
                        wx.navigateTo({
                            url: "/pages/reviewsub/review?movieId=" + e.data.movieId + "&required=comment"
                        });
                    }
                }) : e.toast("网络异常，请检查网络");
            }
        });
    },
    showTip: function() {
        if (this.tipShowCount > 0) return void this.setShare("", "", !0);
        this.setTopTipShow();
    },
    setTopTipShow: function() {
        var t = this.data.movieId;
        this.stats(this.data.topTipShow ? "b_3m3zd3mr" : "b_o6f1qe6y", {
            movieId: t
        }), this.setData({
            fixedClass: this.data.topTipShow ? "" : "_fixed",
            topTipShow: !this.data.topTipShow
        });
    },
    closePop: function() {
        var t = this.data.movieId;
        this.stats("b_3m3zd3mr", {
            movieId: t
        }), this.setData({
            topTipShow: !1,
            firstComing: !1,
            fixedClass: ""
        });
    },
    closeTip: function() {
        this.tipShowCount > 0 && this.setShare("", "", !0);
    },
    showLoading: function() {
        wx.showLoading({
            title: "数据加载中",
            mask: !0
        });
    }
});