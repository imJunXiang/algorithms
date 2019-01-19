var Tpl = require("../scripts/tpl"), mainText = [ "正在拼命帮您往里挤，请耐心等待~", "哎呀，没挤进去~" ], buttonText = "正在排队";

module.exports = Tpl.extends({
    key: "AccessLimit",
    data: {
        showAccessLimitModal: !1,
        isPending: !0
    },
    constructor: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t.key, t.page;
        Tpl.apply(this, arguments);
    },
    bindEvent: function() {
        this.page.onAccessLimitBack = this.onAccessLimitBack.bind(this), this.page.onAccessLimitConfirm = this.onAccessLimitConfirm.bind(this);
    },
    onAccessLimitConfirm: function() {
        this.data.isPending || (this.onConfirm && this.onConfirm(), this.hide());
    },
    onAccessLimitBack: function() {
        this.hideOnBack ? this.hide() : wx.navigateBack();
    },
    show: function() {
        this.setData({
            showAccessLimitModal: !0
        });
    },
    hide: function() {
        this.setData({
            showAccessLimitModal: !1
        });
    },
    render: function() {
        var t = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = i.main_text, s = i.button_text, n = i.sleep_interval;
        if (!this.data.showAccessLimitModal) {
            e = e || mainText, s = s || buttonText;
            var o = (e.length, n), a = 0, c = 0;
            clearTimeout(this.timer), function i() {
                var n = void 0, r = void 0, h = !0, d = Math.floor(a / 10), m = e.length - 2;
                0 === c && (c = d < m && o - a >= 10 ? 10 : o - a), n = e[Math.min(d, m)], a < o ? (h = !0, 
                r = "正在排队(" + c + "s)") : (r = s, n = e[e.length - 1], h = !1), t.setData({
                    confirmText: r,
                    content: n,
                    isPending: h
                }), a++, c--, a <= o && (t.timer = setTimeout(i, 1e3));
            }();
        }
    }
}, {
    getAttachFromError: function(t) {
        return !!(t && t.res && t.res.data.error && 19e6 === t.res.data.error.code) && t.res.data.error.attach;
    }
});