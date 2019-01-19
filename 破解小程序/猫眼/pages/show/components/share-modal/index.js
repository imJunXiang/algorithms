function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, a) {
            function n(r, i) {
                try {
                    var s = t[r](i), o = s.value;
                } catch (e) {
                    return void a(e);
                }
                if (!s.done) return Promise.resolve(o).then(function(e) {
                    n("next", e);
                }, function(e) {
                    n("throw", e);
                });
                e(o);
            }
            return n("next");
        });
    };
}

var _canvasBlur = require("../../../../scripts/canvas-blur"), _utils = require("../../../../scripts/utils"), app = getApp(), PREFIX = "https://wx.maoyan.com/maoyansh/myshow/ajax";

Component({
    properties: {
        qrUrl: {
            type: String,
            value: "",
            observer: function(e, t) {}
        },
        showFlag: Number,
        performance: Object,
        shareId: Number
    },
    data: {
        shareImgUrl: "",
        backgroundHeight: 468,
        backgroundWidth: 270,
        useDrawCallback: !1
    },
    methods: {
        closeShareModal: function() {
            this.triggerEvent("close"), this.setData({
                shareImgUrl: ""
            });
        },
        emptyFunc: function() {},
        checkSetting: function(e) {
            wx.getSetting({
                success: function(t) {
                    t && "getSetting:ok" === t.errMsg && (!1 === t.authSetting["scope.writePhotosAlbum"] ? wx.showModal({
                        content: "检测到您未打开微信图片保存授权开启授权，即可保存图片",
                        confirmText: "去开启",
                        confirmColor: "#2FB922",
                        success: function(e) {
                            e.confirm && wx.openSetting({
                                success: function(e) {}
                            });
                        }
                    }) : e());
                }
            });
        },
        saveShareImg: function() {
            var e = this;
            this.checkSetting(function() {
                wx.saveImageToPhotosAlbum({
                    filePath: e.data.shareImgUrl,
                    success: function() {
                        e.saveShareImgStatus(), e.closeShareModal(), wx.showToast({
                            title: "图片已保存到相册，去分享到朋友圈/好友",
                            icon: "none"
                        });
                    }
                });
            });
        },
        shareToFriend: function() {
            this.closeShareModal();
        },
        startDraw: function() {
            var e = this;
            return _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var a, n, r;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (a = app.getPropSafely("$systemInfo.SDKVersion", app), n = a && 1 == (0, _utils.compareVersion)(a, "1.7.0") && app.isIphone, 
                        r = (0, _utils.compareVersion)(a, "1.9.90") >= 0, wx.canIUse("canvasGetImageData") && r) {
                            t.next = 6;
                            break;
                        }
                        return wx.showModal({
                            title: "提示",
                            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
                        }), t.abrupt("return");

                      case 6:
                        return e.setData({
                            generatingImg: !0,
                            useDrawCallback: n
                        }), e.triggerEvent("drawImage"), wx.showLoading({
                            title: "正在生成图片…",
                            mask: !0
                        }), t.prev = 9, t.next = 12, e.drawShareImg();

                      case 12:
                        t.next = 20;
                        break;

                      case 14:
                        t.prev = 14, t.t0 = t.catch(9), wx.hideLoading(), wx.showToast({
                            title: "喵呜~  图片生成失败，请重试",
                            icon: "none"
                        }), e.setData({
                            generatingImg: !1
                        }), e.closeShareModal();

                      case 20:
                      case "end":
                        return t.stop();
                    }
                }, t, e, [ [ 9, 14 ] ]);
            }))();
        },
        drawShareImg: function() {
            var e = this;
            return _asyncToGenerator(regeneratorRuntime.mark(function t() {
                var a, n, r, i, s, o, c, h, u, d, g, f, l, p, w, m, x, v, I, b, S, k, T, y;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return a = e.properties.performance, t.next = 3, app.systemInfo();

                      case 3:
                        return n = t.sent, r = n.pixelRatio, i = n.screenWidth, s = n.screenHeight, s > 1.775 * i && (s = 1.775 * i), 
                        o = app.rpx2px, c = [ "https://p1.meituan.net/moviesh/6da5051ad3c1200fe3b3ca972e2bc4b613284.png", "https://p0.meituan.net/moviesh/daedffa6c87e08ebd61f5192f2869d0c13090.png", "https://p1.meituan.net/moviesh/3ee84c68ef6f108d819d758a196f1a8a11856.png", "https://p0.meituan.net/moviesh/acbac8c127d64ff25600de40f87f19f612263.png" ], 
                        h = a.posterUrl, u = a.posterUrl, !/@/.test(h) && /\.meituan\.(com|net)/.test(h) && (u = h + "@270w_486h_1c_1e", 
                        h += "@540w_696h_1c_1e"), d = [ u, "https://p1.meituan.net/moviesh/4aeecc2a1d788e435dda0607574de5c4344112.jpg", "https://p1.meituan.net/moviesh/e6c23d1faee7410721373ecfb9b339611641.png", "https://p1.meituan.net/moviesh/6da5051ad3c1200fe3b3ca972e2bc4b613284.png", "https://p0.meituan.net/moviesh/cdb7d4c3f3a93aa43d8ff4a0d0bcdf695898.png", "https://p0.meituan.net/moviesh/4046e44e9a1c55e64c94ca818d1f0b45637.png", h ], 
                        d[3] = c[Math.floor(100 * Math.random()) % 4], t.next = 17, app.request().get(PREFIX + "/wxapp/qrcode").query({
                            width: 174,
                            page: "pages/show/detail/index",
                            scene: "utm_source=wxps&id=" + e.properties.shareId,
                            appId: app.appId
                        }).end().then(function(e) {
                            return e.body.data;
                        });

                      case 17:
                        if (!(g = t.sent)) {
                            t.next = 22;
                            break;
                        }
                        d[1] = g, t.next = 23;
                        break;

                      case 22:
                        throw new Error("获取小程序码失败");

                      case 23:
                        return f = d.map(function(t) {
                            return e.downloadFile(t);
                        }), t.next = 26, Promise.all(f);

                      case 26:
                        return l = t.sent, p = wx.createCanvasContext("my-canvas", e), e.setData({
                            screenWidth: i,
                            screenHeight: s,
                            width: i * r,
                            height: s * r
                        }), t.next = 31, e.drawGaussBlurImg(l[0]);

                      case 31:
                        return w = t.sent, p.drawImage(w.tempFilePath, 0, 0, i, s), p.drawImage(l[5], 0, 0, i, s), 
                        p.beginPath(), p.moveTo(o(30), o(24)), p.lineTo(o(722), o(24)), p.lineTo(o(722), o(1172)), 
                        p.lineTo(o(662), o(1232)), p.lineTo(o(30), o(1232)), p.closePath(), p.setFillStyle("white"), 
                        p.fill(), p.setFontSize(o(32)), p.setFillStyle("#000000"), m = e.textOverflow(p, a.name, o(544)), 
                        p.fillText(m, o(106), o(124), o(544)), p.setFontSize(o(24)), p.setFillStyle("#666666"), 
                        p.fillText(a.showTimeRange, o(106), o(166)), p.drawImage(l[2], o(48), o(166), o(66), o(64)), 
                        p.drawImage(l[6], o(106), o(194), o(540), o(696)), t.prev = 52, t.next = 55, e.getShareNumber();

                      case 55:
                        x = t.sent, t.next = 60;
                        break;

                      case 58:
                        t.prev = 58, t.t0 = t.catch(52);

                      case 60:
                        if (!((v = app.$user) && v.wxUserInfo && v.wxUserInfo.userInfo)) {
                            t.next = 74;
                            break;
                        }
                        return I = app.$user.wxUserInfo.userInfo, b = I.avatarUrl, S = I.nickName, t.next = 65, 
                        e.downloadFile(b);

                      case 65:
                        return k = t.sent, t.next = 68, e.drawAvatarImg(k);

                      case 68:
                        T = t.sent, p.drawImage(T.tempFilePath, o(106), o(922), o(50), o(50)), p.setFontSize(o(28)), 
                        p.setFillStyle("#4C6072"), y = e.textOverflow(p, S, o(248)), p.fillText(y, o(164), o(958), o(248));

                      case 74:
                        p.drawImage(l[3], o(106), o(1014), o(320), o(112)), p.setFontSize(o(24)), p.setFillStyle("#F03D37"), 
                        p.fillText("长按识别去购票", o(466), o(1138)), p.drawImage(l[1], o(464), o(934), o(174), o(174)), 
                        p.drawImage(l[4], o(30), o(1256), o(174), o(48)), e.ctxDraw(p, !1, function() {
                            wx.canvasToTempFilePath({
                                canvasId: "my-canvas",
                                destWidth: i * r,
                                destHeight: s * r,
                                success: function(t) {
                                    e.setData({
                                        shareImgUrl: t.tempFilePath,
                                        generatingImg: !1
                                    }), wx.hideLoading();
                                },
                                fail: function(e) {
                                    throw e;
                                }
                            }, e);
                        });

                      case 81:
                      case "end":
                        return t.stop();
                    }
                }, t, e, [ [ 52, 58 ] ]);
            }))();
        },
        ctxDraw: function(e, t, a) {
            if (this.data.useDrawCallback) try {
                e.draw(t, a);
            } catch (e) {} else e.draw(t), setTimeout(a, 200);
        },
        downloadFile: function(e) {
            return new Promise(function(t, a) {
                wx.downloadFile({
                    url: e,
                    success: function(e) {
                        var a = e.tempFilePath;
                        t(a);
                    },
                    fail: a
                });
            });
        },
        drawGaussBlurImg: function(e) {
            var t = this;
            return new Promise(function(a, n) {
                wx.getImageInfo({
                    src: e,
                    success: function(r) {
                        var i = wx.createCanvasContext("background", t);
                        i.width = 67, i.height = 121, t.setData({
                            backgroundHeight: i.height,
                            backgroundWidth: i.width
                        }), setTimeout(function() {
                            i.drawImage(e, 0, 0, i.width, i.height), t.ctxDraw(i, !1, function() {
                                wx.canvasGetImageData({
                                    canvasId: "background",
                                    x: 0,
                                    y: 0,
                                    width: i.width,
                                    height: i.height,
                                    success: function(e) {
                                        var r = (0, _canvasBlur.gaussBlur)(e);
                                        wx.canvasPutImageData({
                                            canvasId: "background",
                                            x: 0,
                                            y: 0,
                                            width: i.width,
                                            height: i.height,
                                            destWidth: 2 * i.width,
                                            destHeight: 2 * i.height,
                                            data: r.data,
                                            success: function(e) {
                                                t.ctxDraw(i, !0, function() {
                                                    wx.canvasToTempFilePath({
                                                        canvasId: "background",
                                                        width: i.width,
                                                        height: i.height,
                                                        destWidth: 2 * i.width,
                                                        destHeight: 2 * i.height,
                                                        success: function(e) {
                                                            a(e);
                                                        },
                                                        fail: function(e) {
                                                            n(e);
                                                        }
                                                    }, t);
                                                });
                                            }
                                        }, t);
                                    },
                                    fail: function(e) {
                                        n(e);
                                    }
                                }, t);
                            });
                        }, 100);
                    },
                    fail: function(e) {
                        n(e);
                    }
                });
            });
        },
        drawAvatarImg: function(e) {
            var t = this;
            return new Promise(function(a, n) {
                wx.getImageInfo({
                    src: e,
                    success: function(r) {
                        t.setData({
                            backgroundHeight: r.height,
                            backgroundWidth: r.width
                        }), setTimeout(function() {
                            var i = wx.createCanvasContext("background", t);
                            i.width = r.width, i.height = r.height, i.save(), i.beginPath(), i.arc(r.width / 2, r.height / 2, r.height / 2, 0, 2 * Math.PI), 
                            i.clip(), i.drawImage(e, 0, 0, r.width, r.height), i.restore(), t.ctxDraw(i, !1, function() {
                                wx.canvasToTempFilePath({
                                    canvasId: "background",
                                    width: r.width,
                                    height: r.height,
                                    destWidth: r.width,
                                    destHeight: r.width,
                                    success: function(e) {
                                        a(e);
                                    },
                                    fail: function(e) {
                                        n(e);
                                    }
                                }, t);
                            });
                        }, 200);
                    },
                    fail: function(e) {
                        n(e);
                    }
                });
            });
        },
        getShareNumber: function() {
            return app.request().post(PREFIX + "/share/addShareRecord").query({
                token: app.$user.token,
                sellChannel: 7
            }).header("content-type", "application/json").send({
                performanceId: this.properties.shareId
            }).end().then(function(e) {
                return e.body.data;
            });
        },
        textOverflow: function(e, t, a) {
            var n = e.measureText(t).width;
            if (n < a) return t;
            for (;n > a; ) t = t.substring(0, t.length - 1), n = e.measureText(t).width;
            return t + "...";
        },
        saveShareImgStatus: function() {
            this.triggerEvent("saveImage");
        }
    }
});