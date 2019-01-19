module.exports = function(t, s, e) {
    var o = this;
    return "string" != typeof t ? console.error("不允许toast非字符串", t) : (this.setData({
        toast: t
    }), clearTimeout(this._toastTimer), this._toastTimer = setTimeout(function() {
        o.setData({
            toast: ""
        }), e && e();
    }, s || 2500), this);
};