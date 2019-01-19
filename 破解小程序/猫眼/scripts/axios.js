function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function formatNumber(e) {
    return e = e.toString(), e[1] ? e : "0" + e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTime = exports.sevenDayDomain = exports.domain = exports.post = exports.get = void 0;

var _sevenDay = require("../constant/seven-day"), _sevenDay2 = _interopRequireDefault(_sevenDay), app = getApp(), domain = "https://m.maoyan.com", sevenDayDomain = _sevenDay2.default.DOMAIN, get = function(e) {
    return new Promise(function(t, n) {
        app.request().header({
            token: app.$user.token
        }).get(domain + e).end().then(function(e) {
            t(e);
        }).catch(function(e) {
            n(e);
        });
    });
}, post = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return new Promise(function(n, o) {
        app.request().post(domain + e).header({
            token: app.$user.token
        }).send(t).end().then(function(e) {
            n(e);
        }).catch(function(e) {
            o(e);
        });
    });
}, formatTime = function(e, t) {
    var n = [ "Y", "M", "D", "h", "m", "s" ], o = [], r = new Date(e);
    o.push(r.getFullYear()), o.push(formatNumber(r.getMonth() + 1)), o.push(formatNumber(r.getDate())), 
    o.push(formatNumber(r.getHours())), o.push(formatNumber(r.getMinutes())), o.push(formatNumber(r.getSeconds()));
    for (var a in o) t = t.replace(n[a], o[a]);
    return t;
};

exports.get = get, exports.post = post, exports.domain = domain, exports.sevenDayDomain = sevenDayDomain, 
exports.formatTime = formatTime;