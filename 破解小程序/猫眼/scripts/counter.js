var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
    }
    return t;
}, app = getApp();

module.exports = {
    init: function(t) {
        var e = this;
        this.timers = {}, this.config = _extends({
            page: app.page(),
            key: "default",
            total: 60,
            tick: function() {},
            end: function() {}
        }, t);
        var i = this.config, r = i.page, a = i.key, n = i.total, s = i.tick, c = i.end;
        return this.total = n, s.call(r, n), this.timers[a] = setInterval(function() {
            e.total = n -= 1, n > 0 && s.call(r, n), 0 === n && (c.call(r), e.clear(a));
        }, 1e3), this;
    },
    clear: function(t) {
        var e = this;
        if (t) return clearInterval(this.timers[t]), this;
        Object.keys(this.timers).forEach(function(t) {
            clearInterval(e.timers[t]);
        });
    }
};