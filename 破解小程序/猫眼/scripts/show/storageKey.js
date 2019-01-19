Object.defineProperty(exports, "__esModule", {
    value: !0
});

var SHOW_STORE_PREFIX = "myshow_project_", storeKeys = {
    salesWay: "salesWay",
    isBVersion: "isBVersion",
    linaConfigKey: "lina_config_data"
};

exports.default = Object.keys(storeKeys).reduce(function(e, s) {
    return e[s] = "" + SHOW_STORE_PREFIX + storeKeys[s], e;
}, {});