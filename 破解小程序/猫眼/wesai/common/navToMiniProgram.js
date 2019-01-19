function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, a) {
        for (var i = 0; i < a.length; i++) {
            var t = a[i];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(a, i, t) {
        return i && e(a.prototype, i), t && e(a, t), a;
    };
}(), _urls = require("./urls.js"), _urls2 = _interopRequireDefault(_urls), _miniProgramAppIds = require("./miniProgramAppIds.js"), _miniProgramAppIds2 = _interopRequireDefault(_miniProgramAppIds), dongTaiBiaoDanWXAppId = _miniProgramAppIds2.default.dongTaiBiaoDanWXAppId, whiteListPath = "pages/whiteList/whiteList", NavToMiniProgram = function() {
    function e() {
        _classCallCheck(this, e);
    }
    return _createClass(e, [ {
        key: "validWhiteList",
        value: function(e) {
            var a = e.path, i = void 0 === a ? whiteListPath : a, t = e.extraData, r = wx.getStorageSync("wesaiToken");
            return t = Object.assign({
                token: r
            }, t), this.navigateToMiniProgram({
                path: i,
                extraData: t
            });
        }
    }, {
        key: "navigateToMiniProgram",
        value: function(e) {
            var a = e.appId, i = void 0 === a ? dongTaiBiaoDanWXAppId : a, t = e.path, r = e.extraData, n = e.envVersion, o = void 0 === n ? "trial" : n;
            return r = Object.assign({
                env: _urls2.default.env
            }, r), new Promise(function(e, a) {
                if (wx.navigateToMiniProgram) wx.navigateToMiniProgram({
                    appId: i,
                    path: t,
                    extraData: r,
                    envVersion: o,
                    success: function(a) {
                        e(a);
                    }
                }); else {
                    var n = "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。";
                    a(n), wx.showModal({
                        title: "提示",
                        content: n,
                        showCancel: !1
                    });
                }
            });
        }
    } ]), e;
}();

exports.default = new NavToMiniProgram();