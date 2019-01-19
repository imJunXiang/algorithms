function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _createClass = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), _class, _temp2, _initialiseProps, _util = require("./../../common/util.js"), _mixin = require("./../../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _common = require("./../../common/common.js"), getDefaultData = function() {
    return {
        isHide: !0,
        focused: !1,
        location: null,
        locationText: "定位中...",
        showList: !0,
        useInput: !1,
        cityId: 0,
        searchKey: "",
        searchResult: [],
        searchResultNoData: !1,
        lastcity: [],
        allCities: {},
        hotCities: [],
        showLocationFailed: !1,
        nationalInfo: {
            id: 0,
            name: "全国",
            city_name: "全国"
        }
    };
}, CityPanel = (_temp2 = _class = function(t) {
    function e() {
        var t, i, n, o;
        _classCallCheck(this, e);
        for (var c = arguments.length, a = Array(c), s = 0; s < c; s++) a[s] = arguments[s];
        return i = n = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(a))), 
        _initialiseProps.call(n), o = i, _possibleConstructorReturn(n, o);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "changeCity",
        value: function(t) {
            if (this.allCities && !(0, _util.isEmptyObject)(this.allCities)) {
                var e = {
                    name: t.city_name || t.name,
                    id: t.city_id || t.id,
                    city_id_movie: t.city_id_movie || t.id,
                    city_name: t.city_name,
                    city_name_en: t.city_name_en,
                    city_code: t.city_code
                };
                this.searchKey = "", this.searchResult = [], this.showList = !0, this.useInput = !1, 
                this.isHide = !0, this.selectCity = e, this.$apply();
                var i = this._check(e);
                e.issame = i, wx.setStorageSync("selectCity", e), this.$emit("cityChange", e);
            }
        }
    }, {
        key: "getCitiesListInfo",
        value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
            (0, _common.ajax)(_common.urls.cityList).then(function(e) {
                var i = e.data;
                t(i);
            }).catch(function(t) {
                e(t);
            });
        }
    }, {
        key: "_check",
        value: function(t) {
            var e = !1;
            if ("全国" == t.name && (e = !0), this.allCities && !(0, _util.isEmptyObject)(this.allCities)) for (var i in this.allCities) for (var n = this.allCities[i].length; n > 0; n--) if (this.allCities[i][n - 1].city_name == t.name) {
                e = !0;
                break;
            }
            return e;
        }
    }, {
        key: "getCityList",
        value: function() {}
    }, {
        key: "getGeoCityInfo",
        value: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {}, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(e) {
                if (e) t.$emit("cityError"); else {
                    t.locationText = "定位失败", t.showLocationFailed = !0, t.$apply();
                    var i = getApp().$location;
                    if (i && i.city) {
                        var n = i.city, o = n;
                        n.name = n.nm, n.issame = t._check(n), o = n, t.$emit("cityChange", o);
                    } else t.$emit("cityChange", {
                        name: "全国",
                        id: 0
                    });
                }
            };
            getApp().checkLocationAuth().then(function() {
                wx.getLocation({
                    success: function(n) {
                        (0, _common.ajax)(_common.urls.geo, {
                            jsonParams: {
                                lat: n.latitude,
                                long: n.longitude
                            }
                        }).then(function(i) {
                            t.showLocationFailed = !1;
                            var o = i.data;
                            t.location = o || null, t.locationText = o.name || "", wx.setStorageSync("lastLocation", o);
                            var c = t._check(o);
                            o.issame = c;
                            var a = getApp().$location, s = wx.getStorageSync("selectCity");
                            if (t.selectCity = s || t.selectCity, a && a.city) {
                                var l = a.city, r = l;
                                return l.name = l.nm, l.issame = t._check(l), r = l, t.selectCity && t.selectCity.city_name && r && r.nm && t.selectCity.city_name != r.nm ? (t.selectCity.issame = !0, 
                                r = t.selectCity) : t.selectCity = r, r.city_code = o.city_code || 0, wx.setStorageSync("selectCity", r), 
                                void t.$emit("cityChange", r);
                            }
                            t.selectCity && !t.selectCity.city_code && 0 !== t.selectCity.city_code && (t.selectCity.city_code = o.city_code || 0), 
                            t.selectCity = t.selectCity || o, wx.setStorageSync("selectCity", t.selectCity), 
                            t.$emit("cityChange", o), t.$apply(), e({
                                data: o,
                                locationInfo: n
                            });
                        }).catch(function(e) {
                            t.showLocationFailed = !1, i();
                        });
                    },
                    fail: function(t) {
                        i();
                    }
                });
            }).catch(function(t) {
                i();
            });
        }
    }, {
        key: "geoToSwitchCity",
        value: function(t) {
            var e = this;
            return new Promise(function(i, n) {
                var o = e, c = wx.getStorageSync("selectCity"), a = wx.getStorageSync("lastLocation");
                t && a && t.city_id !== a.city_id ? wx.showModal({
                    title: "",
                    content: "定位的城市为" + t.name + "，是否切换",
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {
                        e.confirm ? i({
                            newLocation: t,
                            oldLocation: a
                        }) : e.cancel && n({
                            newLocation: t,
                            oldLocation: a
                        });
                    },
                    fail: function() {
                        n({
                            newLocation: t,
                            oldLocation: a
                        });
                    }
                }) : !a && c && t && t.city_id !== c.city_id ? wx.showModal({
                    title: "",
                    content: "定位的城市为" + t.name + "，是否切换",
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {
                        e.confirm ? i({
                            newLocation: t,
                            oldLocation: a
                        }) : e.cancel && n({
                            newLocation: t,
                            oldLocation: a
                        });
                    },
                    fail: function() {
                        n({
                            newLocation: t,
                            oldLocation: a
                        });
                    }
                }) : a || c || !t || (wx.setStorageSync("lastLocation", t), o.location = t);
            });
        }
    }, {
        key: "onLoad",
        value: function() {}
    }, {
        key: "init",
        value: function() {
            var t = this;
            this.getCitiesListInfo(function(e) {
                t.allCities = e.allCities, t.hotCities = e.hotCities, t.getGeoCityInfo(), t.$apply();
            }, function(e) {
                t.getGeoCityInfo(), t.$apply();
            });
        }
    }, {
        key: "show",
        value: function(t) {
            this.isHide = !1, this.$apply();
        }
    } ]), e;
}(_wepy2.default.component), _initialiseProps = function() {
    this.data = getDefaultData(), this.components = {}, this.methods = {
        __city_panel_close: function() {
            this.isHide = !0;
        },
        __city_panel_searcherFocus: function() {
            this.focused = !0;
        },
        __city_panel_searcherFocus_cancel: function() {
            this.focused = !1, this.searchKey = "", this.showList = !0, this.searchResult = [];
        },
        __city_panel_clearText: function() {
            var t = this;
            setTimeout(function() {
                t.searchKey = "", t.showList = !0, t.searchResult = [], t.$apply();
            }, 0);
        },
        __city_panel_searcher: function(t) {
            var e = t.detail.value, i = this.allCities;
            this.showList = 0 === e.length, this.searchKey = e;
            var n = [];
            for (var o in i) {
                for (var c = i[o], a = [], s = 0; s < c.length; s++) {
                    var l = c[s];
                    (l.city_name.toLowerCase().indexOf(e.toLowerCase()) >= 0 || l.city_name_en.toLowerCase().indexOf(e.toLowerCase()) >= 0) && a.push(l);
                }
                n = n.concat(a);
            }
            this.searchResult = n, this.searchResultNoData = 0 === this.searchResult.length;
        },
        __city_panel_chooseItem: function(t) {
            var e = t.currentTarget.dataset.cityItem;
            e && this.changeCity(e);
        },
        __city_panel_refreshGeo: function() {
            var t = this;
            this.showLocationFailed && this.getGeoCityInfo(function() {
                t.isHide = !0, t.$apply();
            });
        }
    }, this.events = {
        appMsg: function() {
            for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        }
    };
}, _temp2);

exports.default = CityPanel;