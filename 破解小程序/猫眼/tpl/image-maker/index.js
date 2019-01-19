function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(i, a) {
                try {
                    var o = t[i](a), s = o.value;
                } catch (e) {
                    return void n(e);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(s);
            }
            return r("next");
        });
    };
}

var Tpl = require("../../scripts/tpl"), _require = require("../../scripts/config"), host = _require.host, app = getApp();

module.exports = Tpl.extends({
    key: "image-maker",
    data: {
        _showMakeImageCanvas: !1,
        _makeImageCanvasWidth: 0,
        _makeImageCanvasHeight: 0
    },
    isRemoteSrc: function(e) {
        return app.$systemInfo && "devtools" === app.$systemInfo.platform ? 0 === e.indexOf("http") && 0 !== e.indexOf("http://tmp/") : 0 === e.indexOf("http");
    },
    downloadImages: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return Promise.all(t.filter(function(t) {
            return 0 === t.src.indexOf("/images") && (t.src = host.bs + t.src), t.tmpSrc = t.src, 
            e.isRemoteSrc(t.src);
        }).map(function(e) {
            return app.downloadFile(e.src).then(function(t) {
                return e.tmpSrc = t, e;
            });
        }));
    },
    getImageSize: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return Promise.all(e.filter(function(e) {
            return !e.width || !e.height;
        }).map(function(e) {
            return app.wx2promiseify(wx.getImageInfo, {
                src: e.tmpSrc
            }).then(function(t) {
                return e.width = t.width, e.height = t.height, e;
            });
        }));
    },
    setTextAlign: function(e, t) {
        e.textAlign = t, e.setTextAlign(t);
    },
    makeImage: function(e) {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function n() {
            var r, i, a, o, s, c, f, h, u, l, m;
            return regeneratorRuntime.wrap(function(n) {
                for (;;) switch (n.prev = n.next) {
                  case 0:
                    if (r = e.width, i = void 0 === r ? 0 : r, a = e.height, o = void 0 === a ? 0 : a, 
                    s = e.bgColor, c = void 0 === s ? "#ffffff" : s, f = e.images, h = void 0 === f ? [] : f, 
                    u = e.words, l = void 0 === u ? [] : u, i && o && (h.length || l.length)) {
                        n.next = 3;
                        break;
                    }
                    return n.abrupt("return");

                  case 3:
                    return t.page.setData({
                        _showMakeImageCanvas: !0,
                        _makeImageCanvasWidth: i,
                        _makeImageCanvasHeight: o
                    }), m = wx.createCanvasContext("make-image-canvas"), n.next = 7, t.downloadImages(h);

                  case 7:
                    return n.next = 9, t.getImageSize(h);

                  case 9:
                    return m.rect(0, 0, i, o), m.setFillStyle(c), m.fill(), h.forEach(function(e) {
                        e.tmpSrc && (e.isCircle ? (m.save(), m.beginPath(), m.arc(e.left + e.width / 2, e.top + e.height / 2, e.width / 2 - 2, 0, 2 * Math.PI), 
                        m.closePath(), m.setStrokeStyle("#fff"), m.fillStyle = "#fff", m.stroke(), m.clip(), 
                        m.drawImage(e.tmpSrc, e.left, e.top, e.width, e.height), m.restore()) : m.drawImage(e.tmpSrc, e.left, e.top, e.width, e.height));
                    }), l.forEach(function(e) {
                        m.setTextBaseline("top"), m.font = (e.fontStyle || "normal") + " " + (e.fontWeight || "400") + " " + (e.size || 24) + "px " + (e.fontFamily || "auto"), 
                        m.setFontSize(e.size || 24), m.setFillStyle(e.color || "#000000"), t.setTextAlign(m, e.textAlign || "left"), 
                        m.fillText(e.words, e.left, e.top, e.maxWidth);
                    }), n.abrupt("return", new Promise(function(e) {
                        m.draw(!1, function() {
                            setTimeout(function() {
                                wx.canvasToTempFilePath({
                                    x: 0,
                                    y: 0,
                                    width: i,
                                    height: o,
                                    destWidth: i,
                                    destHeight: o,
                                    canvasId: "make-image-canvas",
                                    success: function(t) {
                                        console.log(t.tempFilePath), e(t.tempFilePath);
                                    }
                                });
                            }, 300);
                        });
                    }));

                  case 15:
                  case "end":
                    return n.stop();
                }
            }, n, t);
        }))();
    }
});