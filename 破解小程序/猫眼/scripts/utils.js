function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _url = require("../models/url"), _url2 = _interopRequireDefault(_url);

module.exports = {
    compareVersion: function(e, t) {
        e = e.split("."), t = t.split(".");
        for (var r = Math.max(e.length, t.length); e.length < r; ) e.push("0");
        for (;t.length < r; ) t.push("0");
        for (var n = 0; n < r; n++) {
            var u = parseInt(e[n], 10), i = parseInt(t[n], 10);
            if (u > i) return 1;
            if (u < i) return -1;
        }
        return 0;
    },
    parseQuery: function(e) {
        if ("string" == typeof e) {
            var t = void 0;
            return e.split("&").reduce(function(e, r) {
                return t = r.split("="), e[t[0]] = t[1], e;
            }, {});
        }
    },
    stringConcat: function() {
        return [].join.call(arguments, "");
    },
    shortCircuitArray: function(e, t) {
        return e && e.length ? e : t;
    },
    safeGet: function(e, t, r) {
        return t = Array.isArray(t) ? t : t.split("."), e = e[t[0]], e && t.length > 1 ? this.safeGet(e, t.slice(1), r) : void 0 === e ? r : e;
    },
    formatDate: function(e, t) {
        var r = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            S: e.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var n in r) new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[n] : ("00" + r[n]).substr(("" + r[n]).length)));
        return t;
    },
    throttle: function(e, t) {
        null != t && void 0 != t || (t = 1500);
        var r = null;
        return function() {
            var n = +new Date();
            (n - r > t || !r) && (r = n, e.apply(this, arguments));
        };
    },
    debounce: function(e, t) {
        var r = void 0;
        return function() {
            var n = this, u = arguments, i = function() {
                r = null, e.apply(n, u);
            };
            clearTimeout(r), r = setTimeout(i, t);
        };
    },
    forwardShareURL: function(e) {
        var t = getApp();
        e = e || _url2.default.getCurrentPageUrlWithArgs();
        return e = "pages/movie/index?" + t.shareParams({
            redirect: "/" + e
        });
    },
    getCityAlter: function() {
        var e = getApp(), t = this.safeGet(e, "$location.city", null), r = e.get("city-cache");
        return t || r || {
            id: 0
        };
    },
    formatMovieTime: function(e) {
        var t = Math.floor(e / 60), r = e % 60;
        return (t > 10 ? t : "0" + t) + ":" + (r > 10 ? r : "0" + r) + ":00";
    },
    getTextLen: function(e) {
        var t = 0;
        if (e) {
            t = e.length + e.replace(/[\u0020-\u007e\uff61-\uffef]/g, "").length;
        }
        return t;
    },
    formatTime: function(e) {
        var t = new Date(1e3 * e);
        return t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " " + (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":" + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":" + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds());
    }
};