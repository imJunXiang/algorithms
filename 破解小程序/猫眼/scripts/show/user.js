module.exports = function(e) {
    var c = {};
    return Object.keys(e).forEach(function(n) {
        "wxUserInfo" === n ? Object.keys(e[n]).forEach(function(o) {
            "userInfo" === o ? Object.keys(e[n][o]).forEach(function(t) {
                c[t] = e[n][o][t];
            }) : c[o] = e[n][o];
        }) : c[n] = e[n];
    }), c;
};