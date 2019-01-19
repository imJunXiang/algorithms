function formatShows(e, t, r) {
    return e.map(function(e) {
        return e.posterUrl && (e.posterUrl = app.img(e.posterUrl, 128, 180)), e.pageUrl = "/pages/show/detail/index?id=" + e.id + (r ? "&utm_source=" + r : ""), 
        e.cityshop = (e.cityName ? e.cityName + " | " : "") + e.shopName, e.cityshop = formatKey(e.cityshop, t), 
        e.name = formatKey(e.name, t), e.shopName = formatKey(e.shopName, t), e.showTimeDesc = formatKey(e.showTimeDesc, t), 
        e;
    });
}

function formatKey(e, t) {
    if (!e) return [];
    var r = e.replace(new RegExp(t, "g"), "<text>" + t + "<text>");
    return r = r.replace(new RegExp(" ", "g"), "&ensp;"), r.split("<text>").filter(function(e) {
        return !!e;
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatShows = formatShows, exports.formatKey = formatKey;

var app = getApp();