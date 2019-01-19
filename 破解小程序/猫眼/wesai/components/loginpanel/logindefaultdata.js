function getDefaultData() {
    return {
        isShow: !1,
        phoneNum: "",
        verifyPhone: !1,
        verifyCode: "",
        verifyText: "获取验证码",
        phoneClass: "",
        phoneErrorClass: !1,
        vcodeClass: "",
        vcodeErrorClass: !1,
        labelClass: "",
        labelImgSrc: "normal",
        freshClass: "",
        verifyCodeClass: "",
        verifyCodePlaceholder: "请填写验证码",
        loadingVerifyBg: !1,
        labelDragging: !1,
        hideSliderTips: !0,
        sliderImgOk: !1,
        timeDiff: 0,
        errMsg: "拖动滑块将悬浮图像正确拼合",
        veriPicHeight: 0,
        veriPicBg: "",
        veriIconBg: "",
        slideIconLeft: 0,
        hideVeriIcon: !0,
        veriPicPosTop: 0,
        __lgpanel_timer: null,
        __lgpanel_countDown: 60,
        slideMin: 0,
        slideMax: 200,
        _configs: {
            sendCode: null,
            closeCode: null,
            login: null
        }
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = getDefaultData;