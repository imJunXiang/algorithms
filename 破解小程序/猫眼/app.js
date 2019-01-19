function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function cpsReport(e) {
    var t = e.query, r = e.scene, n = t.redirect, o = void 0 === n ? "" : n, i = t.cps_package;
    if (o.indexOf("1000088") > 0 && !i) {
        var s = this.owl.error;
        s && s.addError("cpspackage is null", "query: " + JSON.stringify(t) + ", scene: " + r);
    }
}

function limit() {
    var e = "", t = null;
    return function(r, n) {
        r !== e && (clearTimeout(t), goto.call(this, r, n), e = r, t = setTimeout(function() {
            e = "";
        }, 300));
    };
}

function goto(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (void 0 !== e) {
        var r = this.pages();
        if (-1 === e) wx.navigateBack(); else {
            var n = e.match(/\/(wx\w{16})\/([\w\W]*$)/);
            if (n && n.length >= 3) wx.navigateToMiniProgram({
                appId: n[1],
                path: n[2],
                envVersion: "trail"
            }); else {
                var o = t ? wx.redirectTo : wx.navigateTo;
                [ "/pages/movie/index", "/pages/cinema/index", "/wesai/indexpage/index", "/pages/show/index/index", "/pages/user/index" ].includes(e.split("?")[0]) ? o = wx.switchTab : r.length >= 10 && (o = wx.redirectTo, 
                e = e + (e.includes("?") ? "&" : "?") + "_redirect=1"), 0 === e.indexOf("http") && wx.canIUse("web-view") && (e = "/pages/webview/webview?url=" + encodeURIComponent(e)), 
                o({
                    url: e
                });
            }
        }
        return this;
    }
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, _base = require("./components/base"), _base2 = _interopRequireDefault(_base), stats = require("./scripts/stats.js"), stats2 = require("./scripts/stats2.js"), config = require("./config/wallet"), checkUpdate = require("./scripts/update");

require("./scripts/polyfill");

var promisify = require("./scripts/promisify"), store = require("./scripts/store"), attach = require("./scripts/attach"), user = require("./scripts/user"), request = require("./scripts/request"), MoviePage = require("./scripts/page"), openPlatform = require("./scripts/open-platform"), loginScript = require("./scripts/login"), locationModel = require("./models/location"), event = require("./scripts/event"), cps = require("./scripts/cps"), risk = require("./scripts/risk"), finger = require("./scripts/risk-finger"), actionSheet = require("./scripts/action-sheet"), apiConfig = require("./scripts/api-config"), uuid = require("./scripts/uuid"), _require = require("./scripts/owl/index.js"), owl = _require.owl, api = apiConfig.getApiUrl(), version = "wallet-v1.19.11";

cps.setExpired(7776e3);

var pageSpeed = owl.pageSpeed, error = owl.error, resource = owl.resource, launchTime = void 0, reportErrorArr = [], reportTimer = void 0, app = {
    onLaunch: function(e) {
        var t = this;
        launchTime = new Date(), this.channelId = config.channelId, this.appName = config.name, 
        this.lxAppname = config.lxAppname, this.clientType = "wechat_small_program", this.clientTypeId = 9, 
        this.$location = locationModel._data, this.$user = {}, this.$debug = !1, this.$theme = "my", 
        this.url = "https://wx.maoyan.com", this.appId = config.appid, this.config = config, 
        this.version = version, this.scene = e.scene.toString(), this.imageSrcPrefix = "https://static.meituan.net/bs/MYFE/wxapp-wallet/file", 
        this.$uuidV2 = "", this.isIphoneX = !1, event.attach(this);
        try {
            var r = wx.getSystemInfoSync();
            this.isIphoneX = /iphone\s{0,1}x/gi.test(r.model), this.isIphone = /iphone/gi.test(r.model);
        } catch (e) {}
        this.getUser(this), setTimeout(function() {
            t.uuid(), t.systemInfo(), t.uuidV2(), checkUpdate();
        }, 0), this.openPlatform = openPlatform(this), this.stats = function(e) {
            stats({
                channel: "movie",
                appnm: config.lxAppname || config.name,
                url: "https://report.meituan.com/",
                uid: function() {
                    return t.$user.userId;
                },
                utm: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!e.utm_campaign) {
                        var r = t.openPlatform.get();
                        if (r) {
                            var n = r.extChannelId, o = r.extSubChannel;
                            e.utm_campaign = "openPlatform=" + [ n, o ].filter(function(e) {
                                return !!e;
                            }).join("-");
                        }
                    }
                    return e;
                },
                injectFilter: function(e) {
                    var t = !0;
                    return t = t && !/^(fetch|countDown|onPullDownRefresh|format|getMovie|getShowDates|getCinemas|getShows|getDealList|touchstart|touchend|formSubmit|submitOrder|fill|changeCity|onTouchStartSubmit|movieChange|touchmove|getHotMovie|getSearchHistory|getPhotos|secondsToTime|numberToHumanReadable|getNetworkType|listenNetwork|getTypes|getTicketOrders|getGoodsOrders|getMyCoupons|getMyCards|getWishList|getWatchedMovies|getEgg|applyRefund|doNothing|check|onPageScroll|getKeyword|onBannerChagne|checkSaleTime|getLeftTime|setLeftTime|changeToSale|getParameterByName|getId|initTopBannerViewDot|bannerClickDot|onBannerChange|onScrollView|commonShowDot|catchtouch)/.test(e);
                }
            })(e), stats2({
                injectFilter: function(e) {
                    return !/^(fetch|countDown|onPullDownRefresh|format|getMovie|getShowDates|getCinemas|getShows|getDealList|touchstart|touchend|formSubmit|submitOrder|fill|changeCity|onTouchStartSubmit|movieChange|touchmove|getHotMovie|getSearchHistory|getPhotos|secondsToTime|numberToHumanReadable|getNetworkType|listenNetwork|getTypes|getTicketOrders|getGoodsOrders|getMyCoupons|getMyCards|getWishList|getWatchedMovies|getEgg|applyRefund|doNothing|check|onPageScroll|getKeyword|onBannerChagne|checkSaleTime|getLeftTime|setLeftTime|changeToSale|getParameterByName|getId|initTopBannerViewDot|bannerClickDot|onBannerChange|onScrollView|commonShowDot|catchtouch)/.test(e);
                }
            })(e);
        };
        var n = {
            val_cid: "app"
        };
        this.stats(n), n.stats("appOnload", e), this.tabStats = {
            val_cid: "c_pn4xa5d"
        }, this.stats(this.tabStats), this.clearOutdate(), locationModel.on("locationChange", function(e) {
            t._cityToastDisabled = !0;
        }), this.models = {
            location: locationModel
        };
        var o = store.get("city");
        o && locationModel.changeCity(o), this.store = store, this.owl = owl, this.listenShaking();
        try {
            var i = Date.now();
            pageSpeed.appLaunch(i);
        } catch (e) {
            console.log("onLaunch error:" + e.stack || e);
        }
        try {
            this.owl.start({
                project: "maoyan-wxapp-wallet",
                devMode: this.$debug,
                wxAppVersion: wx.version && wx.version.version
            });
        } catch (e) {
            console.log("Start Error: " + (e.stack || e));
        }
        try {
            wx.request({
                method: "GET",
                url: "https://wx.maoyan.com/logger/logLaunch",
                header: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.error("上报启动失败：" + (e.stack || e));
        }
        var s = store.get("crash") || [];
        0 !== s.length && this.reportCrash(s), store.set("crash", []);
        var a = this;
        try {
            wx.request({
                method: "GET",
                url: "https://wx.maoyan.com/reportErrorConfig",
                success: function(e) {
                    a.EXCLUDE_ERROR = e.data;
                }
            });
        } catch (e) {
            error.addError("读取数据库出错", e);
        }
    },
    reportCrash: function(e) {
        e.forEach(function(e) {
            try {
                error.pushError({
                    sec_category: "页面崩溃",
                    content: {
                        sec_category: "页面崩溃",
                        content: e
                    },
                    level: "warn",
                    category: "jsError"
                }, !0);
            } catch (e) {
                console.error("上报页面崩溃出错: " + (e.stack || e));
            }
        });
        try {
            wx.request({
                method: "GET",
                url: "https://wx.maoyan.com/logger/logLaunch",
                data: {
                    crash: !0
                },
                header: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.error("上报crash失败：" + (e.stack || e));
        }
    },
    onShow: function() {
        for (var t = this, r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
        this.emit.apply(this, [ "show" ].concat(n));
        var i = n[0].scene;
        i && (this.scene = i.toString());
        var s = {
            val_cid: "app"
        };
        this.stats(s), s.stats.apply(s, [ "appOnshow" ].concat(n));
        try {
            cpsReport.call(this, n[0]);
            var a = owl.newMetric();
            a.setTags({
                version: version
            }), a.setMetric("app-version", 1), a.report();
        } catch (t) {
            console.error("上报app-version失败：" + (e.stack || e));
        }
        setTimeout(function() {
            t.silentLogin(), t.$user.token && loginScript.addPrivilege();
        }, 0);
    },
    onHide: function() {
        try {
            error.report(), resource.report();
        } catch (e) {
            console.log("onHide catch:" + e.stack || e);
        }
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        this.emit.apply(this, [ "hide" ].concat(t));
    },
    onError: function() {
        for (var e = new Date() - launchTime, t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
        try {
            reportErrorArr.push(r[0]), this.EXCLUDE_ERROR || e > 5e3 ? this.reportError(reportErrorArr) : e < 5e3 && (reportTimer && clearTimeout(reportTimer), 
            reportTimer = setTimeout(this.reportError.bind(this, reportErrorArr), 5e3 - e));
        } catch (e) {
            console.log("onError catch:" + e.stack || e);
        }
        this.emit.apply(this, [ "error" ].concat(r));
    },
    reportError: function(e) {
        var t = this;
        try {
            if (!Array.isArray(e)) throw new Error("reportError 参数需要为数组！");
            e.forEach(function(e) {
                var r = [ "appServiceSDKScriptError*undefined is not an object (evaluating *USER_DATA_PATH", "webviewSDKScriptError*Failed get storage group metadata" ];
                (t.EXCLUDE_ERROR ? t.EXCLUDE_ERROR.push(r) : r).some(function(t) {
                    return t.split("*").every(function(t) {
                        return -1 !== e.indexOf(t);
                    });
                }) || error.onError(e);
            }), e.splice(0, e.length);
        } catch (e) {
            console.log("reportError catch: " + e.stack || e);
        }
    },
    onPageNotFound: function(e) {
        try {
            e && error.addError("page not found", e.path);
        } catch (e) {
            console.log("onPageNotFound catch:" + e.stack || e);
        }
    },
    num: function(e) {
        return e > 1e4 && (e /= 1e4, e = e.toFixed(1) + "万"), e;
    },
    system: function(e) {
        if ("function" == typeof e) this.wx2callback(wx.getSystemInfo)(e); else try {
            return wx.getSystemInfoSync();
        } catch (e) {
            console.error("app.system", e);
        }
    },
    goto: limit(),
    checkLocationAuth: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = t.modalOpt, n = t.silence;
        return wx.getSetting ? new Promise(function(t, o) {
            e.wx2promiseify(wx.getNetworkType).then(function(e) {
                "none" === e.networkType && t(!0);
            }).catch(function(e) {
                return o(e);
            }), e.wx2promiseify(wx.getSetting).then(function(t) {
                if (t.authSetting) {
                    var o = t.authSetting["scope.userLocation"];
                    if (n) {
                        if (!0 === o) return !0;
                        throw Error("用户未授权定位");
                    }
                    if (!1 !== o) return !0;
                }
                if (n) throw Error("用户拒绝打开定位");
                return e.wx2promiseify(wx.showModal, _extends({
                    content: "需要先授权定位才可获取您的位置信息",
                    showCancel: !0,
                    confirmText: "打开定位"
                }, r || {})).then(function(t) {
                    if (t.confirm) return e.wx2promiseify(wx.openSetting);
                    throw Error("用户拒绝打开定位");
                }).then(function(e) {
                    if (e.authSetting && e.authSetting["scope.userLocation"]) return !0;
                    throw Error("获取定位授权失败");
                });
            }).then(function(e) {
                return t(e);
            }).catch(function(e) {
                return o(e);
            });
        }) : Promise.resolve(!0);
    },
    star: function(e) {
        for (var t = []; t.length < parseInt(e, 10); ) t.push("full");
        for (e > parseInt(e, 10) && t.push("half"); t.length < 5; ) t.push("empty");
        return t;
    },
    queryStringify: function(e) {
        return e ? Object.keys(e).map(function(t) {
            return t + "=" + (e[t] ? encodeURIComponent(e[t]) : "");
        }).join("&") : "";
    },
    shareParams: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
            utm_source: "share_" + config.name
        };
        return t = _extends({}, t, e), this.queryStringify(t);
    },
    shareAfter: function(e, t) {
        this.request().get(api + "/sns/user/share.json").header({
            token: this.$user.token
        }).query({
            shareUrl: e,
            channelId: this.channelId,
            commentId: t
        }).end().then(function(e) {}).catch(function(e) {
            return reject(e);
        });
    },
    pages: function() {
        return getCurrentPages();
    },
    page: function(e) {
        var t = this.pages();
        return e = e || -1, e < 0 && (e = t.length + e), t[e];
    },
    title: function(e) {
        return "string" == typeof e ? (this.$title = e, this.wx2promiseify(wx.setNavigationBarTitle, {
            title: e
        })) : this.$title;
    },
    network: function(e) {
        return "function" == typeof e ? this.wx2callback(wx.getNetworkType)(function(t, r) {
            e(t, r.networkType);
        }) : this.wx2promiseify(wx.getNetworkType).then(function(e) {
            return e.networkType;
        });
    },
    require: function(e) {
        function t(t) {
            return e.apply(this, arguments);
        }
        return t.toString = function() {
            return e.toString();
        }, t;
    }(function(e) {
        return require("./" + e);
    }),
    uuid: function(e) {
        var t = this;
        return new Promise(function(r, n) {
            return t.$uuid ? (e && e(t.$uuid), r(t.$uuid)) : (t.$uuid = store.get("uuid"), t.$uuid ? (e && e(t.$uuid), 
            r(t.$uuid)) : void t.request().post("https://apimobile.meituan.com/uuid/v1/register").end().then(function(e) {
                return e.body.uuid;
            }).then(function(o) {
                o ? (r(o), store.set("uuid", t.$uuid = o), e && e(null, o)) : (n(o), e && e(o));
            }).catch(n));
        });
    },
    uuidV2: function() {
        var e = this;
        return new Promise(function(t) {
            if (e.$uuidV2 = e.$uuidV2 || store.get("uuidV2"), e.$uuidV2) return t(e.$uuidV2);
            Promise.all([ e.systemInfo(), e.openid() ]).then(function(r) {
                var n = r[0].brand + " " + r[0].model + " " + r[1];
                return e.$uuidV2 = uuid.genUuid(n), store.set("uuidV2", e.$uuidV2), t(e.$uuidV2);
            });
        });
    },
    systemInfo: function() {
        var e = this;
        return this.$systemInfo ? Promise.resolve(this.$systemInfo) : this.wx2promiseify(wx.getSystemInfo).then(function(t) {
            return e.$systemInfo = t, t;
        });
    },
    rpx2px: function(e) {
        var t = void 0;
        return this.$systemInfo && (t = this.$systemInfo.screenWidth ? this.$systemInfo.screenWidth : this.$systemInfo.windowWidth), 
        t = t || 375, e * t / 750;
    },
    sendMessage: function(e) {
        this.$user.openId && this.request().post("/wechat/wxapp/message").header("content-type", "application/json").send(_extends({
            appid: this.appId,
            touser: this.$user.openId
        }, e)).end();
    },
    distance: function(e, t) {
        var r = e.lat * Math.PI / 180, n = t.lat * Math.PI / 180, o = r - n, i = e.lng * Math.PI / 180 - t.lng * Math.PI / 180, s = 12756.274 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(r) * Math.cos(n) * Math.pow(Math.sin(i / 2), 2)));
        return Math.round(10 * s) / 10;
    },
    img: function(e, t, r) {
        if (!e) return e;
        e = e.replace("/w.h/", "/"), e = e.split("@")[0], void 0 === t && (t = {}), "number" == typeof t && (t = {
            w: t,
            h: r
        }), t = _extends({
            l: 1,
            e: 1,
            c: 1
        }, t);
        var n = this.$systemInfo ? this.$systemInfo.pixelRatio : 2;
        return t.w && (t.w = parseInt(t.w / 2 * n, 10)), t.h && (t.h = parseInt(t.h / 2 * n, 10)), 
        "object" === (void 0 === t ? "undefined" : _typeof(t)) && (e += "@", e += Object.keys(t).filter(function(e) {
            return !!t[e];
        }).map(function(e) {
            return t[e] + e;
        }).join("_")), e;
    },
    price: function(e) {
        return isNaN(e) ? e : Number(Number(e).toFixed(2));
    },
    code: function(e) {
        if (!e || !e.length) return e;
        for (var t = e.length, r = 0, n = []; r < t; ) n.push(e.slice(r, r + 4)), r += 4;
        return n.join(" ");
    },
    noRepeatPromise: function(e) {
        var t = void 0;
        return function() {
            function r() {
                t = null;
            }
            if (t) return t;
            for (var n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];
            t = e.apply(this, o), t && t.then ? t.then(r, r) : t = null, setTimeout(function() {
                t = null;
            }, 1e4);
        };
    },
    wx2promiseify: promisify.wx2promise,
    request: request,
    wx2callback: function(e) {
        var t = this;
        return function(r, n) {
            if (r = r || {}, "function" == typeof r && (n = r, r = {}), "function" != typeof n) throw new TypeError("callback must be a function");
            return r.success = function(e) {
                return n(null, e);
            }, r.fail = function(e) {
                return n(e);
            }, e(r), t;
        };
    },
    deviceInfoByQQ: function(e) {
        return e && "object" === (void 0 === e ? "undefined" : _typeof(e)) && (e = JSON.stringify(e)), 
        JSON.stringify({
            identityInfo: {
                appid: this.appId,
                openid: this.$user ? this.$user.openId : ""
            },
            user_type: "wx",
            wechatRiskParams: e
        });
    },
    collectFormId: function(e, t) {
        this.$user.openId && this.request().post("/wxapp/formId").header("content-type", "application/json").send({
            appId: this.appId,
            openId: this.$user.openId,
            formId: e,
            count: t
        }).end();
    },
    updateCode: function() {
        var e = this;
        return this.wx2promiseify(wx.login).then(function(t) {
            return e._code = t.code, e._code;
        });
    },
    getCode: function() {
        return this._code;
    },
    setCode: function(e) {
        var t = this;
        wx.checkSession({
            success: function() {
                t._code || (t._code = e);
            },
            fail: function() {
                t._code = e;
            }
        });
    },
    getPropSafely: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        return e.split(".").reduce(function(e, t) {
            return e && e[t] ? e[t] : r;
        }, t);
    },
    getFingerprint: function() {
        return new Promise(function(e) {
            finger.g(function(t) {
                return e(t);
            });
        });
    },
    riskWrapper: function(e, t) {
        return Promise.all([ t && t.noLoginCode ? Promise.resolve("") : this.wx2promiseify(wx.login, {
            timeout: 2e3
        }), new Promise(function(e) {
            risk.params(null, e);
        }), this.getFingerprint() ]).then(e);
    },
    listenShaking: function() {
        var e = this;
        this.$debug && wx.onAccelerometerChange(function(t) {
            var r = t.x, n = t.y, o = t.z;
            !e.isActionSheetActive && (r > 1 || n > 1 || o > 1) && (e.isActionSheetActive = !0, 
            e.showDebugActions());
        });
    },
    showDebugActions: function() {
        var e = this;
        this.$debug && wx.showActionSheet({
            itemList: actionSheet.getActionSheet(),
            success: function(t) {
                actionSheet.invokeAction(t.tapIndex), e.isActionSheetActive = !1;
            },
            fail: function() {
                e.isActionSheetActive = !1;
            }
        });
    },
    getApiEnv: function() {
        return this.$debug ? apiConfig.getApiEnv() : "prod";
    },
    downloadFile: function(e) {
        return app.wx2promiseify(wx.downloadFile, {
            url: this.$debug ? e : e.replace("http:", "https:")
        }).then(function(e) {
            return e.tempFilePath;
        });
    },
    uploadImage: function(e) {
        return app.wx2promiseify(wx.uploadFile, {
            url: "https://wx.maoyan.com/proxy/file/mmdb/photos/upload.json?_v_=yes",
            header: {
                "x-host": "http://maoyantouch.vip.sankuai.com",
                "X-Requested-With": "wxapp"
            },
            filePath: e,
            name: "file"
        }).then(function(e) {
            var t = "";
            try {
                t = JSON.parse(e.data).data[0].olink;
            } catch (e) {}
            return t;
        });
    }
};

attach(app, store), attach(app, user), attach(app, {
    MoviePage: MoviePage
}), attach(app, {
    MovieComponent: _base2.default
}), cps.App(app), require("./wesai/app.js");