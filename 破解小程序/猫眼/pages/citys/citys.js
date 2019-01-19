var locationUtil = require("../../scripts/location.js"), locationModel = require("../../models/location"), app = getApp(), historyCityListKey = "historyCityList";

app.MoviePage({
    data: {
        labelMap: {
            location: "定位",
            history: "最近",
            hot: "热门"
        },
        locationCity: {
            nm: ""
        },
        locationStatus: "pending",
        locationMap: {
            pending: "正在定位...",
            fail: "定位失败，请点击重试"
        },
        historyCityList: [],
        hotCityList: [],
        letterArray: [],
        scrollTop: 0
    },
    onLoad: function(t) {
        var i = this;
        this.setData(t), this.fillHistoryCityList(), t.warn && this.toast(decodeURIComponent(t.warn)), 
        locationUtil.getHotCitys().then(function(t) {
            return i.setData({
                hotCityList: t
            }), locationUtil.getCitysFromCache();
        }).then(function(t) {
            var a = Object.keys(t.letterMap).map(function(i) {
                return {
                    letter: i,
                    list: t.letterMap[i]
                };
            });
            i.setData({
                letterArray: a
            }), i.fillNavigator();
        }).then(wx.hideToast).catch(function(t) {
            i.handleError(t, !0);
        });
    },
    onReady: function() {
        app.$location.city && app.$location.city.nm && wx.setNavigationBarTitle({
            title: "当前城市-" + app.$location.city.nm
        });
    },
    onShow: function() {
        this.fillLocationCity();
    },
    fillLocationCity: function() {
        var t = this;
        this.setData({
            locationStatus: "pending"
        }), locationModel.fetch(!0).then(function(i) {
            var a = i.locationCity;
            app.$location.city || locationModel.changeCity(a), t.setData({
                locationCity: a,
                locationStatus: "done"
            });
        }).catch(function(i) {
            t.setData({
                locationStatus: "fail"
            }), t.handleError(i);
        });
    },
    onTapFillLocationCity: function() {
        var t = this;
        app.checkLocationAuth().then(function() {
            t.fillLocationCity();
        });
    },
    fillHistoryCityList: function(t) {
        t = t || app.get(historyCityListKey), this.setData({
            historyCityList: t
        });
    },
    selectCity: function(t) {
        var i = t.target.dataset;
        i.id && (this.changeToCity(i), this.data.next ? wx.redirectTo({
            url: this.data.next
        }) : wx.navigateBack());
    },
    changeToCity: function(t) {
        if (t.id) {
            locationModel.changeCity(t), app.set("city", t), app.$location.locationCity && app.$location.locationCity.nm && app.set("confirm-city", t, {
                expires: 3600
            });
            var i = locationUtil.addCitys(t);
            this.fillHistoryCityList(i);
        }
    },
    fillNavigator: function() {
        var t = [], i = {
            label: "location"
        };
        t.push(i);
        var a = {
            label: "history"
        };
        this.data.historyCityList.length && t.push(a);
        var o = {
            label: "hot"
        };
        t.push(o), this.data.letterArray.forEach(function(i) {
            t.push({
                label: i.letter
            });
        }), this.setData({
            navList: t
        });
    },
    navTo: function(t) {
        var i = t.currentTarget.dataset.id;
        this.setData({
            toView: i
        });
    },
    move: function(t) {
        var i = (t.currentTarget.dataset.top, t.touches[0].clientY), a = Math.floor((i - 75) / 16), o = this.data.navList[a];
        if (o) {
            if (o.label === this.data.toView) return;
            this.setData({
                toView: o.label
            });
        }
    }
});