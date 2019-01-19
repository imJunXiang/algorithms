function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _storageKey = require("./storageKey"), _storageKey2 = _interopRequireDefault(_storageKey), LINA_CONFIG_URL = "https://lina.dianping.com/api/get?key=maoyansh-show-config", app = getApp();

exports.default = function(e) {
    var t = app.get(_storageKey2.default.linaConfigKey);
    return t ? Promise.resolve(t) : app.request().get(LINA_CONFIG_URL).end().then(function(e) {
        var t = e.body, r = t.code, a = t.data;
        if (200 !== r || !a || !a.value) throw new Error("Lina接口出错！");
        return app.set(_storageKey2.default.linaConfigKey, a.value, {
            expires: 3e5
        }), a.value;
    });
};