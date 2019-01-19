function search(t, a) {
    return a = a || 0, app.request().get("https://api.maoyan.com/mmdb/search/cinema/keyword/list.json").query({
        offset: a,
        keyword: t,
        ctid: app.$location.city.id,
        lng: app.$location.longitude,
        lat: app.$location.latitude
    }).end().then(function(t) {
        return t.body.data;
    }).then(function(t) {
        return t.map(format);
    });
}

function format(t) {
    var a = app.$location;
    return t.showPrice = +t.sellPrice, a.locationCity && a.city.id === a.locationCity.id ? parseFloat(t.distance) < 1 ? t.distance = 1e3 * parseFloat(t.distance) + "m" : t.distance = parseFloat(t.distance) + "km" : delete t.distance, 
    t.tag && "满赠卡" === t.tag.vipTag && (t.tag.vipTag = ""), t.tag && "会员卡" === t.tag.vipTag && (t.tag.vipTag = "折扣卡"), 
    t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.search = search, exports.format = format;

var app = getApp(), _ = app.require("scripts/movie");