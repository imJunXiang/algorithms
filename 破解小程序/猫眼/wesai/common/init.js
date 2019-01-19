Object.defineProperty(exports, "__esModule", {
    value: !0
});

var jsonToQuery = function(e) {
    var r = [];
    for (var n in e) "env" != n && r.push(n + "=" + e[n]);
    return r.join("&");
}, getQueryString = function(e) {
    if (!e.url) throw new Error("need redirect url");
    return e.url = encodeURIComponent(e.url), e.failureUrl && (e.failureUrl = encodeURIComponent(e.failureUrl)), 
    e.showInfo && (e.showInfo = encodeURIComponent(e.showInfo)), jsonToQuery(e);
}, WSSDK = {
    getUrl: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return "http" + (e ? "" : "s") + "://ticket." + e + (e ? "." : "") + "wesai.com/wechat/";
    },
    pay: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
            env: "",
            appId: "",
            businessOrderNo: "",
            chanId: "",
            appSecret: "",
            moneyBaseFen: 0,
            showInfo: "",
            url: "",
            failureUrl: "",
            orderSrc: "",
            encrypt: ""
        }, r = this.getUrl(e.env) + "payment?";
        if (e.encrypt, !e.appId) throw new Error("appId is required!");
        if (!e.businessOrderNo) throw new Error("businessOrderNo is required");
        return r + getQueryString(e);
    }
};

exports.default = WSSDK;