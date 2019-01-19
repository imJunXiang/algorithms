function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function i(r, o) {
                try {
                    var a = t[r](o), s = a.value;
                } catch (e) {
                    return void n(e);
                }
                if (!a.done) return Promise.resolve(s).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(s);
            }
            return i("next");
        });
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
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _citypanel = require("./../components/citypanel/citypanel.js"), _citypanel2 = _interopRequireDefault(_citypanel), _projectlist = require("./../components/projectlist/projectlist.js"), _projectlist2 = _interopRequireDefault(_projectlist), _index = require("./../components/index.js"), _index2 = _interopRequireDefault(_index), _ad = require("./../components/ad/ad.js"), _ad2 = _interopRequireDefault(_ad), _mixin = require("./../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), _common = require("./../common/common.js"), _util = require("./../common/util.js"), _advertisingIds = require("./../common/advertisingIds.js"), app = getApp(), IndexPage = function(e) {
    function t() {
        for (var e, n, i, r, o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
        return _classCallCheck(this, t), n = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        i.config = {
            navigationBarTitleText: "赛事",
            backgroundColor: "#f7f7f7",
            backgroundTextStyle: "dark",
            enablePullDownRefresh: !0,
            onReachBottomDistance: 70
        }, i.$repeat = {}, i.$props = {
            ProjectList: {
                "v-bind:itemTypePid.sync": "itemTypePid",
                "v-bind:useOutLoad.once": "useOutLoad",
                "v-bind:recommendData.sync": "recommendData",
                "v-bind:city.sync": "selectCity"
            },
            AD: {
                "xmlns:v-bind": "",
                "v-bind:advertisingId.once": "topAheadAdvertisingId",
                "v-bind:adViewPostStatus.sync": "adViewPostStatus",
                "v-bind:advertisingList.sync": "topAheadAdvertisingList"
            },
            ADSeven: {
                "v-bind:advertisingId.once": "sevenAdvertisingId",
                "v-bind:adViewPostStatus.sync": "adViewPostStatus",
                "v-bind:advertisingList.sync": "sevenAdvertisingList",
                "v-bind:config.sync": "seventhAdvertisingConfig"
            }
        }, i.$events = {}, i.components = {
            CityPanel: _citypanel2.default,
            ProjectList: _projectlist2.default,
            Comp: _index2.default,
            AD: _ad2.default,
            ADSeven: _ad2.default
        }, i.mixins = [ _mixin2.default ], i.data = {
            netError: !1,
            projectError: !1,
            showPage: !0,
            selectCity: {
                id: 0,
                name: "全国"
            },
            itemTypePid: 0,
            location: {},
            useOutLoad: !0,
            recommendData: [],
            adViewPostStatus: !0,
            ADHasInit: !1,
            categoryItems: [],
            activityFirstItem: {},
            activitySecondItem: {},
            activityThirdItem: {},
            insertADInfo: {},
            ADModalInfo: {},
            activityFirstItemID: 860884712,
            activitySecondItemID: 1225178475,
            activityThirdItemID: 1236415852,
            insertADInfoID: 351923362,
            ADModalInfoID: 288717039,
            sysRes: {},
            ADModalShow: !1,
            projectListTotalNum: 0,
            oldCiyId: 0,
            onLoadCityInit: !1,
            fromSwitchTap: !1,
            advertisingListInfo: {},
            advertisingIds: _advertisingIds.homeSevenIds,
            topAheadAdvertisingId: _advertisingIds.homeSevenIds.topAheadAdvertisingId,
            sevenAdvertisingId: _advertisingIds.homeSevenIds.sevenAdvertisingId,
            secondAdvertisingId: _advertisingIds.homeSevenIds.secondAdvertisingId,
            thirdAdvertisingId: _advertisingIds.homeSevenIds.thirdAdvertisingId,
            fourthAdvertisingId: _advertisingIds.homeSevenIds.fourthAdvertisingId,
            fifthAdvertisingId: _advertisingIds.homeSevenIds.fifthAdvertisingId,
            sixthAdvertisingId: _advertisingIds.homeSevenIds.sixthAdvertisingId,
            topAheadAdvertisingList: [],
            secondAdvertisingInfo: {},
            thirdAdvertisingInfo: null,
            fourthAdvertisingInfo: null,
            fifthAdvertisingInfo: null,
            sixthAdvertisingInfo: null,
            sevenAdvertisingList: [],
            seventhAdvertisingConfig: {
                indicatorDots: !1,
                indicatorColor: "rgba(255, 255, 255, 0.4)",
                indicatorActiveColor: "rgba(255, 255, 255, 0.9)",
                customIndicatorDots: !0
            },
            scheduleList: {},
            venueData: {},
            projectListInited: !1
        }, i.methods = {
            bindShowCityPanel: function() {
                this.$invoke("CityPanel", "show");
            },
            bindShowSearchPanel: function() {
                this.$invoke("SearchPanel", "show");
            },
            bindScroll: function() {},
            bindADItemTap: function() {
                this.bindADClick.apply(this, arguments), arguments[1] === this.ADModalInfoID && (this.ADModalShow = !1);
            },
            ADImageLoadedView: function() {
                this.bindADView.apply(this, arguments);
            },
            hideThisModal: function() {
                this.ADModalShow = !1;
            },
            bindCategoryItemTap: function(e, t) {
                var n = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function i() {
                    var r, o;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                          case 0:
                            if (!/https:\/\/ticket.wesai.com\/wechat\/zwy/g.test(e) && !/https:\/\/m(beta)?.piaoniu.com/g.test(e)) {
                                i.next = 6;
                                break;
                            }
                            if (r = wx.getStorageSync("maoYanOpenId")) {
                                i.next = 6;
                                break;
                            }
                            return i.next = 5, (0, _common.getMYOpenId)();

                          case 5:
                            r = i.sent;

                          case 6:
                            if (!(t && t.isLogin || /https:\/\/ticket.wesai.com\/wechat\/zwy/g.test(e))) {
                                i.next = 12;
                                break;
                            }
                            return i.next = 9, n.checkBindUser();

                          case 9:
                            if (o = i.sent) {
                                i.next = 12;
                                break;
                            }
                            return i.abrupt("return");

                          case 12:
                            n.tapToNavigate(e);

                          case 13:
                          case "end":
                            return i.stop();
                        }
                    }, i, n);
                }))();
            },
            bindThirdTap: function(e) {
                var t = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function n() {
                    var i;
                    return regeneratorRuntime.wrap(function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (i = wx.getStorageSync("maoYanOpenId")) {
                                n.next = 5;
                                break;
                            }
                            return n.next = 4, (0, _common.getMYOpenId)();

                          case 4:
                            i = n.sent;

                          case 5:
                            t.tapToNavigate(e);

                          case 6:
                          case "end":
                            return n.stop();
                        }
                    }, n, t);
                }))();
            },
            tapToNav: function(e) {
                this.bindADClick.apply(this, arguments);
            },
            tapToNavAndLogin: function(e, t) {
                var n = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function i() {
                    var r, o, a, s, c;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                          case 0:
                            return i.next = 2, n.checkBindUser();

                          case 2:
                            if (r = i.sent) {
                                i.next = 5;
                                break;
                            }
                            return i.abrupt("return");

                          case 5:
                            e.url && (o = decodeURIComponent(e.url), a = wx.getStorageSync("selectCity"), s = {
                                wesaiToken: wx.getStorageSync("wesaiToken"),
                                wesaiUserId: r && r.user_id || "",
                                cityCode: a && a.city_code || 0
                            }, n.isIPhoneX && (s.isIPhoneX = !0), /https/g.test(o) && (c = (0, _util.extendQuery)(o, s), 
                            Object.assign(e, {
                                url: encodeURIComponent(c)
                            })), n.bindADClick(e, t));

                          case 6:
                          case "end":
                            return i.stop();
                        }
                    }, i, n);
                }))();
            },
            goToCalendarPage: function(e) {
                var t = wx.getStorageSync("wesaiToken"), n = "https://ticket.wesai.com/wechat/calendar?wesaiToken=" + t + (e ? "&time_type=" + e : "");
                this.tapToNavigate(encodeURIComponent(n));
            },
            gotoVenue: function(e) {
                var t = wx.getStorageSync("wesaiToken");
                if (e && e.venue_id) {
                    var n = "https://ticket.wesai.com/wechat/venue?wesaiToken=" + t + "&venue_id=" + e.venue_id;
                    this.tapToNavigate(encodeURIComponent(n));
                }
            }
        }, i.events = {
            changeCity: function() {
                this.$invoke("CityPanel", "show");
            },
            loginSuccess: function(e, t, n, r) {
                i.userInfo.mobile = e, i.$apply();
            },
            cityChange: function(e) {
                var t = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function n() {
                    return regeneratorRuntime.wrap(function(n) {
                        for (;;) switch (n.prev = n.next) {
                          case 0:
                            if (!t.selectCity || t.selectCity.name != e.name || !t.onLoadCityInit) {
                                n.next = 3;
                                break;
                            }
                            return n.abrupt("return");

                          case 3:
                            return t.selectCity = e, t.onLoadCityInit = !0, app.models && app.models.location && app.models.location.changeCityByName && app.models.location.changeCityByName(e.name), 
                            t.getCategoryItems(), n.next = 9, t.loadSevenADs();

                          case 9:
                            return t.advertisingListInfo = n.sent, t.$apply(), t.advertisingListInfo && !(0, 
                            _util.isEmptyObject)(t.advertisingListInfo) && (t.topAheadAdvertisingList = t.advertisingListInfo[t.advertisingIds.topAheadAdvertisingId].advertisements, 
                            t.sevenAdvertisingList = t.advertisingListInfo[t.advertisingIds.sevenAdvertisingId].advertisements, 
                            t.secondAdvertisingInfo = t.advertisingListInfo[t.advertisingIds.secondAdvertisingId].advertisements[0] || {}, 
                            t.thirdAdvertisingInfo = t.advertisingListInfo[t.advertisingIds.thirdAdvertisingId].advertisements[0] || null, 
                            t.fourthAdvertisingInfo = t.advertisingListInfo[t.advertisingIds.fourthAdvertisingId].advertisements[0] || null, 
                            t.fifthAdvertisingInfo = t.advertisingListInfo[t.advertisingIds.fifthAdvertisingId].advertisements[0] || null, 
                            t.sixthAdvertisingInfo = t.advertisingListInfo[t.advertisingIds.sixthAdvertisingId].advertisements[0] || null), 
                            t.initADModal(), n.next = 15, t.getADItemsInfo(t.insertADInfoID);

                          case 15:
                            t.projectListInited = !1, t.$apply(), t.loadRecommendData(e), t.oldCiyId = e.id || e.city_id || 0, 
                            t.$apply();

                          case 20:
                          case "end":
                            return n.stop();
                        }
                    }, n, t);
                }))();
            },
            categoryInit: function(e) {
                this.itemTypePid = e, this.$apply();
            },
            categoryError: function() {
                this.pageError = !0, this.showErrorPage("serverError"), this.pageLoading(!1);
            },
            cityError: function() {
                this.pageError = !0, this.showErrorPage("serverError"), this.pageLoading(!1);
            },
            categoryChange: function(e) {
                this.itemTypePid = e, this.$apply(), this.reloadProject();
            },
            loadProjectList: function() {
                this.inited = !0, this.$wxpage.loading && this.$wxpage.loading(!1);
            },
            update: function(e) {
                this.projectListTotalNum = e;
            },
            triggerProjectListInited: function() {
                this.projectListInited = !0, this.$apply();
            }
        }, i.inited = !1, r = n, _possibleConstructorReturn(i, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onShareAppMessage",
        value: function(e) {
            return {
                title: "赛事票、场馆预定及健身课程尽在这里~",
                path: "/wesai/indexpage/index",
                success: function(e) {},
                fail: function(e) {}
            };
        }
    }, {
        key: "reloadProject",
        value: function() {
            this.$invoke("ProjectList", "reset"), this.insertADInfo && !(0, _util.isEmptyObject)(this.insertADInfo) ? this.$invoke("ProjectList", "getInsertADInfo", {
                insertADInfo: this.insertADInfo,
                isADInfo: !0,
                insertADInfoID: this.insertADInfoID
            }) : this.$invoke("ProjectList", "getInsertADInfo", null), this.$invoke("ProjectList", "loadData", !1, null, {
                projectListInit: !0
            });
        }
    }, {
        key: "loadRecommendData",
        value: function(e) {
            var t = this;
            this.pageError = !1;
            var n = e.name;
            (0, _common.ajax)(_common.urls.recommend, {
                jsonParams: {
                    itemQuery: {
                        cityName: n,
                        pagesize: 1e3
                    }
                }
            }).then(function(e) {
                t.recommendData = e.data.itemResult.items || [], t.reloadProject(), t.$apply();
            }).catch(function() {
                t.recommendData = [], t.reloadProject(), t.$apply();
            });
        }
    }, {
        key: "gotoDetail",
        value: function() {
            this.$navigate("/wesai/pages/detail/detail");
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (this.refreshPage(), !this.pageError) {
                            e.next = 5;
                            break;
                        }
                        return this.newGetToken = 0, e.next = 5, this.getToken();

                      case 5:
                        this.ADHasInit = !1, this.$apply(), this.init(this.onLoadOptions), this.reloadProject(), 
                        wx.stopPullDownRefresh();

                      case 10:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onLoad",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return this.$wxpage.loading && this.$wxpage.loading(), e.next = 4, this.getToken();

                      case 4:
                        this.onLoadOptions = t, this.init(this.onLoadOptions), this.sysRes = wx.getSystemInfoSync();

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onTabItemTap",
        value: function(e) {
            this.fromSwitchTap = !0, this.onShowInit();
        }
    }, {
        key: "onShow",
        value: function() {
            this.fromSwitchTap || this.onShowInit();
        }
    }, {
        key: "onShowInit",
        value: function() {
            this.onLoadCityInit = !1;
            var e = wx.getStorageSync("selectCity");
            if (e && !(0, _util.isEmptyObject)(e) && e.name !== this.selectCity.name) return this.selectCity = e, 
            this.$invoke("CityPanel", "changeCity", this.selectCity), void (this.fromSwitchTap = !1);
            var t = app.$location && !(0, _util.isEmptyObject)(app.$location) ? app.$location.city : null;
            t && t.nm !== this.selectCity.name && this.inited && (this.fromSwitchTap && (t.name = t.nm, 
            this.selectCity = t), this.$invoke("CityPanel", "changeCity", this.selectCity)), 
            this.fromSwitchTap = !1;
        }
    }, {
        key: "init",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        this.$invoke("CityPanel", "init"), this.getVenueItems();

                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "adInitOnce",
        value: function(e) {
            this.oldCiyId !== (e.id || e.city_id) && this.$invoke("AD", "init");
        }
    }, {
        key: "getCategoryItems",
        value: function() {
            var e = this;
            return new Promise(function(t) {
                var n = wx.getStorageSync("selectCity"), i = encodeURIComponent(encodeURIComponent(_common.urls.getCategoryURL)), r = {
                    city_name: n.name || "",
                    city_id: n.city_id || n.id || -1,
                    client: 1
                };
                (0, _common.ajax)(_common.urls.proxyCurl, {
                    jsonParams: {
                        url: i,
                        param: r
                    }
                }).then(function(n) {
                    if (n.code && 200 === n.code && n.data) {
                        var i = n.data;
                        i.response && i.response.data && (e.categoryItems = i.response && i.response.data && i.response.data.slice(0, 4).map(function(e) {
                            var t = e.title && e.title.length > 4 ? e.title.slice(0, 4) + "..." : e.title;
                            return Object.assign(e, {
                                title: t
                            });
                        }) || []);
                    }
                    e.$apply(), t(e.categoryItems);
                }).catch(function(e) {
                    t(null);
                });
            });
        }
    }, {
        key: "getADItemsInfo",
        value: function(e) {
            var t = this;
            return new Promise(function(n) {
                var i = wx.getStorageSync("selectCity"), r = wx.getStorageSync("wesaiToken"), o = wx.getStorageSync("maoYanOpenId"), a = t.sysRes, s = encodeURIComponent(encodeURIComponent(_common.urls.releaseURL)), c = {
                    token: r,
                    advertisingId: e,
                    openId: o,
                    screen: a.windowWidth + "*" + a.windowHeight,
                    referrer: "",
                    ua: "wechat_miniprogram|" + a.platform + "|" + a.system + "|wechat_version_" + a.version + "|" + a.brand + "|" + a.model,
                    cityName: i.name || "",
                    city: i.city_id || i.id || -1
                };
                (0, _common.ajax)(_common.urls.proxyCurl, {
                    jsonParams: {
                        url: s,
                        param: c
                    }
                }).then(function(i) {
                    if (i.code && 200 === i.code && i.data) {
                        var r = i.data;
                        if (r.response && r.response.advertising && r.response.advertising.advertisements) {
                            var o = r.response.advertising.advertisements;
                            e === t.activityFirstItemID ? (t.activityFirstItem = o[0] || null, n(t.activityFirstItem)) : e === t.activitySecondItemID ? (t.activitySecondItem = o[0] || null, 
                            n(t.activitySecondItem)) : e === t.activityThirdItemID ? (t.activityThirdItem = o[0] || null, 
                            n(t.activityThirdItem)) : e === t.insertADInfoID ? (t.insertADInfo = o[0] || null, 
                            n(t.insertADInfo)) : e === t.ADModalInfoID ? (t.ADModalInfo = o[0] || null, n(t.ADModalInfo)) : n(null);
                        } else n(null);
                    } else n(null);
                    t.$apply();
                }).catch(function(e) {
                    n(null);
                });
            });
        }
    }, {
        key: "initADModal",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (t = wx.getStorageSync("ADModalCacheDate"), n = new Date(), t) {
                            e.next = 6;
                            break;
                        }
                        return e.next = 5, this.getADModalInfo();

                      case 5:
                        return e.abrupt("return");

                      case 6:
                        if (t.getDate() === n.getDate()) {
                            e.next = 11;
                            break;
                        }
                        return e.next = 9, this.getADModalInfo();

                      case 9:
                        e.next = 19;
                        break;

                      case 11:
                        if (t.getMonth() === n.getMonth()) {
                            e.next = 16;
                            break;
                        }
                        return e.next = 14, this.getADModalInfo();

                      case 14:
                        e.next = 19;
                        break;

                      case 16:
                        if (t.getFullYear() === n.getFullYear()) {
                            e.next = 19;
                            break;
                        }
                        return e.next = 19, this.getADModalInfo();

                      case 19:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "getADModalInfo",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.getADItemsInfo(this.ADModalInfoID);

                      case 2:
                        this.ADModalInfo && !(0, _util.isEmptyObject)(this.ADModalInfo) && (wx.setStorageSync("ADModalCacheDate", new Date()), 
                        this.ADModalShow = !0);

                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "loadSevenADs",
        value: function() {
            var e = this;
            return new Promise(function(t) {
                var n = wx.getStorageSync("selectCity"), i = wx.getStorageSync("wesaiToken"), r = wx.getStorageSync("maoYanOpenId"), o = e.sysRes, a = encodeURIComponent(encodeURIComponent(_common.urls.allAdList)), s = {
                    token: i,
                    openId: r,
                    screen: o.windowWidth + "*" + o.windowHeight,
                    referrer: "",
                    ua: "wechat_miniprogram|" + o.platform + "|" + o.system + "|wechat_version_" + o.version + "|" + o.brand + "|" + o.model,
                    cityName: n.name || "",
                    city: n.city_id || -1,
                    channel: 2,
                    advertisingId: (0, _util.ObjectValues)(_advertisingIds.homeSevenIds).join(",")
                };
                (0, _common.ajax)(_common.urls.proxyCurl, {
                    jsonParams: {
                        url: a,
                        param: s
                    }
                }).then(function(n) {
                    var i = {};
                    if (n.code && 200 === n.code && n.data) {
                        var r = n.data;
                        r.response && r.response.advertising ? i = r.response.advertising : t(null);
                    }
                    e.$apply(), t(i);
                }).catch(function(e) {
                    t(null);
                });
            });
        }
    }, {
        key: "getVenueItems",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, i, r, o = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.getLocation();

                      case 2:
                        t = e.sent, n = !0, i = t.latitude || 0, r = t.longitude || 0, t && i && r || (n = !1), 
                        (0, _common.ajax)(_common.urls.getIndexVenueItems, {
                            jsonParams: {
                                xPosition: i,
                                yPosition: r,
                                isPostion: n
                            }
                        }).then(function(e) {
                            o.venueData = e.data.minidistance || {}, o.scheduleList = e.data.items || {}, o.$apply();
                        }).catch(function(e) {});

                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "onHide",
        value: function() {
            this.adViewPostStatus = !1;
        }
    }, {
        key: "onUnload",
        value: function() {
            this.adViewPostStatus = !1;
        }
    }, {
        key: "bindLoadMore",
        value: function() {
            this.projectListInited && (this.$invoke("ProjectList", "loadMoreData", null), this.$apply());
        }
    }, {
        key: "onReachBottom",
        value: function() {
            this.bindLoadMore();
        }
    } ]), t;
}(_wepy2.default.page);

var _page = require("./../npm/wepy/lib/wepy.js").default.$createPage(IndexPage, "indexpage/index");

_page.disableStats = !0;

getApp().MoviePage(_page);