Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    var e = getApp();
    return t.methods.onTapNavi = function(t) {
        var e = getApp(), o = t.currentTarget.dataset.url;
        e.goto(o);
    }, t.methods.nullButBindStats = function() {}, e.stats(t.methods), new Component(createComponent(t));
};

var noop = function() {}, globalMethods = {
    toast: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1500, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : noop;
        wx.showToast({
            title: t,
            duration: e,
            complete: o,
            icon: "none"
        });
    }
}, mixMethods = function(t, e) {
    var o = Object.assign({}, e);
    return Object.keys(t).filter(function(t) {
        return void 0 === o[t];
    }).map(function(e) {
        o[e] = t[e];
    }), o;
}, createComponent = function(t) {
    return t.methods = mixMethods(globalMethods, t.methods), t;
};