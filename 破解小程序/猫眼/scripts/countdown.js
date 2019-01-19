function nowTime(e, i, t, n, o) {
    for (var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1e3, m = [], l = i.length, a = 0; a < l; a++) {
        m.push(Object.assign({}, i[a]));
        for (var c = 0; c < t.length; c++) {
            !timeObj[e][t[c]] && (timeObj[e][t[c]] = []), void 0 === timeObj[e][t[c]][a] && (timeObj[e][t[c]][a] = m[a][t[c]]);
            var v = getTime(timeObj[e][t[c]][a], o);
            m[a][t[c] + "_over"] = !1, isNaN(timeObj[e][t[c]][a]) || timeObj[e][t[c]][a] <= 0 ? m[a][t[c] + "_over"] = !0 : timeObj[e][t[c]][a] -= r, 
            m[a][t[c] + "_cd"] = v;
        }
    }
    n && n(m);
}

function getTime(e) {
    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], t = 0, n = 0, o = 0, r = 0, m = 0, l = {
        day: "",
        hour: "00",
        minutes: "00",
        second: "00",
        millSecond: 0
    };
    return e > 0 && (m = Math.floor(e % 1e3 / 100), e /= 1e3, t = Math.floor(e / 86400), 
    n = Math.floor(e / 3600) - 24 * t, o = Math.floor(e / 60) - 24 * t * 60 - 60 * n, 
    r = Math.floor(e) - 24 * t * 60 * 60 - 60 * n * 60 - 60 * o, i || (n += 24 * t, 
    t = ""), n <= 9 && (n = "0" + n), o <= 9 && (o = "0" + o), r <= 9 && (r = "0" + r), 
    l = {
        day: t,
        hour: n,
        minutes: o,
        second: r,
        millSecond: m
    }), l;
}

function clear(e) {
    timer[e] && clearInterval(timer[e]), timeObj[e] = {};
}

function init(e, i, t, n) {
    var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1e3;
    clear(e), timeObj[e] = {}, nowTime(e, i, t, n, o, r), timer[e] = setInterval(function() {
        nowTime(e, i, t, n, o, r);
    }, r);
}

function initObj(e, i, t, n, o) {
    var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1e3;
    init(e, [ i ], t, function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        n && n(e[0]);
    }, o, r);
}

var timer = {}, timeObj = {};

module.exports = {
    clear: clear,
    getTime: getTime,
    init: init,
    initObj: initObj
};