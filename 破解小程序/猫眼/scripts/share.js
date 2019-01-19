function share(s) {
    var t = this, e = s.bonusId, o = s.bonusCode, a = s.title, n = s.totalStats, r = s.groupStats, u = s.PROD, c = s.imageUrl, i = encodeURIComponent(a), h = "pages/bonus/result?from=friend&bonusId=" + e + "&bonusCode=" + o + "&title=" + i;
    return c = c || "http://p0.meituan.net/mmdb/52250e1d71c47f75b789b956383550c8104382.png", 
    {
        title: a,
        path: h,
        success: function(s) {
            statsShareInfo.call(t, {
                successInfo: s,
                totalStats: n,
                groupStats: r
            }), postShareInfo.call(t, {
                bonusId: e,
                bonusCode: o,
                PROD: u
            });
        },
        imageUrl: c
    };
}

function statsShareInfo(s) {
    var t = s.successInfo, e = s.totalStats, o = s.groupStats;
    this.stats(e), t.shareTickets && t.shareTickets instanceof Array && t.shareTickets.length > 0 && this.stats(o);
}

function postShareInfo(s) {
    var t = s.bonusId, e = s.bonusCode, o = getApp(), a = o.$user.wxUserInfo.userInfo;
    o.request().post("/proxy/market/share/bonus/share.json").header({
        token: o.$user && o.$user.token,
        "x-host": "http://maoyanapi.vip.sankuai.com"
    }).send({
        bonusId: t,
        bonusCode: e,
        nickName: a.nickName,
        avatarUrl: a.avatarUrl,
        channelId: o.channelId
    }).end().then(function(s) {
        s.body && s.body.success && console.log("shareInfo push success!");
    });
}

var stats = require("./stats"), app = getApp();

module.exports = share;