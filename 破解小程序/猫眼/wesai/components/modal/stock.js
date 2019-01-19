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
            var s = e[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, i, s) {
        return i && t(e.prototype, i), s && t(e, s), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _common = require("./../../common/common.js"), _urls = require("./../../common/urls.js"), _urls2 = _interopRequireDefault(_urls), stock = function(t) {
    function e() {
        var t, i, s, o;
        _classCallCheck(this, e);
        for (var r = arguments.length, n = Array(r), c = 0; c < r; c++) n[c] = arguments[c];
        return i = s = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(n))), 
        s.data = {
            title: "",
            mask: !1,
            clear: !1,
            desc: "",
            btn_active: "",
            show: !1,
            mobile: "",
            isActive: !1,
            toast: !1,
            toastMsg: "",
            showSuc: !1,
            showSuc2: !1,
            showErr: !1,
            bookSrc: "",
            screeningsId: "",
            priceId: "",
            itemStatus: ""
        }, s.watch = {
            mask: function(t) {
                t ? this.$emit("controlScroll", !0) : this.$emit("controlScroll", !1);
            }
        }, s.methods = {
            mobileInput: function(t) {
                var e = t.detail.value;
                e.length > 1 ? 11 == e.length && (this.mobile = e, this.checkMobileNum(this.mobile) ? this.isActive = !0 : (this.isActive = !1, 
                this.showToast("请填写正确的手机号码")), this.clear = !0) : this.clear = !1;
            },
            hide: function() {
                this.mask = !1, this.show = !1, this.showSuc = !1, this.showSuc2 = !1, this.showErr = !1;
            },
            show: function(t) {
                this.bookSrc = t.bookSrc, this.screeningsId = t.screeningsId, this.priceId = t.priceId, 
                this.itemStatus = t.itemStatus, this.itemInfo = t.itemInfo, this.mask = !0, 1 == this.itemStatus || 4 == this.itemStatus ? (this.title = "开票提醒", 
                this.desc = "温馨提示： 我们会记录您的基本信息，待到货后我们会第一时间通知您。") : (this.title = "缺货登记", this.desc = "本票价已经售罄。是否帮您做缺货登记？我们将记录您的信息，并在有票时通知您。"), 
                this.show = !0;
                var e = wx.getStorageSync("wesaiUserInfo");
                this.mobile = e.mobile || "", this.checkMobileNum(this.mobile) && (this.isActive = !0);
            },
            resetValue: function() {
                this.mobile = "", this.isActive = "";
            },
            submit: function(t) {
                var e = this;
                if (this.isActive) {
                    var i = {};
                    i = 1 == this.itemInfo.itemStatus ? {
                        mobile: this.mobile,
                        itemId: this.itemInfo.itemId,
                        priceId: "",
                        showId: "",
                        bookType: this.itemInfo.itemStatus,
                        bookSrc: this.bookSrc
                    } : {
                        mobile: this.mobile,
                        itemId: this.itemInfo.itemId,
                        priceId: this.priceId,
                        showId: this.screeningsId,
                        bookType: this.itemInfo.itemStatus,
                        bookSrc: this.bookSrc
                    }, (0, _common.ajax)(_urls2.default.outStockUrl, {
                        jsonParams: i
                    }).then(function(t) {
                        200 == t.returnInfo.code ? 1 == e.itemInfo.itemStatus || 4 == e.itemInfo.itemStatus ? e.suc() : e.suc2() : e.err();
                    }).catch(function(t) {});
                }
            }
        }, o = i, _possibleConstructorReturn(s, o);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "checkMobileNum",
        value: function(t) {
            return /^1[3|4|5|8|7][0-9]\d{8}$/.test(t);
        }
    }, {
        key: "showToast",
        value: function(t) {
            var e = this;
            this.toast = !0, this.toastMsg = t, setTimeout(function() {
                e.toast = !1, e.$apply();
            }, 2e3);
        }
    }, {
        key: "hide",
        value: function() {
            this.mask = !1, this.show = !1;
        }
    }, {
        key: "suc",
        value: function() {
            var t = this;
            this.show = !1, this.showSuc = !0, setTimeout(function() {
                t.hide(), t.showSuc = !1, t.$apply();
            }, 2e3), this.$apply();
        }
    }, {
        key: "suc2",
        value: function() {
            var t = this;
            this.show = !1, this.showSuc2 = !0, setTimeout(function() {
                t.hide(), t.showSuc2 = !1, t.$apply();
            }, 2e3), this.$apply();
        }
    }, {
        key: "err",
        value: function() {
            var t = this;
            this.show = !1, this.showErr = !0, setTimeout(function() {
                t.hide(), t.showErr = !1, t.$apply();
            }, 2e3);
        }
    } ]), e;
}(_wepy2.default.component);

exports.default = stock;