function gaussBlur(r, o) {
    var f, t, e, a, n, s, u, x, i, h, l = r.data, m = r.width, y = r.height, g = [], c = 0;
    for (s = 1 / (5 * Math.sqrt(2 * Math.PI)), n = -.02, u = 0, f = -10; f <= 10; f++, 
    u++) a = s * Math.exp(n * f * f), g[u] = a, c += a;
    for (u = 0, h = g.length; u < h; u++) g[u] /= c;
    if (o) for (var d = 0; d < o.length; d++) {
        var p = o[d], v = function(r, o) {
            return r >= 0 ? r : o + r;
        }, M = p.x && p.x.min ? v(p.x.min, m) : 0, B = p.x && p.x.max ? v(p.x.max, m) : m, P = p.y && p.y.min ? v(p.y.min, y) : 0, _ = p.y && p.y.max ? v(p.y.max, y) : y;
        for (t = P; t < _; t++) for (f = M; f < B; f++) {
            for (e = a = n = s = 0, c = 0, x = -10; x <= 10; x++) (i = f + x) >= 0 && i < m && (u = 4 * (t * m + i), 
            e += l[u] * g[x + 10], a += l[u + 1] * g[x + 10], n += l[u + 2] * g[x + 10], c += g[x + 10]);
            u = 4 * (t * m + f), l[u] = e / c, l[u + 1] = a / c, l[u + 2] = n / c;
        }
        for (f = M; f < B; f++) for (t = P; t < _; t++) {
            for (e = a = n = s = 0, c = 0, x = -10; x <= 10; x++) (i = t + x) >= 0 && i < y && (u = 4 * (i * m + f), 
            e += l[u] * g[x + 10], a += l[u + 1] * g[x + 10], n += l[u + 2] * g[x + 10], c += g[x + 10]);
            u = 4 * (t * m + f), l[u] = e / c, l[u + 1] = a / c, l[u + 2] = n / c;
        }
    } else {
        for (t = 0; t < y; t++) for (f = 0; f < m; f++) {
            for (e = a = n = s = 0, c = 0, x = -10; x <= 10; x++) (i = f + x) >= 0 && i < m && (u = 4 * (t * m + i), 
            e += l[u] * g[x + 10], a += l[u + 1] * g[x + 10], n += l[u + 2] * g[x + 10], c += g[x + 10]);
            u = 4 * (t * m + f), l[u] = e / c, l[u + 1] = a / c, l[u + 2] = n / c;
        }
        for (f = 0; f < m; f++) for (t = 0; t < y; t++) {
            for (e = a = n = s = 0, c = 0, x = -10; x <= 10; x++) (i = t + x) >= 0 && i < y && (u = 4 * (i * m + f), 
            e += l[u] * g[x + 10], a += l[u + 1] * g[x + 10], n += l[u + 2] * g[x + 10], c += g[x + 10]);
            u = 4 * (t * m + f), l[u] = e / c, l[u + 1] = a / c, l[u + 2] = n / c;
        }
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.gaussBlur = gaussBlur;