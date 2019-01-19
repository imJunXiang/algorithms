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
}(), _konan = require("./konan"), _konan2 = _interopRequireDefault(_konan), _config = require("../../utils/config"), API = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, null, [ {
        key: "getSystemInfo",
        value: function() {
            return wx.getSystemInfoSync();
        }
    }, {
        key: "getPageData",
        value: function(e) {
            var t = {
                requestCode: e,
                feVersion: _config.feVersion.slider,
                source: _config.source
            };
            return t._token = _config.rohr.r(t), new Promise(function(e, n) {
                wx.request({
                    url: _config.baseUrl + "/v2/ext_api/page_data",
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: t,
                    success: function(t) {
                        var n = t.data, r = n.data || {};
                        e({
                            action: r.action,
                            id: r.type,
                            request_code: r.request_code,
                            notifyUrl: r.notifyUrl
                        });
                    },
                    fail: function(e) {
                        n(e);
                    }
                });
            });
        }
    }, {
        key: "getNotifyUrl",
        value: function(e, t, n) {
            var r = -1 === e.indexOf("?") ? "?" : "&";
            return new Promise(function(o, a) {
                wx.request({
                    url: "" + e + r + "request_code=" + t + "&response_code=" + n,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        e.data;
                        o();
                    },
                    fail: function(e) {
                        o();
                    }
                });
            });
        }
    }, {
        key: "verfiySlide",
        value: function(e) {
            var t = e.action, n = e.id, r = e.requestCode, o = e.behavior, a = void 0 === o ? null : o, i = e.captchacode, c = void 0 === i ? "" : i, u = {
                id: n,
                request_code: r,
                fingerprint: ""
            }, s = this;
            return a && (u.behavior = _konan2.default.Kaito(JSON.stringify(a), r)), c && (u.captchacode = c), 
            u._token = _config.rohr.r(u), new Promise(function(e, r) {
                wx.request({
                    url: _config.baseUrl + "/v2/ext_api/" + t + "/verify?id=" + n,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: u,
                    success: function(t) {
                        var n = getApp().$loginPage, r = n.data.pageData, o = t.data, a = o.data, i = o.status, c = o.error;
                        if (1 === i && r.notifyUrl) {
                            var u = r.notifyUrl;
                            s.getNotifyUrl(u, r.request_code, a.response_code).then(function(t) {
                                e({
                                    status: i,
                                    error: c,
                                    data: a
                                });
                            });
                        } else e({
                            status: i,
                            error: c,
                            data: a
                        });
                    },
                    fail: function(e) {
                        r(e);
                    }
                });
            });
        }
    }, {
        key: "verfiyCode",
        value: function(e) {
            var t = e.action, n = e.id, r = e.requestCode, o = e.captchacode;
            return this.verfiySlide({
                action: t,
                id: n,
                requestCode: r,
                captchacode: o
            });
        }
    } ]), e;
}();

exports.default = API;