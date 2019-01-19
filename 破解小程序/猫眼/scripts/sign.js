function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, _md = require("md5"), _md2 = _interopRequireDefault(_md), app = getApp(), Sign = function(e, t) {
    if (e) {
        e = DisposeUndefined(e);
        var r = new Date().getTime(), n = randomString();
        e = t ? _extends({}, e, {
            time_stamp: r,
            app_key: t,
            rand_str: n
        }) : _extends({}, e, {
            time_stamp: r,
            rand_str: n
        }), e = objKeySort(e);
        var o = "", i = Object.keys(e), a = !0, l = !1, y = void 0;
        try {
            for (var f, d = i[Symbol.iterator](); !(a = (f = d.next()).done); a = !0) {
                var u = f.value;
                o += "&" + u + "=" + e[u];
            }
        } catch (e) {
            l = !0, y = e;
        } finally {
            try {
                !a && d.return && d.return();
            } finally {
                if (l) throw y;
            }
        }
        o.length > 0 && (o = o.slice(1));
        var s = (0, _md2.default)(o);
        e.sign = s, e.app_key && delete e.app_key;
    }
    return e;
}, SignFission = function(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "1.0", n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "MD5", o = app.channelId.toString() || "70001", i = new Date().getTime().toString(), a = {
        merCode: o,
        timeStamp: i,
        version: r,
        signType: n,
        bizData: e
    };
    a = objKeySort(a);
    var l = "", y = Object.keys(a), f = !0, d = !1, u = void 0;
    try {
        for (var s, p = y[Symbol.iterator](); !(f = (s = p.next()).done); f = !0) {
            var v = s.value;
            l += "&" + v + "=" + a[v];
        }
    } catch (e) {
        d = !0, u = e;
    } finally {
        try {
            !f && p.return && p.return();
        } finally {
            if (d) throw u;
        }
    }
    l += "&key=" + t, l.length > 0 && (l = l.slice(1));
    var c = (0, _md2.default)(l);
    return a.signMsg = c, a.key && delete a.key, a;
}, objKeySort = function(e) {
    for (var t = Object.keys(e).sort(), r = {}, n = 0; n < t.length; n++) {
        var o = e[t[n]];
        void 0 !== o && "" !== o && ("object" === (void 0 === o ? "undefined" : _typeof(o)) ? r[t[n]] = JSON.stringify(o) : r[t[n]] = o);
    }
    return r;
}, DisposeUndefined = function(e) {
    var t = Object.keys(e), r = !0, n = !1, o = void 0;
    try {
        for (var i, a = t[Symbol.iterator](); !(r = (i = a.next()).done); r = !0) {
            var l = i.value;
            void 0 !== e[l] && "" !== e[l] || delete e[l];
        }
    } catch (e) {
        n = !0, o = e;
    } finally {
        try {
            !r && a.return && a.return();
        } finally {
            if (n) throw o;
        }
    }
    return e;
}, randomString = function() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16, t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890", r = t.length, n = "", o = 0; o < e; o++) n += t.charAt(Math.floor(Math.random() * r));
    return n;
};

module.exports = {
    Sign: Sign,
    SignFission: SignFission
};