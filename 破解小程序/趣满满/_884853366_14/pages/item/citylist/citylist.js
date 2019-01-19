getApp();

Page({
    data: {
        nowCity: "",
        clitylist: "",
        hotcity: "",
        cityFirstl: "",
        selcity: ""
    },
    onLoad: function(t) {
        var e = this, a = [];
        wx.setNavigationBarTitle({
            title: "当前城市-" + t.city
        });
        var o = wx.getStorageSync("locationStorage");
        this.setData({
            nowCity: o.local.cityname,
            nowCityId: o.local.cityid,
            selcity: void 0 == o.select ? o.local.cityname : o.select.cityname,
            selcityId: void 0 == o.select ? o.local.cityid : o.select.cityid
        }), wx.getStorage({
            key: "citydata",
            success: function(t) {
                t.data = JSON.parse(t.data);
                for (var o = "", c = 0; c < t.data.letter.length; c++) o = t.data.letter[c].firstletter, 
                -1 == a.indexOf(o) && a.push(o);
                e.setData({
                    clitylist: t.data.letter,
                    hotcity: t.data.hot,
                    cityFirstl: a
                });
            }
        });
    },
    goName: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        console.log(e);
        var a = wx.createSelectorQuery().select("#" + e);
        console.log(a), a.fields({
            rect: !0
        }, function(t) {
            console.log(t), wx.pageScrollTo({
                scrollTop: t.top
            });
        }).exec();
    },
    seleCity: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.name;
        if (a != this.data.selcity) {
            var o = wx.getStorageSync("locationStorage");
            o.select = {
                cityid: e,
                cityname: a
            }, wx.setStorageSync("locationStorage", o), wx.removeStorageSync("indexCache");
            var c = getCurrentPages()[0].route;
            wx.reLaunch({
                url: "/" + c + "?location=1"
            });
        } else wx.navigateBack({
            delta: 1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});