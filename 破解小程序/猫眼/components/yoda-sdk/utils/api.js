function _classCallCheck(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _config = require("./config"), API = function e() {
    _classCallCheck(this, e), this.getPageData = function(e, o) {
        var t = {
            requestCode: e,
            feVersion: _config.feVersion[o] || "0.1.0",
            source: _config.source
        };
        return t._token = encodeURIComponent(_config.rohr.r(t)), new Promise(function(e, o) {
            wx.request({
                method: "POST",
                url: _config.baseUrl + "/v2/ext_api/page_data",
                data: t,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, r = n.status, a = n.data, i = n.error;
                    200 === t.statusCode ? e({
                        status: r,
                        data: a,
                        error: i
                    }) : o(t);
                },
                fail: function(e) {
                    o(e);
                }
            });
        });
    }, this.sendInfo = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = e.request_code, t = e.type, n = e.action, r = void 0 === n ? "" : n, a = e.options, i = void 0 === a ? null : a, s = {
            request_code: o
        };
        if (i && "object" === (void 0 === i ? "undefined" : _typeof(i))) for (var c in i) i.hasOwnProperty(c) && (s[c] = i[c]);
        return s._token = encodeURIComponent(_config.rohr.r(s)), new Promise(function(e, o) {
            wx.request({
                url: _config.baseUrl + "/v2/ext_api/" + r + "/info?id=" + t,
                method: "POST",
                data: s,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, r = n.status, a = n.data, i = n.error;
                    200 === t.statusCode ? e({
                        status: r,
                        data: a,
                        error: i
                    }) : o("");
                },
                fail: function(e) {
                    o(e);
                }
            });
        });
    }, this.verify = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = e.request_code, t = e.type, n = e.action, r = void 0 === n ? "" : n, a = e.options, i = void 0 === a ? null : a, s = {
            request_code: o
        };
        if (i && "object" === (void 0 === i ? "undefined" : _typeof(i))) for (var c in i) i.hasOwnProperty(c) && (s[c] = i[c]);
        return s._token = encodeURIComponent(_config.rohr.r(s)), new Promise(function(e, o) {
            wx.request({
                url: _config.baseUrl + "/v2/ext_api/" + r + "/verify?id=" + t,
                method: "POST",
                data: s,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data, r = n.status, a = n.data, i = n.error;
                    200 === t.statusCode ? e({
                        status: r,
                        data: a,
                        error: i
                    }) : o();
                },
                fail: function(e) {
                    o(e);
                }
            });
        });
    };
};

exports.default = API;