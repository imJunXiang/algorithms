var apiConfig = require("../../scripts/api-config"), app = getApp(), api = apiConfig.getApiUrl(), PREVIEW_TYPE_MAP = {
    1: "预告片",
    2: "制作特辑",
    3: "MV",
    4: "片段/彩蛋"
}, BUTTON_TYPE_MAP = {
    3: {
        type: "sell",
        text: "特惠购票"
    },
    4: {
        type: "presell",
        text: "预售"
    }
};

app.MoviePage({
    data: {
        hadAlertNetworkType: void 0
    },
    onLoad: function(e) {
        var t = this;
        this.options = e, e.utm_source && (app._forceMovieCinemaLocate = !0), this.setData(e), 
        app.request().get(api + "/mmdb/movie/" + this.data.movieId + "/videos.json").query({
            videoId: this.data.videoId,
            token: app.$user.token
        }).end().then(function(e) {
            var i = e.body, o = 0;
            i.vlist = i.vlist.map(function(e, i) {
                return e.img = app.img(e.img, {
                    w: 150,
                    h: 100
                }), e.tm = t.secondsToTime(e.tm), e.count = t.numberToHumanReadable(e.count), e.type = PREVIEW_TYPE_MAP[e.type], 
                t.data.videoId && e.id == t.data.videoId && (o = i), e;
            });
            var n = i.movieVO.showSt, a = i.movieVO.ver;
            i.movieVO.version = t.version(a), BUTTON_TYPE_MAP[n] ? (i.movieVO.buttonText = BUTTON_TYPE_MAP[n].text, 
            i.movieVO.buttonType = BUTTON_TYPE_MAP[n].type) : i.movieVO.buttonType = "wish", 
            t.data.videoId || (o = 0), t.setData({
                movieVO: i.movieVO,
                previews: i.vlist,
                current: o,
                videoId: i.vlist[o].id
            }), t.setTitle();
        }).catch(this.handleError.bind(this, "page")), app.systemInfo().then(function(e) {
            t.setData({
                height: e.windowHeight - 225
            });
        });
    },
    version: function(e) {
        var t = [ "3D", "IMAX 2D", "IMAX 3D" ];
        return (e || "").split("/").filter(function(e) {
            return !!~t.indexOf(e);
        }).sort(function(e, i) {
            return t.indexOf(i) - t.indexOf(e);
        }).map(function(e) {
            return e.replace(/IMAX (\d)D/, function(e, t) {
                return t + "D IMAX";
            }).replace(/(\d)D/, function(e, t) {
                return "v" + t + "d";
            }).toLowerCase();
        })[0] || "";
    },
    onHide: function() {
        this.pauseVideo(), this.noListenNetwork();
    },
    numberToHumanReadable: function(e) {
        return e > 1e4 ? (e / 1e4).toFixed(1) + "万" : e;
    },
    secondsToTime: function(e) {
        var t = function(e) {
            return e < 10 ? "0" + e : e.toString();
        };
        return t(parseInt(e / 60)) + ":" + t(parseInt(e % 60));
    },
    buyOrWish: function() {
        var e = this, t = this.data, i = t.movieVO, o = t.movieId;
        "wish" == i.buttonType ? app.checkLogin(function() {
            app.request()[i.wishst ? "delete" : "post"]("/hostproxy/mmdb/user/movie/" + e.data.movieId + "/wish.json").header({
                token: app.$user.token,
                "x-host": "http://maoyanapi.vip.sankuai.com"
            }).query({
                channelId: app.channelId,
                uuid: app.$uuid,
                ci: app.$location.city ? app.$location.city.id : 0
            }).end().then(function(t) {
                if (t.body.data && t.body.data.id && t.body.data.id == e.data.movieId) i.wishst = (i.wishst + 1) % 2, 
                e.setData({
                    movieVO: i
                }); else if (t.body.error) throw e.toastError(t.body.error.message);
            }).catch(e.handleError.bind(e));
        }) : (this.options.share ? wx.navigateTo : wx.redirectTo)({
            url: "/pages/cinema/movie?movieId=" + o
        });
    },
    changeVideo: function(e) {
        this.changeCurrent(e.currentTarget.dataset.index);
    },
    changeCurrent: function(e) {
        this.setData({
            current: e,
            videoId: this.data.previews[e].id
        }), this.setTitle();
    },
    setTitle: function() {
        wx.setNavigationBarTitle({
            title: this.data.movieVO.name + " " + this.data.previews[this.data.current].tl
        });
    },
    playEvent: function() {
        console.log("playevent"), this.listenNetwork();
    },
    endedEvent: function() {
        console.log("endedEvent");
        var e = 1 + parseInt(this.data.current);
        e < this.data.previews.length && this.changeCurrent(e);
    },
    pauseEvent: function() {
        console.log("pauseEvent");
    },
    errorEvent: function() {
        console.log("errorEvent");
    },
    playVideo: function() {
        wx.createVideoContext("previewVideo").play();
    },
    pauseVideo: function() {
        wx.createVideoContext("previewVideo").pause();
    },
    listenNetwork: function() {
        var e = this;
        this.data.hadAlertNetworkType || this.getNetworkType(), this.data.interval || (this.data.interval = setInterval(function() {
            e.data.hadAlertNetworkType ? e.noListenNetwork() : e.getNetworkType();
        }, 3e3));
    },
    noListenNetwork: function() {
        clearInterval(this.data.interval);
    },
    getNetworkType: function() {
        var e = this;
        wx.getNetworkType({
            success: function(t) {
                var i = t.networkType;
                e.data && e.data.networkType && "wifi" != e.data.networkType.toLowerCase() || "wifi" == i.toLowerCase() || (e.pauseVideo(), 
                e.noListenNetwork(), wx.showModal({
                    title: "网络提示",
                    content: "当前正在使用移动网络，继续播放将消耗流量。",
                    confirmText: "继续播放",
                    cancelText: "取消播放",
                    confirmColor: "my" == app.$theme ? "#333" : "#02BB00",
                    success: function(t) {
                        t.confirm && e.playVideo();
                    },
                    complete: function() {
                        e.setData({
                            hadAlertNetworkType: !0
                        });
                    }
                })), e.setData({
                    networkType: i
                });
            }
        });
    },
    onShareAppMessage: function() {
        var e = this.data, t = e.movieId, i = e.videoId, o = this.data.movieVO, n = o.name, a = o.wish, r = o.pubdesc, s = this.data.previews[this.data.current], d = a ? a + "人想看" : "", p = (s.tl, 
        s.img), u = "/pages/movie/preview?movieId=" + t + "&videoId=" + i + "&share=1&" + app.shareParams();
        return {
            title: [ "《" + n + "》预告片", d, r ].filter(function(e) {
                return !!e;
            }).join("，"),
            path: u,
            imageUrl: app.img(p, {
                w: 430,
                h: 336,
                l: void 0
            })
        };
    }
});