Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        text: {
            type: String,
            value: ""
        }
    },
    methods: {
        onback: function() {
            this.triggerEvent("back");
        }
    }
});