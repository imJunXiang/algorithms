function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, a) {
            function i(n, r) {
                try {
                    var o = e[n](r), s = o.value;
                } catch (t) {
                    return void a(t);
                }
                if (!o.done) return Promise.resolve(s).then(function(t) {
                    i("next", t);
                }, function(t) {
                    i("throw", t);
                });
                t(s);
            }
            return i("next");
        });
    };
}

var Tpl = require("../../../scripts/tpl"), util = require("../../../scripts/utils"), MIN_VERSION = "1.11.1", MODAL_TYPE = {
    NORMAL: "normal",
    REDPACKET: "redpacket"
};

module.exports = Tpl.extends({
    key: "activityModal",
    data: {
        showModal: !1,
        type: "",
        modalData: {}
    },
    isFormSidebar: !1,
    bindEvent: function() {
        this.page.hideModal = this.hideModal.bind(this), this.page.getModalData = this.getModalData.bind(this), 
        this.page.onTapRedpacketModal = this.onTapRedpacketModal.bind(this);
    },
    getModalData: function() {
        var t = this;
        return _asyncToGenerator(regeneratorRuntime.mark(function e() {
            var a, i, n, r, o, s, d;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (t.hideModal(), a = getApp(), i = "/" + t.page.route, n = a.getPropSafely("$operation.activityModal.hasShowModal", a, !1)) {
                        e.next = 23;
                        break;
                    }
                    return r = a.getPropSafely("$location.city.id", a, 0), o = a.getPropSafely("$user.token", a, null), 
                    e.t0 = a.$openId, e.t1 = a.channelId, e.t2 = a.scene, e.t3 = r, e.next = 13, a.uuidV2();

                  case 13:
                    return e.t4 = e.sent, e.next = 16, a.getFingerprint();

                  case 16:
                    return e.t5 = e.sent, s = {
                        openId: e.t0,
                        positionId: 1,
                        channelId: e.t1,
                        scene: e.t2,
                        cityId: e.t3,
                        uuid: e.t4,
                        clientType: 9,
                        wechatFingerprint: e.t5
                    }, o && (s.token = o), s.pageUrl = i, d = a.version.substr(8), s.versionCompatible = util.compareVersion(d, MIN_VERSION) >= -1, 
                    e.abrupt("return", a.request().get("https://api.maoyan.com/operation/exhibition.json").header({
                        "content-type": "application/json"
                    }).query(s).end().then(function(t) {
                        return t.body;
                    }).then(function(e) {
                        var i = !0, n = e.data, r = n.exhibit, o = n.exhibitionContentMap, s = n.backgroundImageUrl;
                        if (e.success && r) {
                            i = !1;
                            var d = a.system(), l = d.windowWidth, p = d.windowHeight;
                            p / l < 1.48 && (o.scale = 375 / l * p / 555), o.data ? t.renderRedpacketModal({
                                backgroundImageUrl: s,
                                exhibitionContentMap: o
                            }) : o.jumpUrl && s && t.renderNormalModal({
                                backgroundImageUrl: s,
                                exhibitionContentMap: o
                            }), a.$operation.activityModal.hasShowModal = !0;
                        }
                        return i;
                    }).catch(function(t) {
                        return console.log(t), !0;
                    }));

                  case 23:
                    return e.abrupt("return", Promise.resolve(!0));

                  case 24:
                  case "end":
                    return e.stop();
                }
            }, e, t);
        }))();
    },
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    },
    renderRedpacketModal: function(t) {
        var e = t.backgroundImageUrl, a = t.exhibitionContentMap, i = getApp();
        a.theme = a.theme ? JSON.parse(a.theme) : {}, a.theme.headMap = a.theme.headMap || e, 
        a.data = a.data.slice(0, 3).map(function(t) {
            return t.couponTheme && (t.couponTheme = i.img(t.couponTheme, 80, 114)), t.priceLimit = t.priceLimit || "", 
            t.value = t.value || "", 0 === t.value.indexOf("¥") ? t.value = [ "¥", t.value.substr(1) ] : t.value = [ t.value ], 
            t;
        }), a.val_lab = JSON.stringify({
            activity_id: a.businessActivityIdentity
        }), this.isFormSidebar ? a.data.length > 0 ? (a.use_val_bid = "b_r443en50", a.view_btn_val_bid = "b_lf4jw9zf", 
        this.page.stats && this.page.stats("b_z6mzx3cx", a.val_lab)) : this.page.stats && this.page.stats("b_g582v2go", a.val_lab) : (a.use_val_bid = "b_gvfdla37", 
        a.view_btn_val_bid = "b_03mb8sbe", this.page.stats && this.page.stats("b_nod3z5jd", a.val_lab)), 
        this.setData({
            showModal: !0,
            type: MODAL_TYPE.REDPACKET,
            modalData: a
        });
    },
    renderNormalModal: function(t) {
        var e = this, a = t.backgroundImageUrl, i = void 0 === a ? "" : a, n = t.exhibitionContentMap, r = n.mainText, o = void 0 === r ? "" : r, s = n.jumpUrl, d = void 0 === s ? "" : s, l = JSON.stringify({
            activity_id: n.activityId
        });
        o = this.renderText(o);
        var p = {
            backgroundImageUrl: i,
            mainText: o,
            jumpUrl: d,
            val_bid: "b_pbljz47e",
            valLab: l
        };
        setTimeout(function() {
            e.setData({
                modalData: p,
                showModal: !0,
                type: MODAL_TYPE.NORMAL
            }), e.page.stats && e.page.stats("b_kqs9pnxi", l), setTimeout(function() {
                e.hideModal();
            }, 9e3);
        }, 1e3);
    },
    onTapRedpacketModal: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = e.val_bid, n = e.val_lab;
        a === "/" + this.page.route ? (this.page.stats && this.page.stats(i, n), this.hideModal()) : this.page.onTapNavi(t);
    },
    renderText: function(t) {
        var e = [], a = [], i = t.split("{");
        e.push(i.splice(0, 1).join()), i.forEach(function(t) {
            -1 !== t.indexOf("}") ? (t = t.split("}"), a.push(t[0]), e.push(t[1])) : e.push(t);
        });
        for (var n = Math.max(e.length, a.length), r = [], o = 0; o < n; o++) {
            var s = e[o], d = a[o];
            s && r.push({
                text: s,
                type: "normal",
                key: "normal_" + o
            }), d && r.push({
                text: d,
                type: "important",
                key: "important" + o
            });
        }
        return r;
    }
});