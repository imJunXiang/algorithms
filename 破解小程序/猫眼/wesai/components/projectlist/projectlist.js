function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, i) {
            function r(n, s) {
                try {
                    var a = t[n](s), o = a.value;
                } catch (e) {
                    return void i(e);
                }
                if (!a.done) return Promise.resolve(o).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(o);
            }
            return r("next");
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
}), exports.default = void 0;

var _createClass = function() {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var r = t[i];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
    };
}(), _util = require("./../../common/util.js"), _mixin = require("./../../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _common = require("./../../common/common.js"), _miniProgramAppIds = require("./../../common/miniProgramAppIds.js"), _miniProgramAppIds2 = _interopRequireDefault(_miniProgramAppIds), getDefaultData = function() {
    return {
        isHide: !0,
        netError: !1,
        list: [],
        recommendData: [],
        recommendList: [],
        noData: !1,
        defaultNoData: !1,
        curPage: 1,
        maxPage: 1,
        showTipBar: !1,
        useSearchFlag: !1,
        showRecommendList: !1,
        showScrollLoading: !1,
        isLoading: !1,
        insertADInfo: null,
        insertADInfoSuccess: !1,
        sysRes: {}
    };
}, sportsQueryObj = function() {
    return {
        itemQuery: {
            allPlatform: !1,
            cityName: "全国",
            itemTypeId: null,
            itemTypePid: null,
            keyword: null,
            onlineId: null,
            showStartTime: null,
            showEndTime: null,
            venueId: "",
            orderType: null,
            curpage: 1,
            pagesize: 10
        }
    };
}, ProjectList = function(e) {
    function t() {
        for (var e, i, r, n, s = arguments.length, a = Array(s), o = 0; o < s; o++) a[o] = arguments[o];
        return _classCallCheck(this, t), i = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.data = getDefaultData(), r.sportsQueryObj = sportsQueryObj(), r.props = {
            itemTypePid: {
                type: Number,
                default: 0
            },
            categoryName: {
                type: String,
                default: ""
            },
            city: {
                type: Object,
                default: null
            },
            pageSize: {
                type: Number,
                default: 10
            },
            keyword: {
                type: String,
                default: ""
            },
            useSearch: {
                type: Boolean,
                default: !1
            },
            useOutLoad: {
                type: Boolean,
                default: !1
            },
            recommendData: {
                type: Array,
                default: []
            },
            loadMore: {
                type: Number,
                default: 0
            },
            loadFlag: {
                type: Number,
                default: 0
            }
        }, r.mixins = [ _mixin2.default ], r.methods = {
            detailUrl: function(e, t) {
                var i = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function r() {
                    var n, s, a, o;
                    return regeneratorRuntime.wrap(function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            if (!e.detailUrl) {
                                r.next = 18;
                                break;
                            }
                            if (n = e.detailUrl, !/https:\/\/ticket.wesai.com\/wechat\/zwy/g.test(n)) {
                                r.next = 10;
                                break;
                            }
                            return r.next = 7, i.checkBindUser();

                          case 7:
                            if (s = r.sent) {
                                r.next = 10;
                                break;
                            }
                            return r.abrupt("return");

                          case 10:
                            if (/m(beta)?.piaoniu.com/g.test(n) && (a = n.split("?")[1] ? (0, _util.search2json)(n.split("?")[1]) : {}, 
                            Object.assign(a, {
                                noAppLink: !0
                            }), n = n.split("?")[0] + "?" + (0, _util.json2search)(a)), !(e.businessId && "8a8283ed61510bce0162d1551d9f7378" === e.businessId || /https:\/\/huidong.bjsia.cn/g.test(n))) {
                                r.next = 15;
                                break;
                            }
                            return o = _miniProgramAppIds2.default.huiDongSportAppId, i.tapToNavThirdWeApp({
                                miniPath: n,
                                appId: o
                            }), r.abrupt("return");

                          case 15:
                            i.tapToNavigate(n), r.next = 19;
                            break;

                          case 18:
                            i.gotoDetail(t.currentTarget.dataset.onlineId);

                          case 19:
                          case "end":
                            return r.stop();
                        }
                    }, r, i);
                }))();
            },
            changeCity: function() {
                this.$emit("changeCity");
            },
            reload: function() {
                this.reset(), this.loadData();
            },
            bindADItemTap: function() {
                this.bindADClick.apply(this, arguments);
            },
            ADImageLoadedView: function() {
                this.bindADView.apply(this, arguments);
            },
            goToGetBonus: function(e) {
                var t = this;
                return _asyncToGenerator(regeneratorRuntime.mark(function i() {
                    var r, n, s, a;
                    return regeneratorRuntime.wrap(function(i) {
                        for (;;) switch (i.prev = i.next) {
                          case 0:
                            return i.next = 2, t.checkBindUser();

                          case 2:
                            if (r = i.sent) {
                                i.next = 5;
                                break;
                            }
                            return i.abrupt("return");

                          case 5:
                            n = wx.getStorageSync("selectCity"), s = {
                                resId: e.bonusId || "",
                                chanId: 4,
                                wesaiToken: wx.getStorageSync("wesaiToken"),
                                wesaiUserId: r && r.user_id || "",
                                cityCode: n && n.city_code || 0,
                                itemId: e.itemId || ""
                            }, a = "https://ticket.wesai.com/wechat/coupon/" + (0, _util.extendQuery)("", s), 
                            t.tapToNavigate(a);

                          case 9:
                          case "end":
                            return i.stop();
                        }
                    }, i, t);
                }))();
            }
        }, r.projectList = [], r.events = {}, n = i, _possibleConstructorReturn(r, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "getYouhuiTag",
        value: function(e) {
            var t = e.tags, i = !1;
            if (t && t.length > 0) for (var r = 0; r < t.length; r++) {
                var n = t[r];
                if (n.value && 1 == n.value) {
                    i = !0;
                    break;
                }
            }
            return i;
        }
    }, {
        key: "gotoDetail",
        value: function(e) {
            this.$root.$navigate("/wesai/pages/detail/detail", {
                onlineId: e
            });
        }
    }, {
        key: "loadMoreData",
        value: function(e) {
            this.lock || (this.curPage <= this.maxPage ? (this.lock = !0, this.loadData(!1, e)) : (this.lock = !1, 
            this.$emit("listLoaded")));
        }
    }, {
        key: "reset",
        value: function() {
            this.useSearchFlag = this.useSearch, this.noData = !1, this.netError = !1, this.defaultNoData = !1, 
            this.showTipBar = !1, this.cityId = this.city ? this.city.id : null, this.cityName = this.city ? this.city.name : null, 
            this.hasCity = this.city ? this.city.issame : null, this.hasCity || this.useSearch || (this.cityName = "全国", 
            this.cityId = 0), this.list = [], this.curPage = 1, this.maxPage = 1, this.showRecommendList = !1, 
            this.insertADInfoSuccess = !1, this.$apply();
        }
    }, {
        key: "filterRecommend",
        value: function() {
            var e = this;
            this.categoryName ? this.recommendList = this.recommendData.filter(function(t) {
                return t && t.itemTypePName && t.itemTypePName.indexOf(e.categoryName) >= 0;
            }) : this.itemTypePid ? this.recommendList = this.recommendData.filter(function(t) {
                return t.itemTypePid == e.itemTypePid;
            }) : this.recommendList = this.recommendData, this.recommendList.forEach(function(e) {
                e.itemPicUrl = e.itemPicUrl.indexOf("http") >= 0 ? e.itemPicUrl : "http:" + e.itemPicUrl;
            }), this.$apply();
        }
    }, {
        key: "loadData",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = this, i = arguments[1], r = arguments[2];
            this.showTipBar = !1, this.isLoading = !0, this.$apply();
            var n = function(i) {
                1 == t.curPage ? t.noData = 0 == i.length : t.noData = !1, e && (t.list = []), i.forEach(function(e) {
                    e.itemPicUrl = e.itemPicUrl.indexOf("http") >= 0 ? e.itemPicUrl : "http:" + e.itemPicUrl;
                }), t.list = t.list.concat(i), t.projectList = t.projectList.concat(i), t.lock = !1, 
                t.noData ? (t.defaultNoData = t.noData, t.useOutLoad || t.recommendData.length > 0 && t.filterRecommend()) : t.useOutLoad || (t.defaultNoData = !1);
            };
            this.noData = !1, this.useSearch && (this.itemTypePid = null, this.categoryName = null), 
            this.sportsQueryObj = sportsQueryObj(), this.sportsQueryObj.itemQuery = (0, _util.merge)(this.sportsQueryObj.itemQuery, {
                excludeTypeId: "8a8283eb5bd2a290015bfc38b011006d,8a8283eb5bd2a290015bfc38b0110066",
                curpage: this.curPage,
                pagesize: this.pageSize,
                cityName: this.cityName
            }, !this.categoryName && this.itemTypePid ? {
                itemTypePid: 0 == this.itemTypePid ? null : this.itemTypePid,
                keyword: this.keyword || null
            } : {
                keyword: this.keyword || this.categoryName || null
            }, i && (0, _util.isObject)(i) && !(0, _util.isEmptyObject)(i) ? i : {}), (this.categoryName || this.keyword) && this.sportsQueryObj.itemQuery && this.sportsQueryObj.itemQuery.itemTypePid && delete this.sportsQueryObj.itemQuery.itemTypePid, 
            "undefined" == this.sportsQueryObj.itemQuery.cityId && (this.sportsQueryObj.itemQuery.cityId = 0), 
            this.curPage <= 1 ? (this.showScrollLoading = !0, this.bottomShow = !0) : this.useSearch || (this.showScrollLoading = !0), 
            (0, _common.ajax)(_common.urls.projectList, {
                jsonParams: this.sportsQueryObj
            }).then(function(e) {
                r && (t.list = [], t.$apply()), n(e.itemResult.items), t.$emit("loadProjectList", e.itemResult), 
                t.maxPage = e.itemResult.totalpage, t.maxPage <= t.curPage && (t.showScrollLoading = !1), 
                t.$emit("update", e.itemResult.totalItem), t.lock = !1, t.curPage++, t.$apply(), 
                t.curPage > t.maxPage && (t.filterRecommend(), t.recommendList.forEach(function(e) {
                    delete e.idx;
                }), t.recommendList.length > 0 && (t.recommendList[0].idx = 0), t.list = t.list.concat(t.recommendList), 
                t.showRecommendList = !0, t.$apply()), t.useOutLoad && (t.itemTypePid || (t.showTipBar = !t.hasCity || t.defaultNoData && t.showRecommendList && t.recommendList.length > 0)), 
                t.isLoading = !1, t.$apply(), t.insertTheADInfo(), r && t.$emit("triggerProjectListInited", !0), 
                t.$apply();
            }).catch(function(i) {
                e && (t.list = [], t.noData = !0), t.isLoading = !1, t.showScrollLoading = !1, t.netError = !0, 
                t.$apply(), n([]), t.$emit("loadProjectList"), t.lock = !1, t.useOutLoad && t.$emit("ProjectListLoaded"), 
                t.$apply();
            }), this.$apply();
        }
    }, {
        key: "onLoad",
        value: function() {}
    }, {
        key: "init",
        value: function() {
            this.isHide = !1, this.sysRes = wx.getSystemInfoSync(), this.$apply(), this.loadData();
        }
    }, {
        key: "getInsertADInfo",
        value: function(e) {
            this.insertADInfo = e || null, this.$apply();
        }
    }, {
        key: "insertTheADInfo",
        value: function() {
            !this.insertADInfoSuccess && this.insertADInfo && this.list && this.list.length > 0 && (this.list.length > 3 ? this.list.splice(3, 0, this.insertADInfo) : this.list.push(this.insertADInfo), 
            this.insertADInfoSuccess = !0), this.$apply();
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = ProjectList;