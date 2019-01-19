function _asyncToGenerator(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, i) {
            function n(r, o) {
                try {
                    var a = e[r](o), s = a.value;
                } catch (t) {
                    return void i(t);
                }
                if (!a.done) return Promise.resolve(s).then(function(t) {
                    n("next", t);
                }, function(t) {
                    n("throw", t);
                });
                t(s);
            }
            return n("next");
        });
    };
}

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
    }
    return t;
}, _slicedToArray = function() {
    function t(t, e) {
        var i = [], n = !0, r = !1, o = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(n = (a = s.next()).done) && (i.push(a.value), 
            !e || i.length !== e); n = !0) ;
        } catch (t) {
            r = !0, o = t;
        } finally {
            try {
                !n && s.return && s.return();
            } finally {
                if (r) throw o;
            }
        }
        return i;
    }
    return function(e, i) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), app = getApp(), DCM = [ "110000", "310000", "120000", "500000" ], defaultPicker = [ 0, 0, 0 ], emojiReg = /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, formValidate = {
    recipientName: {
        reg: /^.{2,50}$/,
        required: !0,
        tips: "亲~姓名长度需在2至50个字之间~"
    },
    recipientMobileNo: {
        reg: /^1\d{10}$/,
        required: !0,
        tips: "亲~ 手机号须是1开头的11位数字~"
    },
    detailedAddress: {
        reg: /^.{3,200}$/,
        required: !0,
        tips: "亲~ 请正确填写您的详细地址哦~"
    }
};

Component({
    properties: {
        info: {
            type: Object,
            value: {},
            observer: function() {
                this.init();
            }
        }
    },
    data: {
        isShowRegionPicker: !1,
        region: {},
        picker: defaultPicker,
        regionText: "",
        provinceList: [],
        cityList: [],
        districtList: [],
        input: {
            inputName: "",
            inputTel: "",
            inputAddress: "",
            submitable: !1
        }
    },
    attached: function() {
        this.init();
    },
    methods: {
        init: function() {
            if (this.getRegions(), this.data.info) {
                var t = this.data.info, e = t.recipientName, i = void 0 === e ? "" : e, n = t.recipientMobileNo, r = void 0 === n ? "" : n, o = t.detailedAddress, a = void 0 === o ? "" : o;
                this.setData({
                    "input.inputName": i,
                    "input.inputTel": r,
                    "input.inputAddress": a,
                    "input.submitable": !!(a && r && i)
                });
            }
        },
        showPicker: function() {
            this.buildPickerContent(this.data.picker), this.setData({
                isShowRegionPicker: !0
            });
        },
        closePicker: function() {
            this.setData({
                isShowRegionPicker: !1,
                picker: defaultPicker
            });
        },
        onLocalityTap: function() {
            this.showPicker();
        },
        onRegionTap: function(t) {
            var e = t.detail.value;
            this.buildPickerContent(e);
        },
        echoRegionText: function() {
            this.setData({
                regionText: this.data.selectedProvince.text + " " + this.data.selectedCity.text + " " + this.data.selectedDistrict.text
            }), this.checkSubmitable();
        },
        onPickerConfirmTap: function() {
            this.echoRegionText(), this.closePicker();
        },
        onPickerCancelTap: function() {
            this.closePicker();
        },
        getRegions: function() {
            var t = this;
            return _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var i;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, app.request().config("loading", 1).get("https://wx.maoyan.com/maoyansh/myshow/ajax/region/allRegion").query({
                            sellChannel: 7,
                            wxOpenId: app.$user.openId,
                            token: app.$user.token
                        }).end().then(function(t) {
                            return t.body.data;
                        });

                      case 2:
                        i = e.sent, t.setData({
                            region: i
                        }, function() {
                            t.data.info && (t.rebuildPicker(), t.buildPickerContent(t.data.picker));
                        });

                      case 4:
                      case "end":
                        return e.stop();
                    }
                }, e, t);
            }))();
        },
        buildPickerContent: function(t, e) {
            var i = _slicedToArray(t, 3), n = i[0], r = void 0 === n ? 0 : n, o = i[1], a = void 0 === o ? 0 : o, s = i[2], c = void 0 === s ? 0 : s, u = _slicedToArray(this.data.picker, 3), d = u[0], l = u[1];
            u[2];
            r !== d ? (a = 0, c = 0) : a !== l && (c = 0);
            var h = this.data.region, p = h.province, f = h.province[r], v = void 0, g = void 0, m = void 0, y = void 0;
            DCM.includes(f.value) ? (v = [ f ], g = h.city[f.value]) : (v = h.city[f.value], 
            g = h.district[v[a].value]), m = v[a], y = g[c], this.setData({
                selectedProvince: f,
                selectedCity: m,
                selectedDistrict: y,
                provinceList: p,
                cityList: v,
                districtList: g,
                picker: [ r, a, c ]
            }, e);
        },
        rebuildPicker: function() {
            var t = this, e = this.data.info, i = e.provinceRegionCode, n = e.cityRegionCode, r = e.districtRegionCode;
            if (i || n || r) {
                var o = this.data.region, a = o.province, s = o.city, c = o.district, u = this.findPicker("provinceRegionCode", a), d = void 0, l = void 0;
                DCM.includes(i) ? (d = 0, l = this.findPicker("districtRegionCode", s[i])) : (d = this.findPicker("cityRegionCode", s[i]), 
                l = this.findPicker("districtRegionCode", c[n])), this.setData({
                    picker: [ u, d, l ]
                }, function() {
                    t.buildPickerContent(t.data.picker, function() {
                        return t.echoRegionText();
                    });
                });
            }
        },
        findPicker: function(t, e) {
            var i = this;
            return e.findIndex(function(e) {
                return e.value === i.data.info[t];
            });
        },
        onFormSubmit: function(t) {
            var e = this, i = t.detail.value;
            if (this.validateFromData(i)) {
                var n = this.data, r = n.selectedProvince, o = n.selectedDistrict, a = n.selectedCity, s = Object.assign({}, this.data.info, i, {
                    provinceName: r.text,
                    provinceRegionCode: r.value,
                    cityName: a.text,
                    cityRegionCode: a.value,
                    districtName: o.text,
                    districtRegionCode: o.value,
                    isDefault: i.isDefault ? 1 : 0
                });
                app.request().config("loading", 1).post("https://wx.maoyan.com/maoyansh/myshow/ajax/address/saveAddress").query(_extends({}, s, {
                    token: app.$user.token,
                    sellChannel: 7
                })).end().then(function(t) {
                    return t.body;
                }).then(function(t) {
                    var i = (t.data, t.code), n = t.msg;
                    200 !== i ? e.triggerEvent("submitError", n) : e.triggerEvent("submitSuccess", n);
                });
            }
        },
        validateFromData: function(t) {
            try {
                return Object.keys(t).forEach(function(e) {
                    var i = formValidate[e];
                    if (i) {
                        var n = t[e];
                        if ("function" == typeof n.trim && (n = n.trim()), (i.required || !i.required && "" !== n) && !i.reg.test(n)) throw new Error(i.tips);
                    }
                }), !0;
            } catch (t) {
                return wx.showToast({
                    title: t.message,
                    icon: "none"
                }), !1;
            }
        },
        onNameInput: function(t) {
            var e = t.detail.value;
            e.length >= 20 && wx.showToast({
                title: "姓名最多为20个字",
                icon: "none"
            });
            var i = e.replace(emojiReg, "");
            return this.setData({
                "input.inputName": i
            }, this.checkSubmitable), i;
        },
        onTelInput: function(t) {
            var e = t.detail.value;
            this.setData({
                "input.inputTel": e
            }, this.checkSubmitable);
        },
        onAddressInput: function(t) {
            var e = t.detail.value;
            e.length >= 50 && wx.showToast({
                title: "详细地址最多为50个字",
                icon: "none"
            });
            var i = e.replace(emojiReg, "");
            return this.setData({
                "input.inputAddress": i
            }, this.checkSubmitable), i;
        },
        checkSubmitable: function() {
            var t = this.data.input, e = t.inputName, i = t.inputAddress, n = t.inputTel;
            this.setData({
                "input.submitable": !!(e && i && n && this.data.regionText)
            });
        }
    }
});