module.exports = function(t, o, r) {
    function n() {}
    var c = void 0;
    return o = o || {}, r = r || {}, c = o.hasOwnProperty("constructor") && "function" == typeof o.constructor ? o.constructor : function() {
        for (var o = arguments.length, r = Array(o), n = 0; n < o; n++) r[n] = arguments[n];
        t.apply.apply(t, [ this ].concat(r));
    }, Object.assign(c, t, r), n.prototype = t.prototype, c.prototype = new n(), Object.assign(c.prototype, o), 
    c.prototype.constructor = c, c;
};