Component({
    data: {
        showMask: !0
    },
    methods: {
        onMaskTap: function() {
            this.setData({
                showMask: !1
            });
        },
        noop: function() {}
    }
});