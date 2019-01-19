function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
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
        for (var r = 0; r < t.length; r++) {
            var i = t[r];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, r, i) {
        return r && e(t.prototype, r), i && e(t, i), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _projectlist = require("./../projectlist/projectlist.js"), _projectlist2 = _interopRequireDefault(_projectlist), _common = require("./../../common/common.js"), _mixin = require("./../../mixin.js"), _mixin2 = _interopRequireDefault(_mixin), getDefaultData = function() {
    return {
        netError: !1,
        listResultNothing: !1,
        showPage: !0,
        useSearch: !0,
        focus: !1,
        bindThirdType: 7,
        latitude: 0,
        longitude: 0,
        timer: 0,
        selectCity: null,
        location: null,
        projectShowListFlags: [],
        searcherHistory: [],
        searchKey: "",
        getSearchHotWords: [],
        showSearchResult: !1,
        searchResultsTotalNum: 0,
        showTheCurrentCityResults: !1
    };
}, SearchPanel = function(e) {
    function t() {
        var e, r, i, s;
        _classCallCheck(this, t);
        for (var o = arguments.length, n = Array(o), a = 0; a < o; a++) n[a] = arguments[a];
        return r = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(n))), 
        i.data = getDefaultData(), i.mixins = [ _mixin2.default ], i.$repeat = {}, i.$props = {
            ProjectList: {
                "xmlns:v-bind": "",
                "v-bind:city.sync": "selectCity",
                "v-bind:keyword.sync": "searchKey",
                "v-bind:useSearch.once": "useSearch"
            }
        }, i.$events = {}, i.components = {
            ProjectList: _projectlist2.default
        }, i.props = {
            city: {
                type: Object,
                default: {
                    id: "0",
                    name: "全国"
                }
            }
        }, i.methods = {
            bindLoadMore: function() {
                this.$invoke("ProjectList", "loadMoreData"), this.$apply();
            },
            changeUseCity: function(e) {
                this.showTheCurrentCityResults = !this.showTheCurrentCityResults, this.showTheCurrentCityResults ? this.selectCity = this.city : this.selectCity = {
                    id: "0",
                    name: "全国"
                }, this.$apply(), this.$invoke("ProjectList", "reset"), this.$invoke("ProjectList", "loadData");
            },
            bindSearchAlreadyExistsKeyWords: function(e) {
                var t = e.currentTarget.dataset.keyWord;
                this.searchKey = t, this.getSearchResult(t);
            },
            bindCancelSearchAndGoBack: function() {
                wx.navigateBack();
            },
            bindSearchInput: function(e) {
                var t = this;
                clearTimeout(this.timer), this.timer = setTimeout(function() {
                    var r = e.detail.value;
                    t.searchKey = r, "" !== r ? t.getSearchResult(r) : t.clearSearch(), t.$apply();
                }, 500);
            },
            bindToGetSearcherHistory: function(e) {
                var t = this;
                clearTimeout(this.data.timer), this.timer = setTimeout(function() {
                    var r = t.searcherHistory, i = e.detail.value;
                    "" !== i.trim() && (r && 6 === r.length && r.pop(), r.findIndex(function(e) {
                        return i === e;
                    }) < 0 && (r.unshift(i), t.searcherHistory = r, t.$apply(), wx.setStorageSync("searcherHistory", t.searcherHistory)), 
                    t.getSearchResult(i));
                }, 500);
            },
            bindClearSearcherHistory: function() {
                this.searcherHistory = [], wx.setStorageSync("searcherHistory", []);
            },
            bindClearSearchInput: function() {
                this.clearSearch();
            }
        }, i.events = {
            loadProjectList: function(e) {
                this.showSearchResult = !0, this.searchResultsTotalNum = e.totalItem, this.$apply();
            }
        }, s = r, _possibleConstructorReturn(i, s);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "clearSearch",
        value: function() {
            this.searchKey = "", this.showSearchResult = !1, this.listResultNothing = !1, this.venueList = [], 
            this.showLoadMore = !1, this.showLoadMoreIcon = !1, this.$apply();
        }
    }, {
        key: "getSearchResult",
        value: function(e) {
            this.searchKey = e, this.$apply(), this.$invoke("ProjectList", "reset"), this.$invoke("ProjectList", "loadData");
        }
    }, {
        key: "onLoad",
        value: function() {}
    }, {
        key: "init",
        value: function() {
            this.searcherHistory = wx.getStorageSync("searcherHistory") || [], this.location = wx.getStorageSync("lastLocation");
        }
    }, {
        key: "getHotWords",
        value: function() {
            var e = this;
            (0, _common.ajax)(_common.urls.getHotWords).then(function(t) {
                e.getSearchHotWords = t.data, e.$apply();
            });
        }
    }, {
        key: "show",
        value: function(e) {
            this.showPage = !0, this.init(), this.getHotWords(), this.focus = !0, this.$apply();
        }
    } ]), t;
}(_wepy2.default.component);

exports.default = SearchPanel;