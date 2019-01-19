function t(t, e) {
    var a = void 0;
    return function() {
        var o = this, i = arguments;
        a && clearTimeout(a), a = setTimeout(function() {
            t.apply(o, i), a = null;
        }, e);
    };
}

var e = require("../../utils/tools.js"), a = getApp(), o = null;

Page({
    data: {
        autoInput: !1,
        cinanmerName: "",
        cinamerid: "",
        moviename: "",
        movieid: "",
        type: "",
        playid: "",
        palytime: "",
        hallname: "",
        halltype: "",
        price: "",
        seatdata: [],
        seatmaptype: "",
        rowArr: [],
        colArr: [],
        scale: 1,
        seatid: [],
        userPhone: "",
        userid: "",
        mask: !0,
        uid: "",
        cityid: "",
        confirmFlag: 0,
        scaleValue: .7,
        colWidth: 36,
        colHeight: 60,
        seatArr: {
            isloveSeat: 1,
            chooseSeat: []
        }
    },
    onShow: function() {
        var t = this;
        if (this.data.navBack) wx.navigateBack({
            delta: 1
        }); else {
            this.data.group_id && this.getGroupTime();
            var a = (0, e.formatTime)(new Date(1e3 * Number(this.data.opt.playid)));
            Promise.all([ (0, e._post)("v1/groupActivity/getUnPayOrder", {
                uid: this.data.uid
            }, "是否有未支付尾款订单"), (0, e._post)("v2/userticket/ifuserticket", {
                uid: this.data.uid,
                buydatatype: "9",
                type: this.data.type,
                movieid: this.data.movieid,
                cinemaid: this.data.cinamerid,
                playtime: a
            }, "是否有未支付订单") ]).then(function(e) {
                var a = e[0].result, o = e[1];
                1 != a.status ? 0 == o.status && t.order_pay(o) : t.group_tail(a);
            });
        }
    },
    group_tail: function(t) {
        wx.showModal({
            title: "温馨提示",
            content: "您有一笔拼团尾款未支付，需支付后才可购买其他电影票",
            showCancel: !1,
            confirmText: "去支付",
            success: function(e) {
                wx.navigateTo({
                    url: "/pages/orderdetails/orderdetails?orderid=" + t.orderid + "&movieName=" + t.moviename
                });
            }
        });
    },
    order_pay: function(t) {
        var a = this;
        wx.showModal({
            title: "温馨提示",
            content: "您有未支付订单，是否去支付？",
            cancelText: "取消订单",
            confirmText: "去支付",
            success: function(o) {
                o.confirm ? wx.navigateTo({
                    url: "/pages/pay/pay?orderid=" + t.data.orderid + "&movieName=" + t.data.moviename + "&flag=1"
                }) : (0, e._post)("v1/movieticket/user_ticket_del", {
                    uid: a.data.uid,
                    orderid: t.data.orderid
                }).then(function(t) {
                    wx.hideLoading(), 1 == t.delete ? wx.showToast({
                        title: "取消订单成功"
                    }) : wx.showToast({
                        title: "取消订单失败"
                    }), a.setData({
                        seatArr: {
                            isloveSeat: 1,
                            chooseSeat: []
                        }
                    }), a.onLoad(a.data.opt);
                });
            }
        });
    },
    handleAutoInput: function() {
        this.setData({
            autoInput: !0
        });
    },
    onLoad: function(t) {
        a.setPageColor(this), a.setPageUid(this), console.log(t, "-=-=opt"), wx.showLoading({
            title: "正在加载"
        }), wx.setNavigationBarTitle({
            title: t.cinanmerName,
            hallName: t.hallname
        });
        var e = new Date(1e3 * wx.getStorageSync("selectDate")), o = e.getMonth() + 1 + "月" + e.getDate() + "日  " + t.playtime, i = t.typeseat, n = t.cinanmerid, s = t.movieid, l = t.playid, r = t.type, d = t.cityid, c = "daigou/index/9/" + i + "/" + n + "/" + s + "/" + l + "/" + r + "/" + d + "/?falg=1";
        this.setData({
            opt: t,
            group_id: !!t.group_id && t.group_id,
            group_playtime: t.playtime,
            SeatplayTime: t.playtime,
            movieid: s,
            cinamerid: n,
            type: r,
            playid: l,
            moviename: t.moviename,
            cinanmerName: t.cinanmerName,
            palytime: o,
            hallname: t.hallname,
            halltype: t.halltype,
            price: t.price,
            userPhone: wx.getStorageSync("userpjone"),
            cityid: d
        }), this.loadData(c, "");
    },
    getPhone: function(t) {
        this.setData({
            userPhone: t.detail.value
        });
    },
    cheackPhone: function(t) {
        var e = /^((1[3-9]{1})+\d{9})$/;
        return !(11 != (t = t.replace(/\s+/g, "")).length || !e.test(t));
    },
    getGroupTime: function() {
        var t = this;
        (0, e._post)("v1/groupActivity/getGroupFinishInfo", {
            play_time: this.data.group_playtime,
            group_id: Number(this.data.group_id)
        }, "获取团购结束时间").then(function(a) {
            var i = a.result.finish_time;
            o = setInterval(function() {
                0 == --i && (clearInterval(o), wx.showToast({
                    title: "拼团结束",
                    icon: "none"
                }), wx.navigateBack({
                    delta: 1
                })), t.setData({
                    timeStr: (0, e.cleantime)(i)
                });
            }, 1e3);
        });
    },
    loadData: function(t, a) {
        var o = this, i = {
            typeid: this.data.opt.typeid,
            typeseat: this.data.opt.typeseat,
            cinemaid: this.data.cinamerid,
            movieid: this.data.movieid,
            playid: this.data.playid,
            type: this.data.type,
            cityid: this.data.cityid,
            uid: this.data.uid
        };
        (0, e._post)("v2/seat/map", i).then(function(t) {
            1 === t.error ? (wx.showToast({
                title: "该场次已取消",
                mask: !0,
                icon: "none"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1500)) : (o.seatTransformation(t), wx.hideLoading());
        });
    },
    seatTransformation: function(t) {
        function e(t, a) {
            if (4 != a[t].status || 1 == a[t].status || 0 == a[t].status) {
                var o = a[t].name;
                p.push(o.slice(0, o.indexOf("排")));
            } else e(t + 1, a);
        }
        console.log(t, "---data座位图");
        var a = t.result.data, o = [], i = 0, n = 0, s = [];
        a.forEach(function(t, e) {
            t.nameArr = t.name.split("排"), t.rowIndex = Number(t.rowIndex), t.columnIndex = Number(t.columnIndex), 
            t.rowIndex > i && (i = t.rowIndex), t.columnIndex > n && (n = t.columnIndex);
        });
        for (var l = 0; l < i; l++) !function(t) {
            s[t] = [], a.forEach(function(e, a) {
                var o = e.rowIndex, i = e.columnIndex;
                t + 1 == o && (s[t][i] = e);
            });
        }(l);
        for (var r = 0; r < n + 1; r++) o.push(r);
        for (var d = 0; d < s.length; d++) for (var c = s[d], h = 0; h < c.length; h++) {
            var u = c[h];
            void 0 == u && (u = {
                name: "空",
                status: 4,
                seatId: 0
            }, s[d][h] = u);
        }
        s.forEach(function(t, e) {
            t.forEach(function(t, a) {
                1 == t.loveFlag && void 0 == t.loveSeat && (t.loveSeat = "left", s[e][a + 1].loveSeat = "right");
            });
        }), console.log(s, "=========");
        var p = [];
        s.forEach(function(t, a) {
            0 == t.length ? p.push(" ") : e(0, t);
        }), this.setData({
            seatmaptype: t.result.seatmaptype,
            seatdata: s,
            colData: p,
            colArr: o,
            notice: t.result.notice || ""
        }), wx.createSelectorQuery().select("#movable-view-box").boundingClientRect(function(t) {
            console.log(t);
            var e = t.height, a = t.width, o = 30 * this.data.seatdata.length + 18, i = wx.getSystemInfoSync().windowWidth;
            this.data.movableBoxWidth = a, this.data.phoneWidth = i, a > i && this.setData({
                seatX: -(t.width / 2 - i / 2),
                movableHeight: e > o ? "100%" : 60 * this.data.seatdata.length + 36 + "rpx"
            });
        }.bind(this)).exec();
    },
    touchmove: function(t) {
        console.log(t);
    },
    seatchoose: function(t) {
        var e = this;
        console.log(t, "-=-=-=");
        var a = this.data.seatdata, o = t.currentTarget.dataset.seat.split(",");
        o.forEach(function(t, e) {
            o[e] = Number(t);
        });
        var i = a[o[0]][o[1]], n = this.data.seatArr, s = n.chooseSeat.length;
        if (void 0 == i.checked) if (s > 2 || 2 == s) wx.showToast({
            title: "最多购买两张",
            icon: "none"
        }); else {
            if (1 == i.loveFlag) {
                if (console.log(s, "===len"), s > 0) return void wx.showToast({
                    title: "最多购买两张",
                    icon: "none"
                });
                n.isloveSeat = 0, a[o[0]]["left" == i.loveSeat ? o[1] + 1 : o[1] - 1].checked = "1";
            }
            i.checked = "1", 1 != this.data.scaleValue && (this.setData({
                scaleValue: 1,
                hiddenCol: !0
            }), setTimeout(function() {
                e.setData({
                    seatX: 80 - t.currentTarget.offsetLeft,
                    seatY: -t.currentTarget.offsetTop
                });
            }, 500));
        } else 1 == i.loveFlag ? (n.isloveSeat = 1, i.checked = void 0, a[o[0]]["left" == i.loveSeat ? o[1] + 1 : o[1] - 1].checked = void 0) : i.checked = void 0;
        n.chooseSeat = [], a.forEach(function(t) {
            t.forEach(function(t) {
                "1" === t.checked && n.chooseSeat.push(t);
            });
        }), this.setData({
            seatdata: a,
            seatArr: n
        });
    },
    confirm: function() {
        wx.showLoading({
            title: "下单中..."
        });
        var t = this, a = t.data.seatArr.isloveSeat, o = "", i = (t.data.uid, t.data.userPhone), n = "", s = [];
        if ((d = t.data.seatdata).forEach(function(t) {
            t.forEach(function(t) {
                1 == t.checked && s.push(t);
            });
        }), 1 == t.data.confirmFlag) return !1;
        if (!t.cheackPhone(i)) return t.setData({
            confirmFlag: 0,
            phonesheet: !0,
            phone_focus: !0
        }), wx.showToast({
            title: "输入正确手机号",
            duration: 2e3
        }), !1;
        if (wx.setStorageSync("userpjone", i), 0 == s.length) return wx.showToast({
            title: "还没有选座位哦",
            duration: 2e3
        }), t.setData({
            confirmFlag: 0
        }), !1;
        if (!this.testingSeat()) return wx.showToast({
            title: "请不要留下空座",
            duration: 2e3
        }), t.setData({
            confirmFlag: 0
        }), !1;
        for (var l = [], r = 0; r < s.length; r++) r == s.length - 1 ? (o += s[r].name, 
        n += s[r].seatId) : (o += s[r].name + ",", n += s[r].seatId + ","), 0 == s[r].unLikeSeat ? 0 == s[r].typeseat ? l.push("cgv") : l.push("yuliu") : l.push("common");
        var d = {
            uid: t.data.uid,
            cinemaid: t.data.cinamerid,
            buydatatype: "9",
            phone: i,
            movieid: t.data.movieid,
            seatmaptype: t.data.seatmaptype,
            type: t.data.type,
            ticketid: o,
            seatid: n,
            loveseat: a,
            time: t.data.playid,
            singprice: t.data.price,
            typeseat: l.join(","),
            price: t.data.price * t.data.seatArr.chooseSeat.length,
            cdkeyid: "0",
            group_buy_id: t.data.opt.group_id ? Number(t.data.opt.group_id) : 0
        };
        t.setData({
            confirmFlag: 1
        });
        (0, e._post)("v1/movieticket/buyticket", d).then(function(e) {
            if (0 != e) {
                if (wx.hideLoading(), "success" != e.msg) return wx.showModal({
                    title: "提示",
                    content: "座位已被购买，请重新选择座位。"
                }), void t.setData({
                    confirmFlag: 0
                });
                if (1 == e.error) ; else if (0 == e.buy) return wx.showToast({
                    title: e.msg,
                    duration: 2e3
                }), t.setData({
                    autoInput: !0
                }), !1;
                if (!t.cheackPhone(i)) return t.setData({
                    confirmFlag: 0
                }), wx.showToast({
                    title: "输入正确手机号",
                    duration: 2e3
                }), !1;
                var a = Date.parse(new Date());
                wx.setStorage({
                    key: "orderTimeStamp",
                    data: a
                }), wx.setStorage({
                    key: "orderinfor",
                    data: e,
                    success: function(t) {
                        wx.hideLoading(), wx.navigateTo({
                            url: "../pay/pay?orderid=" + e.orderid + "&flag=1&cdkeyid=" + e.cdkey.cdkeyid
                        });
                    },
                    fail: function(t) {},
                    complete: function(e) {
                        t.setData({
                            confirmFlag: 0
                        });
                    }
                });
            } else wx.showModal({
                title: "提示",
                content: "下单错误"
            });
        });
    },
    testingSeat: function() {
        function t(t) {
            var e = t[1], a = i[t[0]];
            return console.log(t, "--单独选择的座位"), console.log(a, "--同行座位"), {
                leftFirst: a[e - 1],
                leftSecond: a[e - 2],
                rightFirst: a[e + 1],
                rightSecond: a[e + 2]
            };
        }
        function e(t) {
            var e = t.leftFirst, a = t.leftSecond, o = t.rightFirst, i = t.rightSecond;
            return console.log(e, "---所选座位左边第一个"), console.log(a, "---所选座位左边第二个"), console.log(o, "---所选座位右边第一个"), 
            console.log(i, "---所选座位右边第二个"), e && 1 == e.status ? (console.log("左边第一个卖出,可以卖"), 
            !0) : o && 1 == o.status ? (console.log("右边第一个卖出,可以卖"), !0) : void 0 == o || 4 == o.status ? (console.log("右边贴近边缘,可以卖"), 
            !0) : void 0 == e || 4 == e.status ? (console.log("左边贴近边缘,可以卖"), !0) : a && 1 == a.status ? (console.log("左边第二个有卖出,不能卖"), 
            !1) : i && 1 == i.status ? (console.log("右边第二个有卖出,不能卖"), !1) : void 0 == i || 4 == i.status ? (console.log("右边距离边缘空了一个,不能卖"), 
            !1) : void 0 == a || 4 == a.status ? (console.log("左边距离边缘空了一个,不能卖"), !1) : (console.log("左右第一个都没有卖出,左右第二个都没有卖出"), 
            !0);
        }
        var a = this.data.seatArr;
        console.log(a, "----seatArr");
        var o = !0;
        if (0 == a.isloveSeat) return console.log("情侣座,可以直接通过"), o;
        var i = this.data.seatdata;
        if (1 == a.chooseSeat.length) {
            var n = a.chooseSeat[0];
            o = e(t([ n.rowIndex - 1, n.columnIndex ]));
        } else {
            var s = a.chooseSeat;
            if (console.log(s, "------选择的座位"), s[0].rowIndex !== s[1].rowIndex) {
                var l = e(t([ s[0].rowIndex - 1, s[0].columnIndex ])), r = e(t([ s[1].rowIndex - 1, s[1].columnIndex ]));
                console.log("不在一排", l, r), l && r || (console.log("有不通过的座位,无法出售"), o = !1);
            } else {
                var d = s[0].columnIndex, c = s[1].columnIndex, h = 1 === Math.abs(d - c), u = Math.abs(d - c) > 2, p = i[s[0].rowIndex - 1];
                if (console.log("选择了座位的同行座位: ", p), !h && !u) {
                    var f = [ d, c ].sort(function(t, e) {
                        return t - e;
                    });
                    console.log(f, "");
                    var m = p[f[0] + 1];
                    return console.log("选择座位中间夹着的座位: ", m), 0 == m.status ? (console.log("中间夹了一个可以售出的座位,无法下单"), 
                    !1) : (console.log("中间夹了无法出售的座位,可以下单"), !0);
                }
                if (h) {
                    var g = [ d, c ].sort(function(t, e) {
                        return t - e;
                    });
                    console.log(g, "----选择的列坐标数组"), o = e({
                        leftFirst: p[g[0] - 1],
                        leftSecond: p[g[0] - 2],
                        rightFirst: p[g[1] + 1],
                        rightSecond: p[g[1] + 2]
                    });
                } else {
                    var v = e(t([ s[0].rowIndex - 1, s[0].columnIndex ])), y = e(t([ s[1].rowIndex - 1, s[1].columnIndex ]));
                    console.log("选择了中间距离超过两个的座位", v, y), v && y || (console.log("有不通过的座位,无法出售"), o = !1);
                }
            }
        }
        return console.log(o, "-----canbuy"), o;
    },
    changeScreenings: function() {
        var t = this;
        this.data.playData ? this.setData({
            mask: !1
        }) : (0, e._post)("v2/movies/plays", {
            hasday: 1,
            movieid: this.data.movieid,
            cinemanid: this.data.cinamerid,
            day: this.data.playid
        }).then(function(e) {
            var a = e.plays, o = [], i = t.data.SeatplayTime;
            a.forEach(function(t) {
                i != t.playtime && o.push(t);
            }), o.length > 0 ? t.setData({
                mask: !1,
                playData: o
            }) : wx.showToast({
                title: "暂无其他场次"
            });
        });
    },
    changeScreeningData: function(t) {
        var o = this, i = t.currentTarget.dataset.playdata;
        console.log("更换场次数据==", i);
        var n = this;
        console.log(this.data.opt, "-=-=-=");
        var s = this.data.opt;
        s.show_playtime = i.weekindex + " " + i.hourindex, s.halltype = i.halltype, s.price = i.price, 
        s.maxPrice = i.maxprice, n.setData({
            mask: !0,
            type: i.diffchannels[0].type,
            playid: i.diffchannels[0].playid,
            palytime: i.playtime,
            hallname: i.hallname,
            halltype: i.halltype,
            price: i.price,
            SeatplayTime: i.playtime,
            opt: s
        });
        var l = {
            typeid: i.diffchannels[0].typeid,
            typeseat: i.diffchannels[0].typeseat,
            cinemaid: n.data.cinamerid,
            movieid: n.data.movieid,
            playid: i.diffchannels[0].playid,
            type: i.diffchannels[0].type,
            cityid: n.data.cityid,
            uid: n.data.uid
        };
        (0, e._post)("v2/seat/map", l).then(function(t) {
            0 != i.diffchannels[0].group_actid && (o.setData({
                group_id: i.diffchannels[0].group_actid,
                group_playtime: i.datetime + " " + i.playtime
            }), o.getGroupTime()), 1 != t.error ? n.seatTransformation(t) : (a.showLoading(t.errorMsg), 
            setTimeout(function() {
                wx.hideLoading();
            }, 800));
        });
    },
    maskHidden: function() {
        this.setData({
            mask: !0
        });
    },
    onReady: function() {},
    onHide: function(t) {
        clearInterval(this.data.interval);
    },
    onChange: t(function(t) {
        console.log(t.detail, "--change"), wx.createSelectorQuery().select("#movable-view-box").boundingClientRect(function(e) {
            var a = e.width;
            this.data.movableBoxWidth = a, a > this.data.phoneWidth ? this.setData({
                colpaileft: Math.abs(t.detail.x) / this.data.scaleValue,
                hiddenCol: !1
            }) : this.setData({
                colpaileft: 0,
                hiddenCol: !1
            });
        }.bind(this)).exec();
    }, 300),
    onScale: t(function(t) {
        console.log(t, "---scale");
        var e = t.detail.scale;
        this.setData({
            scaleValue: e,
            colpaileft: Math.abs(t.detail.x) / e
        });
    }, 500),
    bestSeat: function() {
        wx.createSelectorQuery().select(".seat-map").fields({
            size: !0
        }, function(t) {
            console.log(t, "-=-=");
            var e = t.width / this.data.scaleValue * (1 / 3), a = t.height / this.data.scaleValue * (1 / 3);
            this.setData({
                boxWidth: e,
                boxHeight: a
            }), console.log(e, a, "-=-=ww");
        }.bind(this)).exec();
    },
    telBlur: function() {
        this.setData({
            phonesheet: !1,
            phone_focus: !1
        });
    },
    showPhoneSheet: function() {
        this.setData({
            phonesheet: !0,
            phone_focus: !0
        });
    },
    savephone: function() {
        var t = this.data.userPhone;
        this.cheackPhone(t) ? (wx.setStorageSync("userpjone", t), this.setData({
            phonesheet: !1,
            phone_focus: !1,
            userPhone: t
        })) : wx.showToast({
            title: "输入正确手机号",
            duration: 2e3
        });
    }
});