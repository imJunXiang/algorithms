function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(o, i) {
                try {
                    var a = t[o](i), s = a.value;
                } catch (e) {
                    return void n(e);
                }
                if (!a.done) return Promise.resolve(s).then(function(e) {
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

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _common = require("./common/common.js"), _binduser = require("./common/binduser.js"), _binduser2 = _interopRequireDefault(_binduser);

require("./npm/wepy-async-function/index.js");

var _navToMiniProgram = require("./common/navToMiniProgram.js"), _navToMiniProgram2 = _interopRequireDefault(_navToMiniProgram), _urls = require("./common/urls.js"), _urls2 = _interopRequireDefault(_urls), _miniProgramAppIds = require("./common/miniProgramAppIds.js"), _miniProgramAppIds2 = _interopRequireDefault(_miniProgramAppIds), _util = require("./common/util.js"), confirmDefault = {
    title: "提示",
    content: "",
    customContent: "",
    confirmText: "确定",
    cancelText: "取消",
    confirmCallback: function() {},
    cancelCallback: function() {}
}, mixin = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.newGetToken = null, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "showAlert",
        value: function(e, t) {
            "object" == (void 0 === e ? "undefined" : _typeof(e)) ? t = t ? Object.assign(e, t) : e : "string" == typeof e && (t || (t = {}), 
            t.content = e), this.$invoke("Comp", "alert", t);
        }
    }, {
        key: "showConfirm",
        value: function(e, t) {
            "object" == (void 0 === e ? "undefined" : _typeof(e)) ? t = t ? Object.assign(e, t) : e : "string" == typeof e && (t ? t.content = e : t = {
                content: e
            });
            var n = Object.assign(confirmDefault, t);
            this.$invoke("Comp", "confirm", n);
        }
    }, {
        key: "getToken",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (this.newGetToken) {
                            e.next = 4;
                            break;
                        }
                        return this.newGetToken = 1, e.next = 4, _common.GetTheToken.init();

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "checkBindUser",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, _binduser2.default.init(t);

                      case 2:
                        return e.abrupt("return", e.sent);

                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "refreshPage",
        value: function() {
            this.$wxpage.hideErrorPage();
        }
    }, {
        key: "toast",
        value: function(e) {
            this.$wxpage.toast(e);
        }
    }, {
        key: "pageLoading",
        value: function() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            this.$wxpage.loading(e);
        }
    }, {
        key: "showErrorPage",
        value: function(e) {
            this.$wxpage.showErrorPage && this.$wxpage.showErrorPage(e);
        }
    }, {
        key: "checkToLol",
        value: function(e, t) {
            var n = wx.getStorageSync("wesaiToken"), r = wx.getStorageSync("maoYanOpenId"), o = {
                token: n,
                maoYanOpenId: r,
                env: _urls2.default.env,
                onlineId: t
            };
            e.message ? _wepy2.default.showModal({
                title: "提示",
                content: e.message
            }).then(function(t) {
                t.confirm ? "mine" == e.data.redirectType ? _wepy2.default.redirectTo({
                    url: e.data.redirectUrl
                }) : _navToMiniProgram2.default.navigateToMiniProgram({
                    appId: e.data.appId,
                    path: e.data.redirectUrl,
                    extraData: o,
                    envVersion: "trial"
                }) : t.cancel;
            }).catch(function(e) {}) : "mine" == e.data.redirectType ? _wepy2.default.redirectTo({
                url: e.data.redirectUrl
            }) : _navToMiniProgram2.default.navigateToMiniProgram({
                appId: e.data.appId,
                path: e.data.redirectUrl,
                extraData: o,
                envVersion: "trial"
            });
        }
    }, {
        key: "bindADClick",
        value: function(e, t) {
            var n = this, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", o = wx.getStorageSync("selectCity"), i = wx.getStorageSync("wesaiToken"), a = wx.getStorageSync("maoYanOpenId"), s = this.sysRes, c = encodeURIComponent(encodeURIComponent(_urls2.default.clickURL)), u = {
                screen: s.windowWidth + "*" + s.windowHeight,
                referrer: "",
                ua: "wechat_miniprogram|" + s.platform + "|" + s.system + "|wechat_version_" + s.version + "|" + s.brand + "|" + s.model,
                token: i,
                advertisingId: t,
                cityName: o.name || "",
                city: o.city_id || -1,
                advertisementId: e.advertisementId || "",
                materialId: e.materialId || "",
                advertisementUuid: e.advertisementUuid || "",
                url: e.url || "",
                openId: a,
                online_id: r && (0, _util.isString)(r) ? r : ""
            };
            (0, _common.ajax)(_urls2.default.proxyCurl, {
                jsonParams: {
                    url: c,
                    param: u
                }
            }).then(function(t) {
                if (t.code && 200 === t.code && t.data) {
                    var r = t.data;
                    r.response && 0 === r.response.error && e.url && n.tapToNavigate(e.url);
                }
            }).catch(function(e) {});
        }
    }, {
        key: "bindADView",
        value: function(e, t) {
            var n = wx.getStorageSync("selectCity"), r = wx.getStorageSync("wesaiToken"), o = wx.getStorageSync("maoYanOpenId"), i = this.sysRes, a = encodeURIComponent(encodeURIComponent(_urls2.default.viewURL)), s = {
                screen: i.windowWidth + "*" + i.windowHeight,
                referrer: "",
                ua: "wechat_miniprogram|" + i.platform + "|" + i.system + "|wechat_version_" + i.version + "|" + i.brand + "|" + i.model,
                token: r,
                advertisingId: t,
                cityName: n.name || "",
                city: n.city_id || -1,
                advertisementId: e.advertisementId,
                materialId: e.materialId,
                advertisementUuid: e.advertisementUuid,
                openId: o
            };
            (0, _common.ajax)(_urls2.default.proxyCurl, {
                jsonParams: {
                    url: a,
                    param: s
                }
            }).then(function(e) {}).catch(function(e) {});
        }
    }, {
        key: "tapToNavigate",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n = wx.getStorageSync("wesaiToken"), r = wx.getStorageSync("maoYanOpenId"), o = wx.getStorageSync("wesaiUserInfo"), i = wx.getStorageSync("selectCity"), a = {
                wesaiToken: n,
                wesaiUserId: o.user_id || "",
                maoYanOpenId: r,
                cityCode: i && i.city_code || 0
            };
            if (/http/g.test(e)) if (/^https:\/\/ticket.wesai.com\/wechat\/zwy/g.test(e) && (t = !0), 
            /needOpenId=true/g.test(e) && (a.needOpenId = !0), !t && (/ticket.wesai.com/g.test(e) || /redpacket.wesai.com/g.test(e) || /open-web.wesai.com/g.test(e) || /mini.wesai.com/g.test(e) || /wxproxy-t.wesai.com/g.test(e))) /ticket.wesai.com\/wechat/g.test(e) && (e = decodeURIComponent(e), 
            e = (0, _util.extendQuery)(e, a)), this.$root.$navigate("/wesai/pages/webview/webview", {
                url: encodeURIComponent(e)
            }); else {
                var s = Object.assign({
                    url: encodeURIComponent(e)
                }, a);
                _navToMiniProgram2.default.navigateToMiniProgram({
                    appId: _miniProgramAppIds2.default.dongTaiBiaoDanWXAppId,
                    path: "/pages/webview/webview?" + (0, _util.json2search)(s),
                    extraData: {
                        token: n,
                        maoYanOpenId: r,
                        webViewUrl: encodeURIComponent(e) || "",
                        env: _urls2.default.env
                    },
                    envVersion: "trial"
                });
            } else if (e = decodeURIComponent(e), /^wssport:\/\//.test(e)) {
                var c = e.split(/\{\{(.*)\}\}/);
                if (c[1] && c[2]) {
                    var u = c[1], p = c[2];
                    p = decodeURIComponent(p), p = (0, _util.extendQuery)(p, {
                        extraData: JSON.stringify({
                            wesaiUserId: o.user_id || "",
                            mobile: o.mobile || ""
                        }),
                        envVersion: "trial"
                    }, !0), _navToMiniProgram2.default.navigateToMiniProgram({
                        appId: u,
                        path: p,
                        envVersion: "trial"
                    });
                }
            } else wx.navigateTo({
                url: decodeURIComponent(e)
            });
        }
    }, {
        key: "tapToNavThirdWeApp",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var n, r, o, i = t.miniPath, a = t.appId;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.checkBindUser();

                      case 2:
                        if (n = e.sent) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return");

                      case 5:
                        r = wx.getStorageSync("wesaiUserInfo"), o = "/pages/transfer/transfer?path=" + encodeURIComponent(i) + "&appId=" + a + "&extraData=" + JSON.stringify({
                            wesaiUserId: r.user_id || "",
                            mobile: r.mobile || ""
                        }) + "&envVersion=trial", _navToMiniProgram2.default.navigateToMiniProgram({
                            path: o,
                            envVersion: "trial"
                        });

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onLoad",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, r, o, i, a = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (!(t = this) || t.$isComponent) {
                            e.next = 10;
                            break;
                        }
                        if (n = wx.getStorageSync("wesaiToken") || "") {
                            e.next = 6;
                            break;
                        }
                        return e.next = 6, _common.GetTheToken.init();

                      case 6:
                        r = (0, _common.getStatisticsBaseInfo)(this), o = getApp().getUser(), o && (i = o.wxUserInfo && o.wxUserInfo.userInfo || {}, 
                        Object.assign(r, {
                            wxGender: i.gender || "",
                            wxProvince: i.province || "",
                            wxCountry: i.country || "",
                            wxCity: i.city || ""
                        })), wx.getNetworkType({
                            success: function(e) {
                                r.networkType = e.networkType.toUpperCase(), r.action = "pageLoad", (0, _common.statistics)(r);
                            }
                        });

                      case 10:
                        t && t.methods && !(0, _util.isEmptyObject)(t.methods) && Object.getOwnPropertyNames(t.methods).forEach(function(e) {
                            a.$mixins[0].methods[e] = function() {
                                for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                                if (e && ("bindSwiperChange" === e || "bindScroll" === e)) return "";
                                var o = (0, _common.getStatisticsBaseInfo)(a), i = n.filter(function(e) {
                                    return e && (0, _util.isObject)(e) && !(0, _util.isEmptyObject)(e) && e.currentTarget;
                                })[0];
                                o.action = i.type || "", o.actionName = e || "";
                                var s = i.currentTarget && i.currentTarget.dataset || {};
                                o.statisticsInfo = encodeURIComponent(s.statisticsInfo || ""), o.statisticsItemIndex = s.statisticsItemIndex || 0, 
                                wx.getNetworkType({
                                    success: function(e) {
                                        o.networkType = e.networkType.toUpperCase(), (0, _common.statistics)(o);
                                    }
                                });
                            };
                        });

                      case 11:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onShow",
        value: function() {
            var e = this;
            e && !e.$isComponent && (this._onLoadTime = new Date().getTime());
        }
    }, {
        key: "onHide",
        value: function() {
            var e = this;
            this.pageSendStatistics(this, function(t) {
                var n = (0, _common.getStatisticsBaseInfo)(e);
                n.networkType = t.networkType.toUpperCase(), n.action = "pageHide", n.pageStayTime = new Date().getTime() - e._onLoadTime || 0, 
                (0, _common.statistics)(n);
            });
        }
    }, {
        key: "onUnload",
        value: function() {
            var e = this;
            this.pageSendStatistics(this, function(t) {
                var n = (0, _common.getStatisticsBaseInfo)(e);
                n.networkType = t.networkType.toUpperCase(), n.action = "pageHide", n.pageStayTime = new Date().getTime() - e._onLoadTime || 0, 
                (0, _common.statistics)(n);
            });
        }
    }, {
        key: "pageSendStatistics",
        value: function(e, t) {
            e && !e.$isComponent && wx.getNetworkType({
                success: function(e) {
                    t(e);
                }
            });
        }
    }, {
        key: "getLocation",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.abrupt("return", new Promise(function(e) {
                            getApp().checkLocationAuth().then(function() {
                                wx.getLocation({
                                    success: function(t) {
                                        e(t);
                                    },
                                    fail: function(t) {
                                        e(null);
                                    }
                                });
                            }).catch(function(t) {
                                e(null);
                            });
                        }));

                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.mixin);

exports.default = mixin;