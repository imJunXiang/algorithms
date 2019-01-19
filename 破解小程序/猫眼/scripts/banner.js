function banner(e, n, t, a, r) {
    return app.request().get("/adverts").query({
        cityid: e,
        app: n,
        category: t,
        clienttp: r,
        uuid: "",
        devid: "",
        uid: a
    }).end().then(function(e) {
        var n = e.body.data;
        return n.forEach(function(e) {
            e.url = e.url.replace("wxapp://", "/");
        }), n;
    });
}

function bannerV2(e, n, t) {
    return app.request().get("https://ihotel.meituan.com/campaigns/v1/richman/hit").query({
        cityId: e,
        app: "pc",
        clienttp: "iBan",
        category: n,
        userid: t,
        biz: 8,
        uuid: app.$uuid,
        version: "v1",
        queryWord: ""
    }).end().then(function(e) {
        var n = e.body.data;
        return n.forEach(function(e) {
            e.url = e.url.replace("wxapp://", "/");
        }), n;
    });
}

function maoyanBanner(e, n, t) {
    var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, r = app.$systemInfo || {}, i = r.system, o = r.screenWidth, p = r.screenHeight, u = r.pixelRatio, c = r.model;
    p && (a.screenHeight = +(p * u).toFixed(0)), o && (a.screenWidth = +(o * u).toFixed(0));
    var d = i || "";
    return d = d.toLowerCase().match(/(android|ios)/), app.request().get("https://ad.maoyan.com/api/position/detail").header({
        "content-type": "application/json"
    }).query(_extends({
        ci: e,
        userId: t,
        positionIds: n,
        uuid: app.$uuid || void 0,
        channelId: app.channelId || 1,
        phoneModel: c || "unknown",
        os: d ? d[0] : "unknown",
        clientType: app.clientType
    }, a)).end().then(function(e) {
        var n = e.body.data[0].config;
        return n.forEach(function(e) {
            e.link && e.link.includes("wxapp://") && (e.link = e.link.replace("wxapp://", "/"));
        }), n;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
};

exports.banner = banner, exports.bannerV2 = bannerV2, exports.maoyanBanner = maoyanBanner;

var app = getApp();