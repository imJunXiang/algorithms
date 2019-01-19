var app = getApp(), locationUtil = require("../../scripts/location"), locationModel = require("../../models/location");

module.exports = {
    data: {
        city: void 0,
        locationCity: void 0,
        isShowCityErrorPage: !1,
        isShowOpenLocationAlertMoal: !1,
        isShowUseLocationCityConfirmModal: !1
    },
    initCity: function(t) {
        var i = void 0;
        t.cityId && (t.cityId = Number(t.cityId), t.cityId && t.cityName && (i = {
            id: t.cityId,
            nm: t.cityName
        })), i ? this.setCity(i) : (this.cityCache = app.store.get("city"), app.$location.city || this.cityCache && locationModel.changeCity(this.cityCache), 
        app.$location.city && this.setCity(app.$location.city), app.models.location.fetch(!app.$location.latitude)), 
        this.onCityChange = this.onCityChange.bind(this), this.onCityError = this.onCityError.bind(this), 
        this.onLocationChange = this.onLocationChange.bind(this), this.bindCityEvent();
    },
    bindCityEvent: function() {
        app.models.location.on("locationCityChange", this.onCityChange), app.models.location.on("error", this.onCityError), 
        app.models.location.on("locationChange", this.onLocationChange), app.models.location.on("notAllowGetLocation", this.onCityToastShow);
    },
    offCityEvent: function() {
        app.models.location.off("change", this.onCityChange), app.models.location.off("error", this.onCityError), 
        app.models.location.off("change", this.onLocationChange), app.models.location.off("notAllowGetLocation", this.onCityToastShow);
    },
    setCity: function(t) {
        locationModel.changeCity(t), this.setData({
            city: app.$location.city,
            isShowCityErrorPage: !1
        });
    },
    saveCity: function(t) {
        app.store.set("city", t), locationUtil.addCitys(t);
    },
    onCityToastShow: function() {
        var t = this;
        this.setData({
            isShowCityToast: !0
        }), setTimeout(function() {
            var i = wx.createAnimation({
                duration: 500
            });
            t.setData({
                cbtcAnimationHide: i.opacity(0).step().export()
            }), setTimeout(function() {
                t.setData({
                    isShowCityToast: !1
                });
            }, 520);
        }, 2500);
    },
    onCityChange: function(t) {
        var i = this.data.city;
        if (this.setData({
            locationCity: t
        }), app.set("city-cache", t, {
            expires: 86400
        }), i && i.nm) {
            if (i.nm !== t.nm) {
                var o = app.get("confirm-city") || {};
                o.nm !== i.nm && this.setData({
                    isShowUseLocationCityConfirmModal: !0
                });
            }
        } else this.setCity(t), this.onShow();
    },
    onCityError: function() {
        if (this === app.page()) {
            var t = this.data.city;
            t && t.nm ? app._cityToastDisabled || (app._cityToastDisabled = !0, this.onCityToastShow()) : (this.setData({
                isShowCityErrorPage: !0
            }), app._hasGotoCityPage || (app.goto("/pages/citys/citys?warn=定位失败，请手动选择城市"), app._hasGotoCityPage = !0, 
            app._cityToastDisabled = !0));
        }
    },
    onLocationChange: function(t) {},
    closeOpenLocationAlertMoal: function() {
        this.setData({
            isShowOpenLocationAlertMoal: !1
        });
    },
    closeUseLocationCityConfirmModal: function() {
        this.setData({
            isShowUseLocationCityConfirmModal: !1
        }), app.set("confirm-city", app.$location.city, {
            expires: 43200
        });
    },
    onUseLocationCity: function() {
        var t = this.data.locationCity;
        this.closeUseLocationCityConfirmModal(), this.setCity(t), this.saveCity(t), this.onPullDownRefresh && this.onPullDownRefresh();
    }
};