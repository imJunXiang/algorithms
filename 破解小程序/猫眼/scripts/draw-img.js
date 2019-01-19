function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, _createClass = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), ShareImageBuilder = function() {
    function t(e, r) {
        _classCallCheck(this, t), this.options = r, this.page = e, this.fileType = r.fileType, 
        this.preview = r.preview, this.canvas = r.canvasId, this.ctx = wx.createCanvasContext(r.canvasId), 
        this.formatImgsInfoArr = [], this.canDraw = !1, this.canvasHeight = 1334, this.canvasWidth = 750, 
        this.extraData = !1, this.preDrawContentArr = [], this.renderElementLength = 0, 
        this.drawComplate = !1, this.observeFun = null, this.drawComplateCount = -1, this.localImageArr = [], 
        this.setCanvasMeasure(this.canvasWidth, this.canvasHeight), this.initAllImageInfo();
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
            var e = this, r = function() {
                if (Array.isArray(t)) for (var r = 0, n = t.length; r < n; r++) !function(r, n) {
                    e.renderElementLength += 1, "text" === t[r].drawType || "rect" === t[r].drawType ? e.drawController(t[r]) : "image" === t[r].drawType && e.downloadPromise(t[r].url).then(function(n) {
                        t[r].path = n.tempFilePath, e.drawController(t[r]);
                    });
                }(r); else "object" === (void 0 === t ? "undefined" : _typeof(t)) ? e.drawController(t) : (e.extraData = !1, 
                console.error("数据格式不正确！"));
            };
            this.drawComplate ? r() : this.observeFun = r;
        }
    }, {
        key: "getTextWidth",
        value: function(t) {
            return this.ctx.measureText(t);
        }
    }, {
        key: "initAllImageInfo",
        value: function() {
            var t = this, e = this.options.imgArr, r = void 0 === e ? [] : e;
            r = this.sort(r);
            for (var n = 0, a = r.length; n < a; n++) !function(e, n) {
                r[e].url.match(/(http:\/\/|https:\/\/)/) ? t.formatImgsInfoArr.push(t.createImageDownloadPromise(r[e])) : t.localImageArr.push(new Promise(function(n, a) {
                    t.setImageInfo(r[e]).then(function(t) {
                        n(t);
                    }).catch(function(t) {
                        a(t);
                    });
                }));
            }(n);
            this.formatImgsInfoArr = [].concat(_toConsumableArray(this.formatImgsInfoArr), _toConsumableArray(this.localImageArr)), 
            this.getAllImgInfo();
        }
    }, {
        key: "setImageInfo",
        value: function(t) {
            return new Promise(function(e, r) {
                wx.getImageInfo({
                    src: t.url,
                    success: function(r) {
                        e(_extends({}, t, r, {
                            path: t.url,
                            height: t.height || r.height,
                            width: t.width || r.width
                        }));
                    },
                    fail: function(t) {
                        r(t);
                    }
                });
            });
        }
    }, {
        key: "createImageDownloadPromise",
        value: function(t) {
            var e = this;
            return new Promise(function(r, n) {
                e.downloadPromise(t.url).then(function(a) {
                    var i = _extends({}, t, {
                        url: a.tempFilePath
                    });
                    e.setImageInfo(i).then(function(t) {
                        r(t);
                    }).catch(function(t) {
                        n(t);
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
            }).catch(function(t) {
                console.warn("网络开小差了");
            });
        }
    }, {
        key: "initCanvas",
        value: function() {
            var t = this, e = this.options.useBgImage, r = e ? this.formatImgsInfoArr.pop() : this.options, n = r.path, a = r.height, i = void 0 === a ? 1334 : a, o = r.width, s = void 0 === o ? 750 : o;
            this.canvasHeight = i, this.canvasWidth = s, this.page.setData({
                canvasHeight: i,
                canvasWidth: s
            }, function() {
                e ? t.drawImage(n, 0, 0, s, i) : t.drawRect(0, 0, s, i), t.drawMainContent();
            });
        }
    }, {
        key: "drawMainContent",
        value: function() {
            var t = this, e = this.options, r = e.textArr, n = void 0 === r ? [] : r, a = e.rectArr, i = void 0 === a ? [] : a;
            this.preDrawContentArr = this.sort(this.formatImgsInfoArr.concat(n).concat(i), !0), 
            this.renderElementLength = this.preDrawContentArr.length;
            for (var o = 0, s = this.preDrawContentArr.length; o < s; o++) !function(e, r) {
                if (t.preDrawContentArr[e].$D || (t.drawController(t.preDrawContentArr[e]), t.preDrawContentArr[e].$D = !0), 
                e === r - 1) var n = setInterval(function() {
                    t.drawComplateCount === r && (t.observeFun && t.observeFun(), t.drawComplate = !0, 
                    clearInterval(n), n = null);
                }, 10);
            }(o, s);
        }
    }, {
        key: "drawController",
        value: function(t) {
            var e = t.drawType, r = t.url, n = t.path, a = t.x, i = t.y, o = t.width, s = t.height, h = t.text, l = t.color, c = t.avatar, u = t.radius, f = t.bgColor, d = t.tlr, v = void 0 === d ? 0 : d, m = t.trr, g = void 0 === m ? 0 : m, x = t.blr, p = void 0 === x ? 0 : x, w = t.brr, y = void 0 === w ? 0 : w;
            "image" === e && r && n && (c ? this.drawArcImage(n, a, i, u, l) : this.drawImage(n, a, i, o, s)), 
            "text" === e && h && l && this.drawText(t), "rect" === e && o && s && this.drawRect(a, i, o, s, l, f, u, v, g, p, y);
        }
    }, {
        key: "generateImage",
        value: function() {
            var t = this;
            return new Promise(function(e, r) {
                t.ctx.draw(!0, setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: t.canvas,
                        y: 1,
                        fileType: t.fileType || "png",
                        success: function(r) {
                            t.preview && wx.previewImage({
                                urls: [ r.tempFilePath ]
                            }), e(r.tempFilePath);
                        },
                        fail: function(t) {
                            r(t);
                        }
                    });
                }, 200));
            });
        }
    }, {
        key: "draw",
        value: function() {
            var t = this;
            return new Promise(function(e, r) {
                var n = setInterval(function() {
                    t.drawComplateCount === t.renderElementLength && (t.generateImage().then(function(t) {
                        e(t);
                    }), clearInterval(n), n = null);
                }, 10);
                setTimeout(function() {
                    r("timeout"), n && console.warn("网络超时，请重试"), n && clearInterval(n), n = null;
                }, t.options.timeout || 5e3);
            });
        }
    }, {
        key: "downloadPromise",
        value: function(t) {
            return new Promise(function(e, r) {
                wx.downloadFile({
                    url: t.replace(/^(http:\/\/)/g, "https://"),
                    success: function(t) {
                        e(t);
                    },
                    fail: function(t) {
                        r("downloadFailed");
                    }
                });
            });
        }
    }, {
        key: "drawImage",
        value: function(t) {
            for (var e, r = arguments.length, n = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) n[a - 1] = arguments[a];
            (e = this.ctx).drawImage.apply(e, [ t ].concat(n)), this.ctx.draw(!0), this.drawComplateCount += 1;
        }
    }, {
        key: "drawArcImage",
        value: function(t, e, r, n) {
            var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "#000";
            this.ctx.save(), this.ctx.beginPath(), this.ctx.setLineWidth(2), this.ctx.arc(e, r, n, 0, 2 * Math.PI), 
            this.ctx.setStrokeStyle(a), this.ctx.stroke(), this.ctx.clip(), this.ctx.drawImage(t, e - n, r - n, 2 * n, 2 * n), 
            this.ctx.draw(!0), this.ctx.restore(), this.drawComplateCount += 1;
        }
    }, {
        key: "drawRect",
        value: function(t, e, r, n) {
            for (var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "#fff", i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "#fff", o = arguments.length, s = Array(o > 6 ? o - 6 : 0), h = 6; h < o; h++) s[h - 6] = arguments[h];
            var l = s[0], c = s[1], u = s[2], f = s[3], d = s[4];
            this.ctx.setFillStyle(i), this.ctx.beginPath(), this.ctx.moveTo(t + (l || c || 0), e), 
            l || u ? this.ctx.lineTo(t + r - (l || u), e) : this.ctx.lineTo(t + r, e), (l || u) && this.ctx.arc(t + r - (l || u), e + (l || u), l || u, 1.5 * Math.PI, 2 * Math.PI, !1), 
            l || d ? this.ctx.lineTo(t + r, e + n - (l || d)) : this.ctx.lineTo(t + r, e + n), 
            (l || d) && this.ctx.arc(t + r - (l || d), e + n - (l || d), l || d, 0, .5 * Math.PI, !1), 
            l || f ? this.ctx.lineTo(t + (l || f), e + n) : this.ctx.lineTo(t, e + n), (l || f) && this.ctx.arc(t + (l || f), e + n - (l || f), l || f, .5 * Math.PI, Math.PI, !1), 
            l || c ? this.ctx.lineTo(t, e + (l || c)) : this.ctx.lineTo(t, e), (l || c) && this.ctx.arc(t + (l || c), e + (l || c), l || c, Math.PI, 1.5 * Math.PI, !1), 
            this.ctx.fill(), this.ctx.setLineWidth(0), this.ctx.setStrokeStyle(a), this.ctx.stroke(), 
            this.ctx.draw(!0), this.drawComplateCount += 1;
        }
    }, {
        key: "drawCircle",
        value: function() {}
    }, {
        key: "drawText",
        value: function(t) {
            var e = t.text, r = t.fontSize, n = void 0 === r ? 20 : r, a = t.x, i = void 0 === a ? 0 : a, o = t.y, s = void 0 === o ? 0 : o, h = t.color, l = void 0 === h ? "#000" : h, c = t.textAlign, u = void 0 === c ? "center" : c, f = t.padding, d = t.lineHeight, v = void 0 === d ? 10 : d;
            if (this.ctx.setTextAlign(u), this.ctx.setFontSize(n), this.ctx.setFillStyle(l), 
            this.ctx.setTextBaseline("top"), /(.*\$\{(.*)\}\$)/.test(e)) {
                for (var m = /(.*\$\{(.*)\}\$)/.exec(e)[2], g = " ", x = 0; x < m; x++) g += " ";
                e = e.replace(/\$\{(.*)\}\$/, g);
            }
            if (f) for (var p = this.canvasWidth, w = p - 2 * f, y = Math.floor(w / n), I = Math.ceil(e.length / y), C = 0; C < I; C++) this.ctx.fillText(e.substring(C * y, (C + 1) * y), f, C > 0 ? s + C * (n + v) : s); else this.ctx.fillText(e, i, s);
            this.ctx.draw(!0), this.drawComplateCount += 1;
        }
    }, {
        key: "sort",
        value: function(t, e) {
            for (var r = void 0, n = 1; n < t.length; n++) for (var a = n - 1; a >= 0; a--) e ? Number(t[a + 1].zIndex) < Number(t[a].zIndex) && (r = t[a + 1], 
            t[a + 1] = t[a], t[a] = r) : Number(t[a + 1].zIndex) > Number(t[a].zIndex) && (r = t[a + 1], 
            t[a + 1] = t[a], t[a] = r);
            return t;
        }
    }, {
        key: "gaussBlur",
        value: function(t, e) {
            var r, n, a, i, o, s, h, l, c, u, f = t.data, d = t.width, v = t.height, m = [], g = 0;
            for (s = 1 / (5 * Math.sqrt(2 * Math.PI)), o = -.02, h = 0, r = -10; r <= 10; r++, 
            h++) i = s * Math.exp(o * r * r), m[h] = i, g += i;
            for (h = 0, u = m.length; h < u; h++) m[h] /= g;
            if (e) for (var x = 0; x < e.length; x++) {
                var p = e[x], w = function(t, e) {
                    return t >= 0 ? t : e + t;
                }, y = p.x && p.x.min ? w(p.x.min, d) : 0, I = p.x && p.x.max ? w(p.x.max, d) : d, C = p.y && p.y.min ? w(p.y.min, v) : 0, A = p.y && p.y.max ? w(p.y.max, v) : v;
                for (n = C; n < A; n++) for (r = y; r < I; r++) {
                    for (a = i = o = s = 0, g = 0, l = -10; l <= 10; l++) (c = r + l) >= 0 && c < d && (h = 4 * (n * d + c), 
                    a += f[h] * m[l + 10], i += f[h + 1] * m[l + 10], o += f[h + 2] * m[l + 10], g += m[l + 10]);
                    h = 4 * (n * d + r), f[h] = a / g, f[h + 1] = i / g, f[h + 2] = o / g;
                }
                for (r = y; r < I; r++) for (n = C; n < A; n++) {
                    for (a = i = o = s = 0, g = 0, l = -10; l <= 10; l++) (c = n + l) >= 0 && c < v && (h = 4 * (c * d + r), 
                    a += f[h] * m[l + 10], i += f[h + 1] * m[l + 10], o += f[h + 2] * m[l + 10], g += m[l + 10]);
                    h = 4 * (n * d + r), f[h] = a / g, f[h + 1] = i / g, f[h + 2] = o / g;
                }
            } else {
                for (n = 0; n < v; n++) for (r = 0; r < d; r++) {
                    for (a = i = o = s = 0, g = 0, l = -10; l <= 10; l++) (c = r + l) >= 0 && c < d && (h = 4 * (n * d + c), 
                    a += f[h] * m[l + 10], i += f[h + 1] * m[l + 10], o += f[h + 2] * m[l + 10], g += m[l + 10]);
                    h = 4 * (n * d + r), f[h] = a / g, f[h + 1] = i / g, f[h + 2] = o / g;
                }
                for (r = 0; r < d; r++) for (n = 0; n < v; n++) {
                    for (a = i = o = s = 0, g = 0, l = -10; l <= 10; l++) (c = n + l) >= 0 && c < v && (h = 4 * (c * d + r), 
                    a += f[h] * m[l + 10], i += f[h + 1] * m[l + 10], o += f[h + 2] * m[l + 10], g += m[l + 10]);
                    h = 4 * (n * d + r), f[h] = a / g, f[h + 1] = i / g, f[h + 2] = o / g;
                }
            }
            return t;
        }
    } ]), t;
}();

exports.default = ShareImageBuilder;