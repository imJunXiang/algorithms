function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r]);
    }
    return t;
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _createClass = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var r = e[a];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, a, r) {
        return a && t(e.prototype, a), r && t(e, r), e;
    };
}(), ShareImageBuilder = function() {
    function t(e, a) {
        _classCallCheck(this, t), this.options = a, this.page = e, this.canvas = a.canvasId, 
        this.ctx = wx.createCanvasContext(a.canvasId), this.formatImgsInfoArr = [], this.canDraw = !1, 
        this.canvasHeight = 1334, this.canvasWidth = 750, this.extraData = !1, this.preDrawContentArr = [], 
        this.renderElementLength = 0, this.drawComplate = !1, this.observeFun = null, this.drawComplateCount = -1, 
        this.setCanvasMeasure(this.canvasWidth, this.canvasHeight), this.initAllImageInfo(), 
        this.getAllImgInfo();
    }
    return _createClass(t, [ {
        key: "setCanvasMeasure",
        value: function(t, e) {
            this.page.setData({
                canvasHeight: e,
                canvasWidth: t
            });
        }
    }, {
        key: "setExtraData",
        value: function(t) {
            var e = this, a = function() {
                if (Array.isArray(t)) for (var a = 0, r = t.length; a < r; a++) !function(a, r) {
                    e.renderElementLength += 1, "text" === t[a].drawType || "rect" === t[a].drawType ? e.drawController(t[a]) : "image" === t[a].drawType && e.downloadPromise(t[a].url).then(function(r) {
                        t[a].path = r.tempFilePath, e.drawController(t[a]);
                    });
                }(a); else "object" === (void 0 === t ? "undefined" : _typeof(t)) ? e.drawController(t) : (e.extraData = !1, 
                console.error("数据格式不正确！"));
            };
            this.drawComplate ? a() : this.observeFun = a;
        }
    }, {
        key: "getTextWidth",
        value: function(t) {
            return this.ctx.measureText(t);
        }
    }, {
        key: "initAllImageInfo",
        value: function() {
            var t = this.options.imgArr, e = void 0 === t ? [] : t;
            e = this.sort(e);
            for (var a = 0, r = e.length; a < r; a++) this.formatImgsInfoArr.push(this.formatImageInfo(e[a]));
        }
    }, {
        key: "formatImageInfo",
        value: function(t) {
            var e = this;
            return new Promise(function(a, r) {
                e.downloadPromise(t.url).then(function(e) {
                    wx.getImageInfo({
                        src: e.tempFilePath,
                        success: function(e) {
                            a(_extends({}, t, e, {
                                height: t.height || e.height,
                                width: t.width || e.width
                            }));
                        },
                        fail: function(t) {
                            r(t);
                        }
                    });
                });
            });
        }
    }, {
        key: "getAllImgInfo",
        value: function() {
            var t = this;
            Promise.all(this.formatImgsInfoArr).then(function(e) {
                t.canDraw = !0, t.formatImgsInfoArr = e, t.initCanvas();
            }).catch(function(e) {
                t.page.toast("网络开小差了");
            });
        }
    }, {
        key: "initCanvas",
        value: function() {
            var t = this, e = this.options.useBgImage, a = e ? this.formatImgsInfoArr.pop() : this.options, r = a.path, n = a.height, i = void 0 === n ? 1334 : n, o = a.width, s = void 0 === o ? 750 : o;
            this.canvasHeight = i, this.canvasWidth = s, this.page.setData({
                canvasHeight: i,
                canvasWidth: s
            }, function() {
                e ? t.drawImage(r, 0, 0, s, i) : t.drawRect(0, 0, s, i), t.drawMainContent();
            });
        }
    }, {
        key: "drawMainContent",
        value: function() {
            var t = this, e = this.options, a = e.textArr, r = void 0 === a ? [] : a, n = e.rectArr, i = void 0 === n ? [] : n;
            this.preDrawContentArr = this.sort(this.formatImgsInfoArr.concat(r).concat(i), !0), 
            this.renderElementLength = this.preDrawContentArr.length;
            for (var o = 0, s = this.preDrawContentArr.length; o < s; o++) !function(e, a) {
                if (t.preDrawContentArr[e].$D || (t.drawController(t.preDrawContentArr[e]), t.preDrawContentArr[e].$D = !0), 
                e === a - 1) var r = setInterval(function() {
                    t.drawComplateCount === a && (t.observeFun && t.observeFun(), t.drawComplate = !0, 
                    clearInterval(r), r = null);
                }, 10);
            }(o, s);
        }
    }, {
        key: "drawController",
        value: function(t) {
            var e = t.drawType, a = t.url, r = t.path, n = t.x, i = t.y, o = t.width, s = t.height, h = t.text, c = t.color, l = t.avatar, u = t.radius, f = t.bgColor, d = t.tlr, v = void 0 === d ? 0 : d, g = t.trr, m = void 0 === g ? 0 : g, x = t.blr, p = void 0 === x ? 0 : x, w = t.brr, I = void 0 === w ? 0 : w;
            "image" === e && a && r && (l ? this.drawArcImage(r, n, i, u, c) : this.drawImage(r, n, i, o, s)), 
            "text" === e && h && c && this.drawText(t), "rect" === e && o && s && this.drawRect(n, i, o, s, c, f, u, v, m, p, I);
        }
    }, {
        key: "generateImage",
        value: function() {
            var t = this;
            return new Promise(function(e, a) {
                t.ctx.draw(!0, setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: t.canvas,
                        y: 1,
                        success: function(a) {
                            t.page.loading(!1), e(a.tempFilePath);
                        },
                        fail: function(t) {
                            a(t);
                        }
                    });
                }, 300));
            });
        }
    }, {
        key: "draw",
        value: function() {
            var t = this;
            return new Promise(function(e, a) {
                var r = setInterval(function() {
                    t.drawComplateCount === t.renderElementLength && (t.generateImage().then(function(t) {
                        e(t);
                    }), clearInterval(r), r = null);
                }, 10);
                setTimeout(function() {
                    a("timeout"), t.page.loading(!1), r && t.page.toast("网络超时，请重试"), r && clearInterval(r), 
                    r = null;
                }, t.options.timeout || 5e3);
            });
        }
    }, {
        key: "downloadPromise",
        value: function(t) {
            return new Promise(function(e, a) {
                wx.downloadFile({
                    url: t.replace(/^(http:\/\/)/g, "https://"),
                    success: function(t) {
                        e(t);
                    },
                    fail: function(t) {
                        a("downloadFailed");
                    }
                });
            });
        }
    }, {
        key: "drawImage",
        value: function(t) {
            for (var e, a = arguments.length, r = Array(a > 1 ? a - 1 : 0), n = 1; n < a; n++) r[n - 1] = arguments[n];
            (e = this.ctx).drawImage.apply(e, [ t ].concat(r)), this.ctx.draw(!0), this.drawComplateCount += 1;
        }
    }, {
        key: "drawArcImage",
        value: function(t, e, a, r) {
            var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "#000";
            this.ctx.save(), this.ctx.beginPath(), this.ctx.setLineWidth(2), this.ctx.arc(e, a, r, 0, 2 * Math.PI), 
            this.ctx.setStrokeStyle(n), this.ctx.stroke(), this.ctx.clip(), this.ctx.drawImage(t, e - r, a - r, 2 * r, 2 * r), 
            this.ctx.draw(!0), this.ctx.restore(), this.drawComplateCount += 1;
        }
    }, {
        key: "drawRect",
        value: function(t, e, a, r) {
            for (var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "#fff", i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "#fff", o = arguments.length, s = Array(o > 6 ? o - 6 : 0), h = 6; h < o; h++) s[h - 6] = arguments[h];
            var c = s[0], l = s[1], u = s[2], f = s[3], d = s[4];
            this.ctx.setFillStyle(i), this.ctx.beginPath(), this.ctx.moveTo(t + (c || l || 0), e), 
            c || u ? this.ctx.lineTo(t + a - (c || u), e) : this.ctx.lineTo(t + a, e), (c || u) && this.ctx.arc(t + a - (c || u), e + (c || u), c || u, 1.5 * Math.PI, 2 * Math.PI, !1), 
            c || d ? this.ctx.lineTo(t + a, e + r - (c || d)) : this.ctx.lineTo(t + a, e + r), 
            (c || d) && this.ctx.arc(t + a - (c || d), e + r - (c || d), c || d, 0, .5 * Math.PI, !1), 
            c || f ? this.ctx.lineTo(t + (c || f), e + r) : this.ctx.lineTo(t, e + r), (c || f) && this.ctx.arc(t + (c || f), e + r - (c || f), c || f, .5 * Math.PI, Math.PI, !1), 
            c || l ? this.ctx.lineTo(t, e + (c || l)) : this.ctx.lineTo(t, e), (c || l) && this.ctx.arc(t + (c || l), e + (c || l), c || l, Math.PI, 1.5 * Math.PI, !1), 
            this.ctx.fill(), this.ctx.setLineWidth(0), this.ctx.setStrokeStyle(n), this.ctx.stroke(), 
            this.ctx.draw(!0), this.drawComplateCount += 1;
        }
    }, {
        key: "drawCircle",
        value: function() {}
    }, {
        key: "drawText",
        value: function(t) {
            var e = t.text, a = t.fontSize, r = void 0 === a ? 20 : a, n = t.x, i = void 0 === n ? 0 : n, o = t.y, s = void 0 === o ? 0 : o, h = t.color, c = void 0 === h ? "#000" : h, l = t.textAlign, u = void 0 === l ? "center" : l, f = t.padding, d = t.lineHeight, v = void 0 === d ? 10 : d;
            if (this.ctx.setTextAlign(u), this.ctx.setFontSize(r), this.ctx.setFillStyle(c), 
            this.ctx.setTextBaseline("top"), /(.*\$\{(.*)\}\$)/.test(e)) {
                for (var g = /(.*\$\{(.*)\}\$)/.exec(e)[2], m = " ", x = 0; x < g; x++) m += " ";
                e = e.replace(/\$\{(.*)\}\$/, m);
            }
            if (f) for (var p = this.canvasWidth, w = p - 2 * f, I = Math.floor(w / r), y = Math.ceil(e.length / I), C = 0; C < y; C++) this.ctx.fillText(e.substring(C * I, (C + 1) * I), f, C > 0 ? s + C * (r + v) : s); else this.ctx.fillText(e, i, s);
            this.ctx.draw(!0), this.drawComplateCount += 1;
        }
    }, {
        key: "sort",
        value: function(t, e) {
            for (var a = void 0, r = 1; r < t.length; r++) for (var n = r - 1; n >= 0; n--) e ? Number(t[n + 1].zIndex) < Number(t[n].zIndex) && (a = t[n + 1], 
            t[n + 1] = t[n], t[n] = a) : Number(t[n + 1].zIndex) > Number(t[n].zIndex) && (a = t[n + 1], 
            t[n + 1] = t[n], t[n] = a);
            return t;
        }
    }, {
        key: "gaussBlur",
        value: function(t) {
            var e, a, r, n, i, o, s, h, c, l, u = t.data, f = t.width, d = t.height, v = [], g = 0;
            for (o = 1 / (5 * Math.sqrt(2 * Math.PI)), i = -.02, s = 0, e = -10; e <= 10; e++, 
            s++) n = o * Math.exp(i * e * e), v[s] = n, g += n;
            for (s = 0, l = v.length; s < l; s++) v[s] /= g;
            for (a = 0; a < d; a++) for (e = 0; e < f; e++) {
                for (r = n = i = o = 0, g = 0, h = -10; h <= 10; h++) (c = e + h) >= 0 && c < f && (s = 4 * (a * f + c), 
                r += u[s] * v[h + 10], n += u[s + 1] * v[h + 10], i += u[s + 2] * v[h + 10], g += v[h + 10]);
                s = 4 * (a * f + e), u[s] = r / g, u[s + 1] = n / g, u[s + 2] = i / g;
            }
            for (e = 0; e < f; e++) for (a = 0; a < d; a++) {
                for (r = n = i = o = 0, g = 0, h = -10; h <= 10; h++) (c = a + h) >= 0 && c < d && (s = 4 * (c * f + e), 
                r += u[s] * v[h + 10], n += u[s + 1] * v[h + 10], i += u[s + 2] * v[h + 10], g += v[h + 10]);
                s = 4 * (a * f + e), u[s] = r / g, u[s + 1] = n / g, u[s + 2] = i / g;
            }
            return t;
        }
    } ]), t;
}();

exports.default = ShareImageBuilder;