function getUrlParamByName(e, a) {
    e = e.replace(/[[]]/g, "\\$&");
    var t = new RegExp("[?&(//)]" + e + "(=([^&#]*)|&|#|$)"), i = t.exec(a);
    return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null;
}

var _activityTag = require("./activityTag"), activity = /(op|i)\.meituan\.com/, isQuery = /[?&]\w+/, isUrl = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/, isDetail = /show-detail/, needPreLogin = /[?&]pre_login/, wxappProtocol = /^wxapp:\/\//, canJump2MiniProgram = wx.canIUse("navigateToMiniProgram");

module.exports = function(e) {
    var a = void 0;
    if ("[object String]" === toString.call(e)) a = e; else {
        var t = e.currentTarget, i = t.dataset, r = i.webView, o = r.link, n = r.adTitle, l = r.adSubTitle, g = i.activitySetTag, p = void 0;
        if (p = o && o.replace(/^https?/, "https"), a = p, activity.test(p) && !wxappProtocol.test(p)) {
            var s = p + (isQuery.test(p) ? "&" : "?") + "_from=miniProgram_movieshow&adTitle=" + n + "&adSubTitle=" + l;
            a = "/pages/showsubs/webview/webview?url=" + encodeURIComponent(s);
        } else if (isUrl.test(p) && isDetail.test(p)) {
            var c = getUrlParamByName("data", p);
            c = c || getUrlParamByName("id", p), a = "/pages/show/detail/index?id=" + c;
        } else if (p && p.startsWith("http")) {
            var m = (p + "&_from=miniProgram_movieshow&adTitle=" + n + "&adSubTitle=" + l).replace(/[&?]{1,2}/, "?");
            a = "/pages/showsubs/webview/webview?url=" + encodeURIComponent(m);
        }
        var v = g || getUrlParamByName(_activityTag.activityTag.STATS_TAG, p) || getUrlParamByName(_activityTag.activityTag.FROM_TAG, p);
        v && (a = a + "&" + _activityTag.activityTag.STATS_TAG + "=" + v);
    }
    if (!a) return console.error("[链接错误]:链接为空或非法链接");
    if (wxappProtocol.test(a)) {
        var w = getUrlParamByName("appId", a), u = getUrlParamByName("path", a);
        if (w && u) return canJump2MiniProgram && wx.navigateToMiniProgram({
            appId: w,
            path: u.replace(/^\//, "")
        });
        var T = a.replace(wxappProtocol, "/");
        if (/^\/pages\//.test(T)) return wx.navigateTo({
            url: T
        });
    }
    var d = decodeURIComponent(a);
    if (needPreLogin.test(d)) return getApp().login().then(function(e) {
        wx.navigateTo({
            url: a
        });
    });
    wx.navigateTo({
        url: a
    });
};