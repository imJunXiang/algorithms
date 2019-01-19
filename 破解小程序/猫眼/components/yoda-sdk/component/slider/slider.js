function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var _sliderSDK = require("./sliderSDK"), _sliderSDK2 = _interopRequireDefault(_sliderSDK), _sliderAPI = require("./sliderAPI"), _sliderAPI2 = _interopRequireDefault(_sliderAPI), _config = require("../../utils/config"), app = getApp();

Component({
    properties: {
        title: {
            type: String,
            value: "验证"
        },
        imgTitle: {
            type: String,
            value: "请输入图片中的内容"
        },
        imgButton: {
            type: String,
            value: "验证"
        }
    },
    data: {
        isShow: !1
    },
    attached: function() {
        console.log("attached");
    },
    moved: function() {
        console.log("moved");
    },
    detached: function() {
        console.log("detached");
    },
    ready: function() {
        console.log("ready");
    },
    methods: {
        showSlider: function(e) {
            var t = this, i = e.requestCode, a = e.showCloseBtn;
            _config.rohr.i(_config.rohrConfig.i), _sliderAPI2.default.getPageData(i).then(function(e) {
                var o = new _sliderSDK2.default({
                    requestCode: i,
                    pageData: e
                });
                app.$loginPage = t, t.setData({
                    sdk: o,
                    moveWidth: 0,
                    codeImage: "",
                    requestCode: i,
                    sliderCode: "",
                    isShow: !0,
                    validStep: "slider",
                    slideStatusClass: "",
                    animationData: {},
                    pageData: e,
                    showCloseBtn: a
                });
            }).catch(function(e) {
                t.triggerEvent("sliderEvent", {
                    status: 0,
                    code: 99999
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
            var o = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 500,
                timingFunction: "ease",
                delay: 0
            });
            this.animation = o;
        },
        sliderVerifySuccess: function(e) {
            var t = getApp().$loginPage, i = "";
            e && (i = e.response_code);
            var a = t.data.requestCode;
            wx.showToast({
                title: "验证成功",
                complete: function() {
                    t.setData({
                        isShow: !1
                    }), t.triggerEvent("sliderEvent", {
                        status: 1,
                        requestCode: a,
                        responseCode: i
                    }, {
                        bubbles: !0,
                        composed: !0
                    });
                }
            });
        },
        sliderTouchStart: function(e) {
            this.data.sdk.sliderTouchStart(e);
        },
        sliderTouchMove: function(e) {
            var t = this.data.sdk, i = t.sliderTouchMove(e), a = i.deltaX, o = i.isDone, s = "";
            o && (s = "slider-boxLoading"), this.setData({
                moveWidth: a,
                slideStatusClass: s
            });
        },
        sliderTouchEnd: function(e) {
            var t = this.data.sdk;
            t.isDone ? this.setData({
                slideStatusClass: "slider-boxLoading"
            }) : (t.sliderTouchEnd(e), this.setData({
                moveWidth: 0
            }));
        },
        sliderClose: function() {
            this.setData({
                isShow: !1
            }), this.triggerEvent("sliderEvent", {
                status: 0,
                code: 33333
            }, {
                bubbles: !0,
                composed: !0
            });
        },
        sliderValideCode: function(e) {
            var t = this, i = this.data, a = i.sliderCode, o = i.pageData, s = i.sdk.requestCode;
            _sliderAPI2.default.verfiyCode({
                captchacode: a,
                action: o.action,
                id: 1,
                requestCode: s
            }).then(function(e) {
                var i = e.status, a = e.error, o = e.data;
                1 === i ? t.sliderVerifySuccess(o) : 0 === i && 121020 === a.code ? (wx.showToast({
                    title: a.message,
                    icon: "loading"
                }), t.sliderUpdataCaptch()) : wx.showToast({
                    title: a.message,
                    icon: "none",
                    duration: 2e3,
                    complete: function() {
                        t.triggerEvent("sliderEvent", {
                            status: 0,
                            code: a.code
                        }, {
                            bubbles: !0,
                            composed: !0
                        });
                    }
                });
            }, function(e) {
                t.triggerEvent("sliderEvent", {
                    status: 0,
                    code: 99999
                }, {
                    bubbles: !0,
                    composed: !0
                });
            });
        },
        sliderUpdataCaptch: function() {
            var e = this.data, t = e.requestCode, i = e.pageData;
            this.setData({
                codeImage: _config.baseUrl + "/v2/captcha?request_code=" + t + "&action=" + i.action + "&captchaHash=" + Number(new Date()),
                sliderCode: ""
            });
        },
        sliderValideCodeInput: function(e) {
            var t = e.detail.value;
            this.setData({
                sliderCode: t
            });
        },
        bindSliderInputFocus: function(e) {
            var t = this.data.animationData;
            this.animation.top(200).step(), t = this.animation.export(), this.setData({
                animationData: t
            });
        },
        bingSliderInputBlur: function(e) {
            var t = this.data.animationData;
            this.animation.top(300).step(), t = this.animation.export(), this.setData({
                animationData: t
            });
        },
        onTapPage: function(e) {
            _config.rohr.t(e);
        },
        onTouchMovePage: function(e) {
            _config.rohr.m(e);
        }
    }
});