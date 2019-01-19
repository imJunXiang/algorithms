function merge(e, n) {
    var t = {};
    Object.assign(t, e);
    for (var r in n) t[r] && t[r].constructor === Object && n[r] && n[r].constructor === Object ? t[r] = merge(t[r], n[r]) : t[r] = n[r];
    return t;
}

function getPropertyByEnv(e) {
    switch (getEnv()) {
      case "develpment":
        return devConfig[e];

      case "test":
        return testConfig[e];

      case "staging":
        return stagingConfig[e];

      case "prod":
      default:
        return prodConfig[e];
    }
}

function getEnv() {
    return debug ? env : "prod";
}

function setEnv(e) {
    env = e, debug && coll && (_id ? coll.doc(_id).set({
        data: {
            env: env
        }
    }) : coll.add({
        data: {
            env: env
        }
    }).then(function(e) {
        _id = e._id;
    }));
}

var _extends = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    }
    return e;
}, cloud = require("./cloud"), apiConfig = require("./api-config"), def = require("../env-config/default"), dev = require("../env-config/develpment"), test = require("../env-config/test"), staging = require("../env-config/staging"), prod = require("../env-config/production"), debug = !1, env = apiConfig.getApiEnv() || "prod", _id = "", coll = void 0;

debug && (coll = cloud.db.collection("env"), coll.get().then(function(e) {
    var n = e.data[0];
    n && n.env && (env = n.env, _id = n._id), apiConfig.setApiEnv(env);
}));

var devConfig = merge(def, dev), testConfig = merge(def, test), stagingConfig = merge(def, staging), prodConfig = merge(def, prod);

module.exports = debug ? {
    get host() {
        return getPropertyByEnv("host");
    },
    get proxyhost() {
        return getPropertyByEnv("proxyhost");
    },
    getEnv: getEnv,
    setEnv: setEnv
} : _extends({}, prodConfig, {
    getEnv: getEnv,
    setEnv: function() {}
});