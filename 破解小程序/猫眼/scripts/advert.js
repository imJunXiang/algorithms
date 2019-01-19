var _extends = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var p in t) Object.prototype.hasOwnProperty.call(t, p) && (e[p] = t[p]);
    }
    return e;
}, app = getApp(), advertHandler = {
    fetch: function(e, n) {
        var t = _extends({
            ci: app.getPropSafely("$location.city.id", app, 1),
            clientType: app.clientType,
            channelId: app.channelId || 1,
            version_name: "",
            userid: app.$user.userId,
            uuid: app.$uuid,
            phoneModel: app.$systemInfo ? app.$systemInfo.model : "unkown",
            os: app.$systemInfo && app.$systemInfo.system.split(" ")[0].toLocaleLowerCase() || "unknown"
        }, e);
        return app.request().get("https://ad.maoyan.com/api/position/detail").header({
            "content-type": "application/json"
        }).query(t).end().then(function(e) {
            var n = e.body.data[0].config;
            return n.forEach(function(e) {
                e.link && e.link.includes("wxapp://") && (e.link = e.link.replace("wxapp://", "/"));
            }), n;
        }).then(function(e) {
            "function" == typeof n && n(e && e.length ? e : []);
        });
    }
};

module.exports = advertHandler;