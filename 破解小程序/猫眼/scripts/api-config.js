var store = require("./store"), KEY = "apiEnv", _apiEnv = store.get(KEY) || "prod", transConfig = [ {
    match: function(i) {
        return i.url.indexOf("/mallpro/memberMall") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return i.url.indexOf("/merchandise/vcoin") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !1
}, {
    match: function(i) {
        return i.url.indexOf("/goods/queryDealById") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !1
}, {
    match: function(i) {
        return i.url.indexOf("smallProgram/silentLogin") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !1
}, {
    match: function(i) {
        return i.url.indexOf("/gprice/preOrder") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return i.url.indexOf("/merchandise/vtrade/submitVirtualOrder") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !1
}, {
    match: function(i) {
        return i.url.indexOf("/merchandise/vorder/service/vorder/list") > 0;
    },
    staging: "http://vorder.movie.st.sankuai.com",
    isPrefixApi: !1
}, {
    match: function(i) {
        return i.url.indexOf("/merchandise/vtrade/service/vorder/detail") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !1
}, {
    match: function(i) {
        return i.url.indexOf("/logistics/expressTracking") > 0;
    },
    staging: "http://logistics.merchandise.movie.vip.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return i.url.indexOf("monopoly") > 0;
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return i.url.indexOf("theMeg") > 0;
    },
    connect: "https://wx.fe.st.maoyan.com"
}, {
    match: function(i) {
        return i.url.indexOf("/citycard/client") > 0;
    },
    staging: "http://citycard.movie.st.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return 0 === i.url.indexOf("https://ad.maoyan.com");
    },
    staging: "http://ad.movie.test.sankuai.com"
}, {
    match: function(i) {
        return 0 === i.url.indexOf("https://api.maoyan.com");
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return "http://maoyanapi.vip.sankuai.com" === i.header["x-host"];
    },
    staging: "http://api.be.movie.st.sankuai.com",
    isPrefixApi: !0
}, {
    match: function(i) {
        return i.url.indexOf("/wxpapay/") > 0;
    },
    staging: "http://paytrade.movie.st.sankuai.com"
}, {
    match: function(i) {
        return i.url.indexOf("/media/activity/yearend") > 0;
    },
    transform: function(i) {
        i.url = i.url.replace("api.maoyan.com/media", "api.be.movie.st.sankuai.com/api/media");
    }
} ], apiConfig = module.exports = {
    getApiEnv: function() {
        return _apiEnv;
    },
    setApiEnv: function(i) {
        _apiEnv = i, store.set(KEY, i);
    },
    isProd: function() {
        return !getApp().$debug || "prod" === _apiEnv;
    },
    toggleEnv: function() {
        return "staging" === _apiEnv ? this.setApiEnv("prod") : this.setApiEnv("staging"), 
        _apiEnv;
    },
    prod2Staging: function(i) {
        for (var t = 0, a = transConfig.length; t < a; t++) {
            var n = transConfig[t];
            if (n.match(i)) {
                n.transform ? n.transform(i) : (n.staging && (0 === i.url.indexOf("https://") && (i.url = i.url.replace(/https:\/\/[^\/]*/, "/proxy")), 
                i.header["x-host"] = n.staging), n.isPrefixApi && (i.url = i.url.replace(/\/(host)?proxy\//, "$&api/")), 
                n.connect && (i.url = n.connect + i.url));
                break;
            }
        }
    },
    getApiUrl: function(i) {
        var t = {
            PrepayAPI: "http://prepay.movie.test.sankuai.com",
            DealAPI: "http://10.20.61.126:9014"
        }, a = {
            PrepayAPI: "http://prepay.movie.st.sankuai.com",
            DealAPI: "/hostproxy/api/trade",
            DealHost: "http://api.be.movie.st.sankuai.com"
        }, n = {
            PrepayAPI: "https://prepay-movie.maoyan.com",
            DealAPI: "/hostproxy/trade",
            DealHost: "http://maoyanapi.vip.sankuai.com"
        }, e = "prod";
        try {
            e = getApp().$debug ? apiConfig.getApiEnv() : "prod";
        } catch (i) {}
        return "prepay" === i ? "prod" === e ? n : "staging" === e ? a : t : "fission" === i ? "prod" === e ? "https://bonusapi-movie.maoyan.com" : "staging" === e ? "http://bonusapi.movie.st.sankuai.com" : "http://10.24.155.23:8080" : "cinema" === i ? "prod" === e ? "http://maoyanapi.vip.sankuai.com" : "http://api.be.movie.st.sankuai.com" : "prod" === e ? "https://api.maoyan.com" : "staging" === e ? "http://api.be.movie.st.sankuai.com/api" : "http://api.be.avatar.movie.test.sankuai.com/api";
    },
    getApiUrl_env: function(i) {
        return {
            test: "http://api.be.avatar.movie.test.sankuai.com/api/sns",
            staging: "http://api.be.movie.st.sankuai.com/api/sns",
            prod: "https://api.maoyan.com/sns"
        }[i];
    }
};