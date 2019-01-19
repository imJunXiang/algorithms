var a = require("../../utils/tools.js"), t = getApp(), e = function(a, t) {
    return a.replace(new RegExp("" + t, "g"), "%%" + t + "%%").split("%%");
};

Page({
    data: {
        searchList: wx.getStorageSync("searchList"),
        movieList: [],
        cinemaList: [],
        num: !0,
        seachvalue: "",
        searchFlag: !1,
        localstaion: wx.getStorageSync("location"),
        hotwords: [],
        searchStr: ""
    },
    handleToHotSearch: function(a) {
        var t = a.currentTarget.dataset.hot;
        this.setData({
            seachvalue: t
        }), this.loadData(t), console.log(a.currentTarget.dataset.hot);
    },
    onLoad: function(e) {
        var s = this;
        "" == this.data.searchList && this.setData({
            searchFlag: !0
        }), (0, a._post)("v2/search/hotwordsconfig", {
            scene: "1"
        }).then(function(a) {
            s.setData({
                hotwords: a.hotwords.split("#")
            });
        }), t.setPageUid(this), t.setPageCityId(this);
    },
    onReady: function() {},
    onShow: function() {
        console.log(getApp().globalData), this.setData({
            searchList: wx.getStorageSync("searchList")
        });
    },
    onHide: function() {},
    onUnload: function() {},
    bindKeyInput: function(a) {
        var t = a.detail.value.replace(/\s+/g, "");
        "" == t ? this.setData({
            movieList: [],
            cinemaList: [],
            searchFlag: !1
        }) : this.setData({
            searchStr: t
        });
    },
    wxSerchFocus: function(a) {
        wx.getStorageSync("searchList");
    },
    wxSearchBlur: function(a) {
        var t = this, e = a.detail.value.replace(/\s+/g, ""), s = t.data.searchList.length;
        "" == t.data.searchList && (t.data.searchList = []), "" != e ? (s < 5 ? t.insearchList(e) || (t.data.searchList.unshift(e), 
        t.setData({
            searchList: t.data.searchList,
            searchFlag: !0
        })) : t.insearchList(e) || (t.data.searchList.pop(), t.data.searchList.unshift(e), 
        t.setData({
            searchList: t.data.searchList,
            searchFlag: !0
        })), wx.setStorage({
            key: "searchList",
            data: t.data.searchList
        }), console.log(t.data.searchList)) : t.setData({
            movieList: [],
            cinemaList: [],
            searchFlag: !1
        });
    },
    handleSearch: function(a) {
        var t = a.detail.value;
        "" != t && (console.log(t), this.loadData(t));
    },
    loadData: function(t) {
        this.setData({
            searchdata: t
        });
        var s = this, i = {
            search: t,
            pos: wx.getStorageSync("location"),
            cityid: this.data.cityid,
            uid: this.data.uid,
            scene: "1"
        };
        (0, a._post)("v2/search/index", i).then(function(a) {
            var i = null;
            0 == a.movies.length && 0 == a.cinemas.length && wx.showModal({
                title: "提示",
                content: "暂无搜索结果...",
                confirmText: "知道了",
                showCancel: !1
            }), a.movies == [] && a.cinemas == [] || (i = !1), a.movies.forEach(function(a, s) {
                a.searchData = t, a.name_ = e(a.name, t), a.starring_ = e(a.director + " " + ("" != a.director && "" != a.starring ? " | " : "") + a.starring, t);
            }), a.cinemas.forEach(function(a, s) {
                a.searchData = t, a.name_ = e(a.name, t), a.address_ = e(a.address, t);
            }), s.setData({
                movieList: a.movies,
                cinemaList: a.cinemas,
                searchFlag: !0,
                num: i
            });
        });
    },
    searchRequst: function(a) {
        var t = a.target.dataset.seachstr;
        this.setData({
            seachvalue: t
        }), this.loadData(t);
    },
    clearHistory: function() {
        this.setData({
            searchList: [],
            searchFlag: !0
        }), wx.setStorage({
            key: "searchList",
            data: []
        });
    },
    insearchList: function(a) {
        for (var t = wx.getStorageSync("searchList"), e = t.length, s = !1, i = 0; i < e; i++) if (t[i] == a) {
            s = !0;
            break;
        }
        return s;
    }
});