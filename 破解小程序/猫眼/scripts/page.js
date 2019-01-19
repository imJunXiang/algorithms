function $Page(e) {
    var t = getApp(), o = t.owl, r = o.pageSpeed, n = o.cfgManager;
    e.disableStats || t.stats(e);
    var a = e.onLoad;
    e.onLoad = function(e) {
        this._options = e, e && Object.keys(e).forEach(function(t) {
            try {
                e[t] = decodeURIComponent(e[t]);
            } catch (o) {
                e[t] = e[t];
            }
        }), e.scene && Object.assign(e, parseQuery(e.scene)), e.merCode && t.openPlatform.save(e);
        try {
            r.pageLoad(n);
        } catch (e) {
            console.log("onLoad error:" + e.stack || e);
        }
        a && a.call(this, e), GlobalComponent.onLoad({
            page: this,
            app: t
        }), this.recordCrash(t);
    };
    var i = e.onShow;
    e.onShow = function() {
        if (t.$location.city || !this.needCity) {
            t.$user.token && t._loginReturnUrl && 1 === t._loginReturnUrl.indexOf(t.page().route) && (t._loginCallback && t._loginCallback(), 
            delete t._loginCallback, delete t._loginReturnUrl, delete t._page5), this.setData({
                isIphoneX: t.isIphoneX,
                isLogin: !(!t.$user || !t.$user.token),
                isIphone: t.isIphone
            }), this.delayOnLoad && (this.onLoad(this._options), delete this.delayOnLoad), this.statsMap = {}, 
            this.viewReport();
            for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
            i && i.apply(this, o), GlobalComponent.onShow({
                page: this
            });
        } else this.delayOnShow = !0;
        this.recordCrash(t);
    };
    var s = e.onReady;
    e.onReady = function() {
        try {
            r.pageReady();
        } catch (e) {
            console.log("onReady error:" + e.stack || e);
        }
        if (t.$location.city || !this.needCity) {
            for (var e = arguments.length, o = Array(e), n = 0; n < e; n++) o[n] = arguments[n];
            s && s.apply(this, o);
        } else this.delayOnReady = !0;
    };
    var l = e.onUnload;
    e.onUnload = function(e) {
        try {
            r.report();
        } catch (e) {
            console.log("page onUnload error:" + e.stack || e);
        }
        l && l.call(this, e), GlobalComponent.onUnload({
            page: this,
            app: t
        }), this.deleteCrash(t);
    };
    var c = e.onHide;
    e.onHide = function(e) {
        try {
            r.report();
        } catch (e) {
            console.log("page onHide error:" + e.stack || e);
        }
        c && c.call(this, e), GlobalComponent.onHide({
            page: this,
            app: t
        }), this.deleteCrash(t), t.tabStats.last = this.route;
    };
    var u = e.onPullDownRefresh;
    e.onPullDownRefresh = function(t) {
        try {
            r.pullRefresh();
        } catch (e) {
            console.log("page pullRefresh error:" + e.stack || e);
        }
        if (u) return e._hasPullDownRefresh = !0, u.call(this, t);
    };
    var h = e.onShareAppMessage;
    if (h && "function" == typeof h) {
        var p = function(e, t, o) {
            return e += (e.indexOf("?") < 0 ? "?" : "&") + t + "=" + o;
        };
        e.onShareAppMessage = function() {
            for (var e = arguments.length, o = Array(e), r = 0; r < e; r++) o[r] = arguments[r];
            var n = h.apply(this, o);
            if (n && n.path) {
                t.shareAfter(n.path, n.commentId);
                var a = n.path.indexOf("?");
                if (a >= 0) {
                    var i = n.path.substring(0, a), s = parseQuery(n.path.substring(a + 1));
                    s.redirect ? (s.redirect = encodeURIComponent(p(decodeURIComponent(s.redirect), "accessfrom", "share")), 
                    n.path = i + "?" + Object.keys(s).map(function(e) {
                        return e + "=" + s[e];
                    }).join("&")) : n.path = p(n.path, "accessfrom", "share");
                } else n.path = p(n.path, "accessfrom", "share");
            }
            return n;
        };
    }
    e.statsMap = {};
    var f = function() {
        var e = this;
        wx.createSelectorQuery().selectAll(".scroll-view-stats").boundingClientRect().exec(function(t) {
            if (!t[0]) return !1;
            var o = wx.getSystemInfoSync(), r = o.windowWidth, n = o.windowHeight;
            t[0].forEach(function(t, o) {
                var a = t.dataset, i = a.view_bid, s = a.view_lab, l = a.val_lab, c = a.view_key, u = t.width > 0 && t.height > 0, h = t.left >= 0 && t.right <= r && t.top >= 0 && t.bottom <= n;
                i && h && u && !e.statsMap[c || o] && (e.stats(i, s || l), e.statsMap[c || o] = !0);
            });
        });
    };
    e.viewReport = utils.debounce(f, 200);
    var g = e.onPageScroll;
    e.onPageScroll = function(e) {
        this.viewReport(), g && g.call(this, e);
    };
    var d = e.onScrollView;
    e.onScrollView = function(e) {
        this.viewReport(), d && d.call(this, e);
    };
    var y = e.onTabItemTap;
    e.onTabItemTap = function(e) {
        t.tabStats.stats("b_khyiuzpf", {
            from: t.tabStats.last,
            to: e.pagePath
        }), y && y.call(this, e);
    };
    for (var v in e) this[v] = e[v];
    return $Page.Page(this);
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, userScript = require("./user"), loginScript = require("./login"), toast = require("../tpl/toast"), _require = require("../scripts/utils"), parseQuery = _require.parseQuery, md5 = require("../scripts/md5"), utils = require("../scripts/utils"), GlobalComponent = require("../tpl/operation/global-component/main");

$Page.prototype.toast = toast, $Page.prototype.recordCrash = function(e) {
    var t = this;
    try {
        var o = wx.getStorageInfoSync();
        if (o.limitSize - o.currentSize < 10) return;
        var r = e.store.get("crash") || [], n = e.$systemInfo || {}, a = n.system, i = n.version, s = n.model;
        -1 === r.findIndex(function(e) {
            return e.url === t.route;
        }) && r.push({
            url: this.route,
            systemInfo: {
                system: a,
                version: i,
                model: s
            }
        }), e.store.set("crash", r);
    } catch (e) {}
}, $Page.prototype.deleteCrash = function(e) {
    try {
        var t = e.store.get("crash") || [], o = this.route, r = t.findIndex(function(e) {
            return e.url === o;
        });
        -1 !== r && r < t.length && t.splice(r, 1), e.store.set("crash", t);
    } catch (e) {}
}, $Page.prototype.dialog = function(e, t, o) {
    var r = {};
    return "object" === (void 0 === e ? "undefined" : _typeof(e)) ? r = e : (r.title = e, 
    r.content = t), r.complete = function(t) {
        var n = null;
        -1 === t.errMsg.indexOf("showModal:ok") && (n = new Error(t.errMsg), n.res = t), 
        "object" === (void 0 === e ? "undefined" : _typeof(e)) ? r.callback && r.callback(n, t) : o && o(n, t);
    }, wx.showModal(r), this;
}, $Page.prototype.createModal = function(e, t) {
    var o = this, r = this.data, n = {
        display: !1
    };
    return r[e] = n, this.setData(r), {
        show: function() {
            n.display = !0;
            for (var t in r) n[t] = r[t];
            r[e] = n, o.setData(r);
        },
        hide: function() {
            n.display = !1;
            for (var t in r) n[t] = r[t];
            r[e] = n, o.setData(r);
        }
    };
}, $Page.prototype.onTapModalOverlay = function(e) {
    var t = e.target, o = this.data, r = o[t.id];
    r && (r.display = !1, o[t.id] = r, this.setData(o));
}, $Page.prototype.loading = function(e) {
    return !arguments.length || e ? wx.showToast({
        title: "数据加载中",
        icon: "loading",
        duration: 1e4
    }) : wx.hideToast(), this;
}, $Page.prototype.loadingWithTitle = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return !arguments.length || e.isLoading ? wx.showToast({
        title: e.title || "数据加载中",
        icon: "loading",
        duration: e.duration || 1e4
    }) : wx.hideToast(), this;
}, $Page.prototype.toastError = function(e) {
    var t = new Error(e);
    return t.type = 4, t;
}, $Page.prototype.handleError = function(e, t) {
    if ("boolean" == typeof e || "page" == e) {
        var o = t;
        t = e, e = o;
    }
    return this.loading(null), e instanceof Error ? 4 == e.type || 3 == e.type ? this.toast(e.message) : t ? this._hasPullDownRefresh ? this.showErrorPage(e.errType) : (this.showErrorToast(e.errType), 
    setTimeout(function() {
        wx.navigateBack();
    }, 3e3)) : e.errType && this.showErrorToast(e.errType) : this.toast(e), this;
}, $Page.prototype.showErrorPage = function(e) {
    var t = {
        networkError: {
            errPage: !0,
            err_title: "数据获取失败",
            err_content: "请检查网络后刷新"
        },
        serverError: {
            errPage: !0,
            err_title: "服务器异常，请稍后再试",
            err_content: ""
        }
    };
    return this.setData(t[e]), this;
}, $Page.prototype.showErrorToast = function(e) {
    var t = {
        networkError: "网络异常, 请稍后再试",
        serverError: "服务器异常，请稍后再试"
    };
    return t[e] && this.toast(t[e]), this;
}, $Page.prototype.hideErrorPage = function() {
    return this.setData({
        errPage: !1
    }), this;
}, $Page.prototype.tapRefresh = function() {
    return this.loading(), this._hasPullDownRefresh && this.onPullDownRefresh(), this;
}, $Page.prototype.onTapNavi = function(e) {
    var t = this, o = getApp(), r = e.currentTarget.dataset, n = r.url, a = r.needLogin, i = r.ignoreLogin, s = r.ignoreLoginFail, l = r.loginWarn, c = r.needCity, u = r.val_bid, h = r.val_lab, p = r.btn_login, f = Promise.resolve(!0);
    if (this.naviMiddlewares && this.naviMiddlewares.length) {
        var g = !0, d = !1, y = void 0;
        try {
            for (var v, w = this.naviMiddlewares[Symbol.iterator](); !(g = (v = w.next()).done); g = !0) !function() {
                var o = v.value;
                f = f.then(function() {
                    return o.call(t, e);
                });
            }();
        } catch (e) {
            d = !0, y = e;
        } finally {
            try {
                !g && w.return && w.return();
            } finally {
                if (d) throw y;
            }
        }
    }
    c && (o.$location.city || o.get("city") || (f = f.then(function() {
        return o.checkLocationAuth({
            modalOpt: {
                content: "需要先授权定位才可获取您的位置信息噢"
            }
        });
    }))), a && (f = f.then(function() {
        return new Promise(function(e, t) {
            o.checkLogin({
                warn: l,
                path: n,
                ignoreLogin: i,
                ignoreLoginFail: s,
                success: function() {
                    e(!0);
                }
            });
        });
    })), (!p || o.$user && o.$user.token) && f.then(function() {
        u && t.stats && t.stats(u, h), o.goto(n);
    });
}, $Page.prototype.onTapModalTrigger = function() {
    this.setData({
        licenceModalVisible: !0
    });
}, $Page.prototype.licenceModalChange = function() {
    this.setData({
        licenceModalVisible: !1
    });
}, $Page.prototype.collectFormId = function(e) {
    getApp().collectFormId(e.detail.formId);
}, $Page.prototype.doNothing = function() {}, $Page.prototype.getShouldShowAttentionModal = function(e) {
    return !getApp().get("hasRemaidAttention_" + e);
}, $Page.prototype.showAttention = function(e) {
    var t = getApp(), o = void 0;
    "number" == typeof e ? o = e : e && (o = e.currentTarget.dataset.user_type), o = o || 2, 
    this.setData({
        showAttentionModal: !0,
        shouldShowAttentionModal: !1
    }), this.stats("b_m96f50r7");
    t.set("hasRemaidAttention_" + o, !0, {
        expires: function() {
            var e = new Date(), t = e.getTime();
            return (e.setHours(0, 0, 0) + 864e5 - t) / 1e3;
        }()
    });
}, $Page.prototype.onGetUserInfo = function(e) {
    function t() {
        loginScript.addPrivilege(), c && r.goto(c), u && (this.loginRefresh ? this.loginRefresh.call(a) : this._hasPullDownRefresh && this.onPullDownRefresh.call(a));
    }
    function o() {
        wx.hideToast(), this.loginFail && this.loginFail.call(a), d && this.toast(d);
    }
    var r = getApp(), n = this, a = r.page(), i = r.getPropSafely("detail.currentTarget.dataset.url", e, "") ? e.detail : e, s = i.detail, l = i.currentTarget.dataset, c = l.url, u = l.fresh, h = l.ignoreLogin, p = l.ignoreLoginFail, f = l.val_bid, g = l.val_lab, d = l.loginWarn, y = l.forceRelogin, v = void 0 !== y && y;
    return s.errMsg && "getUserInfo:ok" !== s.errMsg ? p || h ? (this.setData({
        needLogin: !1
    }), this.toast(d || "登录失败，请稍后重试"), void (p && t.call(this))) : this.loginFail ? void this.loginFail.call(a) : void 0 : r.$user && r.$user.token && !v ? this.setData({
        isLogin: !0
    }) : function() {
        wx.showToast({
            title: "登录中...",
            icon: "loading",
            duration: 1e4
        }), wx.login({
            success: function(e) {
                e.code && (r.setCode(e.code), wx.getUserInfo({
                    success: function(i) {
                        loginScript.wxUserInfo(e.code, i).then(function(e) {
                            var t = e.body, o = t.error, i = t.data;
                            if (i.code && !i.token) throw i;
                            if (o) throw o;
                            var s = i.token, l = i.userId, c = i.mobile, u = {
                                token: s,
                                userId: l,
                                mobile: c,
                                openId: r.$openId,
                                wxUserInfo: r.$wxUserInfo || {}
                            };
                            return u.wxUserInfo.userInfo && !u.wxUserInfo.userInfo.avatarUrl && (u.wxUserInfo.userInfo.avatarUrl = "https://p1.meituan.net/movie/6b3fe8f3f33fd60748feac641671bb579696.png"), 
                            userScript.saveUser(u), n.setData({
                                isLogin: !0
                            }), f && a.stats && a.stats(f, g), u;
                        }).then(function(e) {
                            if (!e.mobile) return loginScript.getMaoyanMobileByToken(e.token).then(function(o) {
                                o && o.mobile && (e.mobile = o.mobile, e.mobileType = o.type, userScript.setMobile(o.mobile)), 
                                wx.hideToast(), t.call(n);
                            }).catch(function(e) {
                                console.error("getMaoyanMobileByToken: ", e.message), wx.hideToast(), t.call(n);
                            });
                            wx.hideToast(), t.call(n);
                        }).catch(function(e) {
                            if (e) {
                                var t = new Error(e.message);
                                throw t.code = e.code, d = e.message || "登录失败，请稍后重试", o.call(a), t;
                            }
                        });
                    },
                    fail: function() {
                        d = "登录失败，请稍后重试", o.call(a);
                    }
                }));
            },
            fail: function() {
                d = "登录失败，请稍后重试", o.call(a);
            }
        });
    }();
}, $Page.prototype.refreshWXUserInfoOfMY = function(e) {
    var t = this, o = getApp(), r = o.$wxUserInfo || o.$user && o.$user.wxUserInfo, n = o.get("hasFreshedMYUser"), a = function() {
        e && "function" == typeof e && e.call(t);
    };
    if (!r || 0 == Object.keys(r).length || n) return void a();
    var i = function(e) {
        e ? wx.getUserInfo({
            withCredentials: !0,
            success: function(n) {
                var i = utils.stringConcat(r.appName, "sdwasxacax", n.rawData, e, n.signature, n.iv, o.$user.token);
                i = md5(i), o.request().post("/api/account/v1/updateweappuserinfo").proxyhost("usercenter").send({
                    sign: i,
                    code: e,
                    appName: r.appName,
                    rawData: n.rawData,
                    signature: n.signature,
                    encryptedData: n.encryptedData,
                    iv: n.iv,
                    token: o.$user.token
                }).end().then(function(e) {
                    e.error ? t.toast(e.error.message || "获取登录信息失败，请稍后重试") : o.set("hasFreshedMYUser", !0, {
                        expires: 7776e3
                    }), a();
                }).catch(function(e) {
                    t.toast(e.message || "获取登录信息失败，请稍后重试"), a();
                });
            },
            fail: function() {
                a();
            }
        }) : a();
    };
    wx.login({
        success: function(e) {
            i(e.code);
        },
        fail: function() {
            _this.toast("获取登录信息失败，请稍后重试"), a();
        },
        timeout: 2e3
    });
}, $Page.prototype.nullFuncButBindStats = function(e) {
    var t = e.currentTarget.dataset, o = t.val_bid, r = t.val_lab;
    o && this.stats && this.stats(o, r);
}, $Page.prototype.loginAfterDo = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "请先登陆后操作", o = getApp();
    return function() {
        var r = this, n = Array.from(arguments);
        o.$user.token ? e.apply(this, n) : o.checkLogin({
            warn: t,
            success: function() {
                e.apply(r, n);
            }
        });
    };
}, $Page.prototype.catchtouch = function() {}, module.exports = function(e) {
    function t(e) {
        return new $Page(e);
    }
    return $Page.Page = $Page.Page || Page, "object" === (void 0 === e ? "undefined" : _typeof(e)) && t(e), 
    t;
}, $Page.prototype.reportError = function(e, t) {
    var o = getApp();
    if (e && e.message) try {
        var r = t || {}, n = r.level, a = void 0 === n ? "error" : n, i = r.report, s = void 0 !== i && i;
        o.owl.error.pushError({
            sec_category: e.message,
            content: e,
            level: a,
            category: "jsError"
        }, s);
    } catch (e) {
        console.error(e);
    }
};