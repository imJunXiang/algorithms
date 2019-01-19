function handleSilentLoginError(e) {
    var n = e.code, r = e.mobile, t = e.requestCode, o = e.userId, i = getApp(), s = i.page();
    switch (i.$user = {
        userId: o
    }, o && i.store.set("temp_userId", o), n + "") {
      case "10011008":
        wx.navigateTo({
            url: "/pages/risk/verify?mode=mobile&mobile=" + r
        });
        break;

      case "10011006":
        wx.navigateTo({
            url: "/pages/risk/verify?mode=mobile"
        });
        break;

      case "10011005":
        wx.navigateTo({
            url: "/pages/risk/verify?mode=slider&requestCode=" + t
        });
        break;

      case "10010201":
        wx.navigateTo({
            url: "/pages/risk/verify?mode=image"
        });
        break;

      case "10010133":
        break;

      default:
        delete i.silentLogin.requestLocked, s.route.indexOf("pages/risk/verify") >= 0 && i.goto(-1);
    }
}

var _slicedToArray = function() {
    function e(e, n) {
        var r = [], t = !0, o = !1, i = void 0;
        try {
            for (var s, a = e[Symbol.iterator](); !(t = (s = a.next()).done) && (r.push(s.value), 
            !n || r.length !== n); t = !0) ;
        } catch (e) {
            o = !0, i = e;
        } finally {
            try {
                !t && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(n, r) {
        if (Array.isArray(n)) return n;
        if (Symbol.iterator in Object(n)) return e(n, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _extends = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        for (var t in r) Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
    }
    return e;
}, store = require("./store"), apiConfig = require("./api-config"), icons = require("./icons"), MD5 = require("./md5"), api = apiConfig.getApiUrl(), isOpenIdPending = !1, openIdPendingList = [], loginAppName = {
    wxapp: "movie",
    wallet: "maoyan"
}, loginScript = {
    wxUserInfo: function(e, n) {
        var r = this, t = getApp();
        return t.$wxUserInfo = n, n.code = e, n.appName = loginAppName[t.appName] || "movie", 
        t.getFingerprint().then(function(e) {
            return t.request().post("/api/account/v1/weChatAuthLogin").header("content-type", "application/x-www-form-urlencoded").proxyhost("usercenter").send({
                code: n.code,
                appName: n.appName,
                rawData: n.rawData,
                signature: n.signature,
                encryptedData: n.encryptedData,
                iv: n.iv,
                wechatFingerprint: e,
                uuid: t.$uuid,
                risk_platform: 13,
                risk_partner: 138,
                ci: t.getPropSafely("$location.city.id", t, 0),
                channelId: t.channelId
            }).end().catch(function(e) {
                throw delete r._wechatPromise, ~e.message.indexOf("未绑定") && (e.message = ""), e;
            });
        });
    },
    fetchWechatLoginInfo: function() {
        var e = this, n = getApp();
        if (this._wechatPromise) return this._wechatPromise;
        var r = this;
        return this._wechatPromise = n.wx2promiseify(wx.login).then(function(e) {
            return e.code;
        }).then(function(e) {
            return n.wx2promiseify(wx.getUserInfo).then(r.wxUserInfo.bind(n, e));
        }).catch(function(n) {
            throw delete e._wechatPromise, n;
        }), this._wechatPromise;
    },
    addPrivilege: function() {
        var e = getApp();
        e.request().post("/sns/user/online").host("api").header({
            token: e.$user.token
        }).send({
            channelId: e.channelId
        }).end().catch();
    },
    getUserExp: function(e) {
        var n = getApp(), r = function(e) {
            return e.userLevel > 0 && (e.levelpathBlack = icons.levelNums["lv" + e.userLevel + "-blackfont"], 
            e.levelpathWhite = icons.levelNums["lv" + e.userLevel + "-whitefont"]), e.bgpath = icons.levelBgs["lv" + e.userLevel], 
            e;
        };
        if (!e) return n.request().get(api + "/sns/user/member/v2/exp.json").header({
            token: n.$user.token
        }).end().then(function(e) {
            return r(e.body.data);
        });
        n.request().get(api + "/sns/user/member/v2/exp.json").header({
            token: n.$user.token
        }).end().then(function(n) {
            var t = r(n.body.data);
            e && e(t);
        });
    },
    getMaoyanMobileByToken: function(e) {
        return getApp().request().get("/user/mobile").header({
            token: e
        }).end().then(function(e) {
            return e.body;
        });
    },
    wxUser: function() {
        function e(e, r) {
            return n.$wxUser = _extends({}, e, {
                openId: r
            }), n.$wxUser;
        }
        var n = getApp();
        return n.$wxUser ? Promise.resolve(n.$wxUser) : n.$user.token && n.$user.wxUserInfo ? Promise.resolve(e(n.$user.wxUserInfo.userInfo, n.$user.openId)) : (n.$wxUser = n.get("wxUser"), 
        n.$wxUser ? Promise.resolve(n.$wxUser) : this.fetchWechatLoginInfo().then(function() {
            var r = e(n.$wxUserInfo.userInfo, n.$openId);
            return n.set("wxUser", r, {
                expires: 86400
            }), r;
        }));
    },
    openId: function() {
        var e = getApp();
        if (e.$openId) return Promise.resolve(e.$openId);
        if (isOpenIdPending) {
            return new Promise(function(e) {
                openIdPendingList.push(function(n) {
                    e(n);
                });
            });
        }
        return isOpenIdPending = !0, e.wx2promiseify(wx.login).then(function(e) {
            return e.code;
        }).then(function(n) {
            return e.request().get("/openid").query({
                code: n,
                appid: e.appId
            }).end().then(function(n) {
                for (e.$user.openId = e.$openId = n.body.openid, store.update("user", e.$user), 
                isOpenIdPending = !1; openIdPendingList.length > 0; ) openIdPendingList.shift()(e.$openId);
                return e.$openId;
            }).catch(function(e) {
                throw e;
            });
        }).catch(function(e) {
            throw e;
        });
    },
    isPermissionDeny: function(e) {
        return e && e.errMsg && (e.errMsg.match(/getUserInfo[:|\s]fail[:|\s]auth (deny|cancel)/) || e.errMsg.match(/getUserInfo[:|\s]fail[\s]scope[\s]unauthorized/));
    },
    reGetPermission: function() {
        return new Promise(function(e, n) {
            if (wx.openSetting) wx.showModal({
                title: "授权提示",
                content: "要先允许使用 [用户信息] 才可以登录哦",
                showCancel: !0,
                confirmText: "去设置",
                success: function(r) {
                    if (r.confirm) wx.openSetting({
                        success: function(r) {
                            if (r.authSetting["scope.userInfo"]) e(); else {
                                var t = new Error("授权失败");
                                t.type = "FAIL", n(t);
                            }
                        }
                    }); else {
                        var t = new Error("未授权");
                        t.type = "DENY", n(t);
                    }
                }
            }); else {
                wx.showModal({
                    title: "授权提示",
                    content: "要先微信授权才可以登录哦，请10分钟后再试",
                    showCancel: !1,
                    confirmText: "我知道了"
                });
                var r = new Error("未授权");
                r.type = "DENY", n(r);
            }
        });
    },
    silentLogin: function(e) {
        function n() {
            var e = t.page();
            e.silentLoginFail && e.silentLoginFail.call(e);
        }
        function r(r) {
            var o = _slicedToArray(r, 3), i = o[0], s = (o[1], o[2]), a = _extends({
                loginChannel: 70001,
                clientType: "wechatsmallprogram",
                riskPlatform: 13,
                version: t.version,
                fingerprint: s,
                ci: t.getPropSafely("$location.city.id", t, 0),
                uuid: t.$uuid,
                longitude: t.$location.longitude,
                latitude: t.$location.latitude,
                code: i.code,
                timeStamp: Date.now()
            }, e);
            if (t.$openId) {
                a.openId = t.$openId, a.openIdSign = MD5("" + a.timeStamp + i.code + t.$openId + "X8YSRYRVckgNK1vfKFIs");
            }
            return t.request().post("/api/account/v1/wx/smallProgram/silentLogin").proxyhost("usercenter").send(a).end().then(function(e) {
                wx.hideLoading();
                var r = e.body, o = r.success, i = r.data;
                if (o) {
                    var s = i.nickName, a = i.avatarUrl, u = i.gender, c = i.appUserId;
                    return c && (i.openId = t.$openId = c), i.wxUserInfo = {
                        userInfo: {
                            nickName: s,
                            avatarUrl: a,
                            gender: u
                        },
                        appName: loginAppName[t.appName] || "movie"
                    }, t.emit("silentLoginSuccessfully"), delete t.silentLogin.requestLocked, i;
                }
                n();
            }).catch(function(e) {
                wx.hideLoading(), n();
                var r = t.page();
                return e.errRes && e.errRes.code ? 10011003 == e.errRes.code ? (r.loginRefresh && !r.noLoginModal && r.setData({
                    needLogin: !0
                }), e) : wx.showModal({
                    content: e.errRes.message,
                    showCancel: !1,
                    success: function() {
                        handleSilentLoginError(e.errRes);
                    }
                }) : (delete t.silentLogin.requestLocked, r.handleError(e));
            });
        }
        var t = getApp();
        return t.silentLogin.requestLocked ? Promise.resolve() : (t.silentLogin.requestLocked = !0, 
        wx.showLoading({
            title: "登录中",
            mask: !0
        }), t.riskWrapper(r));
    }
};

module.exports = loginScript;