function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

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
}(), _native = require("./native.js"), _native2 = _interopRequireDefault(_native), RequestMQ = {
    map: {},
    mq: [],
    running: [],
    MAX_REQUEST: 5,
    push: function(e) {
        for (e.t = +new Date(); this.mq.indexOf(e.t) > -1 || this.running.indexOf(e.t) > -1; ) e.t += 10 * Math.random() >> 0;
        this.mq.push(e.t), this.map[e.t] = e;
    },
    next: function() {
        var e = this;
        if (0 !== this.mq.length && this.running.length < this.MAX_REQUEST - 1) {
            var t = this.mq.shift(), n = this.map[t], r = n.complete;
            return n.complete = function() {
                for (var t = arguments.length, i = Array(t), o = 0; o < t; o++) i[o] = arguments[o];
                e.running.splice(e.running.indexOf(n.t), 1), delete e.map[n.t], r && r.apply(n, i), 
                e.next();
            }, this.running.push(n.t), wx.request(n);
        }
    },
    request: function(e) {
        return e = e || {}, e = "string" == typeof e ? {
            url: e
        } : e, this.push(e), this.next();
    }
}, _class = function() {
    function e() {
        _classCallCheck(this, e), this.$addons = {}, this.$interceptors = {}, this.$pages = {};
    }
    return _createClass(e, [ {
        key: "$init",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            this.$initAPI(e, t.noPromiseAPI), this.$wxapp = getApp();
        }
    }, {
        key: "use",
        value: function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            "string" == typeof e && this[e] ? (this.$addons[e] = 1, this[e](n)) : this.$addons[e.name] = new e(n);
        }
    }, {
        key: "intercept",
        value: function(e, t) {
            this.$interceptors[e] = t;
        }
    }, {
        key: "promisify",
        value: function() {}
    }, {
        key: "requestfix",
        value: function() {}
    }, {
        key: "$initAPI",
        value: function(e, t) {
            var n = this, r = {
                stopRecord: !0,
                pauseVoice: !0,
                stopVoice: !0,
                pauseBackgroundAudio: !0,
                stopBackgroundAudio: !0,
                showNavigationBarLoading: !0,
                hideNavigationBarLoading: !0,
                createAnimation: !0,
                createContext: !0,
                createCanvasContext: !0,
                createSelectorQuery: !0,
                createAudioContext: !0,
                createInnerAudioContext: !0,
                createVideoContext: !0,
                createCameraContext: !0,
                createMapContext: !0,
                pageScrollTo: !0,
                onBLEConnectionStateChange: !0,
                onBLECharacteristicValueChange: !0,
                hideKeyboard: !0,
                stopPullDownRefresh: !0
            };
            if (t) if (Array.isArray(t)) t.forEach(function(e) {
                return r[e] = !0;
            }); else for (var i in t) r[i] = t[i];
            Object.keys(wx).forEach(function(t) {
                r[t] || "on" === t.substr(0, 2) || /\w+Sync$/.test(t) ? (Object.defineProperty(_native2.default, t, {
                    get: function() {
                        return function() {
                            for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                            return wx[t].apply(wx, n);
                        };
                    }
                }), e[t] = _native2.default[t]) : (Object.defineProperty(_native2.default, t, {
                    get: function() {
                        return function(e) {
                            if (e = e || {}, n.$interceptors[t] && n.$interceptors[t].config) {
                                var r = n.$interceptors[t].config.call(n, e);
                                if (!1 === r) return n.$addons.promisify ? Promise.reject("aborted by interceptor") : void (e.fail && e.fail("aborted by interceptor"));
                                e = r;
                            }
                            if ("request" === t && (e = "string" == typeof e ? {
                                url: e
                            } : e), "string" == typeof e) return wx[t](e);
                            if (n.$addons.promisify) return new Promise(function(r, i) {
                                var o = {};
                                [ "fail", "success", "complete" ].forEach(function(a) {
                                    o[a] = e[a], e[a] = function(e) {
                                        n.$interceptors[t] && n.$interceptors[t][a] && (e = n.$interceptors[t][a].call(n, e)), 
                                        "success" === a ? r(e) : "fail" === a && i(e);
                                    };
                                }), n.$addons.requestfix && "request" === t ? RequestMQ.request(e) : wx[t](e);
                            });
                            var i = {};
                            [ "fail", "success", "complete" ].forEach(function(r) {
                                i[r] = e[r], e[r] = function(e) {
                                    n.$interceptors[t] && n.$interceptors[t][r] && (e = n.$interceptors[t][r].call(n, e)), 
                                    i[r] && i[r].call(n, e);
                                };
                            }), n.$addons.requestfix && "request" === t ? RequestMQ.request(e) : wx[t](e);
                        };
                    }
                }), e[t] = _native2.default[t]);
            });
        }
    } ]), e;
}();

exports.default = _class;