function Captcha() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.key = "Captcha", this.data = {
        showCaptcha: !1,
        inputCaptcha: "",
        captchaHash: +new Date(),
        errorMsg: ""
    }, this.page = t.page || app.page(), this.key = t.key || this.key, this.setData(this.data), 
    this.bindEvent();
}

var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var h = arguments[a];
        for (var i in h) Object.prototype.hasOwnProperty.call(h, i) && (t[i] = h[i]);
    }
    return t;
}, app = getApp();

Captcha.prototype = {
    bindEvent: function() {
        this.page.onInputCaptcha = this.onInputCaptcha.bind(this), this.page.onHideCaptcha = this.onHideCaptcha.bind(this), 
        this.page.updateCaptcha = this.update.bind(this);
    },
    onInputCaptcha: function(t) {
        this.data.inputCaptcha = t.detail.value;
    },
    onHideCaptcha: function() {
        this.hide();
    },
    show: function() {
        this.setData({
            showCaptcha: !0,
            inputCaptcha: "",
            errorMsg: ""
        }), this.update();
    },
    isShow: function() {
        return !!this.data.showCaptcha;
    },
    hide: function() {
        this.setData({
            showCaptcha: !1,
            inputCaptcha: "",
            errorMsg: ""
        });
    },
    update: function() {
        this.setData({
            captchaHash: +new Date()
        });
    },
    error: function(t) {
        this.setData({
            errorMsg: t,
            inputCaptcha: ""
        }), this.update();
    },
    clear: function() {
        this.setData({
            inputCaptcha: ""
        });
    },
    setData: function(t) {
        this.data = _extends({}, this.data, t);
        var a = {};
        a[this.key] = this.data, this.page.setData(a);
    }
}, Captcha.prototype.constructor = Captcha, module.exports = Captcha;