function _interopRequireDefault(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

function _toConsumableArray(n) {
    if (Array.isArray(n)) {
        for (var t = 0, e = Array(n.length); t < n.length; t++) e[t] = n[t];
        return e;
    }
    return Array.from(n);
}

var _extends = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
        var e = arguments[t];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
}, _countdown = require("../../../../scripts/countdown"), _countdown2 = _interopRequireDefault(_countdown);

Component({
    properties: {
        timeStamp: {
            type: Number,
            value: 0
        },
        uiShow: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        name: "countDown",
        millSecond: 0,
        second: 0,
        minutes: 0,
        hour: 0
    },
    ready: function() {
        this.initCountDown(this.data.timeStamp);
    },
    detached: function() {
        this.clearCountDown();
    },
    methods: {
        initCountDown: function(n) {
            var t = this;
            _countdown2.default.initObj(this.data.name, {
                endTime: n
            }, [ "endTime" ], function(n) {
                var e = n.endTime_cd, o = e.millSecond, r = e.second, a = e.minutes, u = e.hour, i = {
                    millSecond: o,
                    second: r,
                    minutes: a,
                    hour: u % 24,
                    day: Math.floor(u / 24)
                };
                !0 === n.endTime_over && t.clearCountDown(), t.setData.apply(t, _toConsumableArray(i)), 
                t.triggerEvent("countDownEvent", _extends({}, i));
            }, !1, 100);
        },
        clearCountDown: function() {
            _countdown2.default.clear(this.data.name);
        }
    }
});