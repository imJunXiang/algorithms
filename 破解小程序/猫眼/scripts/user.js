var store = require("./store"), loginScript = require("./login");

module.exports = {
    user: function() {
        var e = getApp(), r = this.getUser();
        return r && r.token ? (e.$user = r, Promise.resolve(r)) : (e.$user = {}, Promise.reject(Error("未登录")));
    },
    getUser: function(e) {
        var r = e || getApp();
        return r.$user.token ? r.$user : (r.$user = store.get("user") || {}, r.$openId = r.$user.openId, 
        r.$user.openId || (r.$user = {}, store.remove("user")), r.$user.token ? r.$user : null);
    },
    saveUser: function(e) {
        var r = getApp();
        e = e || r.$user, r.$user = e, e && e.openId && r.owl.cfgManager.update("unionId", e.openId), 
        store.set("user", r.$user, {
            expires: 7776e3
        });
    },
    setMobile: function(e, r) {
        var n = getApp();
        n.$user.mobile = e, n.$user.mobileType = 0 === r ? 0 : 1, store.update("user", n.$user);
    },
    logout: function() {
        var e = getApp();
        store.remove("user"), e.$user = {};
    },
    openid: function() {
        return loginScript.openId();
    },
    silentLogin: function(e) {
        var r = this, n = getApp(), t = this.getUser();
        return t && t.token ? Promise.resolve() : loginScript.silentLogin(e).then(function(e) {
            if (e.token) {
                r.saveUser(e);
                var t = n.page();
                t.setData({
                    isLogin: !0
                }), t.loginRefresh && t.loginRefresh.call(t, "silentLogin");
            }
            return e;
        });
    },
    checkLogin: function(e, r) {
        var n = "", t = !1, o = !1, i = getApp();
        "function" != typeof e && (r = e.fail, n = e.warn || "", t = !!e.ignoreLogin, o = !!e.ignoreLoginFail, 
        e = e.success);
        var s = i.page(), u = this.getUser();
        if (u && u.token) return e && e.call(s);
        e && (s.loginRefresh = function() {
            e.call(s);
        }), r && (s.loginFail = function() {
            r.call(s);
        }), s.loginFailMsg = n, s.setData({
            needLogin: !0,
            isLogin: !1,
            ignoreLogin: t,
            ignoreLoginFail: o,
            loginWarn: n
        });
    },
    login: function() {
        var e = this;
        return new Promise(function(r, n) {
            e.checkLogin({
                success: r,
                fail: n
            });
        });
    },
    getPhoneNumber: function(e, r, n) {
        var t = this, o = getApp(), i = e.detail, s = i.encryptedData, u = i.iv;
        if ("function" == typeof r && (n = r, r = ""), r = r || o.getCode(), !e.detail.errMsg || e.detail.errMsg.indexOf("getPhoneNumber:ok") < 0) return n && n.call();
        o.request().get("/wechat/wxapp/phone").query({
            appid: o.appId,
            code: r,
            encryptedData: s,
            iv: u
        }).end().then(function(e) {
            var r = e.body.phoneNumber;
            t.setMobile(r), n && n.call(null, r);
        }).catch(function(e) {
            n && n.call();
        });
    }
};