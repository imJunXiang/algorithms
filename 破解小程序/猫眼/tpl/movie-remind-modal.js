var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, Tpl = require("../scripts/tpl"), Date2 = require("../scripts/date2"), app = getApp(), timer = null, orderIds = [], prefix = "https://api.maoyan.com";

module.exports = Tpl.extends({
    key: "MovieRemindModal",
    data: {
        isShow: !1,
        currentDotsIndex: 0,
        ticketOrders: [],
        isAddCart: ""
    },
    bindEvent: function() {
        this.page.hideRemindModal = this.hideRemindModal.bind(this), this.page.remindModalDotsChange = this.remindModalDotsChange.bind(this), 
        this.page.goBuyGoods = this.goBuyGoods.bind(this), this.page.preventScroll = this.preventScroll.bind(this), 
        this.page.collapseCode = this.collapseCode.bind(this);
    },
    init: function() {
        var e = this;
        this.setData({
            isShow: !1,
            currentDotsIndex: 0,
            ticketOrders: [],
            isAddCart: ""
        });
        var t = app.models.location.get();
        t && t.longitude && t.latitude ? this.fetchData(t) : app.models.location.on("geo-location", function(t) {
            e.fetchData(t);
        });
    },
    fetchData: function(e) {
        var t = this, a = e.longitude, i = e.latitude;
        orderIds = [], app.request().get("/intelligent/getuserorders.json").query({
            longitude: a,
            latitude: i,
            version: "1.0"
        }).host("api").header({
            token: app.$user.token,
            uuid: app.$uuid,
            "content-type": "application/json"
        }).end().then(function(e) {
            return e.body.data;
        }).then(function(e) {
            if (!e || !e.ticketOrders || 0 === e.ticketOrders.length) return t.hideRemindModal();
            var a = [];
            e.ticketOrders.forEach(function(i) {
                i.seats = i.seats.join(" | "), i.codeInfo = i.codeInfo || [], i.showTime = Math.floor(i.showTime / 1e3 / 60), 
                a.push(i), 0 === i.exchangeStatus && i.orderSales && 0 === i.orderSales.length && i.saleList && i.saleList.length > 0 && orderIds.push(i.orderId), 
                i.isCollapse = !1, i.saleList && i.saleList.length > 0 && i.orderSales && 0 === i.orderSales.length && t.page.stats("b_xys1485r", {
                    cinemaId: e.cinemaId
                }), i.orderSales && i.orderSales.length && i.orderSales.forEach(function(e) {
                    e.validateTime = e.validateTime ? Date2(e.validateTime).toString("yyyy-MM-dd HH:mm:ss") : "", 
                    a.push(_extends({}, i, e));
                });
            }), t.setData({
                ticketOrders: a
            }), t.show(), t.page.stats("b_l4gf1vc4", {
                cinemaId: e.cinemaId
            });
        }).catch(function(e) {});
    },
    fetchHasGot: function() {
        var e = this, t = this.data.ticketOrders;
        if (0 === orderIds.length) return clearInterval(timer);
        app.request().get("/intelligent/getExchangeStatus.json").query({
            orderIds: orderIds.join(","),
            version: "1.0"
        }).host("api").header({
            token: app.$user.token,
            uuid: app.$uuid,
            "content-type": "application/json"
        }).end().then(function(e) {
            return e.body.data;
        }).then(function(a) {
            var i = a.exchangeStatus || {};
            t.forEach(function(e) {
                1 === i[e.orderId] && (e.exchangeStatus = i[e.orderId], e.isCollapse = !0, orderIds = orderIds.filter(function(t) {
                    return t !== e.orderId;
                }));
            }), e.setData({
                ticketOrders: t
            });
        }).catch(function(e) {});
    },
    remindModalDotsChange: function(e) {
        this.setData({
            currentDotsIndex: e.detail.current
        });
    },
    goBuyGoods: function(e) {
        var t = e.currentTarget.dataset, a = t.valLab, i = t.valBid, s = t.valDealid, r = t.valCinemaid, n = t.index;
        this.page.stats(i, a), app.goto("/pages/goods/buy?dealId=" + s + "&cinemaId=" + r + "&index=" + n);
    },
    show: function() {
        this.setData({
            isShow: !0
        }), this.page.setData({
            disableScroll: "fixed"
        }), timer && clearInterval(timer), timer = setInterval(this.fetchHasGot.bind(this), 3e3);
    },
    collapseCode: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.ticketOrders;
        a[t].isCollapse = !a[t].isCollapse, this.setData({
            ticketOrders: a
        });
    },
    hideRemindModal: function(e) {
        var t = this;
        timer && clearInterval(timer), this.page.setData({
            disableScroll: ""
        }), orderIds.length ? (this.setData({
            isAddCart: "add-cart"
        }), setTimeout(function() {
            t.setData({
                isShow: !1,
                isAddCart: ""
            });
        }, 500)) : this.setData({
            isShow: !1
        }), this.page.movieRemindCard && this.page.movieRemindCard.init && this.page.movieRemindCard.init();
    },
    preventScroll: function() {}
});