var e = require("../../utils/tools.js"), a = getApp();

Page({
    data: {
        cinanmerId: "",
        cinanmerName: "",
        cinemaAddress: "",
        movieid: "",
        movieName: "",
        moviegrade: "",
        movieList: [],
        cinemaPos: "",
        index: "",
        palyIndex: 0,
        imgUrls: [ "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg" ],
        width: "",
        imgUrl: "",
        theday: 0,
        days: [],
        plays: null,
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        ciName: "",
        swiperCurrent: 0,
        iscollect: null,
        url: "",
        flag: ""
    },
    handleBuy: function(e) {
        var a = e.currentTarget.dataset.index.split(","), t = this.data.plays[a[0]], i = t.diffchannels[a[1]], n = "", o = "cityid=" + t.cityid + "&playid=" + i.playid + "&price=" + i.price + "&maxPrice=" + i.maxprice + "&type=" + i.type + "&typeid=" + i.typeid + "&typeseat=" + i.typeseat + "&cinanmerid=" + this.data.cinanmerId + "&movieid=" + this.data.movieid + "&cinanmerName=" + this.data.cinanmerName + "&moviename=" + this.data.movieName + "&hallname=" + t.hallname + "&halltype=" + t.halltype + "&playtime=" + t.playtime + "&show_playtime=" + t.weekindex + " " + t.hourindex;
        n = 0 == i.group_actid || void 0 == i.group_actid ? "/pages/seat/seat?" + o : "../../group/pages/groupinfo/groupinfo?transData=" + JSON.stringify({
            play_time: t.datetime + " " + t.playtime + ":00",
            movie_id: Number(t.movieid),
            group_id: Number(i.group_actid),
            cinema_id: Number(t.cinemanid),
            channel_id: Number(i.channelid)
        }) + "&from=cinamer", this.setData({
            url: n,
            flag: "buy"
        }), "temp" != this.data.uidType ? wx.navigateTo({
            url: n
        }) : this.setData({
            showlogin: !0
        });
    },
    hideSheet: function() {
        this.setData({
            showlogin: !1
        });
    },
    loginend: function() {
        var t = this;
        a.setPageUid(this).then(function() {
            t.setData({
                showlogin: !1
            }), "buy" == t.data.flag && wx.navigateTo({
                url: t.data.url
            }), "collect" == t.data.flag && (0, e._post)("v2/collect/add", {
                uid: t.data.uid,
                cinemaid: t.data.cinanmerId
            }, "", !1).then(function(e) {
                t.setData({
                    iscollect: 1
                }), wx.showToast({
                    title: "已收藏"
                });
            });
        });
    },
    handleCollect: function(a) {
        var t = this;
        if (this.setData({
            flag: "collect"
        }), "temp" != this.data.uidType) {
            var i = a.currentTarget.dataset.is, n = "";
            n = 1 == i ? "v2/collect/del" : "v2/collect/add", (0, e._post)(n, {
                uid: this.data.uid,
                cinemaid: this.data.cinanmerId
            }, "", !1).then(function(e) {
                1 == i ? (t.setData({
                    iscollect: 0
                }), wx.showToast({
                    title: "已取消收藏"
                })) : 0 == i ? (t.setData({
                    iscollect: 1
                }), wx.showToast({
                    title: "已收藏"
                })) : e.msg && wx.showToast({
                    title: e.msg
                });
            });
        } else this.setData({
            showlogin: !0
        });
    },
    onLoad: function(e) {
        a.setPageColor(this), a.setPageUid(this);
        var t = e.ciName, i = e.cinanmerId, n = void 0 == e.movieid ? 0 : e.movieid;
        this.setData({
            ciName: t,
            cinanmerId: i,
            movieid: n,
            cinemaAddress: e.ciAdd
        });
    },
    openRoad: function(e) {
        wx.openLocation({
            latitude: Number(e.currentTarget.dataset.latitude),
            longitude: Number(e.currentTarget.dataset.longitude),
            scale: 28,
            name: e.currentTarget.dataset.name,
            success: function(e) {
                console.log(e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.loadCinemaInfo("v1/movie/cineman_movies", this.data.cinanmerId, this.data.movieid);
    },
    onHide: function() {},
    onUnload: function() {},
    loadCinemaInfo: function(a, t, i) {
        var n = 0, o = this;
        (0, e._post)(a, {
            cinemanid: t,
            uid: this.data.uid
        }, "获取场次信息", !1).then(function(e) {
            if (wx.stopPullDownRefresh(), 1 == e.error) return o.setData({
                plays: [],
                pageLoaded: !0
            }), void wx.showModal({
                title: "提示",
                content: e.errorMsg,
                showCancel: !1
            });
            var a = e.movies;
            if (0 != a.length) {
                a.forEach(function(e, a) {
                    0 != i ? e.movieid == i && (n = a) : n = 0;
                });
                Number(n);
                var t = e.movies[n], s = e.pos.split(",");
                o.setData({
                    iscollect: e.iscollect,
                    cinemaTag: e.cinematrait,
                    cinemaAddress: e.cinemanaddress,
                    cinanmerName: e.cinemanname,
                    movieList: e.movies,
                    cinemaPos: e.pos,
                    index: n,
                    imgUrl: t.pic,
                    movieName: t.moviename,
                    moviegrade: o.grade(t),
                    movieid: t.movieid,
                    swiperCurrent: n,
                    movieInfo: t.mtime + "分钟 | " + t.movietype + " | " + t.starring,
                    cinemaPosLatitude: s[1],
                    cinemaPosLongitude: s[0]
                }), o.getcinanmerdate();
            } else o.setData({
                plays: [],
                pageLoaded: !0
            });
        });
    },
    tapselect: function(e) {
        var a = e.touches[0].clientX, t = this.data.centerX, i = e.target.id, n = this.data.movieList[i], o = 0;
        console.log(this.data.moveX), o = this.data.moveX + t - a;
        var s = this.grade(n);
        this.setData({
            imgUrl: e.target.dataset.url,
            index: i,
            moveX: o,
            movieid: n.movieid,
            movieName: n.moviename,
            moviegrade: s,
            palyIndex: 0
        }), this.getcinanmerdate();
    },
    selectDate: function(e) {
        var a = e.currentTarget.dataset.index, t = null;
        t = a >= 0 && a <= 2 ? 0 : 3 == a ? 70 : 100 * (a - 3) + 70;
        var i = e.currentTarget.id;
        this.setData({
            theday: i,
            plays: null,
            selectScroll: t
        }), this.getcinanmerdate(i);
    },
    getcinanmerdate: function(a) {
        var t = this, i = {
            cinemanid: t.data.cinanmerId,
            movieid: t.data.movieid
        };
        void 0 != a ? (i.day = a, wx.setStorage({
            key: "selectDate",
            data: a
        })) : i.hasday = 1, (0, e._post)("v2/movies/plays", i, "", !1).then(function(e) {
            null != e ? (e.cinemanid = t.data.cinanmerId, e.movieid = t.data.movieid, t.setData({
                resData: e
            }), e.plays.forEach(function(e) {
                e.diffchannels.length > 0 && e.diffchannels.forEach(function(a, t) {
                    e.showCinamer = !0;
                });
            }), void 0 == a ? (t.setData({
                days: e.days,
                plays: e.plays,
                theday: e.days[0][0],
                pageLoaded: !0
            }), wx.setStorage({
                key: "selectDate",
                data: e.days[0][0]
            })) : t.setData({
                plays: e.plays
            })) : t.setData({
                plays: [],
                pageLoaded: !0
            });
        });
    },
    grade: function(e) {
        var a = e.grade;
        return "0.0" != a ? a : 0 != e.like ? e.like + " 想看" : "暂无评分";
    },
    palyOpen: function(e) {
        var a = e.currentTarget.id;
        a == this.data.palyIndex && (a = -1), console.log(e), this.setData({
            palyIndex: a
        });
    },
    a: function(e) {
        console.log("禁止跳转");
    },
    swiperChange: function(e) {
        var a = e.detail.current;
        this.setData({
            swiperCurrent: a,
            plays: null
        });
        var t = this.data.movieList[a], i = this.grade(t);
        this.setData({
            imgUrl: t.pic,
            movieid: t.movieid,
            movieName: t.moviename,
            moviegrade: i,
            palyIndex: 0,
            movieInfo: t.mtime + "分钟 | " + t.movietype + " | " + t.starring
        }), this.getcinanmerdate();
    },
    tapSwiper: function(e) {
        var a = e.currentTarget.dataset.index;
        a != this.data.swiperCurrent ? this.setData({
            swiperCurrent: a
        }) : wx.navigateTo({
            url: "/pages/moviedetail/moviedetail?movieid=" + this.data.movieid
        });
    },
    onPullDownRefresh: function() {
        this.loadCinemaInfo("v1/movie/cineman_movies", this.data.cinanmerId, this.data.movieid);
    },
    handleErrImg: function(e) {
        var a = this.data.movieList;
        a[e.currentTarget.dataset.index].pic = "/images/zhanwei.png", this.setData({
            movieList: a
        });
    }
});