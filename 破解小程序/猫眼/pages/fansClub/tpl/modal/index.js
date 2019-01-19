var app = getApp();

Component({
    onCancel: function() {},
    onConfirm: function() {},
    externalClasses: [ "modal-content-class", "confirm-class" ],
    data: {
        showModal: !1,
        cancelText: "删除",
        confirmText: "确定",
        showCancel: !0
    },
    methods: {
        onTapCancel: function() {
            var n = this;
            this.setData({
                showModal: !1
            }, function() {
                "function" == typeof n.onCancel && n.onCancel();
            });
        },
        onTapConfirm: function() {
            var n = this;
            this.setData({
                showModal: !1
            }, function() {
                "function" == typeof n.onConfirm && n.onConfirm();
            });
        },
        showModal: function(n) {
            var o = n.cancelText, t = void 0 === o ? "" : o, a = n.confirmText, i = void 0 === a ? "" : a, e = n.onCancel, s = n.onConfirm, c = n.showCancel, l = void 0 === c || c;
            this.setData({
                showModal: !0,
                cancelText: t,
                confirmText: i,
                showCancel: l
            }), this.onCancel = e, this.onConfirm = s;
        },
        hideModal: function() {
            this.setData({
                showModal: !1
            });
        }
    },
    created: function() {
        app.on("SHOW_MODAL", this.showModal.bind(this)), app.on("HIDE_MODAL", this.hideModal.bind(this));
    }
});