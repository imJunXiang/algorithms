function queryPapay() {
    return app.request().get("/proxy/wxpapay/query").header({
        "x-host": "http://trade.pay.vip.sankuai.com"
    }).query({
        userId: app.$user.userId
    }).end().then(function(e) {
        return e.body;
    });
}

function handlePapay(e, a, r) {
    var t = JSON.parse(e);
    return t.success ? this.toast("免密支付成功", 1500, a) : (this.stats("b_xun65q4w"), this.toast(t.errorType.msg, 1500, r));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.queryPapay = queryPapay, exports.handlePapay = handlePapay;

var app = getApp();