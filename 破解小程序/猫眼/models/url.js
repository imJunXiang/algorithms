function getCurrentPageUrl() {
    var r = getCurrentPages();
    return r[r.length - 1].route;
}

function getCurrentPageUrlWithArgs() {
    var r = getCurrentPages(), e = r[r.length - 1], t = e.route, g = e.options, n = t + "?";
    for (var u in g) {
        n += u + "=" + g[u] + "&";
    }
    return n = n.substring(0, n.length - 1);
}

module.exports = {
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs
};