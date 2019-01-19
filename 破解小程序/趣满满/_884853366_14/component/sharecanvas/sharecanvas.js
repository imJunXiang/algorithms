var t = require("../../utils/tools.js");

Component({
    properties: {
        movie_name: String,
        movie_pic: String,
        group_price: String,
        price: String,
        font_color: String
    },
    data: {
        canvasWidth: 360,
        canvasHeight: 288
    },
    ready: function() {
        var t = this, e = this.data, i = e.canvasWidth, n = e.canvasHeight, a = e.movie_name, o = e.movie_pic;
        this.createImgResource(o).then(function(e) {
            var o = wx.createCanvasContext("shareCard", t);
            o.drawImage("/images/sharebg.png", 0, 0, i, n), o.save(), o.drawImage(e, 70, 72, 78, 112), 
            o.restore(), t.storkeText(a, o), o.draw(!0, setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "shareCard",
                    quality: 1,
                    success: function(e) {
                        try {
                            t.triggerEvent("draw", {
                                path: e.tempFilePath
                            });
                        } catch (t) {}
                    },
                    fail: function(t) {
                        try {
                            this.triggerEvent("draw", {
                                path: "error"
                            });
                        } catch (t) {}
                    },
                    complete: function(t) {}
                }, t);
            }, 500));
        });
    },
    detached: function(t) {
        console.log("移除============");
    },
    methods: {
        roundRect: function(t, e, i, n, a, o) {
            t.beginPath(), t.setFillStyle("transparent"), t.arc(e + o, i + o, o, Math.PI, 1.5 * Math.PI), 
            t.moveTo(e + o, i), t.lineTo(e + n - o, i), t.lineTo(e + n, i + o), t.arc(e + n - o, i + o, o, 1.5 * Math.PI, 2 * Math.PI), 
            t.lineTo(e + n, i + a - o), t.lineTo(e + n - o, i + a), t.arc(e + n - o, i + a - o, o, 0, .5 * Math.PI), 
            t.lineTo(e + o, i + a), t.lineTo(e, i + a - o), t.arc(e + o, i + a - o, o, .5 * Math.PI, Math.PI), 
            t.lineTo(e, i + o), t.lineTo(e + o, i), t.closePath(), t.fill(), t.save(), t.clip();
        },
        createImgResource: function(e) {
            return new Promise(function(i, n) {
                (0, t._post)("v1/groupActivity/getMoviePlayBill", {
                    img_url: e
                }, "获取趣满满图片地址", !1).then(function(t) {
                    return t.result.url;
                }).then(function(t) {
                    wx.downloadFile({
                        url: t,
                        complete: function(t) {
                            t.errMsg.indexOf("ok") > -1 ? i(t.tempFilePath) : n("图片加载失败");
                        }
                    });
                });
            });
        },
        storkeText: function(t, e) {
            var i = this.data.group_price, n = this.data.price, a = this.data.font_color, o = t.split("");
            o.length > 15 && o.splice(15, o.length, "..."), e.setFontSize(16), e.setFillStyle("#000");
            var r = null, l = 93, s = 0;
            o.forEach(function(t, i) {
                i > 7 ? (r = 157 + 16 * s, l = 116, s++) : r = 157 + 16 * i, e.fillText(t, r, l);
            }), e.setFontSize(18), e.setFillStyle(a), e.fillText("拼团价￥" + i, 157, 150), e.setFontSize(14), 
            e.setFillStyle("#838383"), e.fillText("原价￥" + n, 157, 175), e.beginPath(), e.setLineWidth(1), 
            e.setStrokeStyle("#838383"), e.moveTo(157, 170), e.lineTo(157 + e.measureText("原价￥" + n).width, 170), 
            e.stroke();
        }
    }
});