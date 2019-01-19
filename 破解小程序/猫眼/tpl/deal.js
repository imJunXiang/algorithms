var Tpl = require("../scripts/tpl"), app = getApp();

module.exports = Tpl.extends({
    key: "Deal",
    bindEvent: function() {
        this.page.onPreviewImage = this.onPreviewImage.bind(this.page), this.page.onGotoUrl = this.onGotoUrl.bind(this.page), 
        this.page.showAllDeals = this.showAllDeals.bind(this.page), this.page.onTapDeal = this.onTapDeal.bind(this.page), 
        this.page.clickBtn = this.clickBtn.bind(this.page);
    },
    onPreviewImage: function(t) {
        var i = t.currentTarget.dataset, a = i.img, e = i.valBid, s = i.index, n = {
            cinemaid: this.data.cinema.id
        };
        (s || "number" == typeof s) && (n.index = s), a && (this.stats(e, n), wx.previewImage({
            current: a,
            urls: [ a ]
        }));
    },
    showAllDeals: function(t) {
        var i = this.data.divideDealList, a = t.currentTarget.dataset, e = a.dealType, s = a.drawerClickBid;
        i[e].sliceList = [], this.stats(s), this.setData({
            divideDealList: i
        });
    },
    onGotoUrl: function(t) {
        var i = t.currentTarget.dataset, a = i.url, e = i.copyWrittingClickBid;
        this.stats(e, {
            cinemaid: this.data.cinema.id
        }), "" != a && app.goto(a);
    },
    onTapDeal: function(t) {
        var i = t.currentTarget.dataset, a = i.val_lab, e = i.index, s = i.valBid;
        a ? Object.assign(a, {
            index: e
        }) : a = {
            index: e
        }, this.stats(s, {
            index: e,
            cinemaid: this.data.cinema.cinemaId
        }), t.currentTarget.dataset.val_lab = a, this.onTapNavi(t);
    },
    clickBtn: function(t) {
        var i = t.currentTarget.dataset, a = i.buyBtnClickBid, e = i.title, s = i.index;
        this.stats(a, {
            title: e,
            index: s,
            cinemaid: this.data.cinema.id
        });
    }
});