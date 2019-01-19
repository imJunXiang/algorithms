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
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _logindefaultdata = require("./logindefaultdata.js"), _logindefaultdata2 = _interopRequireDefault(_logindefaultdata), _urls = require("./../../common/urls.js"), _urls2 = _interopRequireDefault(_urls), LoginPanel = function(e) {
    function t() {
        var e, i, n, o;
        _classCallCheck(this, t);
        for (var a = arguments.length, r = Array(a), l = 0; l < a; l++) r[l] = arguments[l];
        return i = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(r))), 
        n.data = (0, _logindefaultdata2.default)(), n.components = {}, n.methods = {
            __lgpanel_phoneInput: function(e) {
                this.phoneNum = e.detail.value, this.verifyPhone = this.validPhone(e.detail.value), 
                11 != this.phoneNum.length || this.verifyPhone ? this.phoneErrorClass = !1 : this.phoneErrorClass = !0;
            },
            __lgpanel_vcodeInput: function(e) {
                this.verifyCode = e.detail.value, this.verifyCode.length > 0 && 4 != this.verifyCode.length ? this.vcodeErrorClass = !0 : this.vcodeErrorClass = !1;
            },
            __lgpanel_login: function() {
                var e = this;
                if (!this.sliderImgOk || !this.verifyPhone) return !1;
                var t = this.phoneNum, i = this.verifyCode;
                _wepy2.default.request({
                    url: _urls2.default.bindMobile,
                    method: "POST",
                    data: {
                        mobile: t,
                        code: i,
                        verify: "riddle"
                    }
                }).then(function(n) {
                    200 != +n.code ? (e.verifyCodeClass = "redFouce", e.verifyCodeText = "短信验证码有误", 
                    n.err ? e.$invoke("Toast", "show", n.err + "") : e.$invoke("Toast", "show", "绑定失败，请重试")) : (e.isShow = !1, 
                    e.verifyCodeClass = "", e.verifyCodeText = "请填写验证码", e.loginClose(), e.$apply(), 
                    e.$emit("loginSuccess", t, i, n && n.data || {}));
                }).catch(function(e) {});
            },
            __lgpanel_phoneFocus: function(e) {
                this.phoneClass = "focus";
            },
            __lgpanel_phoneBlur: function(e) {
                this.phoneClass = "";
            },
            __lgpanel_vcodeFocus: function(e) {
                this.vcodeClass = "focus";
            },
            __lgpanel_vcodeBlur: function(e) {
                this.vcodeClass = "";
            },
            __lgpanel_sendCode: function() {
                this.__lgpanel_countDown < 60 || this.validPhone(this.data.phoneNum) && this.getVerifyCodeImg(!0);
            },
            __lgpanel_close: function() {
                this.loginClose();
            },
            __lgpanel_clearPhoneNum: function() {
                var e = this;
                setTimeout(function() {
                    e.phoneNum = "", e.$apply();
                }, 0);
            },
            __lgpanel_clearVerifyCode: function() {
                var e = this;
                setTimeout(function() {
                    e.verifyCode = "", e.$apply();
                });
            },
            __lgpanel_verify_icon_start: function(e) {
                var t = this;
                this.lableIndex = e.touches[0].pageX - e.target.offsetLeft, this.captchaData.time_start = new Date().getTime();
                var i = {
                    slideIconLeft: 0,
                    hideSliderTips: !0,
                    labelDragging: !0,
                    hideVeriIcon: !1
                };
                Object.keys(i).forEach(function(e) {
                    t[e] = i[e];
                });
            },
            __lgpanel_verify_icon_move: function(e) {
                var t = this, i = e.touches[0].pageX - this.lableIndex;
                i < 0 && (i = 0), i > this.slideMax && (i = this.slideMax), this.captchaData.position = i;
                var n = {
                    slideIconLeft: i,
                    labelDragging: !0,
                    labelImgSrc: "move"
                };
                Object.keys(n).forEach(function(e) {
                    t[e] = n[e];
                });
            },
            __lgpanel_verify_icon_end: function(e) {
                var t = this, i = 2 * (this.slideIconLeft + 10), n = {
                    indentify: this.captchaData.indentify,
                    time_start: this.captchaData.time_start,
                    time_stop: new Date().getTime(),
                    position: i,
                    _: Math.floor(1e14 * Math.random())
                };
                this.labelDragging = !1, _wepy2.default.request({
                    url: _urls2.default.captchaSliderVerify,
                    data: n
                }).then(function(e) {
                    if (0 === e.code) {
                        t.sendVerifyCode();
                        var i = {
                            hideSliderTips: !1,
                            veriPicBg: t.captchaData.done,
                            sliderImgOk: !0,
                            slideIconLeft: 0,
                            hideVeriIcon: !0,
                            labelImgSrc: "done",
                            timeDiff: (n.time_stop - n.time_start) / 1e3
                        };
                        Object.keys(i).forEach(function(e) {
                            t[e] = i[e];
                        }), t.$apply();
                    } else t.resetVerifyImg(!0, e);
                }).catch(function(e) {
                    t.resetVerifyImg(!0, e);
                });
            }
        }, o = i, _possibleConstructorReturn(n, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {}
    }, {
        key: "show",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Object(this._configs, e), this.$emit("controlScroll", !0), this.isShow = !0, this.$apply();
        }
    }, {
        key: "loginClose",
        value: function() {
            var e = this;
            clearInterval(this.__lgpanel_timer), this.$emit("controlScroll", !1);
            var t = (0, _logindefaultdata2.default)();
            Object.keys(t).forEach(function(i) {
                e[i] = t[i];
            });
        }
    }, {
        key: "validPhone",
        value: function(e) {
            return /^1[3|4|5|8|7][0-9]\d{8}$/.test(e);
        }
    }, {
        key: "sendVerifyCode",
        value: function() {
            var e = this;
            _wepy2.default.request({
                url: _urls2.default.sendVerify,
                data: {
                    mobile: this.data.phoneNum,
                    indentify: this.captchaData.indentify,
                    verify: "riddle"
                }
            }).then(function(t) {
                0 === t.error && (e.__lgpanel_timer = setInterval(function() {
                    if (--e.__lgpanel_countDown <= 0) return clearInterval(e.__lgpanel_timer), e.__lgpanel_countDown = 60, 
                    e.verifyText = "重新获取", void e.$apply();
                    e.verifyText = e.__lgpanel_countDown + "s", e.$apply();
                }, 1e3), setTimeout(function() {
                    e.veriPicHeight = 0, setTimeout(function() {
                        e.resetVerifyImg(), e.sliderImgOk = !0, e.$apply();
                    }, 2e3), e.$apply();
                }, 2e3), "function" == typeof e._configs.sendCode && e._configs.sendCode(), e.$apply());
            });
        }
    }, {
        key: "resetVerifyImg",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (t) {
                var n = {
                    labelClass: "animte label_moveOut",
                    hideSliderTips: !1,
                    hideVeriIcon: !0,
                    sliderImgOk: !1,
                    slideIconLeft: 0
                };
                Object.keys(n).forEach(function(t) {
                    e[t] = n[t];
                }), -8 === i.code && i.msg ? this.errMsg = i.msg : this.errMsg = "拖动滑块将悬浮图像正确拼合", 
                this.getVerifyCodeImg(), setTimeout(function() {
                    e.labelClass = "", e.labelImgSrc = "normal", e.$apply();
                }, 500);
            } else {
                var o = {
                    labelClass: "",
                    labelImgSrc: "normal",
                    hideSliderTips: !0,
                    sliderImgOk: !1,
                    timeDiff: 0,
                    veriPicHeight: 0,
                    veriPicBg: "",
                    veriIconBg: "",
                    slideIconLeft: 0,
                    hideVeriIcon: !0
                };
                Object.keys(o).forEach(function(t) {
                    e[t] = o[t];
                });
            }
        }
    }, {
        key: "getVerifyCodeImg",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            _wepy2.default.request({
                url: _urls2.default.captchaSlider,
                data: {
                    user_key: this.phoneNum,
                    project_key: "wsPicked",
                    _: Math.floor(1e14 * Math.random())
                }
            }).then(function(i) {
                if (0 === i.code) {
                    e.captchaData = i.data;
                    var n = {
                        veriPicHeight: "178px",
                        freshClass: "freshAni",
                        loadingVerifyBg: !0,
                        veriPicBg: i.data.bg,
                        veriIconBg: i.data.icons,
                        veriPicPosTop: i.data.top / 2,
                        slideIconLeft: 0,
                        hideVeriIcon: !0
                    };
                    Object.keys(n).forEach(function(t) {
                        e[t] = n[t];
                    }), t && (e.hideSliderTips = !0), setTimeout(function() {
                        e.freshClass = "", e.loadingVerifyBg = !1, e.$apply();
                    }, 300), e.$apply();
                } else i.msg && e.$invoke("Toast", "show", i.msg + "");
            }).catch(function(t) {
                -8 === t.code && (0 === e.veriPicHeight ? e.$invoke("Toast", "show", t.msg + "") : e.errMsg = t.msg, 
                e.$apply());
            });
        }
    }, {
        key: "sendCode",
        value: function() {}
    } ]), t;
}(_wepy2.default.component);

exports.default = LoginPanel;