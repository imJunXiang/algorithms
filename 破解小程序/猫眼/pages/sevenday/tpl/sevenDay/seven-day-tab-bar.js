var _axios = require("../../scripts/axios"), Tpl = require("../../scripts/tpl"), app = getApp();

module.exports = Tpl.extends({
    key: "sevenDayTab",
    data: {},
    bindEvent: function() {
        this.page.changeTab = this.changeTab.bind(this), this.page.createProfess = this.createProfess.bind(this);
    },
    changeTab: function(e) {
        var s = this, t = e.currentTarget.dataset.tab;
        return "mine" != t || app.$user.token ? this.setTab(t) : app.checkLogin({
            success: function() {
                s.setTab(t);
            }
        });
    },
    setTab: function(e) {
        wx.redirectTo({
            url: "/pages/sevenday/" + e + "/index"
        });
    },
    createProfess: function() {
        var e = this;
        return app.$user.token ? this.chooseImage() : app.checkLogin({
            success: function() {
                e.page.refreshWXUserInfoOfMY(function() {
                    e.chooseImage();
                });
            }
        });
    },
    chooseImage: function() {
        var e = this;
        this.page.stats("b_gljni07i"), app.request().get(_axios.sevenDayDomain + "/qixi/card/mine.json").header({
            Token: app.$user.token,
            "content-type": "application/json"
        }).end().then(function(s) {
            var t = s.body;
            t && t.paging.total < 5 ? wx.chooseImage({
                count: 1,
                success: function(s) {
                    if (s.tempFiles[0].size / 1024 / 1024 < 10) {
                        var t = s.tempFilePaths[0];
                        app.goto("/pages/sevenday/myprofession/index?imageURL=" + t);
                    } else e.page.toast("照片不要超过10M，会影响表白效果");
                }
            }) : e.page.toast("您的表白已达上限");
        });
    }
});