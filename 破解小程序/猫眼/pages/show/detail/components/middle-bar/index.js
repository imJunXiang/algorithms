function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var _utils = require("../../../../../scripts/utils"), _utils2 = _interopRequireDefault(_utils);

Component({
    properties: {
        saleStatus: {
            type: Number,
            observer: function(t) {
                this.setShowStatus(t);
            }
        },
        beforeSaleStatus: {
            type: Object,
            observer: function(t) {
                this.setHasOnSaleTime(t), this.formatOnSaleTime(t), this.fomatRemainText(this.data.mistiming, this.data.currentTime, t);
            }
        },
        tagStatus: {
            type: Number,
            value: 2,
            observer: function(t) {
                this.setHasTag(t);
            }
        },
        mistiming: {
            type: Number,
            observer: function(t) {
                this.fomatRemainText(t, this.data.currentTime, this.data.beforeSaleStatus);
            }
        },
        currentTime: {
            type: Number,
            observer: function(t) {
                this.fomatRemainText(this.data.mistiming, t, this.data.beforeSaleStatus);
            }
        },
        isNeedOnSaleRemind: {
            type: Number,
            value: 0
        }
    },
    data: {
        show: !1,
        hasOnSaleTime: !1,
        hasTag: !1,
        onSaleTime: "",
        remainText: "",
        remainInfo: null
    },
    attached: function() {
        this.setShowStatus(this.data.saleStatus), this.setHasOnSaleTime(this.data.beforeSaleStatus), 
        this.setHasTag(this.data.tagStatus), this.formatOnSaleTime(this.data.beforeSaleStatus), 
        this.fomatRemainText(this.data.mistiming, this.data.currentTime, this.data.beforeSaleStatus);
    },
    methods: {
        noop: function() {},
        setShowStatus: function(t) {
            this.setData({
                show: 1 === t
            });
        },
        setHasOnSaleTime: function(t) {
            t && this.setData({
                hasOnSaleTime: !!t.onSaleTime
            });
        },
        setHasTag: function(t) {
            this.setData({
                hasTag: 0 === t || 1 == t
            });
        },
        formatOnSaleTime: function(t) {
            if (t) {
                var e = t.onSaleTime;
                if (e) {
                    var a = new Date(e), s = a.getMonth() + 1, i = a.getDate(), n = a.getHours(), o = a.getMinutes(), u = a.getSeconds(), r = s, l = i, m = n > 9 ? n : "0" + n, f = o > 9 ? o : "0" + o, h = u > 9 ? u : "0" + u, S = r + "月" + l + "日 " + m + " : " + f + " : " + h;
                    this.setData({
                        onSaleTime: S,
                        onSaleTimeInfo: {
                            monthText: r,
                            dayText: l,
                            hourText: m,
                            minuteText: f,
                            secondText: h
                        }
                    });
                }
            }
        },
        fomatRemainText: function(t, e, a) {
            if (e > 0 && a && a.onSaleTime) {
                var s = e - t, i = a.onSaleTime - s, n = this.calculateLeftDays(a.onSaleTime, s), o = this.fomatLeftTime(i), u = o.leftHours, r = o.leftMinutes, l = o.leftSeconds, m = o.allHours;
                this.setData({
                    remainInfo: {
                        allHours: m,
                        leftDays: n,
                        leftHours: u,
                        leftMinutes: r,
                        leftSeconds: l
                    }
                });
            }
        },
        fomatLeftTime: function(t) {
            return {
                allHours: t / 1e3 / 60 / 60,
                leftHours: this._pad(parseInt(t / 1e3 / 60 / 60 % 24, 10)),
                leftMinutes: this._pad(parseInt(t / 1e3 / 60 % 60, 10)),
                leftSeconds: this._pad(parseInt(t / 1e3 % 60, 10))
            };
        },
        calculateLeftDays: function(t, e) {
            var a = _utils2.default.formatDate(new Date(t), "yyyy/MM/dd"), s = _utils2.default.formatDate(new Date(e), "yyyy/MM/dd");
            return (Date.parse(a) - Date.parse(s)) / 864e5;
        },
        _pad: function(t) {
            return t = +t, t < 10 && t >= 0 ? "0" + t : t;
        }
    }
});