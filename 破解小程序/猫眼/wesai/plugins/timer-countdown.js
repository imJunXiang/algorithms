function _classCallCheck(_, e) {
    if (!(_ instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _class, _temp, _initialiseProps, TimerCountDown = (_temp = _class = function _(e) {
    _classCallCheck(this, _), _initialiseProps.call(this), this.reset(e);
}, _initialiseProps = function() {
    this.on = function(_, e) {
        var t = this;
        if ("function" == typeof e && (_ == t.EVENT_LOOP || _ == t.EVENT_STOP)) return void t.__delegates__.push({
            type: _,
            delegate: e
        });
        t.log("TimerCountDown->on: 参数不合法!!");
    }, this.off = function(_, e) {
        var t = this;
        t.log("TimerCountDown->off: type: " + _ + "; delegate: " + e);
        for (var i = 0, s = t.__delegates__.length; i < s; i++) {
            var n = t.__delegates__[i];
            n.type == _ && n.delegate == e && t.__delegates__.splice(i, 1);
        }
    }, this.getMs = function() {
        return this.__ms__;
    }, this.getSec = function() {
        return this.__sec__;
    }, this.getMin = function() {
        return this.__min__;
    }, this.getHr = function() {
        return this.__hr__;
    }, this.run = function() {
        var _ = this, e = function e() {
            _.__ms__ -= 1e3, _.reset(_.__ms__ / 1e3), _.__fire__(_.EVENT_LOOP), _.__ms__ > 0 ? _.__time__ = setTimeout(e, 1e3) : _.stop(!0);
        };
        _.__time__ = setTimeout(e, 0), _.log("TimerCountDown->run: 启动计时器");
    }, this.stop = function(_) {
        var e = this;
        e.log("TimerCountDown->stop: 停止计时器"), clearTimeout(e.__time__), _ && (this.__fire__(e.EVENT_STOP), 
        this.destroy());
    }, this.reset = function(_) {
        var e = this;
        if ((_ = "number" == typeof _ ? _ : 0) < 0) return void e.log("TimerCountDown->reset: sec 参数不合法", _);
        var t = _ % 60, i = parseInt(_ / 60);
        e.__ms__ = 1e3 * _, e.__sec__ = 0 == t ? 0 : t, e.__min__ = i, e.__hr__ = parseInt(i / 60), 
        e.log(JSON.stringify({
            ms: e.__ms__,
            sec: e.__sec__,
            min: i,
            hr: e.__hr__
        }));
    }, this.destroy = function() {
        var _ = this;
        clearTimeout(_.__time__), _.__time__ = 0;
        for (var e = 0, t = _.__delegates__.length; e < t; e++) {
            var i = this.__delegates__[e];
            this.__delegates__.slice(e, 1), i.type = null, i.delegate = null, delete i.type, 
            delete i.delegate, i = null;
        }
        _.log("TimerCountDown->destroy: 销毁实例对象;", _.__delegates__);
    }, this.__fire__ = function(_) {
        for (var e = this, t = 0, i = e.__delegates__.length; t < i; t++) {
            var s = e.__delegates__[t];
            s.type == _ && s.delegate.call(e);
        }
    }, this.log = function() {
        this.debug;
    }, this.__ms__ = 0, this.__sec__ = 0, this.__min__ = 0, this.__hr__ = 0, this.__time__ = 0, 
    this.__delegates__ = [], this.EVENT_LOOP = "event-loop", this.EVENT_STOP = "event-stop", 
    this.debug = !1;
}, _temp);

exports.default = TimerCountDown;