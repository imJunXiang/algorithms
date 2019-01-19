Component({
    properties: {
        promotional: {
            type: Object,
            observer: function(t) {
                var i = t.discountList, s = t.setTicketList, e = t.projectGiftVO;
                i || s || e ? this.setData({
                    discountList: i,
                    setTicketList: s,
                    projectGiftVO: e,
                    isShow: !0
                }) : this.setData({
                    isShow: !1
                });
            }
        }
    },
    data: {
        isShow: !1,
        discountList: null,
        setTicketList: null,
        projectGiftVO: null
    },
    methods: {
        lookMore: function(t) {
            this.triggerEvent("popupDiscountDetail");
        }
    },
    attached: function() {
        this.triggerEvent("statsView");
    }
});