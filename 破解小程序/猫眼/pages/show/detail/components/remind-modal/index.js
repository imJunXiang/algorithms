Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        phoneToRegist: {
            type: String,
            value: "",
            observer: function(e) {
                this.setData({
                    allowSubmit: 11 === e.length
                });
            }
        }
    },
    data: {
        allowSubmit: !1
    },
    methods: {
        noop: function() {},
        closeRemind: function() {
            this.triggerEvent("closeRemind");
        },
        phoneInput: function(e) {
            var t = e.detail.value;
            this.triggerEvent("phoneinputChange", t);
        },
        registerPhone: function(e) {
            var t = e.detail.formId;
            this.triggerEvent("registerPhone", t);
        }
    }
});