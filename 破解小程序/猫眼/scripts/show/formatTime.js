module.exports = function(e) {
    var t = new Date(1e3 * e), r = t.getFullYear(), a = t.getMonth() + 1;
    a = a < 10 ? "0" + a : a;
    var n = t.getDate();
    n = n < 10 ? "0" + n : n;
    var u = t.getHours();
    u = u < 10 ? "0" + u : u;
    var g = t.getMinutes(), o = t.getSeconds();
    return g = g < 10 ? "0" + g : g, o = o < 10 ? "0" + o : o, r + "年" + a + "月" + n + "日 " + u + ":" + g;
};