function padStart(t, e, r) {
    var n = String(t);
    return !n || n.length >= e ? t : "" + Array(e + 1 - n.length).join(r) + t;
}

module.exports = {
    promisify: function(t, e) {
        return new Promise(function(r, n) {
            t({
                options: e,
                success: function(t) {
                    r(t);
                },
                fail: function(t) {
                    n(t);
                }
            });
        });
    },
    safeGet: function(t, e, r) {
        var n = e.replace(/\[([^\[\]]*)\]/g, ".$1.").split(".").filter(function(t) {
            return "" !== t;
        }).reduce(function(t, e) {
            return t && t[e];
        }, t);
        return void 0 === n ? r : n;
    },
    formatDate: function(t, e) {
        var r = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, n = new Date(t);
        return e.replace(r, function(t) {
            switch (t) {
              case "YY":
                return n.getFullYear().slice(-2);

              case "YYYY":
                return n.getFullYear();

              case "MM":
                return padStart(n.getMonth() + 1, 2, "0");

              case "DD":
                return padStart(n.getDate(), 2, "0");

              case "HH":
                return padStart(n.getHours(), 2, "0");

              case "mm":
                return padStart(n.getMinutes(), 2, "0");

              default:
                return n;
            }
        });
    },
    padStart: padStart
};