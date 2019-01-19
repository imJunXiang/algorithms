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
});

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
}(), _wepy = require("./npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _urls = require("./common/urls.js"), _urls2 = _interopRequireDefault(_urls), _common = require("./common/common.js");

require("./npm/wepy-async-function/index.js");

var _default = function(e) {
    function t() {
        _classCallCheck(this, t);
        var e = _possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        e.config = {
            pages: [ "indexpage/index", "pages/index/index", "pages/detail/detail", "pages/noseat/noseat", "pages/confirm/confirm", "pages/me/me", "pages/orderDetail/orderDetail", "pages/seat/seat", "pages/screening/screening", "pages/search/search", "pages/seatArea/seatArea", "pages/webview/webview", "pages/transfer/transfer" ],
            window: {
                backgroundTextStyle: "dark",
                navigationBarBackgroundColor: "#000",
                navigationBarTitleText: "微赛体育",
                navigationBarTextStyle: "light"
            }
        }, e.globalData = {
            openId: null,
            userInfo: null,
            wxUserInfo: null,
            expiresIn: null,
            tokenTimer: null,
            systemInfo: null,
            windowWidth: 0,
            windowHeight: 0,
            wxSystem: wx.getSystemInfoSync(),
            _mobile: "",
            curUserId: "",
            jumpType: 0,
            getTokenRunTimes: 0,
            miniProgramData: {}
        }, e.use("requestfix"), e.use("promisify");
        var n = getApp();
        n && n.on && n.on("show", function(t) {
            if ((t.scene && "1037" == t.scene || "1038" == t.scene) && (e.globalData.miniProgramData = t), 
            t && t.scene) {
                var n = (0, _common.getStatisticsBaseInfo)(e);
                n.source = t.scene, (0, _common.statistics)(n);
            }
        });
        var r = wx.getSystemInfoSync();
        return e.globalData.isIPhoneX = /iPhone X/.test(r.model || "") ? 1 : 0, e;
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLaunch",
        value: function(e) {
            var t = e && e.referrerInfo && e.referrerInfo.extraData;
            if (t) {
                var n = this.$root.$parent, r = t.passport_user_id, a = t.mobile;
                a && (n.globalData._mobile = a), r && (n.globalData.curUserId = r), t.type && (n.globalData.jumpType = t.type);
            }
        }
    }, {
        key: "onShow",
        value: function(e) {}
    }, {
        key: "pay",
        value: function(e) {
            var t = this;
            return new Promise(function(n, r) {
                if (1 == e.paymentStatus) return void n(e);
                var a = e.pageParams;
                t.paymentParams = e, wx.requestPayment({
                    timeStamp: a.timeStamp,
                    nonceStr: a.nonceStr,
                    package: a.packageStr,
                    signType: a.signType,
                    paySign: a.paySign,
                    success: function(e) {
                        n(e);
                    },
                    complete: function(e) {
                        e && e.errMsg && "requestPayment:ok" === e.errMsg || r(e || null);
                    }
                });
            });
        }
    } ]), t;
}(_wepy2.default.app);

module.exports = require("./npm/wepy/lib/wepy.js").default.$createApp(_default, {});