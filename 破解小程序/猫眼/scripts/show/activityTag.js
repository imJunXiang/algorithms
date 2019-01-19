function storage(t, e, o) {
    if (void 0 === e || "function" == typeof e) {
        var _ = e;
        return e = wx.getStorageSync(t), e && e.__v && (e = e.expires < +new Date() ? "" : e.__v), 
        "" === e && _ && (o = _.length ? {} : null, void 0 !== (e = _(o)) && storage(t, e, o)), 
        e;
    }
    o && (o.__v = e, e = o), wx.setStorageSync(t, e);
}

module.exports = {
    activityTag: {
        FROM_TAG: "fromTag",
        STATS_TAG: "utm_content",
        GOLD_EMPLACEMENT: "myyc_gold",
        HOT_SHOP_LIST: "myyc_hotshop",
        STATS_TAG_REGX: /utm_content/,
        FROM_TAG_REGX: /fromTag/
    },
    refreshActivityTag: function(t, e) {
        var o = storage("stats_utm");
        o && (Object.keys(o).forEach(function(_) {
            _ !== t || e || delete o[_], _ === t && e && (o[_] = e);
        }), storage("stats_utm", o));
    }
};