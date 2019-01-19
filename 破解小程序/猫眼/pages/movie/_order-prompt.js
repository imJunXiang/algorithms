function OrderPrompt() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    this.key = "OrderPrompt", this.data = {
        isShowOrderPrompt: !1,
        list: []
    }, this.config = t, this.LAST_ORDER_ID = LAST_ORDER_ID, t.movieId && (this.LAST_ORDER_ID = LAST_ORDER_ID + "-" + t.movieId), 
    this.page = t.page || app.page(), this.key = t.key || this.key, this.setData(this.data), 
    this.bindEvent(), this.fetchData();
}

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
}, app = getApp(), Date2 = app.require("scripts/date2"), LAST_ORDER_ID = "order-prompt-order", TIME = 2880;

OrderPrompt.prototype = {
    bindEvent: function() {
        this.page.onTapOrderPromptClose = this.onTapOrderPromptClose.bind(this), this.page.onTapOrderPromptQrcode = this.onTapOrderPromptQrcode.bind(this);
    },
    fetchData: function() {
        var t = this, e = parseInt(app.get(this.LAST_ORDER_ID), 10);
        app.$user && app.$user.token && app.request().get("/wxapi/orderquery/v7/user/orders.json").header("token", app.$user.token).query({
            cate: 100,
            clientType: "touch",
            channelId: app.channelId
        }).end().then(function(r) {
            var a = r.body.data.orders.filter(function(e) {
                return !t.config.movieId || t.config.movieId === e.movie.id;
            }).filter(function(t) {
                var e = t.show.startTime - new Date(), r = void 0;
                if (Math.abs(e) > 60 * TIME * 1e3) return !1;
                var a = Math.round(Math.abs(e) / 60 / 1e3) + "分钟";
                return r = e < 0 ? [ "已开场", a ] : [ "距开场", a ], t.timediffMsgArr = r, t.exchange.originIdChunk = app.code(t.exchange.originId), 
                t.exchange.exchangeCodeChunk = app.code(t.exchange.exchangeCode), t.timeMsg = new Date2(t.show.startTime).toString("E MM月dd日 HH:mm"), 
                !0;
            }).sort(function(t, e) {
                return t.show.startTime - e.show.startTime;
            }), o = !0;
            a.length && a[0].id === e && (o = !1), t.setData({
                isShowOrderPrompt: o,
                list: a
            });
        });
    },
    onTapOrderPromptClose: function() {
        var t = this.data.list[0].id;
        app.set(this.LAST_ORDER_ID, t, {
            expires: 7200
        }), this.setData({
            isShowOrderPrompt: !1
        });
    },
    onTapOrderPromptQrcode: function(t) {
        wx.previewImage({
            urls: [ app.url + "/qr?text=" + t.target.dataset.qrcode ]
        });
    },
    setData: function(t) {
        this.data = _extends({}, this.data, t);
        var e = {};
        e[this.key] = this.data, this.page.setData(e);
    }
}, app.stats(OrderPrompt.prototype), OrderPrompt.prototype.constructor = OrderPrompt, 
module.exports = OrderPrompt;