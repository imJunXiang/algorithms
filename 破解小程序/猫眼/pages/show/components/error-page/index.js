Component({
    properties: {
        showPage: {
            type: Boolean,
            value: !1
        },
        btnText: String
    },
    data: {},
    methods: {
        onMaskTap: function() {
            this.setData({
                showPage: !1
            }), this.triggerEvent("btnTap");
        }
    }
});