Component({
    properties: {
        promotional: {
            type: Object,
            observer: function(t) {
                var o = t.discountList, s = t.setTicketList, i = t.projectGiftVO;
                this.setData({
                    discountList: o,
                    setTicketList: s,
                    projectGiftVO: i
                });
            }
        }
    },
    data: {
        discountList: null,
        setTicketList: null,
        projectGiftVO: null,
        showBottom: !0,
        scrollTop: 0,
        trueTop: 0
    },
    methods: {
        shutDown: function() {
            this.triggerEvent("shutDiscountDetail");
        },
        toLower: function(t) {
            this.setData({
                showBottom: !1,
                trueTop: this.data.scrollTop
            });
        },
        toTop: function(t) {
            this.setData({
                showBottom: !0
            });
        },
        onScroll: function(t) {
            var o = t.detail, s = o.scrollTop;
            o.scrollHeight;
            this.setData({
                scrollTop: s
            });
        }
    }
});