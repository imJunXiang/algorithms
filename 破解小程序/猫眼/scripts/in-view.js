var app = getApp(), isInView = function(e, t) {
    var i = wx.createSelectorQuery();
    i.select(e).boundingClientRect(), i.exec(function(e) {
        var i = e[0], n = i.top, o = i.left, c = i.height, p = i.width, r = app.system(), s = n >= 0 - c && o >= 0 - p && n <= r.windowHeight && o <= r.windowWidth;
        t && t(s);
    });
};

module.exports = isInView;