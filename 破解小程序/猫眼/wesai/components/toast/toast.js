function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var r = e[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, o, r) {
        return o && t(e.prototype, o), r && t(e, r), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), Toast = function(t) {
    function e() {
        var t, o, r, n;
        _classCallCheck(this, e);
        for (var i = arguments.length, u = Array(i), s = 0; s < i; s++) u[s] = arguments[s];
        return o = r = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(u))), 
        r.data = {
            showStatus: !1
        }, r.props = {
            toastshow: {
                type: Boolean,
                required: !1,
                default: function() {
                    return !1;
                }
            },
            toasttext: {
                type: String,
                required: !1,
                default: function() {
                    return "no message";
                }
            },
            duration: {
                type: Number,
                default: 3e3,
                required: !1
            }
        }, r.methods = {}, r.watch = {
            toastshow: function(t) {
                var e = this;
                this._timeout && clearTimeout(this._timeout), t && this.duration && (this.showStatus = t, 
                this._timeout = setTimeout(function() {
                    e.showStatus = !1, e.$apply();
                }, this.duration));
            }
        }, n = o, _possibleConstructorReturn(r, n);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "show",
        value: function(t) {
            var e = this;
            this.showStatus = !0, this.toasttext = t, this._timeout && clearTimeout(this._timeout), 
            this.duration && (this._timeout = setTimeout(function() {
                e.showStatus = !1, e.$apply();
            }, this.duration)), this.$apply();
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = Toast;