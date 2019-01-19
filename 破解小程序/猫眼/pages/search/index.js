var app = getApp(), lx = require("../../scripts/analytics"), lxkey = "9527lxmy", lxValidCode = void 0, _require = require("../cinema/_cinema-item"), formatCinemas = _require.formatCinemas, _require2 = require("../../scripts/shows"), formatShows = _require2.formatShows, formatKey = _require2.formatKey, formatMovies = function(t, e) {
    return t.map(function(t) {
        return t.page = "wish", t.score = t.sc.toFixed(1), t.ver && (t.movie3d = t.ver.match(/3D/i), 
        t.movieImax = t.ver.match(/imax/i)), t.img && (t.img = app.img(t.img, 128, 180)), 
        t.nm = formatKey(t.nm, e), t.enm = formatKey(t.enm, e), t.movieShowDesc = t.pubDesc || t.showInfo || t.showTimeInfo, 
        t.movieShowDesc = formatKey(t.movieShowDesc, e), t;
    });
}, formatCinema = function(t, e) {
    return t = formatCinemas(t), t.map(function(t) {
        return t.nm = formatKey(t.nm, e), t.addr = formatKey(t.addr, e), t.resolvedDistance = formatKey(t.resolvedDistance, e), 
        t;
    });
}, metaMap = {
    "-1": {
        placeholder: "找影视剧、影院、演出",
        noWord: "没有找到相关内容",
        stypes: [ 1, 3, 5 ],
        stypes_v1: [ {
            type: 6
        }, {
            type: 0
        }, {
            type: 2
        } ]
    },
    0: {
        searchUrl: "/wxapi/mmdb/search/movie/keyword/list.json",
        format: formatMovies,
        stypes: [ 1 ],
        stypes_v1: [ {
            type: 0
        } ]
    },
    2: {
        placeholder: "找影院",
        noWord: "没有找到相关影院",
        searchUrl: "/wxapi/mmdb/search/cinema/keyword/list.json",
        format: formatCinema,
        stypes: [ 3 ],
        stypes_v1: [ {
            type: 2
        } ]
    },
    6: {
        format: formatShows,
        stypes: [ 5 ],
        stypes_v1: [ {
            type: 6
        } ]
    }
}, searchId = void 0, hotmovie_show_id = void 0;

app.MoviePage({
    data: {
        type: -1,
        keyword: "",
        focus: !1,
        history: [],
        hotMovies: [],
        results: [],
        hasResults: !1,
        showSuggestion: !0,
        correctionV2: "",
        correctionType: -1,
        metaMap: metaMap
    },
    onLoad: function(t) {
        var e = this;
        this.options = t;
        var i = t.keyword ? t.keyword : "";
        if (t.type = t.type ? +t.type : -1, this.setData({
            keyword: i,
            hasResults: !!i,
            type: t.type,
            placeholder: metaMap[t.type].placeholder
        }), i.length) return this.integratedSearch(0)(i);
        this.searchHistoryKey += "[" + t.type + "]", -1 === t.type && this.getHotMovie(), 
        this.showSuggestion(), setTimeout(function() {
            e.setData({
                focus: !0
            });
        }, 1e3);
    },
    cancel: function() {
        if ("widget" === this.options.from) return wx.switchTab({
            url: "/pages/movie/index"
        });
        app.goto(-1);
    },
    showSuggestion: function() {
        this.getSearchHistory(), this.setData({
            showSuggestion: !0,
            results: []
        });
    },
    getKeyword: function(t) {
        var e = t.detail.value.trim();
        this.setData({
            keyword: e
        }), e === lxkey && (lxValidCode || (lxValidCode = lx.turnOnValidate()), wx.setClipboardData({
            data: lxValidCode,
            success: function() {
                wx.showToast({
                    title: "灵犀埋点验证" + lxValidCode + "已经复制到剪切板",
                    icon: "none",
                    duration: 3e3
                });
            }
        })), this.search || (this.search = this.integratedSearch(400)), this.search(e), 
        0 === e.length && this.showSuggestion();
    },
    integratedSearch: function(t) {
        var e = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], a = void 0, o = void 0;
        return searchId = this.getSearchId(), this.setData({
            searchId: searchId
        }), function(s) {
            var r = o = Math.random();
            a && clearTimeout(a), a = setTimeout(function() {
                s && app.request().get("https://api.maoyan.com/mmdb/search/integrated/keyword/v1/list.json").query({
                    token: app.$user.token,
                    keyword: s,
                    almtype: 1,
                    iscorrected: i,
                    stype: metaMap[e.options.type].stypes_v1,
                    ci: app.$location.city ? app.$location.city.id : 1,
                    lng: app.$location.longitude,
                    lat: app.$location.latitude,
                    channelId: app.channelId
                }).end().then(function(t) {
                    return t.body;
                }).then(function(t) {
                    if (r === o) {
                        var i = !1, a = void 0;
                        e.loadTypes = [], e.item_list = [], t.data.forEach(function(t) {
                            0 === t.type && (e.item_list.push("(1,[" + t.list.map(function(t) {
                                return t.id;
                            }) + "])"), t.list = formatMovies(t.list.slice(0, 3), s), i = i || t.list.length, 
                            a = 0, e.loadTypes.push(0)), 2 === t.type && (e.item_list.push("(3,[" + t.list.map(function(t) {
                                return t.id;
                            }) + "])"), t.list = formatCinema(t.list.slice(0, 3), s), i = i || t.list.length, 
                            a = 2, e.loadTypes.push(2)), 6 === t.type && (e.item_list.push("(7,[" + t.list.map(function(t) {
                                return t.id;
                            }) + "])"), t.list = formatShows(t.list.slice(0, 3), s, "wxwallet_search"), i = i || t.list.length, 
                            a = 6, e.loadTypes.push(6));
                        });
                        var n = function() {
                            e.setData({
                                keyword: s,
                                results: t.data,
                                hasResults: i,
                                lastType: a,
                                showSuggestion: !1,
                                correctionV2: t.correctionV2,
                                correctionType: t.correctionType
                            });
                        };
                        if (!i) return n();
                        e.inputKeyword = s, e.correctionV2 = t.correctionV2, e.correctionType = t.correctionType, 
                        e.fetch(a, 0, 2 === t.correctionType ? t.correctionV2 : s).then(function(e) {
                            t.data.forEach(function(t) {
                                t.type === a && (t.list = metaMap[a].format(e, s, 6 == a && "wxwallet_search"));
                            }), n();
                        });
                    }
                }).catch(function(t) {
                    e.handleError(t);
                });
            }, t);
        };
    },
    fetch: function(t, e, i) {
        var a = this;
        return app.request().get("https://api.maoyan.com/mmdb/search/integrated/keyword/v1/list.json").config("key", "search").query({
            token: app.$user.token,
            keyword: i,
            offset: e,
            stype: metaMap[t].stypes_v1,
            iscorrected: !0,
            ci: app.$location.city ? app.$location.city.id : 1,
            lng: app.$location.longitude,
            lat: app.$location.latitude,
            channelId: app.channelId
        }).end().then(function(t) {
            return t.body;
        }).then(function(t) {
            return t.data[0] || {};
        }).then(function(t) {
            return t.list || [];
        }).then(function(i) {
            return a.stats("b_lnhc7ty0", {
                keyword: a.inputKeyword,
                correction: a.correctionV2,
                correction_type: -1 === a.correctionType ? 0 : a.correctionType,
                request_stypes: metaMap[a.options.type].stypes,
                return_list: 0 === e ? a.item_list : [ "(" + (t + 1) + ",[" + i.map(function(t) {
                    return t.id;
                }) + "])" ],
                page_no: Math.floor(e / 20),
                search_id: searchId
            }), i;
        });
    },
    onReachBottom: function() {
        var t = this, e = this.data, i = e.keyword, a = e.lastType, o = e.results, s = e.correctionType, r = e.correctionV2;
        if (i && void 0 !== a) {
            for (var n = void 0, c = 0; c < o.length && (n = o[c], n.type !== a); c++) ;
            n.total !== n.list.length && this.fetch(a, n.list.length, 2 === s ? r : i).then(function(e) {
                e = metaMap[a].format(e, i, 6 == a && "wxwallet_search"), n.list = n.list.concat(e), 
                t.setData({
                    results: o
                });
            });
        }
    },
    tapAll: function(t) {
        this.stats("b_18mmt194", {
            keyword: this.data.keyword,
            search_id: searchId,
            stype: t.currentTarget.dataset.stype + 1
        });
    },
    tapItem: function(t) {
        this.stats("b_9rd2o0ep", {
            keyword: this.data.keyword,
            search_id: searchId,
            stype: t.currentTarget.dataset.stype + 1,
            item_id: t.currentTarget.dataset.item.id,
            position: t.currentTarget.dataset.index,
            all_position: t.currentTarget.dataset.stype == this.data.lastType && this.loadTypes.length > 1 ? t.currentTarget.dataset.index + this.data.hasResults : t.currentTarget.dataset.index
        });
    },
    getSearchId: function() {
        return Math.random().toString(32).substr(2, 6) + "_" + new Date().getTime() + "_" + (app.$uuid ? app.$uuid : 0);
    },
    getHotMovie: function() {
        var t = this;
        app.request().get("https://api.maoyan.com/mmdb/search/movie/hotmovie/list.json").end().then(function(t) {
            return t.body.data;
        }).then(function(e) {
            t.setData({
                hotMovies: e
            }), e.length > 0 && (hotmovie_show_id = t.getSearchId(), t.stats("b_no11hglv", {
                return_list: e.map(function(t) {
                    return t.id;
                }),
                hotmovie_show_id: hotmovie_show_id
            }));
        });
    },
    tapHot: function(t) {
        this.stats("b_6hcnkfsm", {
            movie_id: t.currentTarget.dataset.id,
            hotmovie_show_id: hotmovie_show_id,
            position: t.currentTarget.dataset.index
        });
    },
    onInputBlur: function(t) {
        var e = this.data, i = e.keyword, a = e.hasResults;
        i && a && this.setSearchHistory(i);
    },
    searchHistoryKey: "searchHistory",
    setSearchHistory: function(t) {
        var e = app.get(this.searchHistoryKey);
        !e && (e = []);
        var i = e.indexOf(t);
        -1 !== i && e.splice(i, 1), e.unshift(t), 3 === e.length && e.pop(), app.set(this.searchHistoryKey, e);
    },
    getSearchHistory: function() {
        var t = app.get(this.searchHistoryKey);
        t && this.setData({
            history: t
        });
    },
    delSearchHistory: function(t) {
        var e = t.currentTarget.dataset.index;
        this.data.history.splice(e, 1);
        var i = this.data.history;
        this.setData({
            history: i
        }), app.set(this.searchHistoryKey, i);
    },
    tapToSearch: function(t) {
        this.setData({
            focus: !1
        });
        var e = t.currentTarget.dataset, i = e.keyword, a = e.iscorrected;
        "true" === a && this.stats("b_3bnm2cbj", {
            keyword: this.data.keyword,
            correction: this.correctionV2,
            correction_type: -1 === this.correctionType ? 0 : this.correctionType,
            click_keyword: i,
            search_id: searchId
        }), this.setSearchHistory(i), this.integratedSearch(0, "true" === a)(i);
    },
    toggleWishFromComing: function(t) {
        var e = this, i = t.currentTarget.dataset, a = i.wishst, o = i.movieid, s = i.index, r = (i.subindex, 
        this.data.results.filter(function(t) {
            return 0 === t.type;
        })[0].list);
        app.checkLogin({
            warn: "添加想看前请先登录",
            success: function() {
                var t = {
                    userId: app.$user.id,
                    token: app.$user.token,
                    type: 1 ^ a,
                    business: 2,
                    clientType: "touch"
                }, i = t.type ? "post" : "delete", n = t.type ? "已标记想看" : "已取消想看";
                app.request(i, "/hostproxy/mmdb/user/movie/" + o + "/wish.json").send("post" === i ? t : {}).header({
                    token: app.$user.token,
                    "x-host": "http://maoyanapi.vip.sankuai.com"
                }).query({
                    channelId: app.channelId,
                    uuid: app.$uuid,
                    ci: app.$location.city ? app.$location.city.id : 0
                }).end().then(function(t) {
                    return t.body.data.id;
                }).then(function(i) {
                    if (i === o) {
                        var a = r[s];
                        a.wishst = t.type, t.type ? a.wish++ : a.wish--, e.setData({
                            results: e.data.results
                        }), wx.hideToast(), wx.showToast({
                            title: n,
                            icon: "success",
                            duration: 1e3
                        });
                    }
                }).catch(function(t) {
                    e.handleError(t);
                });
            }
        });
    }
});