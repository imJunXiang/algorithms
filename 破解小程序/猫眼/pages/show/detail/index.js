function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, r) {
            function n(o, a) {
                try {
                    var i = t[o](a), s = i.value;
                } catch (e) {
                    return void r(e);
                }
                if (!i.done) return Promise.resolve(s).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(s);
            }
            return n("next");
        });
    };
}

var _slicedToArray = function() {
    function e(e, t) {
        var r = [], n = !0, o = !1, a = void 0;
        try {
            for (var i, s = e[Symbol.iterator](); !(n = (i = s.next()).done) && (r.push(i.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            o = !0, a = e;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (o) throw a;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, _user = require("../../../scripts/show/user"), _user2 = _interopRequireDefault(_user), _wallet = require("../../../config/wallet"), _url = require("../../../models/url"), _url2 = _interopRequireDefault(_url), _storageKey = require("../../../scripts/show/storageKey"), _storageKey2 = _interopRequireDefault(_storageKey), _bindPhoneNumber = require("../../../scripts/show/bindPhoneNumber"), _bindPhoneNumber2 = _interopRequireDefault(_bindPhoneNumber), Store = require("../../../scripts/store"), app = getApp(), PREFIX = "https://wx.maoyan.com/maoyansh/myshow/ajax/v2", PREFIXV1 = "https://wx.maoyan.com/maoyansh/myshow/ajax";

app.MoviePage(_extends({}, _bindPhoneNumber2.default, {
    data: {
        name: "详情页改版",
        performanceInfo: null,
        bindButtonInfo: {
            Reserve: !1,
            order: !1,
            priority: !1,
            remind: !1,
            seatOrder: !1
        },
        mistiming: 0,
        saleStatus: 999,
        priorBuyStatus: 999,
        beforeSaleStatus: null,
        isNeedOnSaleRemind: 999,
        tagStatus: 999,
        currentTime: new Date().getTime(),
        richText: wx.canIUse("rich-text"),
        showFlag: 0,
        isCollect: !1,
        showDiscountDetail: !1,
        isBVersion: 999,
        isSelectSeatProject: 999,
        isNeedSoldOutRegister: 999,
        btnText: "unknown",
        reaction: "unknown",
        showSalRemindModal: !1,
        numberToBeRemind: "",
        previousSuccessRemindNumber: void 0,
        showInfo: [],
        displayShowList: !1,
        selectedShowId: null,
        isNeedAnswer: 999,
        isShowBuyButton: !1,
        isIphoneX: app.isIphoneX,
        options: {},
        isPageLoading: !0,
        isLoadingPageError: !1,
        pageErrorType: "noError",
        activitiesInfo: {},
        countDownEnd: !1,
        pixelRatio: null,
        isIphone: app.isIphone,
        showSaleRemindModalWithTags: !1,
        isNeedRemindWithPriceModal: !1,
        remindTicketPriceList: [],
        isShowCrowdedToast: !1,
        answerCrowded: !1,
        projectVideoInfo: {},
        isShowVideo: !1
    },
    onLoad: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a, i, s, u, c, d, f, l, h, p, m, g, w, v, S, b, y, I, k, T, x, R, P, C, _, B, N, D, E, A, M, O, q, j, V, H, F;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return e.salesWay ? app.set(_storageKey2.default.salesWay, e.salesWay) : app.remove(_storageKey2.default.salesWay), 
                    t.setData({
                        options: e
                    }), t.fromQRCode(e), n = t, t.performanceId = e.id, r.prev = 5, t.setData({
                        isPageLoading: !0
                    }), wx.showLoading({
                        title: "加载中"
                    }), r.next = 10, Promise.all([ t.getBVersionInfo(), t.getPerformanceInfo(e), t.getBindButtonInfo() ]);

                  case 10:
                    o = r.sent, a = _slicedToArray(o, 3), i = a[0], s = a[1], u = a[2], c = t.getPerformanceSaleStatus(s), 
                    d = t.getSaleRemindInfo(s), f = t.getTags(s), l = t.getPriorBuyStatus(s), h = t.getIsNewSelectProject(i, s.performanceId), 
                    p = t.getIsSelectSeatProject(s), m = t.getIsNeedSoldOutRegister(s), g = t.getIsNeedOnSaleRemind(d), 
                    w = t.getIsNeedAnswer(s), v = t.getIsShowBuyButton(e), S = t.getIsShowBuyButtonByPerformanceInfo(s), 
                    v = v && S, b = t.getActivitiesInfo(s), y = t.getIsNeedRemindWithPriceModal(s), 
                    I = t.getRemindTicketPriceList(s), k = t.getCheckCrowdedInfo(s), T = t.getProjectVideoInfo(s), 
                    x = t.getIsShowVideo(T), R = t.caculateTextAndReaction(c, h, p, g), P = R.btnText, 
                    C = R.reaction, _ = t.getPreviousNumberFromStorage(), t.setCountDown(d, c), t.setChangePriorBuyStatusCountDown(l, s), 
                    B = app.getPropSafely("$location.city.id", app, 10), n.setData({
                        performanceInfo: s,
                        bindButtonInfo: u,
                        saleStatus: c,
                        beforeSaleStatus: d,
                        tagStatus: f,
                        priorBuyStatus: l,
                        id: s.performanceId,
                        isBVersion: h,
                        isSelectSeatProject: p,
                        isNeedSoldOutRegister: m,
                        isNeedOnSaleRemind: g,
                        btnText: P,
                        reaction: C,
                        currentTime: new Date().getTime(),
                        isNeedAnswer: w,
                        isShowBuyButton: v,
                        activitiesInfo: b,
                        previousSuccessRemindNumber: _,
                        isLoadingPageError: !1,
                        cityId: B,
                        pixelRatio: app.$systemInfo.pixelRatio,
                        isNeedRemindWithPriceModal: y,
                        remindTicketPriceList: I,
                        answerCrowded: k,
                        projectVideoInfo: T,
                        isShowVideo: x,
                        promotional: s.promotional
                    }), N = e.id, D = e.fromTag, E = e.utm_source, A = e._fromTag, M = e.salesWay, O = D || A || E, 
                    q = getCurrentPages(), j = q[q.length - 2] ? q[q.length - 2].route : "", V = {
                        performanceId: N,
                        performanceInfo: s,
                        cityId: B,
                        referPage: O || "",
                        salesWay: M,
                        routePage: j,
                        btnText: P,
                        priorBuyStatus: l
                    }, t.statsHandler("detailViewStats", V), r.next = 56;
                    break;

                  case 47:
                    r.prev = 47, r.t0 = r.catch(5), H = "unknown", -1 !== r.t0.message.indexOf("network error") && (H = "network"), 
                    -1 !== r.t0.message.indexOf("performance expired") && (H = "expired"), -1 !== r.t0.message.indexOf("unknown error") && (H = "unknown"), 
                    -1 !== r.t0.message.indexOf("crowded error") && (H = "crowded"), -1 !== r.t0.message.indexOf("limit error") && (H = "limit"), 
                    t.setData({
                        isLoadingPageError: !0,
                        pageErrorType: H
                    });

                  case 56:
                    return r.prev = 56, F = t, t.setData({
                        isPageLoading: !1
                    }, function() {
                        var e = t.data.pageErrorType, r = void 0;
                        "unknown" === e && (r = "loadUnknownError"), "expired" === e && (r = "loadExpiredError"), 
                        "network" === e && (r = "loadNetworkError"), "noError" === e && (r = "noError"), 
                        "crowded" === e && (r = "loadCrowded"), "limit" === e && (r = "limitRefresh"), wx.hideLoading(), 
                        F.errorHandler(r);
                    }), r.finish(56);

                  case 60:
                  case "end":
                    return r.stop();
                }
            }, r, t, [ [ 5, 47, 56, 60 ] ]);
        }))();
    },
    onShow: function() {
        this.data.isLogin && this.getCollectState(), this.data.isLogin && this.getUserPhoneNumber(), 
        this.resetBindPhoneNumberDate(), app.updateCode();
    },
    onUnload: function() {
        this.clearCountDown(), this.clearPriorBuyCountDown(), this.setPreviousNumberToStorage();
    },
    reload: function() {
        var e = this.data.options;
        this.onLoad(e);
    },
    navibackToIndex: function() {
        wx.switchTab({
            url: "/pages/show/index/index"
        });
    },
    fromQRCode: function(e) {
        if (e.q) try {
            var t = decodeURIComponent(e.q), r = this.getUrlParams(t) || {}, n = r.id, o = r.fromTag, a = r.utm_source, i = r._fromTag;
            if (!n) return this.errorModal();
            if (e.id = n, o = o || i || a) return wx.redirectTo({
                url: "/pages/show/detail/index?id=" + e.id + "&utm_source=" + o
            });
        } catch (e) {
            this.errorModal();
        }
    },
    getPerformanceInfo: function(e) {
        var t = this;
        return app.request().get(PREFIX + "/performance/" + e.id + ";detail=2;poi=false").query({
            sellChannel: 7,
            token: (0, _user2.default)(app.$user).token
        }).end().then(function(e) {
            return t.setData({
                mistiming: new Date() - (e.header.ServerTime || e.header.servertime)
            }), e;
        }).then(function(e) {
            if (1002 === e.body.code) throw new Error("performance expired");
            if (1407 === e.body.code) throw new Error("crowded");
            if (1408 === e.body.code) throw new Error("limit");
            return e;
        }).then(function(e) {
            return e.body.data;
        }).then(function(e) {
            return Store.set("stockOutRegister", e.stockOutRegister || 0), e;
        }).catch(function(e) {
            if (-1 !== e.message.indexOf("performance expired")) throw e;
            if (-1 !== e.message.indexOf("request:fail")) throw new Error("network error");
            if (-1 !== e.message.indexOf("crowded")) throw new Error("crowded error");
            if (-1 !== e.message.indexOf("limit")) throw new Error("limit error");
            throw new Error("unknown error");
        });
    },
    getBVersionInfo: function() {
        return app.request().get("https://lina.dianping.com/api/get").query({
            key: "maoyansh-show-config"
        }).end().then(function(e) {
            return e.body;
        }).catch(function(e) {
            if (-1 !== e.message.indexOf("request:fail")) throw new Error("network error");
            return "lina-err";
        });
    },
    getIsNeedAnswerById: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", app.request().get("/maoyansh/myshow/ajax/question/queryQuestions").query({
                        performanceId: e.data.performanceInfo.performanceId,
                        token: app.$user.token,
                        sellChannel: 7
                    }).config({
                        loading: 1
                    }).end().then(function(e) {
                        return e.body;
                    }).then(function(e) {
                        var t = e.code, r = e.data;
                        if (200 !== t || !r) throw new Error("server error");
                        return r.needAnswer;
                    }).catch(function(e) {
                        return "error";
                    }));

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    getBindButtonInfo: function() {
        return app.request().get(PREFIX + "/performance/verifyBindMobile").end().then(function(e) {
            return e.body;
        }).then(function(e) {
            if (200 !== e.code) throw new Error("server error");
            return e.data;
        }).catch(function() {
            return {
                Reserve: !1,
                order: !1,
                priority: !1,
                remind: !1,
                seatOrder: !1
            };
        });
    },
    getIsShowBuyButtonByPerformanceInfo: function(e) {
        return !e.invalidProject;
    },
    getPerformanceSaleStatus: function(e) {
        return e.saleStatus;
    },
    getSaleRemindInfo: function(e) {
        return e.saleRemindVO;
    },
    getIsNeedOnSaleRemind: function(e) {
        return e.needRemind ? 1 : 0;
    },
    getTags: function(e) {
        var t = e.exclusive, r = 2;
        return 1 === t && (r = 1), 2 === t && (r = 0), r;
    },
    getPriorBuyStatus: function(e) {
        return e.ticketRobbingProject ? 1 : 0;
    },
    getBoostInfo: function(e) {
        return e.boostSaleRemindVO;
    },
    getIsSelectSeatProject: function(e) {
        return e.seatType;
    },
    getIsNewSelectProject: function(e, t) {
        if ("lina-err" === e) return 0;
        try {
            var r = (e.code, e.data.value.newSeatPIds), n = r.includes(+t);
            return Store.set("isBVersion", n), n ? 1 : 0;
        } catch (e) {
            return 0;
        }
    },
    getIsNeedSoldOutRegister: function(e) {
        return e.stockOutRegister ? 1 : 0;
    },
    getIsNeedAnswer: function(e) {
        return e.needAnswer;
    },
    getIsShowBuyButton: function(e) {
        return "order" !== e.f;
    },
    getActivitiesInfo: function(e) {
        var t = e.kingHonorFlag, r = void 0;
        return e.kingHonorParam && (r = e.kingHonorParam), {
            isDuringActivities: t,
            needParmas: r
        };
    },
    getIsNeedRemindWithPriceModal: function(e) {
        return e.needRemindPrice;
    },
    getRemindTicketPriceList: function(e) {
        var t = e.ticketPriceList || [];
        return t = t.map(function(e) {
            return e.selected = !1, e;
        });
    },
    getCheckCrowdedInfo: function(e) {
        return e.currentLimit;
    },
    getProjectVideoInfo: function(e) {
        return e.projectVideoVO;
    },
    getIsShowVideo: function(e) {
        if (!e) return !1;
        var t = e.validDate;
        return Date.parse(new Date()) < t;
    },
    setCountDown: function(e, t) {
        var r = this, n = e.onSaleTime;
        if (n && 1 === t) {
            var o = this, a = o.data.mistiming;
            o.countdownInterval = setInterval(function() {
                var e = new Date().getTime();
                e - a > n && (clearInterval(o.countdownInterval), o.changeToOnSale(), r.setData({
                    countDownEnd: !0
                })), o.setData({
                    currentTime: e
                });
            }, 1e3);
        }
    },
    setChangePriorBuyStatusCountDown: function(e, t) {
        var r = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            var o, a, i, s, u, c;
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    o = r, a = r.data.mistiming, e && (i = o.getBoostInfo(t), s = i.releaseEndTime, 
                    u = new Date().getTime() - a, c = setInterval(_asyncToGenerator(regeneratorRuntime.mark(function e() {
                        var n, i;
                        return regeneratorRuntime.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                              case 0:
                                if (!((n = new Date().getTime() - a) > s)) {
                                    e.next = 7;
                                    break;
                                }
                                return e.next = 4, o.queryPriorBuyStatus(t.performanceId);

                              case 4:
                                i = e.sent, clearInterval(o.priorbuyInterval), o.setData({
                                    priorBuyStatus: i
                                });

                              case 7:
                              case "end":
                                return e.stop();
                            }
                        }, e, r);
                    })), 1e3), r.priorbuyInterval = c);

                  case 3:
                  case "end":
                    return n.stop();
                }
            }, n, r);
        }))();
    },
    queryPriorBuyStatus: function(e) {
        return app.request().get(PREFIXV1 + "/performance/boostActivity/isBoostActivity").query({
            sellChannel: 7,
            performanceId: e,
            token: app.$user.token
        }).end().then(function(e) {
            return e.body;
        }).then(function(e) {
            var t = e.code, r = e.data;
            return 200 !== t ? 0 : r ? 1 : 0;
        }).catch(function(e) {
            return 0;
        });
    },
    clearCountDown: function() {
        this.countdownInterval && clearInterval(this.countdownInterval);
    },
    clearPriorBuyCountDown: function() {
        this.priorbuyInterval && clearInterval(this.priorbuyInterval);
    },
    changeToOnSale: function() {
        var e = this.data, t = e.beforeSaleStatus, r = e.isBVersion, n = e.isSelectSeatProject, o = e.isNeedOnSaleRemind, a = t.onSaleStatus, i = 2 === a ? 2 : 3, s = this.caculateTextAndReaction(i, r, n, o), u = s.btnText, c = s.reaction;
        this.setData({
            btnText: u,
            reaction: c,
            saleStatus: i
        });
    },
    modifyDestinationAccordingActivities: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a, i;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    if (e) {
                        r.next = 2;
                        break;
                    }
                    return r.abrupt("return", void 0);

                  case 2:
                    return n = e, o = t, a = t.data.id, i = function() {
                        var e = _asyncToGenerator(regeneratorRuntime.mark(function e(r) {
                            var a, s, u, c, d, f, l, h, p, m, g, w, v, S, b, y;
                            return regeneratorRuntime.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    if (o.data.activitiesInfo.isDuringActivities) {
                                        e.next = 2;
                                        break;
                                    }
                                    return e.abrupt("return", n);

                                  case 2:
                                    for (a = o.data.activitiesInfo.needParmas, s = _url2.default.getCurrentPageUrlWithArgs(), 
                                    u = t.getUrlParams(s) || {}, c = u.kingToken, d = u.openid, f = u.salt, l = {
                                        performanceId: r
                                    }, h = 0; h < a.length; h++) p = a[h], l[p] = u[p];
                                    return e.next = 10, app.request().post(PREFIXV1 + "/token/validate").header("content-type", "application/json").query({
                                        token: app.$user.token,
                                        sellChannel: 7
                                    }).send(_extends({}, l)).end();

                                  case 10:
                                    if (m = e.sent, g = m.body, w = g.code, v = g.msg, S = g.data, 403 !== w) {
                                        e.next = 22;
                                        break;
                                    }
                                    return e.next = 18, app.login();

                                  case 18:
                                    return e.next = 20, i(r);

                                  case 20:
                                    return b = e.sent, e.abrupt("return", b);

                                  case 22:
                                    if (200 !== w) {
                                        e.next = 24;
                                        break;
                                    }
                                    return e.abrupt("return", n);

                                  case 24:
                                    if (1406 !== w) {
                                        e.next = 30;
                                        break;
                                    }
                                    if (!v) {
                                        e.next = 28;
                                        break;
                                    }
                                    return wx.showModal({
                                        content: v,
                                        showCancel: !1,
                                        confirmText: "去验证",
                                        confirmColor: "#ff0000",
                                        success: function() {
                                            var e = o.jumpToWebview(S.url), t = function() {
                                                o.leavePageTo(e);
                                            };
                                            o.navigatoAnswerPageOrYieldCallback(e, t);
                                        }
                                    }), e.abrupt("return", void 0);

                                  case 28:
                                    return y = o.jumpToWebview(S.url), e.abrupt("return", y);

                                  case 30:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, t);
                        }));
                        return function(t) {
                            return e.apply(this, arguments);
                        };
                    }(), r.next = 8, i(a);

                  case 8:
                    return n = r.sent, r.abrupt("return", n);

                  case 10:
                  case "end":
                    return r.stop();
                }
            }, r, t);
        }))();
    },
    leavePageTo: function(e) {
        if ("string" == typeof e && e.length > 0) {
            /\/pages\/showsubs\/webview\/webview/.test(e) ? app.login().then(function() {
                app.goto(e);
            }) : app.goto(e);
        }
    },
    navigatoAnswerPageOrYieldCallback: function(e, t) {
        var r = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            var o, a, i;
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    if (e) {
                        n.next = 2;
                        break;
                    }
                    return n.abrupt("return", !1);

                  case 2:
                    return o = r.data.id, n.next = 5, r.getIsNeedAnswerById();

                  case 5:
                    if ("error" !== (a = n.sent)) {
                        n.next = 8;
                        break;
                    }
                    return n.abrupt("return", !1);

                  case 8:
                    a || t(), a && (i = "/pages/showsubs/question/index?pId=" + o, app.set("_show_pageFromKey", e), 
                    app.goto(i));

                  case 10:
                  case "end":
                    return n.stop();
                }
            }, n, r);
        }))();
    },
    checkCrowdedStatus: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    if (n = void 0, e) {
                        r.next = 5;
                        break;
                    }
                    n = void 0, r.next = 17;
                    break;

                  case 5:
                    if (o = t.data.answerCrowded) {
                        r.next = 10;
                        break;
                    }
                    n = e, r.next = 17;
                    break;

                  case 10:
                    return r.next = 12, t.getCrowdedStatusFromServer();

                  case 12:
                    if (!(a = r.sent)) {
                        r.next = 16;
                        break;
                    }
                    return t.showCrowdedToast(), r.abrupt("return", void 0);

                  case 16:
                    n = e;

                  case 17:
                    return r.abrupt("return", n);

                  case 18:
                  case "end":
                    return r.stop();
                }
            }, r, t);
        }))();
    },
    getCrowdedStatusFromServer: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.abrupt("return", app.request().get(PREFIXV1 + "/v2/performance/networkStatus").end().then(function(e) {
                        return e.body;
                    }).then(function(e) {
                        var t = e.code, r = e.data;
                        return 200 !== t || !r;
                    }).catch(function() {
                        return !0;
                    }));

                  case 1:
                  case "end":
                    return e.stop();
                }
            }, t, e);
        }))();
    },
    normalButtonReaction: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, e.buttonReaction();

                  case 2:
                    e.buttonOntapStats();

                  case 3:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    buttonOntapStats: function(e) {
        var t = this.data.btnText;
        "开售提醒我" === t && this.onSaleRemindMeClick(e), "立即预定" === t && this.bookTicketsNowStatus(), 
        "立即购票" === t && this.buyTicketsNowStats(), "选座购票" === t && this.selectSeatBuyTickets();
    },
    buttonReaction: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var r, n, o, a, i, s;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (r = e, n = e.data, o = n.reaction, a = n.id, "unknown" !== o && "noop" !== o) {
                        t.next = 4;
                        break;
                    }
                    return t.abrupt("return", !1);

                  case 4:
                    if (i = void 0, "showRemindModal" === o && e.showOnSaleRemindModal(), "jumpToSelectTicketsPage" === o && (i = r.jumpToSelectTicketsPage(a)), 
                    "reactionAccordingToBversion" !== o) {
                        t.next = 11;
                        break;
                    }
                    return t.next = 10, r.reactionAccordingToBversion();

                  case 10:
                    i = t.sent;

                  case 11:
                    return t.next = 13, r.checkCrowdedStatus(i);

                  case 13:
                    return i = t.sent, t.next = 16, r.modifyDestinationAccordingActivities(i);

                  case 16:
                    i = t.sent, s = function() {
                        r.leavePageTo(i);
                    }, r.navigatoAnswerPageOrYieldCallback(i, s);

                  case 19:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    caculateTextAndReaction: function(e, t, r, n) {
        if (999 === e || 999 === t || 999 === r || 999 === n || 0 === e) return {
            btnText: "unknown",
            reaction: "unknown"
        };
        var o = void 0, a = void 0;
        return 1 === e && 0 === n ? (o = "即将开售", a = "noop", {
            btnText: o,
            reaction: a
        }) : 1 === e && 1 === n ? (o = "开售提醒我", a = "showRemindModal", {
            btnText: o,
            reaction: a
        }) : 2 !== e && 4 !== e || r ? 2 !== e && 4 != e || !r ? 3 !== e && 5 !== e || r ? 3 !== e && 5 !== e || !r ? 6 === e ? (o = "已结束", 
        a = "noop", {
            btnText: o,
            reaction: a
        }) : void 0 : (o = "选座购票", a = "reactionAccordingToBversion", {
            btnText: o,
            reaction: a
        }) : (o = "立即购票", a = "jumpToSelectTicketsPage", {
            btnText: o,
            reaction: a
        }) : (o = "选座购票", a = "reactionAccordingToBversion", {
            btnText: o,
            reaction: a
        }) : (o = "立即预定", a = "jumpToSelectTicketsPage", {
            btnText: o,
            reaction: a
        });
    },
    jumpToSelectTicketsPage: function(e) {
        return "/pages/showsubs/ticket/ticket?pId=" + e;
    },
    reactionAccordingToBversion: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var r, n, o, a;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    if (r = e.data, n = r.isBVersion, o = r.id, a = void 0, !n) {
                        t.next = 8;
                        break;
                    }
                    return t.next = 5, e.reactionAccordingToShowInfoAndAreaInfo();

                  case 5:
                    a = t.sent, t.next = 9;
                    break;

                  case 8:
                    a = "/pages/showsubs/seats/area?pId=" + o + "&seats=1";

                  case 9:
                    return t.abrupt("return", a);

                  case 10:
                  case "end":
                    return t.stop();
                }
            }, t, e);
        }))();
    },
    reactionAccordingToShowInfoAndAreaInfo: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var r, n, o, a;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, r = e.data.id, t.next = 4, e.getShowInfoById(r);

                  case 4:
                    if (n = t.sent, o = void 0, 1 !== n.length) {
                        t.next = 13;
                        break;
                    }
                    return a = n[0].showId, t.next = 10, e.reactionAccordingAreaInfo(a);

                  case 10:
                    o = t.sent, t.next = 14;
                    break;

                  case 13:
                    e.setData({
                        showInfo: n,
                        displayShowList: !0
                    });

                  case 14:
                    return t.abrupt("return", o);

                  case 17:
                    t.prev = 17, t.t0 = t.catch(0), "server error" === t.t0.message && e.errorHandler("reactionServerError", "服务器异常，请稍后再尝试"), 
                    "request showinfo error" !== t.t0.message && "requeset areainfo error" !== t.t0.message || e.errorHandler("reactionNetworkError", "网络异常，请检查网络");

                  case 21:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 0, 17 ] ]);
        }))();
    },
    reactionAccordingAreaInfo: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a, i;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return r.prev = 0, n = void 0, r.next = 4, t.getAreaInfoById(e);

                  case 4:
                    return o = r.sent, a = t.data.id, 1 === o.length ? (i = o[0].areaId, n = t.jumpToSelectSeatById(a, e, i)) : n = t.jumpToSelectAreaById(a, e), 
                    r.abrupt("return", n);

                  case 10:
                    throw r.prev = 10, r.t0 = r.catch(0), r.t0;

                  case 13:
                  case "end":
                    return r.stop();
                }
            }, r, t, [ [ 0, 10 ] ]);
        }))();
    },
    getShowInfoById: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", app.request().get(PREFIXV1 + "/v2/performance/" + e + "/shows/1").query({
                        sellChannel: 7
                    }).config({
                        loading: 1
                    }).end().then(function(e) {
                        return e.body;
                    }).then(function(e) {
                        var t = e.code, r = e.data;
                        if (200 !== t || !r || !r.length) throw new Error("server error");
                        return r;
                    }).catch(function(e) {
                        if ("server error" === e.message) throw e;
                        throw new Error("request showinfo error");
                    }));

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, r, t);
        }))();
    },
    getAreaInfoById: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", app.request().get(PREFIXV1 + "/show/" + e + "/areas").query({
                        sellChannel: 7
                    }).config({
                        loading: 1
                    }).end().then(function(e) {
                        return e.body;
                    }).then(function(e) {
                        var t = e.code, r = e.data;
                        if (200 !== t || !r || !r.length) throw new Error("server error");
                        return r.forEach(function(e) {
                            e.areaId = e.areaId || e.sareaId;
                        }), r;
                    }).catch(function(e) {
                        if ("server error" === e.message) throw e;
                        throw new Error("requeset areainfo error");
                    }));

                  case 1:
                  case "end":
                    return t.stop();
                }
            }, r, t);
        }))();
    },
    jumpToVideo: function() {
        this.onVideoClick();
        var e = this.data.projectVideoInfo;
        if (e && e.mtCubeUrl) {
            var t = this.jumpToWebview(e.mtCubeUrl), r = encodeURIComponent(e.picUrl), n = t + "&imgUrl=" + r + "&adTitle=" + this.data.performanceInfo.name;
            app.goto(n);
        }
    },
    jumpToSelectSeatById: function(e, t, r) {
        return this.jumpToWebview("https://h5.dianping.com/app/movieshoworder/select-seats.html?pId=" + e + "&sId=" + t + "&aId=" + r);
    },
    jumpToSelectAreaById: function(e, t) {
        return this.jumpToWebview("https://h5.dianping.com/app/movieshoworder/seat-area.html?pId=" + e + "&sId=" + t);
    },
    jumpToWebview: function(e) {
        return "/pages/showsubs/webview/webview?url=" + encodeURIComponent(e);
    },
    closeShowModal: function() {
        this.setData({
            displayShowList: !1
        });
    },
    onShowItemClick: function(e) {
        var t = this, r = e.detail.showId, n = this;
        this.setData({
            selectedShowId: r
        }, _asyncToGenerator(regeneratorRuntime.mark(function e() {
            var o, a;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return n.showItemClickStats(), e.prev = 1, e.next = 4, n.reactionAccordingAreaInfo(r);

                  case 4:
                    return o = e.sent, e.next = 7, n.checkCrowdedStatus(o);

                  case 7:
                    return o = e.sent, e.next = 10, n.modifyDestinationAccordingActivities(o);

                  case 10:
                    o = e.sent, a = function() {
                        n.leavePageTo(o);
                    }, n.navigatoAnswerPageOrYieldCallback(o, a), e.next = 19;
                    break;

                  case 15:
                    e.prev = 15, e.t0 = e.catch(1), "server error" === e.t0.message && n.errorHandler("reactionNetworkError", "服务器异常，请稍后再尝试"), 
                    "requeset areainfo error" === e.t0.message && n.errorHandler("reactionNetworkError", "网络异常，请检查网络");

                  case 19:
                    return e.prev = 19, t.setData({
                        selectedShowId: null
                    }), n.closeShowModal(), e.finish(19);

                  case 23:
                  case "end":
                    return e.stop();
                }
            }, e, t, [ [ 1, 15, 19, 23 ] ]);
        })));
    },
    showCrowdedToast: function() {
        this.setData({
            isShowCrowdedToast: !0
        });
    },
    closeCrowdedToast: function() {
        this.setData({
            isShowCrowdedToast: !1
        });
    },
    priorBuy: function() {
        app.goto("/pages/showsubs/assistbuy/detail?id=" + this.data.id), this.priorBuyClickStats();
    },
    getPhoneNumberAndPriorBuy: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a, i;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return n = t, o = t.data.bindButtonInfo, a = function() {
                        n.priorBuy();
                    }, i = o.priority, r.next = 6, t.getPhoneNumber(e.detail, a, i);

                  case 6:
                    t.priorBuyClickStats();

                  case 7:
                  case "end":
                    return r.stop();
                }
            }, r, t);
        }))();
    },
    showOnSaleRemindModal: function() {
        var e = this.getDefaultNumberToBeRemind();
        this.setData({
            showSalRemindModal: !0,
            numberToBeRemind: e
        });
    },
    getDefaultNumberToBeRemind: function() {
        var e = app.$user.mobile, t = this.data.previousSuccessRemindNumber;
        return "number" != typeof t && "string" != typeof t || 11 !== t.toString().length ? e || "" : t;
    },
    closeOnSaleRemindModal: function() {
        this.setData({
            showSalRemindModal: !1,
            numberToBeRemind: ""
        });
    },
    remindModalInputChange: function(e) {
        var t = e.detail;
        this.setData({
            numberToBeRemind: t
        });
    },
    onRegisterRemindPhone: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return t.remindMeSubmitStats(), r.next = 3, t.registerRemindPhone(e);

                  case 3:
                    n = r.sent, "success" === n && t.toast("开售提醒设置成功"), "fail" === n && t.errorHandler("reactionServerError", "开售提醒设置失败"), 
                    "network" === n && t.errorHandler("reactionNetworkError", "网络异常,请稍后尝试");

                  case 7:
                  case "end":
                    return r.stop();
                }
            }, r, t);
        }))();
    },
    registerRemindPhone: function(e, t) {
        var r = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            var o, a, i, s, u, c;
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    if (o = e.detail, a = r.data, i = a.numberToBeRemind, s = a.id, u = i.toString(), 
                    0 !== u.length) {
                        n.next = 6;
                        break;
                    }
                    return r.toast("请填写手机号再提交"), n.abrupt("return");

                  case 6:
                    if (11 === u.length) {
                        n.next = 9;
                        break;
                    }
                    return r.toast("请填写正确的手机号码"), n.abrupt("return");

                  case 9:
                    if (/^1\d{10}$/.test(parseInt(i, 10))) {
                        n.next = 12;
                        break;
                    }
                    return r.toast("请填写正确的手机号码"), n.abrupt("return");

                  case 12:
                    return wx.showLoading(), n.next = 15, app.request().post(PREFIXV1 + "/messagepush/save").query({
                        token: (0, _user2.default)(app.$user).token,
                        sellChannel: 7
                    }).header("content-type", "application/json").send(JSON.stringify({
                        performanceId: s,
                        phoneNumber: i,
                        formId: o,
                        openId: app.$user.openId,
                        ticketPriceList: t || []
                    })).end().then(function(e) {
                        return e.body;
                    }).then(function(e) {
                        var t = (e.data, e.code);
                        e.msg;
                        if (wx.hideLoading(), 200 === t) return r.setData({
                            previousSuccessRemindNumber: i
                        }), r.closeOnSaleRemindModal(), r.closeOnSaleRemindModalWithPriceTags(), "success";
                        throw new Error("fail");
                    }).catch(function(e) {
                        return wx.hideLoading(), "fail" === e.message ? "fail" : "network";
                    });

                  case 15:
                    return c = n.sent, n.abrupt("return", c);

                  case 17:
                  case "end":
                    return n.stop();
                }
            }, n, r);
        }))();
    },
    showOnSaleRemindModalWithPriceTags: function() {
        var e = this.getDefaultNumberToBeRemind();
        this.setData({
            showSaleRemindModalWithTags: !0,
            numberToBeRemind: e
        });
    },
    closeOnSaleRemindModalWithPriceTags: function() {
        var e = this.data.remindTicketPriceList;
        e = e.map(function(e) {
            return e.selected = !1, e;
        }), this.setData({
            showSaleRemindModalWithTags: !1,
            numberToBeRemind: "",
            remindTicketPriceList: e
        });
    },
    onSaleRemindModalWithPriceTagsInputChange: function(e) {
        var t = e.detail;
        this.setData({
            numberToBeRemind: t
        });
    },
    onPriceTagsSelected: function(e) {
        var t = e.detail, r = this.data.remindTicketPriceList, n = r.findIndex(function(e) {
            return e.ticketPriceId === t.ticketPriceId;
        }), o = r[n];
        o.selected = !o.selected, this.setData({
            remindTicketPriceList: r
        });
    },
    onSaleRemindModalWithPriceTagsSubmit: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a, i, s;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    if (n = t.data.remindTicketPriceList, o = e.detail.formId, a = n.filter(function(e) {
                        return !!e.selected;
                    }), 0 !== a.length) {
                        r.next = 6;
                        break;
                    }
                    return t.toast("请选择票档再提交"), r.abrupt("return");

                  case 6:
                    return a = a.map(function(e) {
                        var t = _extends({}, e);
                        return delete t.selected, t;
                    }), i = {
                        detail: o
                    }, r.next = 10, t.registerRemindPhone(i, a);

                  case 10:
                    s = r.sent, "success" === s && t.toast("开售提醒设置成功"), "fail" === s && t.errorHandler("reactionServerError", "开售提醒设置失败"), 
                    "network" === s && t.errorHandler("reactionNetworkError", "网络异常,请稍后尝试");

                  case 14:
                  case "end":
                    return r.stop();
                }
            }, r, t);
        }))();
    },
    setPreviousNumberToStorage: function() {
        var e = this.data.previousSuccessRemindNumber;
        app.set("previousSuccessRemindNumber_detail", e);
    },
    getPreviousNumberFromStorage: function() {
        return app.get("previousSuccessRemindNumber_detail");
    },
    closeShareModal: function() {
        this.setData({
            showFlag: 0
        });
    },
    drawShareModal: function() {
        this.drawShareModalStats(), this.setData({
            showFlag: 2
        });
    },
    onShareAppMessage: function() {
        this.shareToFriendStats();
        try {
            this.getShareNumber();
        } catch (e) {}
        return {
            title: this.data.performanceInfo.name,
            desc: "推荐你一个超精彩演出，一起去看吧~",
            path: "/pages/show/detail/index?utm_source=wxchatshare&id=" + this.data.performanceInfo.performanceId
        };
    },
    showShareModal: function() {
        this.setData({
            showFlag: 1,
            shareImgUrl: ""
        });
    },
    loginRefresh: function(e) {
        this.getUserPhoneNumber(), this.getCollectState();
    },
    noLoginModal: !0,
    getCollectState: function() {
        var e = this;
        app.request().get("/maoyansh/myshow/ajax/newFavor/loadFavor").query({
            token: app.$user.token,
            sellChannel: 7,
            favorType: 1,
            favorId: this.performanceId
        }).end().then(function(e) {
            return e.body;
        }).then(function(t) {
            200 === t.code && null !== t.data && e.setData({
                isCollect: !0
            });
        });
    },
    collect: function() {
        this.collectOn();
    },
    collectOn: function() {
        var e = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function t() {
            var r, n;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return e.collectStats(), r = e.data.isCollect ? "cancelFavor" : "addFavor", n = e.data.isCollect ? "已取消想看~" : "已标记想看！", 
                    t.prev = 3, t.next = 6, app.request().post("/maoyansh/myshow/ajax/newFavor/" + r).header("content-type", "application/json").query({
                        token: app.$user.token,
                        sellChannel: 7,
                        wxOpenId: app.$user.openId,
                        wxAppId: _wallet.appid
                    }).send({
                        favorType: 1,
                        favorId: e.data.performanceInfo.performanceId
                    }).end().then(function(e) {
                        return e.body;
                    }).then(function(t) {
                        if (200 !== t.code || !t.data) throw new Error("server error");
                        e.setData({
                            isCollect: !e.data.isCollect
                        });
                        var r = !1 === t.data.everFavor ? "可在“我的—想看的演出”中查看" : "";
                        e.toast(n + r, 1500);
                    }).catch(function() {
                        throw new Error("server error");
                    });

                  case 6:
                    t.next = 11;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(3), "server error" === t.t0.message && e.errorHandler("reactionServerError", "服务器异常，请稍后再尝试");

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, e, [ [ 3, 8 ] ]);
        }))();
    },
    getPhoneNumberCollectOn: function(e) {
        this.getPhoneNumber(e, this.collectOn);
    },
    getPhoneNumberAndButtonReaction: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function r() {
            var n, o, a, i, s, u, c, d, f;
            return regeneratorRuntime.wrap(function(r) {
                for (;;) switch (r.prev = r.next) {
                  case 0:
                    return n = t, o = t.buttonReaction, a = o.bind(t), i = t.data, s = i.bindButtonInfo, 
                    u = i.btnText, c = !1, "立即预定" === u && (c = s.Reserve), "立即购票" === u && (c = s.order), 
                    "选座购票" === u && (c = s.seatOrder), "开售提醒我" === u && (c = s.remind), d = void 0, 
                    f = function() {}, "开售提醒我" === u && (f = function() {
                        var e = _asyncToGenerator(regeneratorRuntime.mark(function e(r, o, a) {
                            var i, s;
                            return regeneratorRuntime.wrap(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    if (!o) {
                                        e.next = 11;
                                        break;
                                    }
                                    return n.setData({
                                        numberToBeRemind: a
                                    }), i = {
                                        detail: "mockone"
                                    }, e.next = 5, n.registerRemindPhone(i);

                                  case 5:
                                    s = e.sent, "success" === s && n.toast("已授权并设置开售提醒"), "fail" === s && n.errorHandler("reactionServerError", "成开售提醒设置失败，请重试~"), 
                                    "network" === s && n.errorHandler("reactionNetworkError", "开售提醒设置失败，请重试~"), e.next = 12;
                                    break;

                                  case 11:
                                    n.showSalRemindModal();

                                  case 12:
                                    d = a;

                                  case 13:
                                  case "end":
                                    return e.stop();
                                }
                            }, e, t);
                        }));
                        return function(t, r, n) {
                            return e.apply(this, arguments);
                        };
                    }()), "立即预定" !== u && "立即购票" !== u && "选座购票" !== u || (f = function(e, t, r) {
                        d = r, a();
                    }), r.next = 15, t.getPhoneNumber(e.detail, f, c);

                  case 15:
                    t.buttonOntapStats(d);

                  case 16:
                  case "end":
                    return r.stop();
                }
            }, r, t);
        }))();
    },
    popupDiscountDetail: function() {
        this.setData({
            showDiscountDetail: !0
        }), this.discountClickStats();
    },
    shutDiscountDetail: function() {
        this.setData({
            showDiscountDetail: !1
        });
    },
    vistPreInputComponent: function() {
        this.preInputClickStats(), this.selectComponent("#preInput").openFillInfo();
    },
    getPhoneNumberPreInput: function(e) {
        this.getPhoneNumber(e, this.vistPreInputComponent);
    },
    toast: function(e) {
        wx.showToast({
            title: e,
            icon: "none"
        }), setTimeout(function() {
            wx.hideToast();
        }, 1e3);
    },
    noop: function() {},
    getUrlParams: function(e) {
        for (var t = {}, r = new RegExp("([\\?|&])(.+?)=([^&?]*)", "ig"), n = r.exec(e); n; ) t[n[2]] = n[3], 
        n = r.exec(e);
        return t;
    },
    errorModal: function(e) {
        var t = getApp().pages();
        wx.showModal({
            content: e || "项目不存在或已下架",
            showCancel: !1,
            confirmText: t.length > 1 ? "返回" : "更多精彩",
            success: function(e) {
                e.confirm && (t.length ? wx.switchTab({
                    url: "/pages/show/index/index"
                }) : wx.navigateBack());
            }
        });
    },
    errorHandler: function(e, t) {
        var r = {
            noError: function() {},
            loadExpiredError: function() {
                this.errorModal();
            },
            loadUnknownError: function() {
                this.errorModal("系统君刚刚走神了～稍后再试试");
            },
            loadNetworkError: function() {},
            loadCrowded: function() {},
            limitRefresh: function() {},
            reactionServerError: function(e) {
                this.toast(e);
            },
            reactionNetworkError: function(e) {
                this.toast(e);
            }
        }, n = r[e];
        n ? n.call(this, t) : console.log('corresponding error handler is not exist, please define appropiate handler in "errorHandler"!');
    },
    statsHandler: function(e, t) {
        var r = this, n = {
            detailViewStats: function(e) {
                r.stats("b_c7t7ayby", e);
            },
            discountInformationViewStats: function() {
                r.stats("b_tm9bjlny");
            },
            fillInfonViewStats: function() {
                r.stats("b_9c4oowi9");
            },
            getWXPhoneNumberSuccessStats: function() {
                r.stats("b_93m12gk2");
            },
            getWXPhoneNumberCancelStats: function() {
                r.stats("b_kl9lmt17");
            },
            collectStats: function() {
                r.stats("b_ye0v08k2");
            },
            shareToFriendStats: function() {
                r.stats("b_imlgaynr");
            },
            drawShareModalStats: function() {
                r.stats("b_6nhlx8v8");
            },
            saveShareImageStats: function() {
                r.stats("b_tyww87ep");
            },
            discountClickStats: function(e) {
                r.stats("b_ihmrott8", e);
            },
            priorBuyClickStats: function() {
                r.stats("b_7vy58ujb");
            },
            showItemClickStats: function(e) {
                r.stats("b_tkfpmsym", e);
            },
            selectSeatBuyTickets: function(e) {
                r.stats("b_fzzpqaym", e);
            },
            buyTicketsNowStats: function() {
                r.stats("b_b9fd4le0");
            },
            bookTicketsNowStatus: function() {
                r.stats("b_q4joxr1s");
            },
            remindMeSubmitStats: function() {
                r.stats("b_id5bevfv");
            },
            onSaleRemindMeClick: function(e) {
                r.stats("b_5gl7ntou", e);
            },
            openMapStatus: function() {
                r.stats("b_q9p6kdod");
            },
            openGuideStatus: function() {
                r.stats("b_ca515mju");
            },
            preInputClickStats: function() {
                r.stats("b_bnguyfls");
            },
            seatImgViewStats: function() {
                r.stats("b_rl777uwl");
            },
            onVideoClick: function() {
                r.stats("b_h61kxudg");
            },
            videoViewStats: function() {
                r.stats("b_vmz6kuya");
            }
        }, o = n[e];
        if (o) try {
            o(t);
        } catch (e) {
            console.log("e", e);
        }
    },
    discountInformation: function() {
        this.statsHandler("discountInformationViewStats");
    },
    fillInfon: function() {
        this.statsHandler("fillInfonViewStats");
    },
    getWXPhoneNumberSuccess: function() {
        this.statsHandler("getWXPhoneNumberSuccessStats");
    },
    getWXPhoneNumberCancel: function() {
        this.statsHandler("getWXPhoneNumberCancelStats");
    },
    collectStats: function() {
        this.statsHandler("collectStats");
    },
    shareToFriendStats: function() {
        this.statsHandler("shareToFriendStats");
    },
    drawShareModalStats: function() {
        this.statsHandler("drawShareModalStats");
    },
    saveShareImage: function() {
        this.statsHandler("saveShareImageStats");
    },
    discountClickStats: function() {
        var e = this.data, t = e.saleStatus, r = e.id, n = e.cityId, o = {
            saleStatus: t,
            performanceId: r,
            cityId: n
        };
        this.statsHandler("discountClickStats", o);
    },
    priorBuyClickStats: function() {
        this.statsHandler("priorBuyClickStats");
    },
    showItemClickStats: function() {
        var e = this.data.selectedShowId;
        this.statsHandler("showItemClickStats", {
            selectedShowId: e
        });
    },
    selectSeatBuyTickets: function() {
        var e = this.data.isBVersion;
        this.statsHandler("selectSeatBuyTickets", {
            isBVersion: e
        });
    },
    buyTicketsNowStats: function() {
        this.statsHandler("buyTicketsNowStats");
    },
    bookTicketsNowStatus: function() {
        this.statsHandler("bookTicketsNowStatus");
    },
    remindMeSubmitStats: function() {
        this.statsHandler("remindMeSubmitStats");
    },
    onSaleRemindMeClick: function(e) {
        var t = this.data, r = t.id, n = t.mistiming, o = new Date().getTime() - n, a = {
            phonenumber: e,
            id: r,
            time: o
        };
        this.statsHandler("onSaleRemindMeClick", a);
    },
    openMapStatus: function() {
        this.statsHandler("openMapStatus");
    },
    openGuideStatus: function() {
        this.statsHandler("openGuideStatus");
    },
    preInputClickStats: function() {
        this.statsHandler("preInputClickStats");
    },
    seatImgStats: function() {
        this.statsHandler("seatImgViewStats");
    },
    onVideoClick: function() {
        this.statsHandler("onVideoClick");
    },
    videoViewStats: function() {
        this.statsHandler("videoViewStats");
    }
}));