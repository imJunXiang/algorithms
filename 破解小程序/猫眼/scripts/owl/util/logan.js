var _env = require("../env"), Logan = void 0, enable = !1;

module.exports = {
    queue: [],
    ready: function() {
        var e = this, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = o.LoganAPI, a = o.project, g = o.loganConfig, l = g.enableShake;
        enable = !0;
        n ? (Logan = n, function() {
            if (l) {
                var o = g.appSources;
                Logan = Logan.config({
                    enableShake: l,
                    appSource: o
                });
            }
            for (Logan.log("[新小程序项目]：项目-> " + a + " 对应页面-> " + (0, _env.getPageUrl)()); e.queue.length; ) {
                var n = e.queue.shift();
                Logan.log(n);
            }
        }()) : console.log("当前暂不支持log");
    },
    log: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (enable) {
            Logan ? Logan.log(e, "owl") : this.queue.push(e);
        }
    }
};