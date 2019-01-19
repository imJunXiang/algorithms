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
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _mixin = require("./../../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), _common = require("./../../common/common.js"), bannerAD = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.data = {
            ADInfo: {},
            sysRes: {},
            onlineId: ""
        }, r.mixins = [ _mixin2.default ], r.props = {
            advertisingId: {
                type: String,
                required: !0,
                default: ""
            }
        }, r.methods = {
            tapToNav: function() {
                this.bindADClick(this.ADInfo, this.advertisingId, this.onlineId);
            }
        }, r.watch = {}, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.sysRes = wx.getSystemInfoSync();
        }
    }, {
        key: "loadTheADs",
        value: function(e) {
            var t = this;
            this.onlineId = e;
            var n = wx.getStorageSync("selectCity"), r = wx.getStorageSync("wesaiToken"), o = wx.getStorageSync("maoYanOpenId"), i = wx.getSystemInfoSync(), a = encodeURIComponent(encodeURIComponent(_common.urls.allAdList)), s = {
                token: r,
                openId: o,
                advertisingId: this.advertisingId,
                screen: i.windowWidth + "*" + i.windowHeight,
                referrer: "",
                ua: "wechat_miniprogram|" + i.platform + "|" + i.system + "|wechat_version_" + i.version + "|" + i.brand + "|" + i.model,
                cityName: n.name || "",
                city: n.id || n.city_id || -1,
                online_id: e || "",
                channel: 2
            };
            (0, _common.ajax)(_common.urls.proxyCurl, {
                jsonParams: {
                    url: a,
                    param: s
                }
            }).then(function(e) {
                if (e.code && 200 === e.code && e.data) {
                    var n = e.data;
                    if (n.response && n.response.advertising) {
                        var r = n.response.advertising;
                        r && r[t.advertisingId] && r[t.advertisingId].advertisements && r[t.advertisingId].advertisements[0] && (t.ADInfo = r[t.advertisingId].advertisements[0] || "");
                    }
                }
                t.$apply();
            }).catch(function(e) {});
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = bannerAD;