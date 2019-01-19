module.exports = function(o, r) {
    Object.keys(r).forEach(function(t) {
        if (o[t]) throw Error("key：" + t + "重复");
        o[t] = r[t];
    });
};