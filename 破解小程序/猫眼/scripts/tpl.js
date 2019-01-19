function Tpl() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = t.key, i = t.page;
    if (this.key = e || this.key, !this.key) throw Error("key不可为空");
    this.page = i || getCurrentPages().slice(-1)[0], this.bindEvent && this.bindEvent(), 
    event.attach(this), this.setData(this.data);
}

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
    }
    return t;
}, inherits = require("./inherits"), event = require("../scripts/event");

Tpl.prototype = {
    setData: function(t) {
        this.data = _extends({}, this.data, t);
        var e = {};
        e[this.key] = this.data, this.page.setData(e);
    }
}, Tpl.extends = function(t, e) {
    return inherits(Tpl, t, e);
}, Tpl.prototype.constructor = Tpl, module.exports = Tpl;