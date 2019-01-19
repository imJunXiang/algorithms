var DURATION = 86400, KEY = "open-platform";

module.exports = function(e) {
    function r(r) {
        var t = r.merCode, n = r.merUser, o = r.merCodeSub;
        e.set(KEY, {
            merCode: t,
            merUser: n,
            merCodeSub: o
        }, DURATION);
    }
    function t() {
        var r = e.get(KEY) || {}, t = r.merCode, n = r.merUser, o = r.merCodeSub;
        return t ? {
            extChannelId: t,
            extUserId: n,
            extSubChannel: o
        } : null;
    }
    return {
        save: r,
        get: t
    };
};