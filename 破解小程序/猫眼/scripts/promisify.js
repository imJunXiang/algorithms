module.exports = {
    wx2promise: function(e, s) {
        return s = s || {}, new Promise(function(i, n) {
            s.success = i, s.fail = n, e(s);
        });
    }
};