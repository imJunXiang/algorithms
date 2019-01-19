var Tpl = require("../scripts/tpl");

module.exports = Tpl.extends({
    key: "papayModal",
    data: {
        showPapayModal: !1,
        papayCountDown: 3
    },
    bindEvent: function() {
        this.page.showPapayModal = this.showPapayModal.bind(this), this.page.onPapayCancel = this.onPapayCancel.bind(this), 
        this.page.onPapayConfirm = this.onPapayConfirm.bind(this);
    },
    showPapayModal: function() {
        var a = this;
        this.page.stats("b_ae85qlxz"), this.setData({
            showPapayModal: !0,
            papayCountDown: 3
        }), clearInterval(this.papayTimeout), this.papayTimeout = setInterval(function() {
            var t = a.data.papayCountDown - 1;
            0 == t && (a.page.stats("b_9mez7075"), a.onPapayConfirm()), a.setData({
                papayCountDown: t
            });
        }, 1e3);
    },
    onPapayCancel: function() {
        clearInterval(this.papayTimeout), this.setData({
            showPapayModal: !1
        });
    },
    onPapayConfirm: function() {
        clearInterval(this.papayTimeout), this.setData({
            showPapayModal: !1
        }), this.emit("payConfirm");
    }
});