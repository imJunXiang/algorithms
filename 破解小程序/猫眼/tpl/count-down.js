var getHMS = function(e) {
    return {
        hour: Math.floor(e / 36e5),
        minutes: Math.floor(e / 6e4 % 60),
        second: Math.floor(e / 1e3 % 60)
    };
}, getRemainTime = function(e, t) {
    var o = new Date(1e3 * e).getTime(), n = new Date().getTime(), i = {
        day: 0,
        hour: "00",
        minutes: "00",
        second: "00"
    }, r = o - n, u = !0;
    if (r > 0) {
        var a = getHMS(r), s = a.hour, m = a.minutes, h = a.second, c = 0;
        if (u = !1, t.isShowDay) {
            s = s > 24 ? 23 : s, c = Math.floor(r / 864e5);
            var f = r - 1e3 * c * 60 * 60 * 24, d = getHMS(f);
            s = d.hour, m = d.minutes, h = d.second;
        }
        i = {
            day: c > 0 ? c + "天" : 0,
            hour: s > 99 ? 99 : s < 10 ? "0" + s : s,
            minutes: m < 10 ? "0" + m : m,
            second: h < 10 ? "0" + h : h
        };
    }
    return {
        time: i,
        over: u
    };
};

module.exports = function(e, t) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return function n() {
        var i = getRemainTime(e, o), r = i.time, u = i.over;
        t(r), u || setTimeout(function() {
            n();
        }, 1e3);
    }(), this;
};