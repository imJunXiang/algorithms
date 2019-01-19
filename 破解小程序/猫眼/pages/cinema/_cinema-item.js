var app = getApp();

module.exports = {
    formatCinemas: function(a) {
        var t = app.$location;
        return a.map(function(a) {
            a.showPrice = +a.sellPrice;
            var i = parseFloat(a.distance);
            return !t.locationCity || t.city.id != t.locationCity.id || isNaN(i) ? a.resolvedDistance = "" : a.resolvedDistance = i < 1 ? 1e3 * i + "m" : i + "km", 
            a.tag && "满赠卡" === a.tag.vipTag && (a.tag.vipTag = ""), a.tag && "会员卡" === a.tag.vipTag && (a.tag.vipTag = "折扣卡"), 
            a.labels && a.labels.forEach(function(t) {
                "超级会员" === t.name && (a.tag.svip = "超级会员");
            }), a;
        });
    }
};