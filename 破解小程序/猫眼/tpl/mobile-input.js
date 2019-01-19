function MobileInput() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.key = "MobileInput", this.data = {
        isShow: !1,
        inputMobile: "",
        errorMsg: ""
    }, this.page = t.page || app.page(), this.key = t.key || this.key, this.setData(this.data), 
    this.bindEvent(), event.attach(this);
}

var _extends = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, event = require("../scripts/event"), app = getApp();

MobileInput.prototype = {
    bindEvent: function() {
        this.page.onInputMobile = this.onInputMobile.bind(this), this.page.onMobileInputConfirm = this.onConfirm.bind(this), 
        this.page.onMobileInputCancel = this.onCancel.bind(this);
    },
    onInputMobile: function(t) {
        this.data.inputMobile = t.detail.value, this.data.errorMsg && this.setData({
            errorMsg: ""
        });
    },
    getMobile: function() {
        return this.data.inputMobile;
    },
    onConfirm: function() {
        var t = this.data.inputMobile;
        return t ? /^1\d{10}$/.test(t) ? (this.emit("success", t), void this.hide()) : void this.error("手机号码不合法") : void this.error("不能为空");
    },
    onCancel: function() {
        this.hide();
    },
    show: function() {
        this.setData({
            isShow: !0,
            inputMobile: "",
            errorMsg: ""
        });
    },
    isShow: function() {
        return !!this.data.isShow;
    },
    hide: function() {
        this.setData({
            isShow: !1,
            inputMobile: "",
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
            inputMobile: ""
        });
    },
    setData: function(t) {
        this.data = _extends({}, this.data, t);
        var i = {};
        i[this.key] = this.data, this.page.setData(i);
    }
}, MobileInput.prototype.constructor = MobileInput, module.exports = MobileInput;