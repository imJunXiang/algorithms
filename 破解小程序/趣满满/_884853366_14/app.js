var t = require("./utils/tools.js"), e = require("lib/qqmap-wx-jssdk.js"), o = null;

App({
    onLaunch: function() {
        o = new e({
            key: "5TBBZ-ZI2WU-Q7CVG-4J4GO-Y2Z5H-TWBZY"
        });
    },
    globalData: {
        userInfo: null,
        hasUserInfo: !1,
        cityId: "",
        cityName: "",
        selectCityId: "",
        selectCityName: "",
        hasCityData: "",
        latitude: "",
        longitude: "",
        colors: {
            maincolor: "#ff5500",
            xkbtnbg: "#ff8400",
            ysbtnbg: "#4ca9ff",
            fontcolor: "#ff5500",
            labelbg: "#ff5500",
            iconsrc: "qmmicon",
            cinamerlabelcolor: "#78b1ff",
            ordernopay: "#ff0006",
            orderback: "#08a500",
            orderwait: "#ff5500",
            ordertickettotal: "#ff5500",
            minenavcolor: "#ff5500",
            codebg: "#fff4ef"
        }
    },
    getLocation: function(t) {
        var e = this;
        return new Promise(function(t, n) {
            wx.getLocation({
                type: "gcj02",
                success: function(n) {
                    console.log(n, "-------wx_location");
                    var i = n.latitude, c = n.longitude, a = c + "," + i;
                    wx.setStorage({
                        key: "location",
                        data: a
                    }), new Promise(function(t, e) {
                        console.log(11111111111), o.reverseGeocoder({
                            location: {
                                latitude: i,
                                longitude: c
                            },
                            success: function(e) {
                                console.log(222222222222), console.log(e, "-=-=-=解析后的定位信息");
                                var o = e.result.ad_info, n = o.city.slice(0, o.city.length - 1);
                                t(n);
                            },
                            fail: function(e) {
                                console.log(2222222222.111111), console.log("解析地址出错", e), t();
                            },
                            complete: function(e) {
                                console.log(2222222.22222), console.log("解析地址完成", e), t();
                            }
                        });
                    }).then(function(o) {
                        console.log(333333333333), e.setLocation(o).then(function(e) {
                            t();
                        });
                    });
                },
                fail: function(o) {
                    console.log(o, "-=-=-=-=定位失败"), wx.setStorage({
                        key: "location",
                        data: "116.44355, 39.9219"
                    }), e.setLocation().then(function(e) {
                        t();
                    });
                }
            });
        });
    },
    setLocation: function(e) {
        function o(t, e) {
            for (var o = (e ? JSON.parse(e) : JSON.parse(wx.getStorageSync("citydata"))).letter, i = null, c = 0; c < o.length; c++) {
                var a = o[c];
                if (a.cityname == n || a.cityname + "市" == n) {
                    i = a.cityid;
                    break;
                }
            }
            return i;
        }
        console.log(444444444444444), console.log(e, "-=-=定位的城市");
        var n = e || "北京";
        return new Promise(function(i, c) {
            var a = null, l = null, r = wx.getStorageSync("locationStorage");
            "" != r ? (r.local.cityname != n && (r.local = {
                cityname: n,
                cityid: o()
            }, wx.setStorage({
                key: "locationStorage",
                data: r
            })), i()) : new Promise(function(e, o) {
                a = n;
                var i = wx.getStorageSync("citydata");
                "" == i ? (0, t._post)("v2/city/citylist", {}, "获取城市列表", !1).then(function(t) {
                    i = JSON.stringify({
                        hot: t.hot,
                        letter: t.letter,
                        num: t.number
                    }), wx.setStorage({
                        key: "citydata",
                        data: i
                    }), e(i);
                }) : e(i);
            }).then(function(t) {
                l = o(0, t);
                var c = {
                    local: {
                        cityid: e ? l : 0,
                        cityname: e ? n : "定位失败"
                    },
                    select: {
                        cityid: l,
                        cityname: n
                    }
                };
                wx.setStorageSync("locationStorage", c), i();
            });
        });
    },
    setPageCityId: function(t) {
        var e = wx.getStorageSync("locationStorage");
        t.setData({
            city: e.select ? e.select.cityname : e.local.cityname,
            cityid: e.select ? e.select.cityid : e.local.cityid
        });
    },
    requestUid: function() {
        return new Promise(function(e) {
            (0, t._post)("v1/user/user_temp_login", {}, "获取临时uid", !1).then(function(t) {
                var o = t.uid;
                wx.setStorageSync("tempuid", o), e(o);
            });
        });
    },
    setPageUid: function(t) {
        var e = this;
        return new Promise(function(o) {
            var n = wx.getStorageSync("3rd_session");
            "" == n ? new Promise(function(t) {
                var o = wx.getStorageSync("tempuid");
                "" == o ? e.requestUid().then(function(e) {
                    t(e);
                }) : t(o);
            }).then(function(e) {
                t.setData({
                    uid: Number(e),
                    uidType: "temp"
                }), o();
            }) : (t.setData({
                uid: Number(n.uid),
                uidType: "work"
            }), o());
        });
    },
    setPageColor: function(t) {
        var e = this.globalData.colors;
        t.setData({
            colors: e
        });
    }
});