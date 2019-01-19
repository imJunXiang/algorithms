var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, e) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module))) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var n = e();
        for (var r in n) ("object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? exports : t)[r] = n[r];
    }
}(void 0, function() {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            });
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return e.d(n, "a", n), n;
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, e.p = "", e(e.s = 4);
    }([ function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function o(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
            return Array.from(t);
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function a(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != (void 0 === e ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }
        function l(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof(e)));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var u = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        }(), s = n(6), c = r(s), h = n(3), f = r(h), d = function(t) {
            function e(t) {
                return i(this, e), t = t || {}, a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            }
            return l(e, t), u(e, [ {
                key: "draw",
                value: function() {}
            }, {
                key: "__draw",
                value: function(t, e, n) {
                    this.ctx = t, n && !this.parentNode && this.ctx.setGlobalAlpha(1), t.save(), this.__translate(), 
                    this.__setOpacity(), this.__transform(), t.save(), this.__drawBackground(), this.__drawShadow(), 
                    this.__drawBorder(), this.draw(), t.restore(), this.drawChildren(e, t), e && f.default.drawDebugBoundary(this, t), 
                    t.restore();
                }
            }, {
                key: "__setOpacity",
                value: function() {
                    var t = this.style.opacity;
                    if (t && !(t > 1)) {
                        var e = this.getOpacity();
                        e && e < 1 && (t *= e), this.ctx.setGlobalAlpha(t);
                    }
                }
            }, {
                key: "getOpacity",
                value: function() {
                    for (var t = this.parentNode, e = 1; t; ) t.style.opacity && (e = Math.min(t.style.opacity * e, 1)), 
                    t = t.parentNode;
                    return e;
                }
            }, {
                key: "getPos",
                value: function() {
                    for (var t = 0, e = 0, n = this; n; ) t += n.layout.left || 0, e += n.layout.top || 0, 
                    n = n.parentNode;
                    return {
                        left: t,
                        top: e
                    };
                }
            }, {
                key: "__translate",
                value: function() {
                    var t = this.layout, e = t.left, n = t.top;
                    (e || n) && this.ctx.translate(Math.round(e), Math.round(n));
                }
            }, {
                key: "__transform",
                value: function() {
                    var t = this.ctx, e = this.style, n = e.transformOrigin, r = e.rotate, o = e.scale, i = this.layout, a = i.width, l = i.height;
                    (r || o) && (n && n.length || (n = [ a / 2, l / 2 ]), t.translate(n[0], n[1]), null != r && t.rotate(r * Math.PI / 180), 
                    null != o && (o.constructor === Array ? t.scale(o[0], o[1]) : t.scale(o, o)), t.translate(-n[0], -n[1]));
                }
            }, {
                key: "__drawBackground",
                value: function() {
                    var t = this.ctx, e = this.style.backgroundColor, n = this.layout, r = n.width, o = n.height;
                    e && (t.save(), t.setFillStyle(e), t.fillRect(0, 0, r, o), t.restore());
                }
            }, {
                key: "__drawShadow",
                value: function() {
                    var t = this.ctx, e = this.style.boxShadow, n = this.layout, r = n.width, i = n.height;
                    e && (t.save(), t.setShadow.apply(t, o(e)), t.setFillStyle("#FFF"), t.fillRect(0, 0, r, i), 
                    t.restore());
                }
            }, {
                key: "__setBorderRadiusContext",
                value: function(t, e, n, r, o, i) {
                    var a = o / 2;
                    t.beginPath(), t[i](e - r - a, a), t.arc(e - r - a, r + a, r, -Math.PI / 2, 0), 
                    t[i](e - a, n - r - a), t.arc(e - r - a, n - r - a, r, 0, Math.PI / 2), t[i](r + a, n - a), 
                    t.arc(r + a, n - r - a, r, Math.PI / 2, Math.PI), t[i](a, r + a), t.arc(r + a, r + a, r, -Math.PI, -Math.PI / 2), 
                    t[i](e - r - a, a);
                }
            }, {
                key: "__drawBorderRadius",
                value: function(t, e, n, r, o, i) {
                    this.__setBorderRadiusContext(t, e, n, r, o, i), t.stroke();
                }
            }, {
                key: "__drawSingleBorder",
                value: function(t, e, n, r, o) {
                    for (var i = (this.style.borderWidth, this.ctx), a = 4 * o, l = void 0, u = void 0, s = Math.floor((e === r ? n - t : r - e) / a) / 2, c = 0; c < s; c++) l = 2 * c * a, 
                    u = (2 * c + 1) * a, e === r ? (i.moveTo(t + l, e), i.lineTo(t + u, e)) : t === n && (i.moveTo(t, e + l), 
                    i.lineTo(t, e + u));
                }
            }, {
                key: "__drawBorder",
                value: function() {
                    var t = this.style, e = t.borderLeftWidth, n = t.borderBottomWidth, r = t.borderRightWidth, o = t.borderTopWidth, i = t.borderWidth, a = t.borderColor, l = void 0 === a ? "black" : a, u = t.borderStyle, s = void 0 === u ? "solid" : u, c = t.borderRadius, h = void 0 === c ? 0 : c, f = this.layout, d = f.width, p = f.height, y = this.ctx;
                    if (i || n || o || e || r) {
                        if (y.save(), y.setStrokeStyle(l), i) return y.setLineWidth(i), h && this.__drawBorderRadius(y, d, p, h, i, "dashed" === s ? "moveTo" : "lineTo"), 
                        "solid" !== s || h ? "dashed" === s && (y.beginPath(), this.__drawSingleBorder(h, i / 2, d - h, i / 2, i), 
                        this.__drawSingleBorder(i / 2, h, i / 2, p - h, i), this.__drawSingleBorder(d - i / 2, h, d - i / 2, p - h, i), 
                        this.__drawSingleBorder(h, p - i / 2, d - h, p - i / 2, i), y.closePath(), y.stroke()) : y.strokeRect(i / 2, i / 2, d - i, p - i), 
                        void y.restore();
                        y.beginPath(), n && (y.setLineWidth(n), "solid" === s ? (y.moveTo(0, p - n / 2), 
                        y.lineTo(d, p - n / 2)) : "dashed" === s && this.__drawSingleBorder(0, p - n / 2, d, p - n / 2, n)), 
                        e && (y.setLineWidth(e), "solid" === s ? (y.moveTo(e / 2, 0), y.lineTo(e / 2, p)) : "dashed" === s && this.__drawSingleBorder(e / 2, 0, e / 2, p, e)), 
                        r && (y.setLineWidth(r), "solid" === s ? (y.moveTo(d - r / 2, 0), y.lineTo(d - r / 2, p)) : "dashed" === s && this.__drawSingleBorder(d - r / 2, 0, d - r / 2, p, r)), 
                        o && (y.setLineWidth(o), "solid" === s ? (y.moveTo(0, o / 2), y.lineTo(d, o / 2)) : "dashed" === s && this.__drawSingleBorder(0, o / 2, d, o / 2, o)), 
                        y.closePath(), y.stroke(), y.restore();
                    }
                }
            }, {
                key: "drawChildren",
                value: function(t) {
                    var e = this;
                    this.children.forEach(function(n) {
                        n.parentNode = e, n.__draw(e.ctx, t);
                    });
                }
            }, {
                key: "isInnerPoint",
                value: function(t, e) {
                    var n = this.getPos(), r = this.layout, o = r.width, i = r.height, a = n.left, l = n.top;
                    return t >= a && t <= a + o && e >= l && e <= l + i;
                }
            } ]), e;
        }(c.default);
        e.default = d;
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            processStyle: function(t, e) {
                var n = this, r = t.attr.class || "";
                return t.attr.style, r.split(" ").forEach(function(r) {
                    n.calculateClassObj(t, r, e);
                }), t.style = Object.assign(t.style, t.attr.__classObj, t.attr.style), t.children.forEach(function(r) {
                    r.parentNode = t, n.processStyle(r, e);
                }), t;
            },
            calculateClassObj: function(t, e, n) {
                var r = this;
                t.attr.__classObj || (t.attr.__classObj = {});
                for (var o in n) !function(o) {
                    var i = o.split(","), a = n[o];
                    i.length > 1 ? i.forEach(function(n) {
                        n = n.trim(), r.calculateSingleClassObj(t, e, n, a);
                    }) : r.calculateSingleClassObj(t, e, o, a);
                }(o);
            },
            calculateSingleClassObj: function(t, e, n, r) {
                if (/\:first-child/.test(n)) {
                    if (n.indexOf(e) < 0 || !t.isFirstChild()) return;
                } else if (/\:last-child/.test(n)) {
                    if (n.indexOf(e) < 0 || !t.isLastChild()) return;
                } else if (e !== n) return;
                Object.assign(t.attr.__classObj, r);
            },
            processDynamicClassObj: function(t) {
                return t = Object.assign({}, t, {
                    "__dynamic-height-container": {
                        flexDirection: "column",
                        flexShrink: 0
                    }
                }), t.root = Object.assign({}, t.root, {
                    alignItems: "stretch",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }), t;
            }
        };
    }, function(t, e, n) {
        function r(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
            return Array.from(t);
        }
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != (void 0 === e ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof(e)));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        function l(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var u, s = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        }(), c = n(0), h = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(c), f = (u = {
            a: [ .5294, .5294 ],
            b: [ .6078, .5882 ],
            c: [ .549, .5294 ],
            d: [ .6078, .5882 ],
            e: [ .549, .5294 ],
            f: [ .3529, .3529 ],
            g: [ .5882, .5882 ],
            h: [ .5882, .5294 ],
            i: [ .2353, .2353 ],
            j: [ .2353, .2353 ],
            k: [ .5294, .5294 ],
            l: [ .2353, .2353 ],
            m: [ .8627, .8824 ],
            n: [ .5686, .5294 ],
            o: [ .5686, .5882 ],
            p: [ .5882, .5882 ],
            q: [ .5882, .5882 ],
            r: [ .3725, .3529 ],
            s: [ .5098, .5294 ],
            t: [ .3529, .3529 ],
            u: [ .5686, .5294 ],
            v: [ .5294, .4706 ],
            w: [ .7647, .7647 ],
            x: [ .5098, .4706 ],
            y: [ .5294, .4706 ],
            z: [ .5294, .4706 ],
            A: [ .6667, .6471 ],
            B: [ .6471, .6471 ],
            C: [ .7059, .6471 ],
            D: [ .7059, .6471 ],
            E: [ .5882, .5882 ],
            F: [ .5686, .5294 ],
            G: [ .7255, .7059 ],
            H: [ .7255, .7059 ],
            I: [ .2549, .2941 ],
            J: [ .5294, .5294 ],
            K: [ .6471, .6471 ],
            L: [ .549, .5294 ],
            M: [ .8627, .8824 ],
            N: [ .7255, .7059 ],
            O: [ .7647, .7059 ],
            P: [ .6275, .6471 ],
            Q: [ .7647, .7059 ],
            R: [ .6471, .5882 ],
            S: [ .6275, .5882 ],
            T: [ .6275, .5882 ],
            U: [ .7255, .6471 ],
            V: [ .6667, .6471 ],
            W: [ .9608, .8824 ],
            X: [ .6667, .6471 ],
            Y: [ .6471, .5882 ],
            Z: [ .6471, .5882 ],
            0: [ .6032, .5712 ],
            1: [ .3932, .5642 ],
            2: [ .6032, .5712 ],
            3: [ .6032, .5712 ],
            4: [ .6032, .5712 ],
            5: [ .6032, .5712 ],
            6: [ .6032, .5712 ],
            7: [ .541, .5712 ],
            8: [ .6032, .5712 ],
            9: [ .6032, .5712 ],
            "~": [ .5686, .7059 ],
            "!": [ .2941, .2352 ],
            "@": [ .902, .8823 ],
            "#": [ .6275, .6471 ],
            $: [ .6275, .5882 ],
            "%": [ .7647, .7059 ],
            "^": [ .4706, .4118 ],
            "&": [ .7059, .6471 ],
            "*": [ .4902, .4118 ],
            "(": [ .3529, .3529 ],
            ")": [ .3529, .3529 ],
            "（": [ 1.0196, 1 ],
            "）": [ 1.0196, 1 ],
            "-": [ .612, .2941 ],
            _: [ .4314, .4706 ],
            "+": [ .6275, .5882 ],
            "=": [ .6275, .5294 ],
            "[": [ .3529, .2941 ],
            "]": [ .3529, .2941 ],
            "{": [ .3922, .3529 ],
            "}": [ .3922, .3529 ],
            "|": [ .3137, .2352 ],
            "/": [ .3333, .4118 ],
            "\\": [ .3333, .4118 ],
            "<": [ .6275, .5294 ],
            ">": [ .6275, .5294 ]
        }, l(u, "*", [ .4902, .4118 ]), l(u, ";", [ .2941, .2352 ]), l(u, ":", [ .2745, .2352 ]), 
        l(u, "'", [ .2353, .1765 ]), l(u, '"', [ .4314, .2941 ]), l(u, "‘", [ .3725, .1765 ]), 
        l(u, "“", [ .5686, .3529 ]), l(u, "”", [ .5686, .3529 ]), l(u, ",", [ .2941, .1765 ]), 
        l(u, ".", [ .2745, .2353 ]), l(u, "?", [ .5686, .4706 ]), l(u, "。", [ 1.02, 1 ]), 
        l(u, "~", [ .5686, .7059 ]), l(u, " ", [ .2745, .2352 ]), u), d = function(t) {
            function e(t) {
                o(this, e);
                var n = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                return n.style, n;
            }
            return a(e, t), s(e, [ {
                key: "getFontSize",
                value: function() {
                    return this.style.fontSize || this.getParentProp("fontSize") || 14;
                }
            }, {
                key: "getLineHeight",
                value: function() {
                    return this.style.lineHeight || this.getParentProp("lineHeight") || this.getFontSize() + 2;
                }
            }, {
                key: "getTextShadow",
                value: function() {
                    return this.style.textShadow || this.getParentProp("textShadow");
                }
            }, {
                key: "getTextAlign",
                value: function() {
                    return this.style.textAlign || this.getParentProp("textAlign");
                }
            }, {
                key: "getColor",
                value: function() {
                    return this.style.color || this.getParentProp("color") || "black";
                }
            }, {
                key: "measureText",
                value: function(t) {
                    t = null != t ? t + "" : null != this.attr.content ? this.attr.content + "" : "";
                    for (var n = this.getFontSize(), r = 0, o = 0; o < t.length; o++) {
                        var i = t[o];
                        /[A-Za-z0-9]/.test(i) || "~!@#$%^&*()（）-_+=[]{}|/<>*;:'\"‘“”,.?。 ".indexOf(i) > -1 ? r += f[i][e.systemInfo && "android" === e.systemInfo.platform ? 1 : 0] * n : /[^\x00-\xff]/.test(i) ? r += n : r += n / 2;
                    }
                    return Math.round(r);
                }
            }, {
                key: "exceedWidth",
                value: function(t, e) {
                    return this.measureText(t) > e;
                }
            }, {
                key: "getTextStartPos",
                value: function() {
                    var t = this.style, e = t.paddingLeft, n = t.borderLeftWidth, r = t.paddingTop, o = t.borderTopWidth;
                    return {
                        left: (e || 0) + (n || 0),
                        top: (r || 0) + (o || 0)
                    };
                }
            }, {
                key: "draw",
                value: function() {
                    var t = (this.layout.contentWidth, this.style), e = t.textOverflow, n = t.lineClamp, r = void 0 === n ? 1 : n, o = void 0;
                    o = this.layout.contentWidth;
                    var i = null != this.attr.content ? this.attr.content + "" : "", a = "", l = 0, u = this.getLineHeight(), s = this.getTextStartPos();
                    if (this.ctx.translate(s.left, s.top), this.exceedWidth(i, o)) {
                        for (var c = 0; c < i.length; c++) if (a += i[c], this.exceedWidth(a, o)) {
                            if ("ellipsis" === e && r - 1 === parseInt(l / u)) return void this.drawText(a.slice(0, a.length > 1 ? a.length - 1 : 1) + "...", o, l);
                            this.drawText(a.slice(0, a.length > 1 ? a.length - 1 : 1), o, l), a.length > 1 && c--, 
                            a = "", l += u;
                        }
                        a && this.drawText(a, o, l);
                    } else this.drawText(i, o);
                }
            }, {
                key: "getParentProp",
                value: function(t) {
                    for (var e = this.parentNode, n = void 0; e; ) {
                        if (n = e.style[t]) return n;
                        e = e.parentNode;
                    }
                }
            }, {
                key: "drawText",
                value: function(t, e, n) {
                    var o = this.layout, i = (o.left, o.top, o.width, o.height, this.getTextAlign()), a = this.getFontSize(), l = this.getTextShadow(), u = this.getColor(), s = this.ctx, c = void 0;
                    n = n || 0, u && s.setFillStyle(u), i && s.setTextAlign(i), a && s.setFontSize(a), 
                    l && s.setShadow.apply(s, r(l)), i && e ? ("center" === i ? c = e / 2 : "left" === i ? c = 0 : "right" === i && (c = e), 
                    s.fillText(t, c, a + n)) : s.fillText(t, 0, a + n);
                }
            } ]), e;
        }(h.default);
        e.default = d;
    }, function(t, e, n) {
        function r(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
            return Array.from(t);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = "rgba(248, 225, 24, 0.6)", i = "rgba(100, 255, 243, 0.6)";
        e.default = {
            drawDebugBoundary: function(t, e) {
                var n = t.layout, r = n.width, a = n.height, l = t.style, u = l.borderTopWidth, s = l.borderBottomWidth, c = l.borderLeftWidth, h = l.borderRightWidth, f = l.marginTop, d = l.marginLeft, p = l.marginRight, y = l.marginBottom, g = l.paddingRight, v = l.paddingLeft, m = l.paddingTop, _ = l.paddingBottom, b = l.margin, w = l.padding, x = l.borderWidth;
                f = f || b || 0, d = d || b || 0, p = p || b || 0, y = y || b || 0, g = g || w || 0, 
                v = v || w || 0, m = m || w || 0, _ = _ || w || 0, h = h || x || 0, c = c || x || 0, 
                u = u || x || 0, s = s || x || 0, e.save(), f && (e.save(), e.setFillStyle(o), e.translate(0, -f), 
                e.fillRect(0, 0, r, f), this.drawBoundaryDetail(r, f, f, e), e.restore()), d && (e.save(), 
                e.setFillStyle(o), e.translate(-d, 0), e.fillRect(0, 0, d, a), this.drawBoundaryDetail(d, a, d, e), 
                e.restore()), p && (e.save(), e.setFillStyle(o), e.translate(r, 0), e.fillRect(0, 0, p, a), 
                this.drawBoundaryDetail(p, a, p, e), e.restore()), y && (e.save(), e.setFillStyle(o), 
                e.translate(0, a), e.fillRect(0, 0, r, y), this.drawBoundaryDetail(r, y, y, e), 
                e.restore()), g && (e.save(), e.translate(r - g - h, u), e.setFillStyle(i), e.fillRect(0, 0, g, a - u - s), 
                this.drawBoundaryDetail(g, a - u - s, g, e), e.restore()), v && (e.save(), e.translate(c, u), 
                e.setFillStyle(i), e.fillRect(0, 0, v, a - s - u), this.drawBoundaryDetail(v, a - s - u, v, e), 
                e.restore()), m && (e.save(), e.translate(c, u), e.setFillStyle(i), e.fillRect(0, 0, r - c - h, m), 
                this.drawBoundaryDetail(r - c - h, m, m, e), e.restore()), _ && (e.save(), e.translate(c, a - _ - s), 
                e.setFillStyle(i), e.fillRect(0, 0, r - c - h, _), this.drawBoundaryDetail(r - c - h, _, _, e), 
                e.restore()), r && a && (e.setStrokeStyle("rgba(143, 143, 143, 1)"), e.strokeRect(0, 0, r, a)), 
                e.restore();
            },
            drawBoundaryDetail: function(t, e, n, r) {
                n += "", r.setFontSize(10), r.setFillStyle("red"), r.fillText(n, (t - 5 * n.length) / 2, (e - 10) / 2 + 10);
            },
            outputElementStyleInfo: function(t) {
                var e = (t.attr, t.attr.class, t.attr.__classObj, t.attr.style, {
                    element: "color:#239a3b;font-size:20px;",
                    className: "color:#0366d6;font-size:16px",
                    common: "color:#000",
                    attrName: "color:#f00"
                });
                console.clear(), console.log("%c<" + t.constructor.name + ">", e.element), t.attr.class && console.log("%c-class %c" + t.attr.class, e.className, e.common);
                var n = this.formatOutputInfo(JSON.stringify(t.style, null, 2), e), o = this.formatOutputInfo(JSON.stringify(t.layout, null, 2), e);
                console.log.apply(null, [ "%c-style %c" + n.output, e.className, e.common ].concat(r(n.styles))), 
                console.log.apply(null, [ "%c-layout %c" + o.output, e.className, e.common ].concat(r(o.styles)));
            },
            formatOutputInfo: function(t, e) {
                var n = [];
                return t = t.replace(/"(.+)"\:\s(.+?)/g, function(t, r, o) {
                    return n.push(e.attrName), n.push(e.common), "%c" + r + "%c: " + o;
                }), {
                    output: t,
                    styles: n
                };
            },
            drawDebugMask: function(t, e) {
                var n = e.getPos();
                t.setFillStyle("rgba(252, 156, 225, 0.5)"), t.fillRect(n.left, n.top, e.layout.width, e.layout.height);
            }
        };
    }, function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var o = n(5), i = r(o), a = n(1), l = r(a), u = n(0), s = r(u), c = n(2), h = r(c), f = n(7), d = r(f), p = n(8), y = r(p), g = n(11), v = r(g), m = n(14), _ = r(m), b = n(3), w = r(b), x = n(18), S = r(x), O = void 0, T = void 0, P = {
            useDynamicHeight: !1
        }, M = {
            useDynamicHeight: [ "6.5.16", "6.5.14" ],
            makePhoneCall: [ "6.5.16", "6.5.14" ]
        }, j = void 0, k = void 0, D = 0;
        t.exports = {
            init: function(t) {
                this.windowWidth = t.windowWidth || 200, this.windowHeight = t.windowHeight || 200, 
                this.ctx = t.ctx, this.render = t.render, this.classObj = t.classObj, this.layoutDebug = t.layoutDebug, 
                this.imageDebug = t.imageDebug, this.minFontSize = t.minFontSize || 10, this.scaleRatio = this.windowWidth / 384, 
                this.disablePolling = t.disablePolling, this.maxPollingCount = t.maxPollingCount || 20;
            },
            measureText: function(t, e) {
                return new h.default({
                    attr: {
                        content: t
                    },
                    style: {
                        fontSize: e
                    }
                }).measureText();
            },
            draw: function() {
                var t = this, e = (this.ctx, this.tpl, this.classObj), n = this.data, r = void 0;
                this.getSystemInfo(function(o) {
                    h.default.systemInfo = o;
                    var a = t.render(n, {
                        View: s.default,
                        Image: d.default,
                        Text: h.default,
                        Navigator: y.default,
                        Location: v.default,
                        LineChart: _.default
                    });
                    if (P.useDynamicHeight && (a = t.processDynamicHeightTree(a), e = l.default.processDynamicClassObj(e)), 
                    t.__setContainerSize(a), a = l.default.processStyle(a, e), t.scaleSize(a), (0, i.default)(a), 
                    clearTimeout(O), D = 0, t.root = a, P.useDynamicHeight && t.root.children[0]) return r = t.root.layout.height = t.root.children[0].layout.height, 
                    void t.setDynamicHeight(r, function(e) {
                        t.__draw();
                    });
                    t.__draw(a);
                });
            },
            __draw: function() {
                var t = this;
                this.root.__draw(this.ctx, this.layoutDebug, this.imageDebug), this.ctx.draw(), 
                this.layoutDebug && T && w.default.drawDebugMask(this.ctx, T), this.imageDebug && S.default.drawDebugImage(this.ctx, this.imageDebug), 
                this.disablePolling || (O = setTimeout(function() {
                    t.isDirty(t.root) ? t.draw() : t.__draw(), D++;
                }, 500));
            },
            isDirty: function(t) {
                for (var e = void 0, n = 0; n < t.children.length; n++) {
                    if (e = t.children[n], e.dirty) return e.dirty = !1, !0;
                    if (this.isDirty(t.children[n])) return !0;
                }
                return !1;
            },
            setDynamicHeight: function(t, e) {
                console.log("dynamicHeight:" + t), wx.setWidgetSize ? wx.setWidgetSize({
                    height: t,
                    success: function(t) {
                        e && e(t.errCode);
                    },
                    fail: function(t) {
                        e && e(t.errCode);
                    }
                }) : e && e();
            },
            processDynamicHeightTree: function(t) {
                var e = new s.default({
                    attr: {
                        class: "__dynamic-height-container"
                    },
                    parentNode: t,
                    children: t.children
                });
                return e.children.forEach(function(t) {
                    t.parentNode = e;
                }), t.children = [ e ], t;
            },
            scaleSize: function(t) {
                var e = this, n = this.scaleRatio;
                [ "width", "height", "left", "top", "right", "bottom", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "borderWidth", "borderTopWidth", "borderBottomWidth", "borderLeftWidth", "borderRightWidth", "fontSize", "lineHeight" ].forEach(function(r) {
                    null != t.style[r] && (t.style[r] = "fontSize" === r ? Math.max(e.minFontSize, Math.round(n * t.style[r])) : Math.round(n * t.style[r]));
                }), t.children.forEach(function(t) {
                    e.scaleSize(t);
                });
            },
            handleTap: function(t) {
                var e = this.layoutDebug, n = t.x, r = t.y, o = this.root, i = [], a = void 0, l = void 0, u = !1;
                if (o) {
                    if (this.detectTap(o, n, r, i), !(l = i[i.length - 1])) return u;
                    if (e) w.default.outputElementStyleInfo(l), T = l, u = !0; else for (;i.length; ) {
                        a = i.pop();
                        var s = {
                            x: n,
                            y: r,
                            target: l,
                            currentTarget: a
                        };
                        if ("function" == typeof a.attr.bindtap && (a.attr.bindtap(s), u = !0), "function" == typeof a.attr.catchtap) {
                            a.attr.catchtap(s), u = !0;
                            break;
                        }
                    }
                }
                return u;
            },
            detectTap: function(t, e, n, r) {
                if (t.isInnerPoint(e, n)) {
                    r.push(t);
                    for (var o = 0; o < t.children.length; o++) {
                        var i = t.children[o];
                        this.detectTap(i, e, n, r);
                    }
                }
            },
            __setContainerSize: function(t) {
                t.attr.class = "root", t.style.width = 384, t.style.height = Math.floor(384 * this.windowHeight / this.windowWidth), 
                t.style.fontSize = 14;
            },
            setRender: function(t) {
                this.render = t;
            },
            setData: function(t) {
                this.data = Object.assign(this.data || {}, t), this.draw();
            },
            setClassObj: function(t) {
                this.classObj = t;
            },
            getSystemInfo: function(t) {
                k ? setTimeout(function() {
                    t && t(k);
                }, 0) : j ? j.push(t) : (j = [ t ], wx.getSystemInfo({
                    success: function(t) {
                        k = t, j.forEach(function(e) {
                            e(t);
                        }), j = [];
                    }
                }));
            },
            useDynamicHeight: function() {
                P.useDynamicHeight = !0;
            },
            compareVersion: function(t, e) {
                if (!t && !e) return 0;
                if (!t) return -1;
                if (!e) return 1;
                t = t.split("."), e = e.split(".");
                for (var n = 0; n < t.length; n++) {
                    var r = Number(t[n] || 0), o = Number(e[n] || 0);
                    if (r > o) return 1;
                    if (r < o) return -1;
                }
                return 0;
            },
            canIUse: function(t, e) {
                var n = this;
                if (!M[t]) return void (e && e(!1));
                this.getSystemInfo(function(r) {
                    "ios" === r.platform && n.compareVersion(r.version, M[t][0]) >= 0 || "android" === r.platform && n.compareVersion(r.version, M[t][1]) >= 0 ? e && e(!0) : e && e(!1);
                });
            },
            openUrl: function(t) {
                "string" == typeof t && (t.startsWith("http") || t.startsWith("https")) ? wx.openApp ? wx.openApp({
                    url: t
                }) : console.log("no api openApp") : console.log("wrong args, url must start with http or https");
            },
            genParamToUrl: function(t, e) {
                return t = encodeURIComponent(t), e = encodeURIComponent(e), t + "=" + e;
            },
            iOSOpenNativeApp: function(t, e, n) {
                wx.openApp ? wx.openApp({
                    url: openNativeAppPlaceholder + "?" + this.genParamToUrl("appPageUrl", t) + "&" + this.genParamToUrl("openSdkAppId", e) + "&" + this.genParamToUrl("jumpItuensUrl", n)
                }) : console.log("no api openApp");
            },
            androidOpenNativeApp: function(t, e, n, r) {
                wx.openApp ? wx.openApp({
                    url: openNativeAppPlaceholder + "?" + this.genParamToUrl("pkgName", t) + "&" + this.genParamToUrl("extra", e) + "&" + this.genParamToUrl("extraIntentKey", n) + "&" + this.genParamToUrl("fallbackUrl", r)
                }) : console.log("no api openApp");
            }
        };
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = {
            flexDirection: "row",
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            margin: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            borderWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            position: "relative",
            flexGrow: null,
            flexShrink: 1,
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: "stretch",
            alignSelf: null,
            left: null,
            right: null,
            top: null,
            bottom: null,
            width: null,
            height: null
        }, o = {
            row: "width",
            column: "height"
        }, i = {
            row: "left",
            column: "top"
        }, a = {
            row: "right",
            column: "bottom"
        }, l = function() {
            return {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            };
        }, u = function(t) {
            return t.charAt(0).toUpperCase() + t.slice(1);
        }, s = function(t, e, n) {
            return e ? !n && t._calculateStyle && null != t._calculateStyle[e] ? t._calculateStyle[e] : t.style && null != t.style[e] ? t.style[e] : r[e] : t.style;
        }, c = function(t, e) {
            return e in t.style;
        }, h = function(t, e) {
            var n = "padding" + u(e), r = c(t, n), o = c(t, "padding");
            return r ? s(t, n) : o ? s(t, "padding") : 0;
        }, f = function(t, e) {
            var n = "margin" + u(e), r = c(t, n), o = c(t, "margin");
            return r ? s(t, n) : o ? s(t, "margin") : 0;
        }, d = function(t, e) {
            var n = "border" + u(e) + "Width", r = c(t, n), o = c(t, "borderWidth");
            return r ? s(t, n) : o ? s(t, "borderWidth") : 0;
        }, p = function(t, e) {
            return (s(t, i[e]) || 0) - (s(t, a[e]) || 0);
        }, y = function(t, e) {
            var n = s(t, o[e]), r = h(t, i[e]) + h(t, a[e]);
            return Math.max(n, r);
        }, g = function(t, e) {
            return f(t, i[e]) + (p(t, e) || 0 - p(t, e) || 0);
        }, v = function(t, e) {
            var n = t.layout[o[e]];
            return Math.max(0, (n || 0) - h(t, i[e]) - h(t, a[e]) - d(t, i[e]) - d(t, a[e]));
        }, m = function(t, e) {
            return s(t, o[e]) + f(t, i[e]) + f(t, a[e]);
        }, _ = function(t) {
            for (var e = 0, n = 0; n < t.length; n++) e += Number(s(t[n], "flexGrow"));
            return e;
        }, b = function(t, e, n) {
            for (var r = e / _(t), i = 0; i < t.length; i++) {
                var a = Number(s(t[i], "flexGrow")), l = r <= 0 ? 0 : a * r;
                t[i].layout[o[n]] = t[i]._calculateStyle[o[n]] = l;
            }
        }, w = function(t, e, n, r, l, u) {
            var s = 0, c = void 0, h = t.concat(e).sort(function(t, e) {
                return t._columnIndex - e._columnIndex;
            }), d = 0 === t.length || l < 0, y = void 0;
            d && "flex-start" !== n ? "flex-end" === n ? s = l : "center" === n ? s = l / 2 : "space-around" === n && (l < 0 && (s = l / 2), 
            y = Math.max(0, l) / (2 * h.length)) : s = 0;
            for (var g = 0; g < h.length; g++) c = h[g], d && ("space-between" === n ? s += 0 === c._columnIndex ? 0 : Math.max(0, l) / (h.length - 1) : "space-around" === n && (s += 0 === c._columnIndex ? y : 2 * y)), 
            s += f(c, i[r]), c.layout[i[r]] = u + s + p(c, r), s += c.layout[o[r]] + f(c, a[r]);
            return s;
        }, x = function(t, e) {
            return s(t, "alignSelf") || s(e, "alignItems");
        }, S = function(t) {
            return "absolute" === s(t, "position");
        }, O = function(t, e, n, r, l, u) {
            var c = (s(l, "alignItems"), s(l, "alignContent")), h = n.length >= 2 ? n.reduce(function(t, e) {
                return t + e;
            }) : 1 === n.length ? n[0] : 0, d = r - h;
            n.length > 1 ? "stretch" === c && (n = n.map(function(t) {
                return Math.max(0, d) / n.length + t;
            })) : n = [ r ];
            for (var y = 0; y < e.length; y++) {
                var g = e[y], v = s(g, o[t], !0), _ = x(g, l), b = 0, w = 0, S = 0;
                g.layout[o[t]] = "stretch" === _ && null == v ? n[g._lineIndex] - f(g, i[t]) - f(g, a[t]) : s(g, o[t]), 
                "flex-start" === _ || "stretch" === _ ? b = f(g, i[t]) : "flex-end" === _ ? b = n[g._lineIndex] - g.layout[o[t]] - f(g, a[t]) : "center" === _ && (b = (n[g._lineIndex] - m(g, t)) / 2 + f(g, i[t])), 
                n.length > 1 && ("flex-start" === c || "stretch" === c ? w = 0 : "flex-end" === c ? w = r - h : "space-between" === c ? w = Math.max(0, d) / (n.length - 1) * g._lineIndex : "space-around" === c && (w = d < 0 ? d / 2 : d / (2 * n.length) * (2 * g._lineIndex + 1))), 
                S = g._lineIndex >= 2 ? n.slice(0, g._lineIndex).reduce(function(t, e) {
                    return t + e;
                }) : n[g._lineIndex - 1] || 0, g.layout[i[t]] = u + w + b + S + p(g, t), A(g);
            }
        }, T = function(t, e, n, r) {
            var l = r - n, u = 0, c = 0, h = [], d = [];
            return t.forEach(function(t, n) {
                d[n] = Math.max(0, s(t, "flexShrink")), h[n] = y(t, e) * d[n], c += h[n];
            }), t.forEach(function(t, n) {
                var r = f(t, i[e]) + f(t, a[e]);
                h[n] > 0 && (t.layout[o[e]] = Math.max(0, t.layout[o[e]] - h[n] / c * l)), u += t.layout[o[e]] + r;
            }), u;
        }, P = function t(e, n, r) {
            e.style = e.style || {}, e.children = e.children || [], e._calculateStyle = e._calculateStyle || {};
            var o = s(e, "flexDirection"), i = e.children.filter(function(t) {
                return !S(t);
            });
            n -= j(e, "row");
            var a = s(e, "width"), l = 0;
            return null == a ? e.measureText ? (D(e, n), r ? e._calculateStyle.width + f(e, "left") + f(e, "right") : e._calculateStyle.width) : ("row" === o ? i.forEach(function(e) {
                var r = t(e, n - l - f(e, "left") - f(e, "right"), !0);
                l += r;
            }) : i.forEach(function(e) {
                var r = t(e, n, !0);
                r > l && (l = r);
            }), r ? l + j(e, "row") + f(e, "left") + f(e, "right") : l + j(e, "row")) : r ? m(e, "row") : a;
        }, M = function t(e, n, r, o) {
            e.style = e.style || {}, e.children = e.children || [], e._calculateStyle = e._calculateStyle || {};
            var i = s(e, "flexDirection"), a = e.children.filter(function(t) {
                return !S(t);
            });
            r -= j(e, "column"), s(e, "width") ? n = s(e, "width") - j(e, "row") : n -= j(e, "row");
            var l = s(e, "height"), u = 0;
            return null == l ? e.measureText ? (D(e, n), o ? e._calculateStyle.height + f(e, "top") + f(e, "bottom") : e._calculateStyle.height) : ("column" === i ? a.forEach(function(e) {
                u += t(e, n, r, !0);
            }) : a.forEach(function(e) {
                var o = t(e, n, r, !0);
                o > u && (u = o);
            }), o ? u + j(e, "column") + f(e, "top") + f(e, "bottom") : u + j(e, "column")) : o ? m(e, "column") : l;
        }, j = function(t, e) {
            return h(t, i[e]) + h(t, a[e]) + d(t, i[e]) + d(t, a[e]);
        }, k = function(t) {
            t.style = t.style || {}, t.layout = t.layout || l();
            var e = s(t, "flexDirection"), n = "row" === e ? "column" : "row", r = y(t, e), a = y(t, n);
            g(t, e), "relative" === s(t, "position") && (t.layout[o[e]] = r, t.layout[o[n]] = a, 
            t.layout[i[e]] += g(t, e), t.layout[i[n]] += g(t, n)), A(t);
        }, D = function(t, e) {
            t.style = t.style || {}, t.layout = t.layout || l(), t._calculateStyle = {};
            var n = void 0, r = void 0, o = void 0, i = void 0, a = void 0;
            i = t.measureText() + j(t, "row"), null == s(t, "width") ? (o = Math.ceil(i / e), 
            n = i > e ? e : i) : (n = s(t, "width"), o = Math.ceil(i / n)), "ellipsis" === s(t, "textOverflow") && (a = s(t, "lineClamp") || 1, 
            o = Math.min(o, a)), r = null == s(t, "height") ? t.getLineHeight() * o + j(t, "column") : s(t, "height"), 
            t._calculateStyle.width = n, t._calculateStyle.height = r;
        }, A = function t(e) {
            var n = e.children || [], r = void 0, u = void 0, c = s(e, "flexDirection"), p = "row" === c ? "column" : "row", y = v(e, c), g = v(e, p);
            if (e.layout.contentWidth = "row" === c ? y : g, e.layout.contentHeight = "row" === c ? g : y, 
            n.length) {
                var _ = (s(e, "flexDirection"), s(e, "flexWrap")), x = s(e, "justifyContent"), j = (s(e, "width"), 
                s(e, "height")), k = [], A = [], I = 0, C = 0, W = 0, L = [], N = 0, B = void 0, R = h(e, i[c]) + d(e, i[c]), E = h(e, i[p]) + d(e, i[p]), z = void 0;
                r = n.filter(function(t) {
                    return !S(t);
                });
                for (var F = 0; F < r.length; F++) {
                    var H = r[F];
                    H.style = H.style || {}, H.layout = H.layout || l(), H._calculateStyle = {};
                    var U = s(H, "flexGrow");
                    s(H, "position"), H._columnIndex = W, H._lineIndex = C, 0 === W && (N = 0, I = 0, 
                    k = [], A = []);
                    var G = s(H, o[c]), V = s(H, o[p]), $ = f(H, "left") + f(H, "right");
                    if (null == G && null == U && ("row" === c ? H._calculateStyle.width = P(H, e.layout.contentWidth - I - $) : H._calculateStyle.height = M(H, e.layout.contentWidth, e.layout.contentHeight)), 
                    null == V && ("row" === c ? H._calculateStyle.height = M(H, e.layout.contentWidth - I - $, e.layout.contentHeight) : H._calculateStyle.width = P(H, e.layout.contentWidth)), 
                    H.measureText && ("row" === c ? D(H, e.layout.contentWidth - I - $) : D(H, e.layout.contentWidth)), 
                    z = null != U ? f(H, i[c]) + f(H, a[c]) : m(H, c), B = I + z > y, "wrap" === _ && B && W > 0) b(k, y - I, c), 
                    L[C] = N, w(k, A, x, c, y - I, R), C += 1, W = 0, F--; else {
                        if (m(H, p) > N && (N = m(H, p)), null != U) k.push(H); else {
                            var J = s(H, o[c]);
                            null != J && (H.layout[o[c]] = J), A.push(H);
                        }
                        if (I += z, F === r.length - 1 || "wrap" === _ && B && 0 === W) {
                            var X = void 0;
                            b(k, y - I, c), B && (X = T(A, c, y, I)), L[C] = N, w(k, A, x, c, null == X ? y - I : y - X, R), 
                            W = 0;
                        }
                        W += 1;
                    }
                }
                O(p, r, L, g, e, E), u = n.filter(function(t) {
                    return S(t);
                });
                for (var Y = 0; Y < u.length; Y++) {
                    var K = u[Y];
                    K.style = K.style || {}, K.layout = K.layout || l();
                    var Z = s(K, "left"), q = s(K, "top"), Q = s(K, "right"), tt = s(K, "bottom"), et = "main" === c ? y : g, nt = "main" === c ? g : y, rt = s(K, "height"), ot = s(K, "width"), it = void 0, at = void 0;
                    K.layout.width = null != Z && null != Q ? et - Z - Q : null != ot ? ot : P(K, 1e4, !0), 
                    K.layout.height = null != q && null != tt ? nt - q - tt : null != rt ? rt : M(K, K.layout.width, e.layout.contentHeight, !0), 
                    null != Z ? it = f(K, "left") + Z : null != Q && (it = et - f(K, "right") - K.layout.width - Q), 
                    null != q ? at = f(K, "top") + d(K, "top") + q : null != tt && (at = j - f(K, "bottom") - K.layout.height - tt), 
                    K.layout.left = it || 0, K.layout.top = at || 0, t(K);
                }
            }
        };
        e.default = k;
    }, function(t, e, n) {
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : _typeof(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
        }, i = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        }(), a = function() {
            function t(e) {
                r(this, t), e = e || {}, this.attr = e.attr || {}, this.style = e.style || {}, this.nextSibling = e.nextSibling, 
                this.previousSbling = e.previousSbling, this.parentNode = e.parentNode, this.children = e.children || [];
            }
            return i(t, [ {
                key: "insertBefore",
                value: function(t, e) {
                    for (var n = e.parentNode ? e.parentNode.children : root.children, r = 0; r < n.length; r++) if (n[r] === e) return e === t ? n[r] = t : n.splice(r, 0, t), 
                    void (t.parentNode = this);
                }
            }, {
                key: "isFirstChild",
                value: function() {
                    return 0 === this.getIndexInParent();
                }
            }, {
                key: "isLastChild",
                value: function() {
                    var t = this.parentNode;
                    return !t || this.getIndexInParent() === t.children.length - 1;
                }
            }, {
                key: "getIndexInParent",
                value: function() {
                    return this.parentNode ? this.parentNode.children.indexOf(this) : 0;
                }
            }, {
                key: "remove",
                value: function() {
                    var t = this.parentNode ? this.parentNode.children : root.children, e = t.indexOf(this);
                    t.splice(e, 1), this.parentNode = null;
                }
            }, {
                key: "__resetParentNode",
                value: function(t) {
                    var e = this;
                    t.children = t.children || [], t.children.forEach(function(n) {
                        n.parentNode = t, e.__resetParentNode(n);
                    });
                }
            }, {
                key: "__deepClone",
                value: function(e) {
                    var n = void 0;
                    n = e instanceof t ? new e.constructor(e) : new e.constructor();
                    for (var r in e) "parentNode" !== r && "nextSibling" !== r && "previousSbling" !== r && (n[r] = "object" === o(e[r]) ? this.__deepClone(e[r]) : e[r]);
                    return n;
                }
            }, {
                key: "cloneNode",
                value: function(e) {
                    if (e) {
                        var n = this.__deepClone(this);
                        return this.__resetParentNode(n), n.__proto__ = this.__proto__, n;
                    }
                    return new t(this);
                }
            }, {
                key: "toString",
                value: function() {
                    var t = this.constructor.name.toLocaleLowerCase(), e = this.children.map(function(t) {
                        return t.toString();
                    }), n = [];
                    for (var r in this.attr) null != this.attr[r] && "content" !== r && n.push(" " + r + '="' + this.attr[r] + '"');
                    return "<" + t + n.join("") + ">" + (e.length ? e.join("") : null != this.attr.content ? this.attr.content : "") + "</" + t + ">";
                }
            } ]), t;
        }();
        e.default = a;
    }, function(t, e, n) {
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function o(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != (void 0 === e ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }
        function i(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof(e)));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        }(), l = n(0), u = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(l), s = function(t) {
            function e(t) {
                r(this, e);
                var n = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                return n.attr.src = t.attr.src, n;
            }
            return i(e, t), a(e, [ {
                key: "draw",
                value: function() {
                    var t = this.ctx;
                    this.attr.src && t.drawImage(this.attr.src, 0, 0, this.layout.width, this.layout.height);
                }
            } ]), e;
        }(u.default);
        e.default = s;
    }, function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != (void 0 === e ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof(e)));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var l = n(2), u = r(l), s = n(0), c = r(s), h = n(1), f = r(h), d = n(9), p = r(d), y = n(10), g = r(y), v = {
            __onNavigatorTap: function(t) {
                var e = t.target.attr, n = e.type, r = e.url, o = void 0;
                "location" === n ? (console.log("location authorize"), wx.authorize && wx.authorize({
                    scope: "scope.userLocation"
                })) : r && (o = r.match(/^tel\:(.*)/), o && wx.makePhoneCall ? wx.makePhoneCall({
                    phoneNumber: o[1]
                }) : wx.openApp && wx.openApp({
                    url: r
                }));
            }
        }, m = function(t) {
            function e(t) {
                var n;
                o(this, e);
                var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)), a = (0, 
                p.default)(Object.assign(v, r.attr), {
                    View: c.default,
                    Text: u.default
                });
                return a.attr = r.attr, f.default.processStyle(a, g.default), n = a, i(r, n);
            }
            return a(e, t), e;
        }(u.default);
        e.default = m;
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function(t) {
            return t.filter(function(t) {
                return null != t;
            });
        };
        e.default = function(t, e) {
            var n = e.View, o = e.Text;
            return e.Image, e.Navigator, e.Location, Object.assign(t, {}), new n({
                style: {},
                attr: {},
                children: r([ new o({
                    style: {},
                    attr: {
                        class: "wx_navigator",
                        bindtap: t.__onNavigatorTap,
                        url: t.url,
                        type: t.type,
                        content: t.content
                    },
                    children: r([])
                }) ])
            });
        };
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            wx_navigator: {
                color: "#509FC9",
                paddingBottom: 10,
                paddingLeft: 5,
                paddingRight: 5
            }
        };
    }, function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != (void 0 === e ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof(e)));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var l = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        }(), u = n(2), s = r(u), c = n(0), h = r(c), f = n(1), d = r(f), p = n(12), y = r(p), g = n(13), v = r(g), m = {
            isReset: !1
        }, _ = function(t) {
            function e(t) {
                var n;
                o(this, e);
                var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)), a = r;
                return r.data = {
                    __onLocationTap: function() {
                        return !0;
                    },
                    __onLocationBtnTap: function(t) {
                        m.isReset && a.attr.reseturl ? wx.openApp({
                            url: a.attr.reseturl
                        }) : wx.authorize && wx.authorize({
                            scope: "scope.userLocation",
                            success: function() {
                                console.log("User Location Success!");
                            },
                            fail: function() {
                                console.log("User Location Error!"), a.rejectRefresh();
                            }
                        });
                    }
                }, r.element = r.render(), d.default.processStyle(r.element, v.default), n = r.element, 
                i(r, n);
            }
            return a(e, t), l(e, [ {
                key: "render",
                value: function() {
                    return (0, y.default)(Object.assign(this.data, m, this.attr), {
                        View: h.default,
                        Text: s.default
                    });
                }
            }, {
                key: "rejectRefresh",
                value: function() {
                    this.element.dirty = !0, m.isReset = !0;
                }
            } ]), e;
        }(h.default);
        e.default = _;
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function(t) {
            return t.filter(function(t) {
                return null != t;
            });
        };
        e.default = function(t, e) {
            var n = e.View, o = e.Text;
            return e.Image, e.Navigator, e.Location, Object.assign(t, {
                $str42557245: "地理位置已关闭，请前往小程序重新设置",
                $str87568018: "无法获取位置信息",
                $str43637907: "前往设置",
                $str75949486: "点击获取"
            }), new n({
                style: {},
                attr: {},
                children: r([ new n({
                    style: {},
                    attr: {
                        class: "wx_location",
                        bindtap: t.__onLocationTap,
                        reseturl: t.reseturl
                    },
                    children: r([ new o({
                        style: {},
                        attr: {
                            class: "wx_location_tip",
                            content: t.isReset ? t.$str42557245 : t.$str87568018
                        },
                        children: r([])
                    }), new o({
                        style: {},
                        attr: {
                            class: "wx_location_btn",
                            bindtap: t.__onLocationBtnTap,
                            content: " " + (t.isReset ? t.$str43637907 : t.$str75949486)
                        },
                        children: r([])
                    }) ])
                }) ])
            });
        };
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            wx_location: {
                flexDirection: "column",
                alignItems: "center",
                width: 384
            },
            wx_location_tip: {
                marginTop: 42,
                color: "#888888",
                fontSize: 16
            },
            wx_location_btn: {
                color: "#1AAD19",
                paddingTop: 8,
                paddingBottom: 8,
                width: 130,
                textAlign: "center",
                marginTop: 30,
                marginBottom: 48,
                borderWidth: 1,
                borderColor: "#1AAD19",
                borderRadius: 6
            }
        };
    }, function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function i(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != (void 0 === e ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof(e)));
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var l = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(t, r.key, r);
                }
            }
            return function(e, n, r) {
                return n && t(e.prototype, n), r && t(e, r), e;
            };
        }(), u = n(2), s = (r(u), n(0)), c = r(s), h = n(1), f = (r(h), n(15)), d = (r(f), 
        n(16)), p = (r(d), n(17)), y = r(p), g = function(t) {
            function e(t) {
                o(this, e);
                var n = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                return n.style.width = 410, n.style.height = 160, n;
            }
            return a(e, t), l(e, [ {
                key: "draw",
                value: function() {
                    var t = this.style, e = t.width, n = t.height, r = this.attr, o = r.xnum, i = r.ynum, a = r.hot;
                    new y.default.Trend({
                        ctx: this.ctx,
                        width: e,
                        height: n,
                        xnum: o,
                        ynum: i,
                        hot: a
                    }).setSeries([ {
                        name: "",
                        data: this.attr.data
                    } ], n);
                }
            } ]), e;
        }(c.default);
        e.default = g;
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function(t) {
            return t.filter(function(t) {
                return null != t;
            });
        };
        e.default = function(t, e) {
            var n = e.View;
            return e.Text, e.Image, e.Navigator, e.Location, Object.assign(t, {}), new n({
                style: {},
                attr: {},
                children: r([ new n({
                    style: {},
                    attr: {
                        class: "wx_line_chart"
                    },
                    children: r([])
                }) ])
            });
        };
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            wx_line_chart: {}
        };
    }, function(t, e, n) {
        function r(t, e, n, r) {
            if (n && r || (n = .15, r = .15), e < 1) var o = t[0].x + (t[1].x - t[0].x) * n, i = t[0].y + (t[1].y - t[0].y) * n; else var o = t[e].x + (t[e + 1].x - t[e - 1].x) * n, i = t[e].y + (t[e + 1].y - t[e - 1].y) * n;
            if (e > t.length - 3) var a = t.length - 1, l = t[a].x - (t[a].x - t[a - 1].x) * r, u = t[a].y - (t[a].y - t[a - 1].y) * r; else var l = t[e + 1].x - (t[e + 2].x - t[e].x) * r, u = t[e + 1].y - (t[e + 2].y - t[e].y) * r;
            return {
                pA: {
                    x: o,
                    y: i
                },
                pB: {
                    x: l,
                    y: u
                }
            };
        }
        var o = function() {};
        o.prototype.init = function() {
            return this;
        }, o.prototype.setData = function() {
            return this;
        }, o.prototype.formatData = function() {
            return this;
        }, o.prototype.paintGrid = function() {
            return this;
        }, o.prototype.initEvent = function() {
            return this;
        }, o.prototype.prepare = function(t) {
            return this.opt = t, this.opt.scale, this.width = t.width, this.height = t.height, 
            this.low = 0, this.high = 0, this.dataLength = 0, this.rectMain = {
                x: 50,
                y: Math.floor(.05 * this.height),
                w: Math.floor(this.width - 70),
                h: Math.floor(.8 * this.height)
            }, this.initEvent(), this;
        }, o.prototype.getXY = function(t, e) {
            var n = (this.opt, Math.min(e.length, this.dataLength)), r = this.high, o = this.low, i = this.rectMain, a = i.w, l = i.h, u = i.x, s = i.y, c = e[t], h = void 0 === r || void 0 === o ? void 0 : r - o == 0 ? 0 : l / (r - o);
            return c ? {
                x: n <= 1 ? u : Math.round(u + a / (n - 1) * t),
                y: void 0 === h ? void 0 : 0 === h ? Math.round(s + l / 2) : Math.round(s + l - h * (c.d - o))
            } : {
                x: void 0,
                y: void 0
            };
        };
        var i = function(t) {
            this.prepare({
                width: t.width - 8,
                height: t.height,
                xnum: t.xnum || 3,
                ynum: t.ynum || 3,
                hot: t.hot,
                decimal: 0,
                during: 2e3,
                tagDelay: 1e3,
                scale: 1,
                mainLine: {
                    color: "#000000",
                    width: 2
                },
                refLine: {
                    color: "#e6e6e6",
                    width: .8
                },
                xAxis: {
                    color: "#6A6A6A",
                    baseline: "middle",
                    align: "center"
                },
                yAxis: {
                    color: "#797979",
                    baseline: "middle",
                    align: "right"
                },
                tagStyle: {
                    show: !0,
                    color: "#1AAD19",
                    baseline: "top",
                    lineHeight: 20,
                    borderStyle: "#eeeeee",
                    backgroundStyle: "#ffffff"
                },
                ctx: t.ctx
            });
        };
        i.prototype = new o(), i.prototype.constructor = i, i.prototype.init = function() {
            this.formatData(), this.paintGrid(), this.paintTrend();
        }, i.prototype.setSeries = function(t, e) {
            t.length <= 0 || (this.seriesData = t, this.dataLength = function() {
                for (var e = t[0].data.length, n = 1; n < t.length; n++) e > t[n].data.length && (e = t[n].data.length);
                return e;
            }(), this.height = e || 100, this.rectMain = {
                x: 50,
                y: Math.floor(10),
                w: Math.floor(this.width - 70),
                h: Math.floor(this.height - 45)
            }, this.xnum = Math.min(this.opt.xnum, this.dataLength), this.ynum = this.opt.ynum, 
            this.init());
        }, i.prototype.formatData = function() {
            var t, e, n, r, o, i, a, l, u = this.seriesData.length, s = this.dataLength, c = this.xnum;
            for (this.ynum, Math.floor(s / (c - 1)), t = 0; t < u; t++) for (e = 0; e < s; e++) (r = this.seriesData[t].data[e]) && "d" in r && (r.d || "0" === r.d || 0 === r.d) && (o = r.d - 0, 
            i = void 0 === i ? o : Math.min(i, o - 0), a = void 0 === a ? o : Math.max(a, o - 0));
            l = Math.ceil((a - i) / 2);
            var h = function(t) {
                var e = t.toString().length;
                return e >= 3 ? 100 * Math.ceil(t / 100) : e >= 2 ? 10 * Math.ceil(t / 10) : t;
            };
            if (0 === l) a - 0 == 0 ? a = 10 : (n = i.toString().length, n >= 7 ? (this.unit = "M", 
            r = Math.ceil(i / 1e6), o = Math.ceil(a / 1e6), f = h(r + o), a = 1e6 * f) : n >= 4 ? (this.unit = "k", 
            r = Math.ceil(i / 1e3), o = Math.ceil(a / 1e3), f = h(r + o), a = 1e3 * f) : (this.unit = "", 
            r = Math.ceil(i / 10), o = Math.ceil(a / 10), f = h(r + o), a = 10 * f)); else {
                n = l.toString().length;
                var f = 0;
                n >= 7 ? (this.unit = "M", r = Math.ceil(i / 1e6), o = Math.ceil(a / 1e6), f = h(r + o), 
                a = 1e6 * f) : n >= 4 ? (this.unit = "k", r = Math.ceil(i / 1e3), o = Math.ceil(a / 1e3), 
                f = h(r + o), a = 1e3 * f) : (this.unit = "", r = Math.ceil(i / 10), o = Math.ceil(a / 10), 
                f = h(r + o), a = 10 * f);
            }
            this.low = 0, this.high = a;
        }, i.prototype.paintGrid = function() {
            var t, e, n, r, o = this.opt, i = o.ctx, a = this.seriesData[0].data || [], l = this.high, u = this.low, s = this.xnum, c = this.ynum, h = (o.xAxis, 
            o.yAxis, this.rectMain), f = h.x, d = h.y, p = h.w, y = h.h, g = p / (s - 1), v = y / (c - 1), m = this.dataLength, _ = Math.floor(m / (s - 1)), b = Math.floor((l - u) / (c - 1));
            for (i.save(), i.beginPath(), i.setStrokeStyle(o.refLine.color), i.setLineWidth(o.refLine.width), 
            i.setFontSize(10), i.setFillStyle(o.xAxis.color), e = 0; e < s; e++) n = Math.floor(g * e), 
            i.moveTo(f + n, d + y), i.lineTo(f + n, d + y + 10), a[e * _] && e != s - 1 && (t = 4 === a[e * _].t.length ? 8 : 12, 
            i.fillText(a[e * _].t, f + n - t, d + y + 25)), e == s - 1 && (t = 4 === a[m - 1].t.length ? 8 : 12, 
            i.fillText(a[m - 1].t, f + n - t, d + y + 25));
            for (i.setFillStyle(o.yAxis.color), e = 0; e < c; e++) if (r = Math.floor(v * e), 
            i.moveTo(f - 5, d + r), i.lineTo(f + p + 5, d + r), e == c - 1) i.fillText("0", 20, d + r); else {
                var w;
                w = "M" == this.unit ? l / 1e6 - b / 1e6 * e + this.unit : "k" == this.unit ? l / 1e3 - b / 1e3 * e + this.unit : l - b * e + this.unit, 
                i.fillText(w, 16, d + r);
            }
            i.stroke(), i.restore();
        }, i.prototype.paintTrend = function() {
            var t, e, n, o, i, a = this, l = a.opt, u = a.seriesData.length, s = a.dataLength, c = this.rectMain, h = (c.w, 
            c.h), f = c.x, d = c.y, p = l.ctx, y = l.hot;
            for (p.save(), t = 0; t < u; t++) {
                for (o = [], e = 0; e < s; e++) n = a.getXY(e, a.seriesData[t].data), void 0 !== n.x && void 0 !== n.y && o.push(n);
                for (p.beginPath(), p.setStrokeStyle(a.seriesData[t].color || l.mainLine.color), 
                p.setLineWidth(l.mainLine.width), e = 0; e < o.length; e++) 0 == e ? p.moveTo(o[e].x, o[e].y) : Math.abs(o[e - 1].y - o[e].y) < 2 ? p.lineTo(o[e].x, o[e].y) : o[e].y > d + h - 10 || o[e - 1].y > d + h - 10 ? (i = r(o, e - 1, .02, .02), 
                p.bezierCurveTo(i.pA.x, i.pA.y, i.pB.x, i.pB.y, o[e].x, o[e].y)) : (i = r(o, e - 1), 
                p.bezierCurveTo(i.pA.x, i.pA.y, i.pB.x, i.pB.y, o[e].x, o[e].y));
                if (p.setLineWidth(2), y) {
                    var g = p.createLinearGradient(f, d, f, d + h);
                    p.setStrokeStyle("#AD0000"), p.stroke(), g.addColorStop(0, "rgba(216,0,9,0.9)"), 
                    g.addColorStop(1, "white"), p.setFillStyle(g), p.lineTo(o[o.length - 1].x, d + h), 
                    p.lineTo(o[0].x, d + h), p.lineTo(o[0].x, o[0].y), p.fill();
                } else p.setStrokeStyle("#48C23D"), p.stroke();
                p.restore();
            }
            p.draw();
        }, t.exports = {
            Trend: i
        };
    }, function(t, e, n) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = {
            drawDebugImage: function(t, e) {
                t.setGlobalAlpha(.4), t.drawImage(e);
            }
        };
    } ]);
});