Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        tap: function() {
            this.triggerEvent("reloadButtonTap");
        }
    }
});