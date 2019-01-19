function _setCity(t, i, a) {
    i.data.city = t.city || t.locationCity || {}, "function" == typeof a && a.call(i);
}

var app = getApp();

module.exports = function(t, i) {
    var a = app.$location;
    t.data || (t.data = {}), a.city || a.locationCity ? _setCity(a, t, i) : app.models.location.fetch().then(function(a) {
        _setCity(a, t, i);
    });
};