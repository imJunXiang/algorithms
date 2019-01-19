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
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _layer = require("./layer/layer.js"), _layer2 = _interopRequireDefault(_layer), _pubClass = require("./pubClass/pubClass.js"), _pubClass2 = _interopRequireDefault(_pubClass), Comp = function(e) {
    function t() {
        var e, r, n, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, u = Array(a), l = 0; l < a; l++) u[l] = arguments[l];
        return r = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(u))), 
        n.components = {
            Layer: _layer2.default,
            pubClass: _pubClass2.default
        }, o = r, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "alert",
        value: function(e) {
            this.$invoke("Layer", "alert", e);
        }
    }, {
        key: "confirm",
        value: function(e) {
            this.$invoke("Layer", "confirm", e);
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = Comp;