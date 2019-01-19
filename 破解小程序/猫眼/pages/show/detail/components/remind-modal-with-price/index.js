Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        tags: {
            type: Array,
            value: [],
            observer: function(e) {
                var t = this.data.phoneNumber, i = this.judgeDisable(e, t);
                this.setData({
                    disable: i
                });
            }
        },
        phoneNumber: {
            type: String,
            value: "",
            observer: function(e) {
                var t = this.data.tags, i = this.judgeDisable(t, e);
                this.setData({
                    disable: i
                });
            }
        },
        isIphoneX: {
            type: Boolean,
            value: !1
        },
        isIphone: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        disable: !1,
        focus: !1
    },
    methods: {
        noop: function() {},
        onSubmit: function(e) {
            var t = e.detail, i = t.formId;
            this.triggerEvent("submit", {
                formId: i
            });
        },
        closeModal: function() {
            this.triggerEvent("close");
        },
        oninputChange: function(e) {
            var t = e.detail, i = t.value;
            this.triggerEvent("inputchange", i);
        },
        onselect: function(e) {
            var t = e.currentTarget, i = t.dataset, n = {
                ticketPriceId: i.tid,
                ticketPriceValue: i.price
            };
            this.triggerEvent("priceselect", n);
        },
        judgeDisable: function(e, t) {
            var i = e.filter(function(e) {
                return !!e.selected;
            }), n = i.length, a = t.length;
            return !(n > 0 && 11 === a);
        },
        setFocus: function() {
            this.setData({
                focus: !0
            });
        },
        unSetFocus: function() {
            this.setData({
                focus: !1
            });
        }
    }
});