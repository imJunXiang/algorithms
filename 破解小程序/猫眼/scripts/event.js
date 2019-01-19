module.exports = {
    on: function(t, e) {
        var n = this._events[t] || [];
        return n.push(e), this._events[t] = n, this;
    },
    off: function(t, e) {
        if (!t && !e) return this._events = {}, this;
        if (!e) return delete this._events[t], this;
        var n = this._events[t];
        return n && (this._events[t] = n.filter(function(t) {
            return t !== e;
        })), this;
    },
    emit: function(t) {
        for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) n[i - 1] = arguments[i];
        (this._events[t] || []).forEach(function(t) {
            t.apply(void 0, n);
        });
    },
    attach: function(t) {
        for (var e = [ "_events", "on", "off", "emit" ], n = 0; n < e.length; n++) {
            var i = e[n];
            if (t[i]) throw Error("event attach fail, attr '" + i + "' exist");
        }
        t._events = {}, t.on = this.on, t.off = this.off, t.emit = this.emit;
    }
};