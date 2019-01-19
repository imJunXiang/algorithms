function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(a, s) {
                try {
                    var o = t[a](s), u = o.value;
                } catch (e) {
                    return void n(e);
                }
                if (!o.done) return Promise.resolve(u).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(u);
            }
            return r("next");
        });
    };
}

var _user = require("./user"), _user2 = _interopRequireDefault(_user), _store = require("../store"), _store2 = _interopRequireDefault(_store), _user3 = require("../user"), _user4 = _interopRequireDefault(_user3), _aes = require("../aes/aes"), _aes2 = _interopRequireDefault(_aes), _AesUtil = require("../aes/AesUtil"), _AesUtil2 = _interopRequireDefault(_AesUtil), _md = require("../md5"), _md2 = _interopRequireDefault(_md), PREFIXV1 = "https://wx.maoyan.com/maoyansh/myshow/ajax", app = getApp(), resetPhoneNumDateLastTime = 864e5;

module.exports = {
    getUserPhoneNumber: function() {
        var e = this;
        app.request().get(PREFIXV1 + "/mpUser/mobileNo").query({
            sellChannel: 7,
            token: (0, _user2.default)(app.$user).token
        }).end().then(function(t) {
            e.setData({
                userPhoneNumber: t.body.data
            });
        }).catch(function(e) {});
    },
    bindUserPhoneNumber: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            var r, a;
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, t._isNeedAes();

                  case 2:
                    return r = n.sent, a = {
                        mobile: e
                    }, r && (a = t._aesMessage(e)), n.abrupt("return", new Promise(function(e) {
                        app.request().config("loading", 1).post(PREFIXV1 + "/mpUser/bindMobile").header("content-type", "application/json").query({
                            sellChannel: 7,
                            token: (0, _user2.default)(app.$user).token
                        }).send(a).end().then(function(t) {
                            e(t.body);
                        }).catch(function(t) {
                            e();
                        });
                    }));

                  case 6:
                  case "end":
                    return n.stop();
                }
            }, n, t);
        }))();
    },
    getPhoneNumber: function(e, t, n) {
        var r = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function a() {
            var s, o;
            return regeneratorRuntime.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    s = function(a) {
                        try {
                            a || (r.toast("获取手机号失败"), app.updateCode()), r.bindUserPhoneNumber(a).then(function(s) {
                                var o = new Date().getTime() + resetPhoneNumDateLastTime;
                                r.setStoreAsync("resetPhoneNumDate", o), r.setData({
                                    resetPhoneNumDate: o
                                });
                                var u = s && 200 === s.code;
                                u && r.getUserPhoneNumber(), n || u || t(e, !1, a), !n && u && t(e, !0, a), n && u && t(e, !0, a), 
                                n && !u && r.toast("绑定手机号失败请重新授权绑定");
                            });
                        } catch (e) {
                            console.log("bindUserPhoneNumber error", e);
                        }
                    }, o = r, -1 === e.detail.errMsg.indexOf("fail user deny") && -1 === e.detail.errMsg.indexOf("cancel to confirm login") || (r.getWXPhoneNumberCancel && r.getWXPhoneNumberCancel(), 
                    r.setStoreAsync("resetPhoneNumDate", new Date().getTime() + resetPhoneNumDateLastTime).then(o.getStoreAsync("resetPhoneNumDate").then(function(e) {
                        o.setData({
                            resetPhoneNumDate: e
                        });
                    })), !n && t(e), n && o.toast("请授权手机号")), -1 === e.detail.errMsg.indexOf("fail cancel") && -1 === e.detail.errMsg.indexOf("fail user cancel bind") && -1 === e.detail.errMsg.indexOf("fail:cancel to bind phone") && -1 === e.detail.errMsg.indexOf("fail:user cancel") || (r.setStoreAsync("resetPhoneNumDate", new Date().getTime() + resetPhoneNumDateLastTime).then(o.getStoreAsync("resetPhoneNumDate").then(function(e) {
                        o.setData({
                            resetPhoneNumDate: e
                        });
                    })), !n && t(e), n && o.toast("请授权手机号")), -1 !== e.detail.errMsg.indexOf("ok") && (r.getWXPhoneNumberSuccess && r.getWXPhoneNumberSuccess(), 
                    _user4.default.getPhoneNumber(e, app.getCode(), s.bind(r)));

                  case 5:
                  case "end":
                    return a.stop();
                }
            }, a, r);
        }))();
    },
    setStoreAsync: function(e, t) {
        return new Promise(function(n) {
            wx.setStorage({
                key: e,
                data: t,
                success: function(e) {
                    n();
                }
            });
        });
    },
    getStoreAsync: function(e) {
        return new Promise(function(t) {
            wx.getStorage({
                key: e,
                success: function(e) {
                    t(e.data);
                }
            });
        });
    },
    resetBindPhoneNumberDate: function() {
        var e = _store2.default.get("resetPhoneNumDate") || 0;
        new Date().getTime() >= e ? (_store2.default.set("resetPhoneNumDate", null), this.setData({
            resetPhoneNumDate: null
        })) : this.setData({
            resetPhoneNumDate: e
        });
    },
    toast: function(e) {
        wx.showToast({
            title: e,
            icon: "none"
        }), setTimeout(function() {
            wx.hideToast();
        }, 1e3);
    },
    _aesMessage: function(e) {
        var t = _aes2.default.lib.WordArray.random(16).toString(_aes2.default.enc.Hex), n = _aes2.default.lib.WordArray.random(16).toString(_aes2.default.enc.Hex), r = this._getAesKeyByDate();
        return {
            iv: t,
            salt: n,
            mobile: new _AesUtil2.default(128, 1e3).encrypt(n, t, r, e),
            flag: 1
        };
    },
    _isNeedAes: function() {
        return new Promise(function(e) {
            app.request().get(PREFIXV1 + "/rsa/switch").query({
                sellChannel: 7,
                token: (0, _user2.default)(app.$user).token
            }).end().then(function(t) {
                e(t.body.data);
            }).catch(function(t) {
                e();
            });
        });
    },
    _getAesKeyByDate: function() {
        var e = new Date(), t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), a = "" + t + n + r;
        return (0, _md2.default)(a);
    }
};