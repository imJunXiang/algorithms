function e(e, a, i) {
    return a in e ? Object.defineProperty(e, a, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = i, e;
}

var a = require("../../utils/tools.js"), i = getApp();

Page({
    data: {
        pageLoading: !0,
        movieCurrent: 0,
        cinamerPage: 0,
        order: "pos",
        regionname: "0",
        bannerActive: 0,
        regionnameText: "全部区域",
        orderText: "离我最近",
        orderArr: [ {
            text: "离我最近",
            order: "pos"
        }, {
            text: "价格最低",
            order: "price"
        } ]
    },
    onPullDownRefresh: function() {
        i.setPageUid(this), this.setData({
            cinamerPage: 0,
            cinamerHasNo: !1
        }), wx.removeStorageSync("indexCache"), Promise.all([ this.getCinamer(), this.getMovieAndBanner(), this.getMoveAd() ]).then(function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        this.getCinamer();
    },
    openSheet: function(e) {
        var a = this;
        new Promise(function(e) {
            void 0 == a.data.region ? a.getregion().then(function() {
                e();
            }) : e();
        }).then(function() {
            if ("region" === e.currentTarget.dataset.type) {
                var i = a.data.showRegin;
                a.data.showOrder ? a.setData({
                    showOrder: !1
                }, function() {
                    setTimeout(function() {
                        a.setData({
                            showRegin: !i
                        });
                    }, 500);
                }) : a.setData({
                    showRegin: !i
                });
            } else {
                var t = a.data.showOrder;
                a.data.showRegin ? a.setData({
                    showRegin: !1
                }, function() {
                    setTimeout(function() {
                        a.setData({
                            showOrder: !t
                        });
                    }, 500);
                }) : a.setData({
                    showOrder: !t
                });
            }
        });
    },
    checkregion: function(e) {
        var a = e.currentTarget.dataset.etype, i = e.currentTarget.dataset.name;
        if ("region" == a) {
            var t = this.data.regionname;
            if (t == i || "0" === t && "全部区域" == i) return void this.setData({
                showRegin: !1
            });
            this.setData({
                regionname: "全部区域" == i ? "0" : i,
                regionnameText: i,
                showRegin: !1
            });
        } else {
            var n = e.currentTarget.dataset.text;
            if (this.data.order == i) return void this.setData({
                showOrder: !1
            });
            this.setData({
                order: i,
                orderText: n,
                showOrder: !1
            });
        }
        this.setData({
            cinamerPage: 0,
            cinamerHasNo: !1,
            cinemas: []
        }), this.getCinamer();
    },
    onLoad: function(e) {
        var a = this;
        i.setPageColor(this), i.setPageUid(this).then(function() {
            return "1" === e.location || i.getLocation();
        }).then(function() {
            i.setPageCityId(a);
            var t = e.from;
            if (t) {
                var n = null;
                switch (t) {
                  case "moviedetail":
                    n = "/pages/moviedetail/moviedetail?movieid=" + e.movieid;
                    break;

                  case "tail":
                    n = "/pages/orderdetails/orderdetails?orderid=" + e.orderid + "&movieName=" + e.movieName;
                    break;

                  case "sharecoupon":
                    n = "/usercoupon/pages/give/give?actid=" + e.actid;
                    break;

                  case "moviedetail_a":
                    n = "/subpackages/activepage/pages/moviedetail_a/moviedetail_a?movieid=" + e.movieid + "&type=" + e.type;
                }
                wx.navigateTo({
                    url: n
                });
            }
            return a.getMovieAndBanner();
        }).then(function() {
            Promise.all([ a.getCinamer(), a.getMoveAd() ]);
        });
    },
    getMovieAndBanner: function() {
        var e = this;
        return new Promise(function(i) {
            new Promise(function(i) {
                var t = null, n = wx.getStorageSync("indexCache"), o = null;
                "" != n && (n = JSON.parse(n), console.log("有缓存---"), o = Math.round(new Date().getTime() / 1e3) - n.timeTap > 86400), 
                "" == n || o ? (console.log("缓存为空或者缓存已经过期"), (0, a._post)("v3/recommend/recommend", {
                    uid: e.data.uid,
                    cityid: e.data.cityid
                }, "获取首页影片与banner", !1).then(function(e) {
                    var a = JSON.stringify({
                        resData: e,
                        timeTap: Math.round(new Date().getTime() / 1e3)
                    });
                    wx.setStorage({
                        key: "indexCache",
                        data: a
                    }), i(e);
                })) : (console.log("调用缓存", n), t = n.resData, i(t));
            }).then(function(a) {
                try {
                    var t = a.moviess, n = [], o = [];
                    if (t.length > 0) {
                        t.forEach(function(e, a) {
                            n.push({
                                name: e.name,
                                grade: e.grade,
                                type: e.movietype2,
                                starring: e.starring,
                                mtime: e.mtime,
                                like: e.like,
                                id: Number(e.id),
                                pic: e.pic
                            });
                        }), n = JSON.stringify(n), o = JSON.parse(n);
                        var r = e.data.movieCurrent;
                        o.forEach(function(e, a) {
                            0 == r && a > 5 && (e.pic = "/images/zhanwei.png");
                        });
                    }
                    var s = a.activities;
                    e.data.movieSwiper = n, e.setData({
                        activities: s,
                        movieClip: o,
                        movieid: o[e.data.movieCurrent].id,
                        pageLoading: !1
                    }), i();
                } catch (a) {
                    console.log(a, "页面发生错误,数据不符"), e.setData({
                        pageError: !0,
                        pageLoading: !1
                    });
                }
            });
        });
    },
    getCinamer: function() {
        var e = this;
        if (!this.data.cinamerHasNo) {
            var i = this.data.cinamerPage, t = {
                uid: this.data.uid,
                cityid: this.data.cityid,
                movieid: this.data.movieid ? this.data.movieid : 0,
                pos: wx.getStorageSync("location"),
                order: this.data.order,
                regionname: this.data.regionname,
                page: i,
                step: 10
            }, n = JSON.parse(JSON.stringify(t));
            return i += 1, n.page = i, new Promise(function(o) {
                Promise.all([ (0, a._post)("v2/recommend/cinemas", t, "获取影院列表", !1, !0), (0, a._post)("v2/recommend/cinemas", n, "再请求一次-获取影院列表", !1, !0) ]).then(function(a) {
                    var t = a[0], n = a[1];
                    n.cinemas.length > 0 && (t.cinemas = t.cinemas.concat(n.cinemas)), n.collection.length > 0 && (t.collection = t.collection.concat(n.collection)), 
                    n.xiaoma.length > 0 && (t.xiaoma = t.xiaoma.concat(n.xiaoma));
                    var r = [], s = t.cinemas, c = [], d = [];
                    if (1 === i) {
                        var m = t.collection;
                        m && m.forEach(function(a) {
                            c.push({
                                name: a.name,
                                address: a.address,
                                length: a.length,
                                labels: a.labels,
                                group_lable: a.group_lable,
                                price: a.price,
                                channelicon: a.channelicon,
                                cinemaid: a.id,
                                isMyLike: 1,
                                movieid: e.data.movieid ? e.data.movieid : 0
                            });
                        });
                        var l = t.xiaoma;
                        l && l.forEach(function(a) {
                            d.push({
                                name: a.name,
                                address: a.address,
                                length: a.length,
                                labels: a.labels,
                                group_lable: a.group_lable,
                                price: a.price,
                                channelicon: a.channelicon,
                                cinemaid: a.id,
                                isThird: 1,
                                movieid: e.data.movieid ? e.data.movieid : 0
                            });
                        });
                    }
                    s.forEach(function(a) {
                        r.push({
                            name: a.name,
                            address: a.address,
                            length: a.length,
                            labels: a.labels,
                            group_lable: a.group_lable,
                            price: a.price,
                            channelicon: a.channelicon,
                            cinemaid: a.id,
                            movieid: e.data.movieid ? e.data.movieid : 0
                        });
                    });
                    var g = 1 == i ? d.concat(c.concat(r)) : e.data.cinemas.concat(r);
                    e.setData({
                        cinemas: g,
                        cinamerPage: i + 1
                    }), 0 == n.cinemas.length && 0 == n.collection.length && 0 == n.xiaoma.length && e.setData({
                        cinamerHasNo: !0
                    }), o();
                }).catch(function(a) {
                    wx.showModal({
                        content: a.errMsg ? a.errMsg + "~" : a,
                        cancelText: "知道了",
                        confirmText: "立即重试",
                        success: function(a) {
                            a.confirm ? e.getCinamer() : e.setData({
                                cinamerHasNo: !0
                            });
                        }
                    });
                });
            });
        }
    },
    getMoveAd: function() {
        var e = this;
        return new Promise(function(i) {
            (0, a._post)("v1/AdminAdvertPlace/suspendAdvert", {}, "获取悬浮广告", !1).then(function(a) {
                if (1 == a.ishow) {
                    var t = a.data;
                    e.setData({
                        moveAdIcon: t.icon,
                        moveAdText: t.text,
                        moveAdType: t.type,
                        moveAdUrl: t.url,
                        moveAdAppid: t.appid || ""
                    });
                }
                i();
            });
        });
    },
    getregion: function() {
        var e = this;
        return new Promise(function(i) {
            (0, a._post)("v1/movie/cityregions", {
                uid: e.data.uid,
                cityid: e.data.cityid
            }, "获取区域信息", !1).then(function(a) {
                var t = a.result;
                t.unshift({
                    cityid: "0",
                    regionname: "全部区域"
                }), e.setData({
                    region: t
                }), i();
            });
        });
    },
    tapSwiper: function(e) {
        var a = e.currentTarget.dataset.index;
        a != this.data.movieCurrent ? this.setData({
            movieCurrent: a
        }) : this.goMovieDetail();
    },
    goMovieDetail: function() {
        this.data.changing || wx.navigateTo({
            url: "/pages/moviedetail/moviedetail?movieid=" + this.data.movieid
        });
    },
    swiperchange: function(e, a) {
        var i, t = 0;
        return function() {
            var n = this, o = arguments;
            i && (this.data.cinemas.length > 0 ? this.setData({
                cinemas: [],
                changing: !0
            }) : this.setData({
                changing: !0
            }), t++, clearTimeout(i));
            var r = !i;
            i = setTimeout(function() {
                t > 0 && (e.apply(n, o), t = null), i = null;
            }, a), r && e.apply(n, o);
        };
    }(function(a) {
        var i = this, t = "touch" == a.detail.source ? a.detail.current : this.data.movieCurrent, n = this.data.movieClip, o = n[t].id;
        "touch" == a.detail.source && this.setData({
            movieCurrent: t
        });
        var r = !1;
        if (t >= 3) for (var s = JSON.parse(this.data.movieSwiper), c = t - 2, d = t + 2 >= n.length ? n.length : t + 2, m = c; m < d; m++) {
            var l = n[m];
            "/images/zhanwei.png" == l.pic && (r = !0, l.pic = s[m].pic);
        }
        var g = wx.createSelectorQuery();
        new Promise(function(e, a) {
            g.select(".movieCommend").fields({
                scrollOffset: !0
            }, function(a) {
                wx.pageScrollTo({
                    scrollTop: a.scrollTop
                }), setTimeout(function() {
                    e();
                }, 300);
            }).exec();
        }).then(function() {
            var a;
            i.setData((a = {
                cinamerPage: 0,
                cinemas: [],
                cinamerHasNo: !1
            }, e(a, r ? "movieClip" : "s", r ? n : ""), e(a, "movieid", o), e(a, "changing", !1), 
            a)), i.getCinamer();
        });
    }, 1e3),
    bannerChange: function(e) {
        this.setData({
            bannerActive: e.detail.current
        });
    },
    onShareAppMessage: function() {
        return {
            title: "一键比价，优惠多多，省时省钱",
            imageUrl: "https://manfile1.oss-cn-beijing.aliyuncs.com/image/xiaochengxu/zhuyefenxiangtu.png"
        };
    },
    touchmove: function(e) {
        var a = e.touches[0];
        this.setData({
            top: a.clientY - 35 + "px",
            left: a.clientX - 35 + "px"
        });
    },
    imgerror: function(e) {
        var a = e.currentTarget.dataset.index, i = this.data.movieClip;
        i[a].pic = "/images/zhanwei_err.png", this.setData({
            movieClip: i
        }), console.log(e, "==error");
    }
});