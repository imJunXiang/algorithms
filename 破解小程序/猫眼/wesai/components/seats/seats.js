function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Seats = function(e) {
    function t() {
        var e, a, i, s;
        _classCallCheck(this, t);
        for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(r))), 
        i.data = {
            seats: [],
            seatContainerWidth: 710,
            seatContainerHeight: 640,
            seatContainerWidthOfMovableView: 710,
            seatContainerHeightOfMovableView: 640,
            seatCellWidth: 40,
            seatCellHeight: 40,
            movableViewX: 0,
            movableViewY: 0,
            seatTapAble: !0
        }, i.computed = {}, i.props = {
            scaleTimes: {
                type: Number,
                required: !1,
                default: 1
            },
            animateCss: {
                type: String,
                required: !1,
                default: ""
            },
            visible: {
                type: Boolean,
                required: !1,
                default: !0
            },
            maxColumnIndex: {
                type: Number,
                required: !1,
                default: 0
            },
            maxRowIndex: {
                type: Number,
                required: !1,
                default: 0
            },
            maps: {
                type: Array,
                required: !0,
                default: []
            },
            max: {
                type: Number,
                required: !1,
                default: 0
            },
            scaleTransition: {
                type: String,
                required: !1,
                default: "none"
            },
            touchStart: {
                type: Boolean,
                required: !1,
                default: !0
            }
        }, i.methods = {
            bindSeatTap: function(e) {
                if (this.seatTapAble) {
                    this.seatTapAble = !1, this.$apply();
                    var t = e.currentTarget.dataset.seatData, a = e.currentTarget.dataset.seatIndex, i = e.currentTarget.dataset.statusId;
                    this.$emit("seatTap", t, a, i);
                }
            }
        }, i.watch = {
            maps: function(e, t) {
                this.seats = this.getData().maps, this.seatCellWidth = Math.floor((this.seatContainerWidth - 8 * (this.maxColumnIndex + 1)) / (this.maxColumnIndex + 4)), 
                this.seatCellHeight = Math.floor((this.seatContainerHeight - 8 * this.maxRowIndex) / (this.maxRowIndex + 1)), 
                this.seatCellWidth > this.seatCellHeight ? this.seatCellWidth = this.seatCellHeight : this.seatCellHeight = this.seatCellWidth, 
                this.seatContainerWidthOfMovableView = this.seatContainerWidth, this.seatContainerHeightOfMovableView = this.seatContainerHeight, 
                this.seatCellWidth < 40 && (this.seatCellWidth = 40, this.seatContainerWidthOfMovableView = this.seatCellWidth * (this.maxColumnIndex + 4) + 8 * (this.maxColumnIndex + 1), 
                this.seatContainerHeightOfMovableView = this.seatCellWidth * (this.maxRowIndex + 1) + 8 * this.maxRowIndex, 
                this.movableViewX = (this.seatContainerWidth - this.seatContainerWidthOfMovableView) / 4, 
                this.movableViewY = (this.seatContainerHeight - this.seatContainerHeightOfMovableView) / 4), 
                this.$apply();
            }
        }, s = a, _possibleConstructorReturn(i, s);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "hide",
        value: function() {
            if (this.removed) return !1;
            this.removed = !0, this.setHidden();
        }
    }, {
        key: "show",
        value: function() {
            if (this.removed) return !1;
            this.setVisible();
        }
    }, {
        key: "setSeatTapAble",
        value: function() {
            this.seatTapAble = !0, this.$apply();
        }
    }, {
        key: "getData",
        value: function() {
            for (var e = this.maps, t = this.maxColumnIndex, a = this.maxRowIndex, i = {
                seats: [],
                maps: []
            }, s = 0; s < a; s++) !function(t) {
                i.seats[t] = [], e.forEach(function(e, a) {
                    t + 1 === e.rowIndex && i.seats[t].push(Object.assign(e, {
                        seatIndex: a
                    }));
                });
            }(s);
            return i.seats.forEach(function(e, a) {
                i.maps[a] = [];
                for (var s = 0; s < t; s++) {
                    for (var n = 0; n < e.length; n++) if (s + 1 === e[n].columnIndex) {
                        i.maps[a].push(Object.assign({
                            space: !1
                        }, e[n]));
                        break;
                    }
                    i.maps[a][s] || i.maps[a].push(Object.assign({
                        space: !0
                    }));
                }
            }), i;
        }
    }, {
        key: "disabled",
        value: function(e) {
            var t = this.seats, a = e.length;
            t.forEach(function(t, i) {
                t.forEach(function(t, i) {
                    for (var s = 0; s < a; s++) if (t.id == e[s]) {
                        t.disabled = !0;
                        break;
                    }
                });
            }), this.seats = t;
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = Seats;