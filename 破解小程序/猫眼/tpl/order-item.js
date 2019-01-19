function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var Tpl = require("../scripts/tpl"), app = getApp();

module.exports = Tpl.extends({
    key: "orderItem",
    data: {},
    bindEvent: function() {
        this.page.onTapDetail = this.onTapDetail.bind(this), this.page.onErrorImage = this.onErrorImage;
    },
    onTapDetail: function(e) {
        var t = e.currentTarget.dataset, a = t.vorderId, r = t.gotoDetail, i = t.bidData, o = t.orderId, d = void 0 === o ? {} : o;
        i && this.page.stats(i);
        var n = d.skuId, p = void 0 === n ? "" : n, s = d.parentId, l = void 0 === s ? "" : s, u = d.skuType, g = void 0 === u ? "" : u, v = p;
        1 == g && (v = l);
        var c = "";
        "gotoOrderDetail" === r ? (c = "/pages/vmall/vorder/order-detail?vorderId=" + a, 
        app.goto(c)) : "gotoProductDetail" === r && (c = "/pages/vmall/product-detail?dealId=" + v, 
        app.goto(c));
    },
    onErrorImage: function(e) {
        var t = this.data.faultImage, a = e.target.dataset.imageIndex, r = a.split("."), i = r[0], o = r.slice(-1)[0];
        r.slice(0, -1).reduce(function(e, t) {
            return e[t];
        }, this.data)[o] = t, this.setData(_defineProperty({}, i, this.data[i]));
    }
});