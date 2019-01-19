function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var n = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function t(a, o) {
                try {
                    var i = n[a](o), u = i.value;
                } catch (e) {
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(u).then(function(e) {
                    t("next", e);
                }, function(e) {
                    t("throw", e);
                });
                e(u);
            }
            return t("next");
        });
    };
}

function _classCallCheck(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), _common = require("./common.js"), _util = require("./util.js"), _navToMiniProgram = require("./navToMiniProgram.js"), _navToMiniProgram2 = _interopRequireDefault(_navToMiniProgram), _urls = require("./urls.js"), _urls2 = _interopRequireDefault(_urls), BindUser = function() {
    function e() {
        _classCallCheck(this, e), this.userInfo = null;
    }
    return _createClass(e, [ {
        key: "getUserInfo",
        value: function() {
            function e() {
                return n.apply(this, arguments);
            }
            var n = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var n, r;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, (0, _common.getMYOpenId)();

                      case 2:
                        if (n = e.sent) {
                            e.next = 7;
                            break;
                        }
                        throw new Error("maoYanOpenId get fail");

                      case 7:
                        return e.next = 9, _common.GetTheToken.init();

                      case 9:
                        if (r = wx.getStorageSync("wesaiToken")) {
                            e.next = 13;
                            break;
                        }
                        throw new Error("token get fail");

                      case 13:
                        return e.abrupt("return", new Promise(function(e) {
                            (0, _common.ajax)(_urls2.default.getUserInfo, {
                                jsonParams: {
                                    token: r,
                                    openId: n
                                }
                            }).then(function(n) {
                                e(n.data ? n.data : null);
                            }).catch(function(n) {
                                e(null);
                            });
                        }));

                      case 14:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "init",
        value: function() {
            function e(e) {
                return n.apply(this, arguments);
            }
            var n = _asyncToGenerator(regeneratorRuntime.mark(function e(n) {
                var r, t;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (e.prev = 0, this.userInfo = wx.getStorageSync("wesaiUserInfo"), !this.userInfo || (0, 
                        _util.isEmptyObject)(this.userInfo) || !this.userInfo.user_id) {
                            e.next = 4;
                            break;
                        }
                        return e.abrupt("return", this.userInfo);

                      case 4:
                        return e.next = 6, this.getUserInfo();

                      case 6:
                        if (this.userInfo = e.sent, !this.userInfo || (0, _util.isEmptyObject)(this.userInfo) || !this.userInfo.user_id) {
                            e.next = 12;
                            break;
                        }
                        return wx.setStorageSync("wesaiUserInfo", this.userInfo), e.abrupt("return", this.userInfo);

                      case 12:
                        return r = wx.getStorageSync("wesaiToken"), t = wx.getStorageSync("maoYanOpenId"), 
                        _navToMiniProgram2.default.navigateToMiniProgram({
                            path: "pages/login/login",
                            extraData: {
                                token: r,
                                maoYanOpenId: t,
                                env: _urls2.default.env,
                                type: n
                            },
                            envVersion: "trial"
                        }), e.abrupt("return", !1);

                      case 16:
                        e.next = 21;
                        break;

                      case 18:
                        e.prev = 18, e.t0 = e.catch(0);

                      case 21:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 18 ] ]);
            }));
            return e;
        }()
    } ]), e;
}();

exports.default = new BindUser();