var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

!function(n) {
    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r;
    }
    function r(n, t) {
        return n << t | n >>> 32 - t;
    }
    function o(n, o, e, u, f, c) {
        return t(r(t(t(o, n), t(u, c)), f), e);
    }
    function e(n, t, r, e, u, f, c) {
        return o(t & r | ~t & e, n, t, u, f, c);
    }
    function u(n, t, r, e, u, f, c) {
        return o(t & e | r & ~e, n, t, u, f, c);
    }
    function f(n, t, r, e, u, f, c) {
        return o(t ^ r ^ e, n, t, u, f, c);
    }
    function c(n, t, r, e, u, f, c) {
        return o(r ^ (t | ~e), n, t, u, f, c);
    }
    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var o, i, d, l, a, y = 1732584193, h = -271733879, m = -1732584194, p = 271733878;
        for (o = 0; o < n.length; o += 16) i = y, d = h, l = m, a = p, y = e(y, h, m, p, n[o], 7, -680876936), 
        p = e(p, y, h, m, n[o + 1], 12, -389564586), m = e(m, p, y, h, n[o + 2], 17, 606105819), 
        h = e(h, m, p, y, n[o + 3], 22, -1044525330), y = e(y, h, m, p, n[o + 4], 7, -176418897), 
        p = e(p, y, h, m, n[o + 5], 12, 1200080426), m = e(m, p, y, h, n[o + 6], 17, -1473231341), 
        h = e(h, m, p, y, n[o + 7], 22, -45705983), y = e(y, h, m, p, n[o + 8], 7, 1770035416), 
        p = e(p, y, h, m, n[o + 9], 12, -1958414417), m = e(m, p, y, h, n[o + 10], 17, -42063), 
        h = e(h, m, p, y, n[o + 11], 22, -1990404162), y = e(y, h, m, p, n[o + 12], 7, 1804603682), 
        p = e(p, y, h, m, n[o + 13], 12, -40341101), m = e(m, p, y, h, n[o + 14], 17, -1502002290), 
        h = e(h, m, p, y, n[o + 15], 22, 1236535329), y = u(y, h, m, p, n[o + 1], 5, -165796510), 
        p = u(p, y, h, m, n[o + 6], 9, -1069501632), m = u(m, p, y, h, n[o + 11], 14, 643717713), 
        h = u(h, m, p, y, n[o], 20, -373897302), y = u(y, h, m, p, n[o + 5], 5, -701558691), 
        p = u(p, y, h, m, n[o + 10], 9, 38016083), m = u(m, p, y, h, n[o + 15], 14, -660478335), 
        h = u(h, m, p, y, n[o + 4], 20, -405537848), y = u(y, h, m, p, n[o + 9], 5, 568446438), 
        p = u(p, y, h, m, n[o + 14], 9, -1019803690), m = u(m, p, y, h, n[o + 3], 14, -187363961), 
        h = u(h, m, p, y, n[o + 8], 20, 1163531501), y = u(y, h, m, p, n[o + 13], 5, -1444681467), 
        p = u(p, y, h, m, n[o + 2], 9, -51403784), m = u(m, p, y, h, n[o + 7], 14, 1735328473), 
        h = u(h, m, p, y, n[o + 12], 20, -1926607734), y = f(y, h, m, p, n[o + 5], 4, -378558), 
        p = f(p, y, h, m, n[o + 8], 11, -2022574463), m = f(m, p, y, h, n[o + 11], 16, 1839030562), 
        h = f(h, m, p, y, n[o + 14], 23, -35309556), y = f(y, h, m, p, n[o + 1], 4, -1530992060), 
        p = f(p, y, h, m, n[o + 4], 11, 1272893353), m = f(m, p, y, h, n[o + 7], 16, -155497632), 
        h = f(h, m, p, y, n[o + 10], 23, -1094730640), y = f(y, h, m, p, n[o + 13], 4, 681279174), 
        p = f(p, y, h, m, n[o], 11, -358537222), m = f(m, p, y, h, n[o + 3], 16, -722521979), 
        h = f(h, m, p, y, n[o + 6], 23, 76029189), y = f(y, h, m, p, n[o + 9], 4, -640364487), 
        p = f(p, y, h, m, n[o + 12], 11, -421815835), m = f(m, p, y, h, n[o + 15], 16, 530742520), 
        h = f(h, m, p, y, n[o + 2], 23, -995338651), y = c(y, h, m, p, n[o], 6, -198630844), 
        p = c(p, y, h, m, n[o + 7], 10, 1126891415), m = c(m, p, y, h, n[o + 14], 15, -1416354905), 
        h = c(h, m, p, y, n[o + 5], 21, -57434055), y = c(y, h, m, p, n[o + 12], 6, 1700485571), 
        p = c(p, y, h, m, n[o + 3], 10, -1894986606), m = c(m, p, y, h, n[o + 10], 15, -1051523), 
        h = c(h, m, p, y, n[o + 1], 21, -2054922799), y = c(y, h, m, p, n[o + 8], 6, 1873313359), 
        p = c(p, y, h, m, n[o + 15], 10, -30611744), m = c(m, p, y, h, n[o + 6], 15, -1560198380), 
        h = c(h, m, p, y, n[o + 13], 21, 1309151649), y = c(y, h, m, p, n[o + 4], 6, -145523070), 
        p = c(p, y, h, m, n[o + 11], 10, -1120210379), m = c(m, p, y, h, n[o + 2], 15, 718787259), 
        h = c(h, m, p, y, n[o + 9], 21, -343485551), y = t(y, i), h = t(h, d), m = t(m, l), 
        p = t(p, a);
        return [ y, h, m, p ];
    }
    function d(n) {
        var t, r = "", o = 32 * n.length;
        for (t = 0; t < o; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r;
    }
    function l(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var o = 8 * n.length;
        for (t = 0; t < o; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r;
    }
    function a(n) {
        return d(i(l(n), 8 * n.length));
    }
    function y(n, t) {
        var r, o, e = l(n), u = [], f = [];
        for (u[15] = f[15] = void 0, e.length > 16 && (e = i(e, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ e[r], 
        f[r] = 1549556828 ^ e[r];
        return o = i(u.concat(l(t)), 512 + 8 * t.length), d(i(f.concat(o), 640));
    }
    function h(n) {
        var t, r, o = "0123456789abcdef", e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += o.charAt(t >>> 4 & 15) + o.charAt(15 & t);
        return e;
    }
    function m(n) {
        return unescape(encodeURIComponent(n));
    }
    function p(n) {
        return a(m(n));
    }
    function g(n) {
        return h(p(n));
    }
    function v(n, t) {
        return y(m(n), m(t));
    }
    function b(n, t) {
        return h(v(n, t));
    }
    function s(n, t, r) {
        return t ? r ? v(t, n) : b(t, n) : r ? p(n) : g(n);
    }
    "function" == typeof define && define.amd ? define(function() {
        return s;
    }) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = s : n.md5 = s;
}(void 0);