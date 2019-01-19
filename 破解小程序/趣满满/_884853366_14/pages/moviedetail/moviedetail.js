var t = require("../../utils/tools.js"), a = getApp();

Page({
    data: {
        movieId: "",
        movieDetails: {},
        img: [],
        video: [],
        maxHeight: 200,
        height: 132,
        gradient: !1,
        position: "absolute",
        top: 0,
        mask: !0,
        commentList: [],
        hidden: !0,
        nocancel: !1,
        stars: [ 2, 4, 6, 8, 10 ],
        normalSrc: "../../images/moviedetails/dark-star.png",
        selectedSrc: "../../images/moviedetails/all-star.png",
        halfSrc: "../../images/moviedetails/half-star.png",
        key: 0,
        switchType: 1,
        btoType: "2",
        page: 0,
        cinemas: null,
        movie: {
            grade: ""
        },
        order: "pos",
        actionStatus: !0,
        areaNumber: null,
        areaInfo: [],
        regionname: "",
        comment: "",
        movieStatus: !0
    },
    goToShowList: function(t) {
        var a = t.currentTarget.dataset.cinemarid, e = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "/pages/cinamermoviedetails/cinamermoviedetails?cinanmerId=" + a + "&movieid=" + this.data.movieId + "&ciName=" + e
        });
    },
    handleToMovieList: function() {
        this.setData({
            switchType: 1
        });
    },
    handleToMovieDetail: function() {
        this.setData({
            switchType: 2
        }), this.loadData(this.data.movieId), this.getComments();
    },
    writeComment: function() {
        "temp" != this.data.uidType ? this.setData({
            hidden: !1
        }) : this.setData({
            showlogin: !0
        });
    },
    likeMovie: function(a) {
        if ("temp" != this.data.uidType) {
            var e = this.data.movielike, i = a.currentTarget.dataset.like, o = this.data.movieDetails;
            0 == i ? (o.ismylike = 1, e += 1, this.setData({
                movieDetails: o,
                movielike: e
            })) : 1 == i && (o.ismylike = 0, e -= 1, this.setData({
                movieDetails: o,
                movielike: e
            })), (0, t._post)("v2/movies/like", {
                movieid: this.data.movieDetails.movieid,
                uid: this.data.uid
            }, "").then(function(t) {
                1 == t.type ? wx.showToast({
                    title: "已取消想看",
                    duration: 1500
                }) : wx.showToast({
                    title: "已想看",
                    duration: 1500
                });
            });
        } else this.setData({
            showlogin: !0
        });
    },
    cancel: function() {
        this.setData({
            hidden: !0
        });
    },
    confirm: function() {
        this.setData({
            hidden: !0
        }), (0, t._post)("v1/movie/add_comment", {
            movieid: this.data.movieId,
            uid: this.data.uid,
            nickname: wx.getStorageSync("nickName"),
            context: this.data.comment,
            grade: this.data.key,
            headmsg: wx.getStorageSync("avatarUrl"),
            moviename: this.data.movie.moviename,
            effect: "insert"
        }, "").then(function(t) {
            0 == t.error && wx.showToast({
                title: "评论成功"
            });
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            page: 0
        }), this.getCinemars().then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        var a = this;
        if (2 != this.data.switchType) {
            var e = this.data.page;
            e += 1, this.setData({
                page: e
            }), (0, t._post)("v2/recommend/cinemas", {
                uid: this.data.uid,
                cityid: this.data.cityid,
                page: e,
                movieid: this.data.movieId,
                pos: wx.getStorageSync("location"),
                order: this.data.order,
                regionname: this.data.regionname,
                step: 10
            }, "", !1).then(function(t) {
                var e = t.cinemas, i = a.data.cinemas.concat(e);
                i.forEach(function(t) {
                    t.movieid = a.data.movieId;
                }), a.setData({
                    cinemas: i,
                    movie: t.movie,
                    pingLunNum: t.movie.commentcount
                });
            });
        }
    },
    selectLeft: function(t) {
        var a = t.currentTarget.dataset.key;
        1 == this.data.key && 1 == t.currentTarget.dataset.key && (a = 0), console.log("得" + a + "分"), 
        this.setData({
            key: a
        });
    },
    selectRight: function(t) {
        var a = t.currentTarget.dataset.key;
        console.log("得" + a + "分"), this.setData({
            key: a
        });
    },
    getComment: function(t) {
        this.setData({
            comment: t.detail.value
        });
    },
    getComments: function() {
        var a = this;
        (0, t._post)("v1/movie/movie_comments_upgrade", {
            movieid: this.data.movieId,
            uid: this.data.uid
        }, "", !1).then(function(t) {
            a.setData({
                commentList: t.data.short.data,
                pingLunNum: t.data.short.number
            });
        });
    },
    handleSwitchType: function(t) {
        var a = this;
        console.log(this.data.switchType), this.setData({
            page: 0,
            bottomTagLoad: !0
        }), 1 == t.currentTarget.dataset.btotype ? (this.setData({
            btoType: t.currentTarget.dataset.btotype,
            order: "price",
            cinemas: null
        }), this.getCinemars()) : 2 == t.currentTarget.dataset.btotype ? (this.setData({
            btoType: t.currentTarget.dataset.btotype,
            order: "pos",
            cinemas: null
        }), this.getCinemars()) : this.setData({
            btoType: t.currentTarget.dataset.btotype
        }, function() {
            a.getAreaInfo(), a.actionSheetbindchange();
        });
    },
    getAreaInfo: function() {
        var a = this;
        (0, t._post)("v1/movie/cityregions", {
            cityid: this.data.cityid
        }, "").then(function(t) {
            a.setData({
                areaNumber: t.number,
                areaInfo: t.result
            });
        });
    },
    getRegionName: function(t) {
        var a = this;
        t.currentTarget.dataset.areaname != this.data.regionname && this.setData({
            regionname: t.currentTarget.dataset.areaname,
            cinemas: null
        }, function() {
            a.getCinemars(), a.actionSheetbindchange();
        });
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            movieId: t.movieid
        }), a.setPageColor(this), a.setPageUid(this).then(function() {
            a.setPageCityId(e), e.getCinemars();
        });
    },
    getCinemars: function() {
        var a = this;
        return new Promise(function(e, i) {
            var o = a.data.page;
            (0, t._post)("v2/recommend/cinemas", {
                uid: a.data.uid,
                cityid: a.data.cityid,
                page: o,
                movieid: a.data.movieId,
                pos: wx.getStorageSync("location"),
                order: a.data.order,
                regionname: a.data.regionname || "0",
                step: 10
            }, "", !1, !0).then(function(t) {
                var i = [];
                t.xiaoma.length > 0 && t.xiaoma.forEach(function(t) {
                    t.isThird = 1;
                }), t.collection.length > 0 && t.collection.forEach(function(t) {
                    t.isMyLike = 1;
                }), (i = 0 == o ? t.xiaoma.concat(t.collection.concat(t.cinemas)) : a.data.cinemas.concat(t.cinemas)).forEach(function(t) {
                    t.movieid = a.data.movieId;
                }), a.setData({
                    cinemas: i,
                    movie: t.movie,
                    movieStatus: !1,
                    pingLunNum: t.movie.commentcount,
                    movielike: t.movie.like
                }), 0 == t.cinemas.length && 0 == t.collection.length && 0 == t.xiaoma.length && a.handleToMovieDetail(), 
                e();
            }).catch(function(t) {
                wx.showModal({
                    content: t.errMsg ? t.errMsg + "~" : t,
                    cancelText: "知道了",
                    confirmText: "立即重试",
                    success: function(t) {
                        t.confirm ? a.getCinemars() : a.setData({
                            cinemas: []
                        });
                    }
                });
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    loadData: function(a) {
        var e = this, i = {
            movieid: a,
            uid: this.data.uid,
            cityid: this.data.cityid
        };
        (0, t._post)("v1/movie/movie_info", i, "", !1).then(function(t) {
            var a = [], i = t.actors;
            i && i.director && (i.director.forEach(function(t) {
                a.push({
                    img: t.avatar,
                    sc_name: t.sc_name
                });
            }), i.actors.forEach(function(t) {
                a.push({
                    img: t.avatar,
                    sc_name: t.sc_name
                });
            })), e.setData({
                movieDetails: t,
                img: t.imgs.split(","),
                video: t.taobaovideo,
                actors: a
            });
        });
    },
    handleToVideo: function() {
        wx.navigateTo({
            url: "/pages/performerOrDrama/performerOrDrama?img=" + JSON.stringify(this.data.img) + "&title=视频与剧照&video=" + JSON.stringify(this.data.video) + "&pic=" + this.data.movieDetails.bigpic
        });
    },
    handleToActors: function() {
        wx.navigateTo({
            url: "/pages/actors/actors?actors=" + JSON.stringify(this.data.actors) + "&title=演职人员"
        });
    },
    previewImage: function(t) {
        var a = t.currentTarget.dataset.url, e = [];
        "yanyuan" == t.currentTarget.dataset.flag ? this.data.actors.forEach(function(t) {
            e.push(t.img);
        }) : e = this.data.img, console.log(t), wx.previewImage({
            current: a,
            urls: e
        });
    },
    open: function() {
        this.data.gradient ? this.setData({
            maxHeight: 200,
            height: 132,
            gradient: !1,
            position: "absolute",
            top: 0
        }) : this.setData({
            maxHeight: "auto",
            height: "auto",
            gradient: !0,
            position: "static",
            top: 20
        });
    },
    maskHidden: function(t) {
        var a = this, e = "";
        e = 2 == t.target.id, a.setData({
            mask: e
        });
    },
    actionSheetbindchange: function() {
        this.setData({
            actionStatus: !this.data.actionStatus
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "《" + this.data.movie.moviename + "》上映啦，赶快来比价抢票吧!",
            path: "/pages/index/index?from=moviedetail&movieid=" + this.data.movieId
        };
    },
    myCatchTouch: function() {},
    hideSheet: function() {
        this.setData({
            showlogin: !1
        });
    },
    loginend: function() {
        a.setPageUid(this), this.setData({
            showlogin: !1
        });
    },
    handleErrImg: function(t) {
        console.log(t);
        var a = this.data.movie;
        a.pic = "/images/zhanwei.png", this.setData({
            movie: a
        });
    },
    handErrActorImg: function(t) {
        console.log("actors", t);
        var a = this.data.actors;
        a[t.currentTarget.dataset.index].img = "/images/actorsDefault.png", this.setData({
            actors: a
        });
    },
    handlePlaysErrImg: function(t) {
        console.log("plays", t);
        var a = this.data.img;
        a[t.currentTarget.dataset.index].img = "/images/playsDefault.png", this.setData({
            img: a
        });
    }
});