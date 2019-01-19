Page({
    data: {
        info: [],
        img: [],
        video: [],
        pic: ""
    },
    onLoad: function(t) {
        this.setData({
            info: t.actors ? JSON.parse(t.actors) : [],
            img: t.img ? JSON.parse(t.img) : [],
            video: t.video ? JSON.parse(t.video) : [],
            pic: t.pic
        }), wx.setNavigationBarTitle({
            title: t.title
        });
    },
    previewImg: function(t) {
        wx.previewImage({
            current: t.currentTarget.dataset.img,
            urls: [ t.currentTarget.dataset.img ]
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});