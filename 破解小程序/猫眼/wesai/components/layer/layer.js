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
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), getDefaultConfig = function() {
    return {
        showLayer: !1,
        showLayerTimer: !1,
        showBtns: !0,
        showTitle: !0,
        showContent: !0,
        layerType: 0,
        title: "",
        content: "",
        custom: "",
        linkUrl: "",
        cancelText: "取消",
        confirmText: "确定",
        customContent: "",
        alertText: "我知道了",
        callback: function() {},
        confirmCallback: function() {},
        cancelCallback: function() {}
    };
}, Layer = function(t) {
    function e() {
        var t, n, o, r;
        _classCallCheck(this, e);
        for (var a = arguments.length, c = Array(a), i = 0; i < a; i++) c[i] = arguments[i];
        return n = o = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(c))), 
        o.data = getDefaultConfig(), o.methods = {
            tapFun: function() {
                this.showLayer = !1, this.$apply(), this.callback();
            },
            cancelFun: function() {
                this.showLayer = !1, this.$apply(), this.cancelCallback();
            },
            confirmFun: function() {
                this.showLayer = !1, this.$apply(), this.confirmCallback();
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "alert",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = Object.assign({}, getDefaultConfig(), t);
            this.layerType = 0, this.showLayer = !0, this.title = e.title, this.content = e.content, 
            this.callback = e.callback, this.alertText = e.alertText, this.$apply();
        }
    }, {
        key: "confirm",
        value: function(t) {
            var e = Object.assign({
                showLayer: !0,
                title: "",
                content: "",
                custom: "",
                linkUrl: "",
                customContent: "",
                alertText: "我知道了",
                callback: function() {}
            }, t);
            this.showLayer = !0, this.layerType = 1, this.title = e.title, this.content = e.content, 
            this.cancelCallback = e.cancelCallback, this.confirmCallback = e.confirmCallback, 
            this.cancelText = e.cancelText, this.confirmText = e.confirmText, this.$apply();
        }
    }, {
        key: "show",
        value: function() {}
    } ]), e;
}(_wepy2.default.component);

exports.default = Layer;