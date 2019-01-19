function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(a, o) {
                try {
                    var i = t[a](o), s = i.value;
                } catch (e) {
                    return void n(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(s);
            }
            return r("next");
        });
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.statistics = exports.getStatisticsBaseInfo = exports.getMYOpenId = exports.gotoHome = exports.GetTheToken = exports.PUBLICKEY = exports.app_id = exports.app = exports.log = exports.localData = exports.urls = exports.ajax = void 0;

var _util = require("./util.js"), _urls = require("./urls.js"), _urls2 = _interopRequireDefault(_urls), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _pageIdMap = require("./pageIdMap.js"), _pageIdMap2 = _interopRequireDefault(_pageIdMap), APPID = "wx1e22f26c099dec9d", PUBLICKEY = "2d422d41-1b38-481e-bc16-43e9f9ad20e9", app_id = "ff8080814a76ce16014a7a4fcbec0023", env = _urls2.default.env || "production", instance = function() {
    return _wepy2.default.$instance;
}, page = function() {
    return instance().__prevPage__.$root;
}, app = function() {
    return instance();
}, gotoHome = function() {
    var e = getCurrentPages(), t = e.findIndex(function(e) {
        return e.route.indexOf("indexpage/index") >= 0;
    });
    if (t >= 0) {
        var n = e.length - 1 - t;
        wx.navigateBack({
            delta: n
        });
    } else wx.switchTab({
        url: "/wesai/indexpage/index"
    });
}, getMYOpenIdTotalTimes = 0, getMYOpenId = function() {
    return new Promise(function(e) {
        getApp().login ? getApp().login().then(function(t) {
            var n = getApp().getUser();
            n && n.openId ? (wx.setStorageSync("maoYanOpenId", n.openId), e(n.openId)) : e("");
        }).catch(function(t) {
            e("");
        }) : e("");
    });
}, GetTheToken = {
    init: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return e && (wx.removeStorageSync("wesaiToken"), wx.removeStorageSync("tokenExpires")), 
                    t.getTokenRunTimes = 0, n.next = 4, t.letTheTokenToBeEffective();

                  case 4:
                  case "end":
                    return n.stop();
                }
            }, n, t);
        }))();
    },
    getTokenRunTimes: 0,
    Timer: null,
    makeSureTokenIsAlive: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var n;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!e.checkTokenIsOver()) {
                        t.next = 9;
                        break;
                    }
                    return t.next = 3, e.getToken();

                  case 3:
                    return n = t.sent, e.getTokenRunTimes++, t.abrupt("return", n);

                  case 9:
                    e.getTokenRunTimes = 0;

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getToken: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var n;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return n = {
                        appId: app_id,
                        publicKey: PUBLICKEY
                    }, t.next = 3, e.getNewToken(n);

                  case 3:
                    return t.abrupt("return", t.sent);

                  case 4:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getNewToken: function(e) {
        return new Promise(function(t) {
            ajax(_urls2.default.getToken, {
                method: "POST",
                data: {
                    data: JSON.stringify(e || {})
                }
            }).then(function(e) {
                var n = e && e.data && e.data.token || null;
                wx.setStorageSync("wesaiToken", n), wx.setStorageSync("tokenExpires", new Date().getTime()), 
                wx.removeStorageSync("wesaiUserInfo"), t(e.data);
            }).catch(function(e) {
                t(null);
            });
        });
    },
    timeout: function(e) {
        var t = this;
        return this.Timer && clearTimeout(this.Timer), new Promise(function(n) {
            return t.Timer = setTimeout(n, e);
        });
    },
    sleep: function(e, t) {
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
        var o = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, o.timeout(t || 2e3);

                  case 2:
                    e.apply(void 0, r);

                  case 3:
                  case "end":
                    return n.stop();
                }
            }, n, o);
        }))();
    },
    letTheTokenToBeEffective: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var n;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (!(e.getTokenRunTimes >= 2)) {
                        t.next = 2;
                        break;
                    }
                    return t.abrupt("return");

                  case 2:
                    if (!e.checkTokenIsOver()) {
                        t.next = 18;
                        break;
                    }
                    if (0 !== e.getTokenRunTimes) {
                        t.next = 14;
                        break;
                    }
                    return t.next = 7, e.makeSureTokenIsAlive();

                  case 7:
                    if (!(n = t.sent)) {
                        t.next = 10;
                        break;
                    }
                    return t.abrupt("return", n);

                  case 10:
                    return t.next = 12, e.letTheTokenToBeEffective();

                  case 12:
                    t.next = 18;
                    break;

                  case 14:
                    return t.next = 16, e.sleep(e.makeSureTokenIsAlive.bind(e));

                  case 16:
                    return t.next = 18, e.letTheTokenToBeEffective();

                  case 18:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    checkTokenIsOver: function() {
        var e = wx.getStorageSync("wesaiToken"), t = wx.getStorageSync("tokenExpires");
        if (e && t) {
            t = parseInt(t);
            if (new Date().getTime() - t > 72e6) return !0;
        } else if (!e || !t) return !0;
        return !1;
    }
}, ajax = function e(t, n, r) {
    n = n || {};
    var a = wx.getStorageSync("wesaiToken");
    if (n.url = t, n.jsonParams && "dev" !== env) {
        var o = "";
        "string" == typeof n.jsonParams ? o = n.jsonParams : (0, _util.isObject)(n.jsonParams) && (o = JSON.stringify(n.jsonParams)), 
        o = encodeURIComponent(o), n.url += o, r && (n.url += "?" + r);
    }
    n.url = n.url.replace("{{token}}", a);
    var i = {
        APPID: APPID,
        "content-type": "application/x-www-form-urlencoded",
        REFERERR: "weSaiMaoYanWeChat",
        "Accept-Language": "zh-CN"
    };
    return n.header && Object.assign(i, n.header), new Promise(function(r, a) {
        wx.request({
            url: n.url,
            data: n.data || {},
            header: i,
            method: n.method || "GET",
            complete: function(o) {
                if (200 == o.statusCode) {
                    var i = o.data;
                    i.returnInfo ? 200 === i.returnInfo.code ? r(i) : 302 === i.returnInfo.code ? n.useHooker ? a(i) : "" != i.returnInfo.message && page().showAlert(i.returnInfo.message, {
                        callback: function() {}
                    }) : a(i.returnInfo) : void 0 !== i.error && 0 == i.error ? r(i) : void 0 !== i.code ? 200 == i.code ? r(i) : 406 == i.code ? GetTheToken.init(!0).then(function(o) {
                        o || wx.getStorageSync("wesaiToken") ? e(t, n).then(function(e) {
                            r(e);
                        }).catch(function(e) {
                            a(e);
                        }) : a("获取token失败");
                    }).catch(function(e) {
                        a(e);
                    }) : 10111 === i.code ? getMYOpenId().then(function(o) {
                        var i = wx.getStorageSync("wesaiToken");
                        if (!i) throw new Error("token get fail");
                        e(_urls2.default.getUserInfo, {
                            jsonParams: {
                                token: i,
                                openId: o
                            }
                        }).then(function(o) {
                            o.data && getMYOpenIdTotalTimes < 2 ? (wx.setStorageSync("wesaiUserInfo", o.data), 
                            getMYOpenIdTotalTimes++, e(t, n).then(function(e) {
                                r(e);
                            }).catch(function(e) {
                                a(e);
                            })) : (getMYOpenIdTotalTimes = 0, a({
                                message: "出错啦!"
                            }));
                        }).catch(function(e) {
                            getMYOpenIdTotalTimes = 0, a({
                                message: "出错啦!"
                            });
                        });
                    }).catch(function() {
                        getMYOpenIdTotalTimes = 0, a({
                            message: "出错啦!"
                        });
                    }) : a(i) : 302 === i.code ? n.useHooker ? a(i) : "" != i.message && page().showAlert(i.message, {
                        callback: function() {}
                    }) : a(i);
                } else a({
                    message: "出错啦!"
                });
            },
            fail: function(e) {
                a({
                    message: "出错啦!"
                });
            }
        });
    });
}, localData = {
    set: function(e, t) {
        if (!e && !t) return null;
        try {
            wx.setStorageSync(e, JSON.stringify(t));
        } catch (e) {}
    },
    get: function(e) {
        var t = wx.getStorageSync(e);
        return t && (t = JSON.parse(t)), t;
    },
    remove: function(e) {
        wx.removeStorageSync(e);
    },
    clear: function() {
        wx.clearStorageSync();
    }
}, log = function() {}, getStatisticsBaseInfo = function(e) {
    var t = {
        route: "",
        pageId: "",
        model: "",
        windowWidth: "",
        windowHeight: "",
        system: "",
        language: "",
        version: "",
        batteryLevel: "",
        SDKVersion: "",
        platform: "",
        networkType: "",
        action: "",
        actionName: "",
        statisticsInfo: "",
        statisticsItemIndex: "",
        tm: "",
        par: "",
        pageName: "",
        pageStayTime: "",
        source: "",
        location: "",
        mobile: "",
        userId: "",
        wxGender: "",
        wxProvince: "",
        wxCountry: "",
        wxCity: "",
        token: "",
        maoYanOpenId: "",
        extend: ""
    }, n = wx.getSystemInfoSync();
    Object.keys(t).forEach(function(e) {
        return t[e] = n[e] || "";
    }), t.tm = new Date().getTime();
    var r = e && e.$wxpage && e.$wxpage.route && (0, _util.isString)(e.$wxpage.route) && e.$wxpage.route || "";
    t.route = r.replace(/\//g, "|") || "", t.pageId = _pageIdMap2.default[r] || "", 
    t.par = e && e.$wxpage && e.$wxpage._options && !(0, _util.isEmptyObject)(e.$wxpage._options) && e.$wxpage._options || "", 
    t.pageName = e && e.$name || "";
    var a = wx.getStorageSync("lastLocation");
    t.location = a && a.city_id || "";
    var o = wx.getStorageSync("wesaiUserInfo") || "";
    return t.mobile = o && o.mobile || "", t.userId = o && o.user_id || "", t.token = wx.getStorageSync("wesaiToken") || "", 
    t.maoYanOpenId = wx.getStorageSync("maoYanOpenId") || "", t;
}, statistics = function(e) {
    e.token && ajax(_urls2.default.statisticsAdd, {
        method: "POST",
        header: {
            "content-type": "multipart/form-data"
        },
        data: e
    }).then(function(e) {}).catch(function(e) {});
};

exports.ajax = ajax, exports.urls = _urls2.default, exports.localData = localData, 
exports.log = log, exports.app = app, exports.app_id = app_id, exports.PUBLICKEY = PUBLICKEY, 
exports.GetTheToken = GetTheToken, exports.gotoHome = gotoHome, exports.getMYOpenId = getMYOpenId, 
exports.getStatisticsBaseInfo = getStatisticsBaseInfo, exports.statistics = statistics;