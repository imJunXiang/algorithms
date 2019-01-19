Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        isGetPhoneButton: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        onGetPhoneNumber: function(t) {
            this.triggerEvent("getPhoneNumber", t);
        },
        onNormalButtonTap: function(t) {
            this.triggerEvent("normalButtonTap", t);
        }
    }
});