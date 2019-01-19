var META_DATA = "_";

module.exports = {
    get: function(e) {
        var t = this;
        if (e) {
            var r = wx.getStorageSync(e);
            if (r && r.expires) {
                if (r.timestamp + 1e3 * r.expires < new Date()) return this.remove(e), "";
                r = r.value;
            }
            return r;
        }
        return ((wx.getStorageSync(META_DATA) || {}).keys || []).reduce(function(e, r) {
            return e[r] = t.get(r), e;
        }, {});
    },
    set: function(e, t, r) {
        var n = r && r.expires, s = wx.getStorageSync(META_DATA) || {};
        if (s.keys = s.keys || [], null === e) wx.clearStorage(), s.keys = []; else {
            if (!e) return console.error("storage", "invalid key " + e), this;
            -1 === s.keys.indexOf(e) && s.keys.push(e), n && (t = {
                value: t,
                expires: n,
                timestamp: +new Date()
            }), wx.setStorageSync(e, t);
        }
        return s.timestamp = +new Date(), wx.setStorageSync(META_DATA, s), this;
    },
    update: function(e, t) {
        var r = wx.getStorageSync(e);
        return r.expires ? r.value = t : r = t, wx.setStorageSync(e, r), this;
    },
    remove: function(e) {
        var t = wx.getStorageSync(META_DATA);
        t = t || {}, t.keys = t.keys || [];
        var r = t.keys.indexOf(e);
        -1 !== r && t.keys.splice(r, 1), wx.setStorageSync(META_DATA, t), wx.removeStorageSync && wx.removeStorageSync(e);
    },
    clearOutdate: function() {
        var e = this;
        wx.getStorageInfo({
            success: function(t) {
                var r = t.keys;
                Array.isArray(r) && r.forEach(function(t) {
                    e.get(t);
                });
            }
        });
    }
};