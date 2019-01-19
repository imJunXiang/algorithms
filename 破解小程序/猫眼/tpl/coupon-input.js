function CouponInput() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.key = "CouponInput", this.data = {
        isShow: !1,
        inputCoupon: "",
        errorMsg: ""
    }, this.page = t.page || app.page(), this.key = t.key || this.key, this.setData(this.data), 
    this.bindEvent(), event.attach(this);
}

var _extends = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
        var o = arguments[n];
        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (t[i] = o[i]);
    }
    return t;
}, event = require("../scripts/event"), app = getApp();

CouponInput.prototype = {
    bindEvent: function() {
        this.page.onInputCoupon = this.onInputCoupon.bind(this), this.page.onCouponInputConfirm = this.onConfirm.bind(this), 
        this.page.onCouponInputCancel = this.onCancel.bind(this);
    },
    onInputCoupon: function(t) {
        this.data.inputCoupon = t.detail.value, this.data.errorMsg && this.setData({
            errorMsg: ""
        });
    },
    getCoupon: function() {
        return this.data.inputCoupon;
    },
    onConfirm: function() {
        var t = this.data.inputCoupon;
        if (!t) return void this.error("不能为空");
        this.hide(), this.emit("success", t);
    },
    onCancel: function() {
        this.hide();
    },
    show: function() {
        this.setData({
            isShow: !0,
            inputCoupon: "",
            errorMsg: ""
        });
    },
    isShow: function() {
        return !!this.data.isShow;
    },
    hide: function() {
        this.setData({
            isShow: !1,
            inputCoupon: "",
            errorMsg: ""
        });
    },
    error: function(t) {
        this.setData({
            errorMsg: t
        });
    },
    clear: function() {
        this.setData({
            inputCoupon: ""
        });
    },
    setData: function(t) {
        this.data = _extends({}, this.data, t);
        var n = {};
        n[this.key] = this.data, this.page.setData(n);
    }
}, CouponInput.prototype.constructor = CouponInput, module.exports = CouponInput;