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

var _slicedToArray = function() {
    function e(e, t) {
        var i = [], n = !0, o = !1, r = void 0;
        try {
            for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), 
            !t || i.length !== t); n = !0) ;
        } catch (e) {
            o = !0, r = e;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (o) throw r;
            }
        }
        return i;
    }
    return function(t, i) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _createClass = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), _sliderAPI = require("./sliderAPI"), _sliderAPI2 = _interopRequireDefault(_sliderAPI), _config = require("../../utils/config"), SliderSDK = function() {
    function e(t) {
        var i = t.requestCode, n = t.pageData;
        _classCallCheck(this, e);
        var o = _sliderAPI2.default.getSystemInfo() || {}, r = o.windowWidth, s = void 0 === r ? 375 : r, a = s / 375, u = [ 50 * a, 50 * a ], l = [ 270 * a, 52 * a ], c = [ 50 * a, 50 * a ], d = Date.now(), h = l[0] - u[0], v = this;
        Object.assign(v, {
            requestCode: i,
            windowWidth: s,
            zoom: a,
            btn: u,
            initTime: d,
            slideWidth: h,
            isDone: !1,
            zone: l,
            client: c,
            Timestamp: [ d ],
            count: 0,
            timeout: 0,
            points: null,
            trajectory: [],
            pageData: n
        });
    }
    return _createClass(e, [ {
        key: "sliderTouchStart",
        value: function(e) {
            var t = this;
            t.Timestamp.push(Date.now()), t.count += 1, t.points = [], t.addPoint(e);
        }
    }, {
        key: "sliderTouchMove",
        value: function(e) {
            var t = this.isDone, i = this.slideWidth;
            if (t) return {
                isDone: t,
                deltaX: i,
                slideWidth: i
            };
            var n = this.addPoint(e);
            return this.getPosition(n);
        }
    }, {
        key: "sliderTouchCancel",
        value: function(e) {
            this.slidEnd();
        }
    }, {
        key: "sliderTouchEnd",
        value: function(e) {}
    }, {
        key: "getPoint",
        value: function(e) {
            var t = e.touches[0] || {};
            return [ t.clientX, t.clientY ];
        }
    }, {
        key: "addPoint",
        value: function(e) {
            var t = this.points, i = this.initTime, n = this.getPoint(e), o = _slicedToArray(n, 2), r = o[0], s = o[1];
            return this.points = t || [], this.points.push([ 0, r, s, Date.now() - i ]), [ r, s ];
        }
    }, {
        key: "getPosition",
        value: function(e) {
            var t = _slicedToArray(e, 2), i = t[0], n = (t[1], this.slideWidth), o = _slicedToArray(this.points, 1), r = o[0], s = this.isDone, a = i - r[1];
            return a < 0 && (a = 0), a >= n && (a = n, this.isDone = !0, this.slidEnd()), {
                deltaX: a,
                slideWidth: n,
                isDone: s
            };
        }
    }, {
        key: "slidEnd",
        value: function() {
            var e = this, t = e.trajectory, i = e.points, n = void 0 === i ? [] : i, o = e.Timestamp, r = e.pageData, s = void 0 === r ? {} : r, a = e.requestCode;
            t = t.slice(-3, t.length), t.push({
                point: n,
                vector: {
                    orientation: "h"
                }
            }), e.trajectory = t, e.points = null, o[o.length - 1] - o[0] > 3e3 && (e.timeout += 1), 
            e.setData();
            var u = s.action, l = s.id, c = {
                action: u,
                id: l,
                requestCode: a,
                behavior: e.behavior
            };
            _sliderAPI2.default.verfiySlide(c).then(function(e) {
                var t = getApp().$loginPage, i = t.data.requestCode, n = e.data, o = e.status, r = e.error;
                if (1 === o) wx.showToast({
                    title: "验证成功",
                    complete: function() {
                        t.setData({
                            isShow: !1
                        });
                        var e = "";
                        n && (e = n.response_code), t.triggerEvent("sliderEvent", {
                            status: 1,
                            requestCode: i,
                            responseCode: e
                        }, {
                            bubbles: !0,
                            composed: !0
                        });
                    }
                }); else if (0 === o && 121048 === r.code) {
                    var s = r.request_code;
                    t.setData({
                        "sdk.requestCode": s
                    }), t.setData({
                        codeImage: _config.baseUrl + "/v2/captcha?request_code=" + i + "&action=" + u,
                        validStep: "code"
                    });
                } else t.triggerEvent("sliderEvent", {
                    status: 0,
                    code: r.code
                }, {
                    bubbles: !0,
                    composed: !0
                });
            }).catch(function(e) {
                getApp().$loginPage.triggerEvent("sliderEvent", {
                    status: 0,
                    code: 99999
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
        }
    }, {
        key: "setData",
        value: function() {
            var e = this.zone, t = this.client, i = this.Timestamp, n = this.count, o = this.timeout, r = this.trajectory, s = {
                env: {
                    zone: e,
                    client: t,
                    Timestamp: i.slice(0, 2),
                    count: n,
                    timeout: o
                },
                trajectory: r
            };
            this.behavior = s;
        }
    } ]), e;
}();

exports.default = SliderSDK;