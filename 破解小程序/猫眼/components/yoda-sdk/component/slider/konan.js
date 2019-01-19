function Mitsuhiko(r, t) {
    return void 0 === r || null === r || 0 === r.length ? r : (r = Aoko(r), t = Aoko(t), 
    Wataru(Kazuha(Megure(r, !0), Ayumi(Megure(t, !1))), !1));
}

function Aoko(r) {
    if (/^[\x00-\x7f]*$/.test(r)) return r;
    for (var t = [], e = r.length, n = 0, o = 0; n < e; ++n, ++o) {
        var a = r.charCodeAt(n);
        if (a < 128) t[o] = r.charAt(n); else if (a < 2048) t[o] = String.fromCharCode(192 | a >> 6, 128 | 63 & a); else if (a < 55296 || a > 57343) t[o] = String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | 63 & a); else if (n + 1 < e) {
            var i = r.charCodeAt(n + 1);
            if (a < 56320 && 56320 <= i && i <= 57343) {
                var u = 65536 + ((1023 & a) << 10 | 1023 & i);
                t[o] = String.fromCharCode(240 | u >> 18 & 63, 128 | u >> 12 & 63, 128 | u >> 6 & 63, 128 | 63 & u), 
                ++n;
                continue;
            }
        }
    }
    return t.join("");
}

function Wataru(r, t) {
    var e = r.length, n = e << 2;
    if (t) {
        var o = r[e - 1];
        if (n -= 4, o < n - 3 || o > n) return null;
        n = o;
    }
    for (var a = 0; a < e; a++) r[a] = String.fromCharCode(255 & r[a], r[a] >>> 8 & 255, r[a] >>> 16 & 255, r[a] >>> 24 & 255);
    var i = r.join("");
    return t ? i.substring(0, n) : i;
}

function Megure(r, t) {
    var e = r.length, n = e >> 2;
    0 != (3 & e) && ++n;
    var o;
    t ? (o = new Array(n + 1), o[n] = e) : o = new Array(n);
    for (var a = 0; a < e; ++a) o[a >> 2] |= r.charCodeAt(a) << ((3 & a) << 3);
    return o;
}

function Ayumi(r) {
    return r.length < 4 && (r.length = 4), r;
}

function Kazuha(r, t) {
    var e, n, o, a, i, u, f = r.length, h = f - 1;
    for (n = r[h], o = 0, u = 0 | Math.floor(6 + 52 / f); u > 0; --u) {
        for (o = o + 2654435769 & 4294967295, a = o >>> 2 & 3, i = 0; i < h; ++i) e = r[i + 1], 
        n = r[i] = r[i] + ((n >>> 5 ^ e << 2) + (e >>> 3 ^ n << 4) ^ (o ^ e) + (t[3 & i ^ a] ^ n)) & 4294967295;
        e = r[0], n = r[h] = r[h] + ((n >>> 5 ^ e << 2) + (e >>> 3 ^ n << 4) ^ (o ^ e) + (t[3 & h ^ a] ^ n)) & 4294967295;
    }
    return r;
}

function Kaito(r, t) {
    return Takagi(Mitsuhiko(r, t));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var Takagi = function() {
    var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return function(t) {
        var e, n, o, a, i, u, f;
        for (n = o = 0, a = t.length, i = a % 3, a -= i, u = a / 3 << 2, i > 0 && (u += 4), 
        e = new Array(u); n < a; ) f = t.charCodeAt(n++) << 16 | t.charCodeAt(n++) << 8 | t.charCodeAt(n++), 
        e[o++] = r[f >> 18] + r[f >> 12 & 63] + r[f >> 6 & 63] + r[63 & f];
        return 1 == i ? (f = t.charCodeAt(n++), e[o++] = r[f >> 2] + r[(3 & f) << 4] + "==") : 2 == i && (f = t.charCodeAt(n++) << 8 | t.charCodeAt(n++), 
        e[o++] = r[f >> 10] + r[f >> 4 & 63] + r[(15 & f) << 2] + "="), e.join("");
    };
}(), konan = {};

konan.Kaito = Kaito, exports.default = konan;