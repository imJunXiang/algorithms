Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, t) {
    if (e && t && !(Math.random() > RATE)) {
        var r = {
            v: 1,
            rate: RATE,
            project: e,
            version: "v_" + _index.VERSION,
            pageurl: encodeURIComponent("app"),
            count: 1
        }, i = t.cfgManager.url + "/api/version";
        i = (0, _util.stringify)(i, r), setTimeout(function() {
            (0, _util.requestQueue)({
                method: "GET",
                url: i
            });
        }, 1500);
    }
};

var _util = require("./util/util"), _index = require("./constant/index"), RATE = .01;