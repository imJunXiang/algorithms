function latlngEqual(t, i) {
    return t = Number(t).toFixed(decimal), i = Number(i).toFixed(decimal), t === i;
}

var event = require("../scripts/event"), promisify = require("../scripts/promisify"), request = require("../scripts/request"), locationUtil = require("../scripts/location"), location = {
    _data: {},
    get: function() {
        return this._data;
    },
    fetch: function(t) {
        var i = this;
        return this._locate(t).then(function(t) {
            return i._locationCity(t);
        }, function() {
            return i._locationCity();
        }).then(function(t) {
            return i._changeLocation(t), i._changeLocationCity(t), i._changeLocationDistrict(t), 
            t;
        }).catch(function(t) {
            throw i.emit("error", t), t;
        });
    },
    _locate: function(t) {
        var i = this;
        return new Date() - (this.lastLocationTime || 0) < 5e3 ? this.locationPromise : this._data.latitude && !t ? Promise.resolve(this._data) : (this.lastLocationTime = +new Date(), 
        this.locationPromise = promisify.wx2promise(wx.getLocation, {
            type: "gcj02"
        }).then(function(t) {
            var a = t.latitude, e = t.longitude;
            return i.emit("geo-location", {
                latitude: a,
                longitude: e
            }), {
                latitude: a,
                longitude: e
            };
        }), this.locationPromise);
    },
    _locationCityCache: {},
    _locationCity: function(t) {
        var i = this, a = t || {}, e = a.latitude, o = a.longitude;
        if (e && o) {
            var n = [ e, o ].join("-");
            if (this._locationCityCache[n]) return Promise.resolve(this._locationCityCache[n]);
        }
        return request().get("/city/locatecity").query({
            latitude: e,
            longitude: o
        }).end().then(function(t) {
            var a = t.body, n = a.data, c = a.error;
            if (c) {
                var r = new Error(c.message);
                throw r.code = c.code, r;
            }
            if (n && n.lat && n.lng) {
                e && o || (i.emit("notAllowGetLocation"), e = n.lat, o = n.lng);
                var s = [ e, o ].join("-");
                return i._locationCityCache[s] = {
                    latitude: e,
                    longitude: o,
                    locationCity: {
                        id: n.id,
                        nm: n.openCityName
                    },
                    address: "" + n.district + n.detail,
                    locationDistrict: {
                        province: n.province,
                        city: n.city,
                        district: n.district
                    }
                }, i._locationCityCache[s];
            }
            throw {
                message: "定位失败",
                code: 400
            };
        });
    },
    _changeLocation: function(t) {
        var i = t.latitude, a = t.longitude, e = this._data;
        latlngEqual(e.latitude, i) && latlngEqual(e.longitude, a) || this.emit("locationChange", t), 
        this._data = Object.assign(this._data, {
            latitude: i,
            longitude: a
        });
    },
    _changeLocationCity: function(t) {
        var i = t.locationCity, a = t.address, e = this._data.locationCity;
        this._data = Object.assign(this._data, {
            locationCity: i,
            address: a
        }), e && e.id === i.id || this.emit("locationCityChange", i, e);
    },
    _changeLocationDistrict: function(t) {
        var i = t.locationDistrict;
        this._data = Object.assign(this._data, {
            locationDistrict: i
        });
    },
    changeCity: function(t) {
        var i = this._data.city;
        this._data = Object.assign(this._data, {
            city: t
        }), i && i.id === t.id || this.emit("cityChange", t, i);
    },
    changeCityByName: function(t) {
        function i(t, i) {
            var a = new Error(i);
            return a.code = t, a;
        }
        var a = this;
        return locationUtil.getCitysFromCache().then(function(e) {
            var o = e.nameMap, n = o[t];
            if (n && n.id) return a.changeCity(n), n;
            throw i(1, "city not found");
        });
    }
}, decimal = 4;

event.attach(location), module.exports = location;