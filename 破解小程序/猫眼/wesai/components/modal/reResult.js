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

var _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), reservation = function(e) {
    function t() {
        var e, o, s, r;
        _classCallCheck(this, t);
        for (var n = arguments.length, i = Array(n), c = 0; c < n; c++) i[c] = arguments[c];
        return o = s = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(i))), 
        s.data = {
            mobile: "",
            mask: !1,
            show: !1,
            isActive: !0,
            msg: "",
            success: !0
        }, s.methods = {
            hide: function() {
                this.$emit("controlScroll", !1), this.mask = !1, this.show = !1, this.mobile = "", 
                this.msg = "", this.success = !0;
            },
            show: function(e) {
                this.$emit("controlScroll", !0), this.mask = !0, this.show = !0, this.mobile = e.mobile, 
                this.msg = e.msg, -1 != e.msg.indexOf("失败") && (this.success = !1);
            }
        }, r = o, _possibleConstructorReturn(s, r);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = reservation;