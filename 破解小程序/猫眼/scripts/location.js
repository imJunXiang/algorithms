function toPromise(t) {
    var e = this;
    return new Promise(function(i, n) {
        t.call(e, function(t, e) {
            if (t) return n(t);
            i(e);
        });
    });
}

function wxToPromise(t) {
    var e = this;
    return new Promise(function(i, n) {
        t.call(e, {
            success: function(t) {
                i(t);
            },
            fail: function(t) {
                n(t);
            },
            complete: function(t) {
                "getLocation:cancel" === t.errMsg && n(Error(t.errMsg));
            }
        });
    });
}

var historyCityListKey = "historyCityList", hotCityList = [ "上海", "北京", "广州", "深圳", "武汉", "天津", "西安", "南京", "杭州", "成都", "重庆" ], locationUtil = {
    getLocation: function(t) {
        var e = getApp();
        return new Date() - (this.lastLocationTime || 0) < 5e3 ? this.locationPromise : e.$location.latitude && !t ? Promise.resolve(e.$location) : e.page().locationDisabled ? Promise.reject(Error("locate forbidden")) : (this.lastLocationTime = +new Date(), 
        this.locationPromise = wxToPromise(wx.getLocation, {
            type: "gcj02"
        }).then(function(t) {
            return e.$location.latitude = t.latitude, e.$location.longitude = t.longitude, e.$location.speed = t.speed, 
            e.$location.accuracy = t.accuracy, e.$location;
        }).catch(function(t) {
            throw delete e.$location.latitude, delete e.$location.longitude, delete e.$location.speed, 
            delete e.$location.accuracy, delete e.$location.locationCity, console.log("location e", t), 
            "getLocation:fail auth deny" === t.errMsg && e.set("location-auth-deny", 1, 43200), 
            t;
        }), this.locationPromise);
    },
    getCitys: function() {
        var t = getApp();
        return t.request().get("/hostproxy/dianying/cities.json").header({
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).end().then(function(e) {
            var i = e.body.cts;
            if (i.length < 500) throw new Error("cities length less than 500");
            t.$debug || (i = i.filter(function(t) {
                return 8e3 !== t.id;
            })), t.$debug && !i.filter(function(t) {
                return 8e3 === t.id;
            }).length && i.push({
                id: 8e3,
                nm: "冥王星",
                py: "mingwangxin"
            });
            for (var n = {}, o = {}, r = {}, a = 65; a <= 90; a++) r[String.fromCharCode(a)] = [];
            for (var c = 0, s = i.length; c < s; c++) {
                var l = i[c];
                n[l.nm] = l, o[l.id] = l, r[l.py[0].toUpperCase()].push(l);
            }
            return Object.keys(r).forEach(function(t) {
                r[t].length || delete r[t];
            }), {
                nameMap: n,
                idMap: o,
                letterMap: r
            };
        });
    },
    getCitysFromCache: function() {
        var t = void 0;
        return function() {
            var e = getApp();
            if (t) return t;
            var i = e.get("citys");
            return i && Object.keys(i.nameMap).length > 500 ? Promise.resolve(i) : t = this.getCitys().then(function(i) {
                return t = null, e.set("citys", i, {
                    expires: 600
                }), i;
            }).catch(function(e) {
                throw t = null, e;
            });
        };
    }(),
    getHotCitys: function() {
        return this.getCitysFromCache().then(function(t) {
            var e = t.nameMap;
            return hotCityList.map(function(t) {
                return e[t];
            });
        });
    },
    addCitys: function(t) {
        var e = getApp();
        if (t.id) {
            t.id = Number(t.id);
            var i = e.get(historyCityListKey) || [];
            return i = i.filter(function(e) {
                return e.id !== t.id;
            }), i.unshift(t), i = i.slice(0, 2), e.set(historyCityListKey, i), i;
        }
    }
};

module.exports = locationUtil;