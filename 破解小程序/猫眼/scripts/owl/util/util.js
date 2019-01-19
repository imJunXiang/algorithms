function serialize(e) {
    var n = [];
    for (var r in e) e.hasOwnProperty(r) && n.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
    return n.join("&");
}

function requestQueue(e) {
    if (e && task.push(e), task.length > 1 && e) ; else {
        var n = task[0], r = n.complete;
        n.complete = function(e) {
            task.shift(), task.length && requestQueue(), r && r.call(this, e);
        }, wx.request(n);
    }
}

function rnd() {
    return 65535 * Math.random();
}

function rndSeed() {
    return Math.ceil(rnd()).toString(16);
}

function MSID() {
    var e = [], n = new Date().getTime();
    return e.push(n.toString(16)), e.push(rndSeed()), e.push(rndSeed()), e.push(rndSeed()), 
    e.join("-");
}

function getReportVersions(e) {
    var n = e.wxAppVersion, r = void 0 === n ? "Unknown" : n, t = e.version, o = t.wxVersion, i = void 0 === o ? "Unknown" : o, s = t.wxLibVersion;
    return serialize({
        wxVersion: i,
        wxLibVersion: void 0 === s ? "Unknown" : s,
        wxAppVersion: r
    });
}

function stringify(e, n) {
    if (!n) return e;
    var r = [];
    for (var t in n) n.hasOwnProperty(t) && r.push(t + "=" + n[t]);
    return ~e.indexOf("?") ? e + "&" + r.join("&") : e + "?" + r.join("&");
}

function extend(e, n) {
    var r = {}, t = void 0;
    for (t in e) r[t] = e[t];
    for (t in n) n.hasOwnProperty(t) && void 0 !== n[t] && (r[t] = n[t]);
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.serialize = serialize, exports.requestQueue = requestQueue, exports.rnd = rnd, 
exports.rndSeed = rndSeed, exports.MSID = MSID, exports.getReportVersions = getReportVersions, 
exports.stringify = stringify, exports.extend = extend;

var task = [];