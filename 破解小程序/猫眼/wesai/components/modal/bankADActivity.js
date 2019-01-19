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

var _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _common = require("./../../common/common.js"), _navToMiniProgram = require("./../../common/navToMiniProgram.js"), _navToMiniProgram2 = _interopRequireDefault(_navToMiniProgram), _miniProgramAppIds = require("./../../common/miniProgramAppIds.js"), _miniProgramAppIds2 = _interopRequireDefault(_miniProgramAppIds), _mixin = require("./../../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), bankADActivity = function(e) {
    function t() {
        var e, i, n, o;
        _classCallCheck(this, t);
        for (var r = arguments.length, a = Array(r), s = 0; s < r; s++) a[s] = arguments[s];
        return i = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        n.data = {
            show: !1,
            isSelect: -1,
            itemInfo: [],
            ADType: 1
        }, n.mixins = [ _mixin2.default ], n.events = {}, n.methods = {
            showBankAD: function(e) {
                this.itemInfo = e.map(function(e) {
                    var t = [ e.rule ] || [];
                    return t = e.rule && e.rule.indexOf("\r\n") > 0 ? e.rule.split("\r\n") : e.rule.split("\n"), 
                    Object.assign({}, e, {
                        rule: t
                    });
                }), this.ADType = 1, this.$emit("controlScroll", !0), this.show = !0;
            },
            showBank: function() {
                this.itemInfo = this.$parent.itemInfo.bankDiscount, this.ADType = 0, this.$emit("controlScroll", !0), 
                this.show = !0;
            },
            hide: function() {
                this.$emit("controlScroll", !1), this.show = !1;
            },
            toggleItem: function(e) {
                var t = this.isSelect;
                this.isSelect = t == e ? -1 : e;
            },
            ADItemTap: function(e) {
                var t = decodeURIComponent(e);
                if (/http/g.test(t)) {
                    var i = wx.getStorageSync("wesaiToken"), n = wx.getStorageSync("maoYanOpenId");
                    _navToMiniProgram2.default.navigateToMiniProgram({
                        appId: _miniProgramAppIds2.default.dongTaiBiaoDanWXAppId,
                        path: "pages/webview/webview",
                        extraData: {
                            token: i,
                            maoYanOpenId: n,
                            webViewUrl: e || "",
                            env: _common.urls.env
                        },
                        envVersion: "trial"
                    });
                } else wx.navigateTo({
                    url: t
                });
            },
            bindADImgLoaded: function(e, t) {
                var i = t.detail.width, n = t.detail.height;
                this.itemInfo[e].width = i / n * 44, this.$apply();
            }
        }, o = i, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = bankADActivity;