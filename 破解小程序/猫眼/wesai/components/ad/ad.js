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

var _createClass = function() {
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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _common = require("./../../common/common.js"), _mixin = require("./../../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), _navToMiniProgram = require("./../../common/navToMiniProgram.js"), _navToMiniProgram2 = _interopRequireDefault(_navToMiniProgram), _miniProgramAppIds = require("./../../common/miniProgramAppIds.js"), _miniProgramAppIds2 = _interopRequireDefault(_miniProgramAppIds), _advertisingIds = require("./../../common/advertisingIds.js"), AD = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.data = {
            indicatorDots: !1,
            indicatorColor: "rgba(255, 255, 255, 0.4)",
            indicatorActiveColor: "rgba(255, 255, 255, 0.9)",
            autoplay: !0,
            interval: 5e3,
            duration: 1e3,
            linkPrefix: "",
            adHeight: "73px",
            sysRes: {},
            swiperActiveIndex: 0
        }, r.mixins = [ _mixin2.default ], r.props = {
            advertisingId: {
                type: String,
                required: !0,
                default: ""
            },
            adViewPostStatus: {
                type: Boolean,
                required: !0,
                default: !0
            },
            advertisingList: {
                type: Array,
                required: !0,
                default: []
            },
            config: {
                type: Object,
                required: !0,
                default: {
                    indicatorDots: !1,
                    indicatorColor: "",
                    indicatorActiveColor: ""
                }
            }
        }, r.methods = {
            swiperItemTap: function(e, t, n) {
                var r = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function o() {
                    var i, a, s, c, u, d, m;
                    return regeneratorRuntime.wrap(function(o) {
                        for (;;) switch (o.prev = o.next) {
                          case 0:
                            if (i = wx.getStorageSync("selectCity"), a = wx.getStorageSync("wesaiToken"), s = wx.getStorageSync("maoYanOpenId"), 
                            0 != t || s || r.advertisingId !== _advertisingIds.homeSevenIds.topAheadAdvertisingId) {
                                o.next = 7;
                                break;
                            }
                            return o.next = 6, (0, _common.getMYOpenId)();

                          case 6:
                            s = o.sent;

                          case 7:
                            c = n.currentTarget.dataset.frame, u = r.sysRes, d = encodeURIComponent(encodeURIComponent(_common.urls.clickURL)), 
                            m = {
                                screen: u.windowWidth + "*" + u.windowHeight,
                                referrer: "",
                                ua: "wechat_miniprogram|" + u.platform + "|" + u.system + "|wechat_version_" + u.version + "|" + u.brand + "|" + u.model,
                                token: a,
                                advertisingId: r.advertisingId,
                                cityName: i.name || "",
                                city: i.city_id || -1,
                                advertisementId: e.advertisementId || "",
                                frame: c + 1,
                                materialId: e.materialId || "",
                                advertisementUuid: e.advertisementUuid || "",
                                url: e.url || "",
                                openId: s
                            }, (0, _common.ajax)(_common.urls.proxyCurl, {
                                jsonParams: {
                                    url: d,
                                    param: m
                                }
                            }).then(function(t) {
                                if (t.code && 200 === t.code && t.data) {
                                    var n = t.data;
                                    n.response && 0 === n.response.error && e.url && r.wxxcxClick(e.url);
                                }
                            }).catch(function(e) {});

                          case 13:
                          case "end":
                            return o.stop();
                        }
                    }, o, r);
                }))();
            },
            bindSwiperChange: function(e) {
                var t = e.detail.current;
                this.swiperActiveIndex = t || 0;
            }
        }, r.watch = {}, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.sysRes = wx.getSystemInfoSync();
        }
    }, {
        key: "wxxcxClick",
        value: function(e) {
            var t = this, n = encodeURIComponent(encodeURIComponent(_common.urls.wxclickURL)), r = encodeURIComponent(encodeURIComponent(e)), o = wx.getStorageSync("maoYanOpenId"), i = {
                url: r || "",
                openid: o || ""
            };
            (0, _common.ajax)(_common.urls.proxyCurl, {
                jsonParams: {
                    url: n,
                    param: i
                }
            }).then(function(n) {
                200 == n.code && n.data && n.data.response && n.data.response.data && t.tapToNavigate(e);
            }).catch(function(e) {});
        }
    }, {
        key: "init",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        try {
                            this.$apply();
                        } catch (e) {}
                        this.$apply();

                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "loadADs",
        value: function() {
            var e = this;
            return new Promise(function(t) {
                var n = wx.getStorageSync("selectCity"), r = wx.getStorageSync("wesaiToken"), o = wx.getStorageSync("maoYanOpenId"), i = e.sysRes, a = encodeURIComponent(encodeURIComponent(_common.urls.releaseURL)), s = {
                    screen: i.windowWidth + "*" + i.windowHeight,
                    referrer: "",
                    ua: "wechat_miniprogram|" + i.platform + "|" + i.system + "|wechat_version_" + i.version + "|" + i.brand + "|" + i.model,
                    token: r,
                    advertisingId: e.advertisingId,
                    cityName: n.name || "",
                    city: n.city_id || -1,
                    openId: o
                };
                (0, _common.ajax)(_common.urls.proxyCurl, {
                    jsonParams: {
                        url: a,
                        param: s
                    }
                }).then(function(n) {
                    if (n.code && 200 === n.code && n.data) {
                        var r = n.data;
                        r.response && r.response.advertising && r.response.advertising.advertisements && (e.advertisingList = r.response.advertising.advertisements);
                    }
                    e.$apply(), t(e.advertisingList);
                }).catch(function(e) {
                    t(null);
                });
            });
        }
    }, {
        key: "adViewFirstAtatistics",
        value: function(e, t) {
            var n = wx.getStorageSync("selectCity"), r = wx.getStorageSync("wesaiToken"), o = wx.getStorageSync("maoYanOpenId");
            e || (e = this.advertisingList[0]);
            var i = this.sysRes, a = encodeURIComponent(encodeURIComponent(_common.urls.viewURL)), s = {
                screen: i.windowWidth + "*" + i.windowHeight,
                referrer: "",
                ua: "wechat_miniprogram|" + i.platform + "|" + i.system + "|wechat_version_" + i.version + "|" + i.brand + "|" + i.model,
                token: r,
                advertisingId: this.advertisingId,
                cityName: n.name || "",
                city: n.city_id || -1,
                advertisementId: e.advertisementId,
                frame: t || 1,
                materialId: e.materialId,
                advertisementUuid: e.advertisementUuid,
                openId: o
            };
            (0, _common.ajax)(_common.urls.proxyCurl, {
                jsonParams: {
                    url: a,
                    param: s
                }
            }).then(function(e) {}).catch(function(e) {});
        }
    }, {
        key: "show",
        value: function() {}
    } ]), t;
}(_wepy2.default.component);

exports.default = AD;