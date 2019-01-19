var t = require("../../utils/tools.js"), e = getApp();

Component({
    properties: {
        movie: {
            type: Object
        },
        from: {
            type: String
        },
        noafter: {
            type: Boolean
        }
    },
    data: {},
    attached: function() {
        e.setPageColor(this);
    },
    methods: {
        likemovie: function(t) {
            var i = this;
            console.log(this.data.movie), e.setPageUid(this).then(function(t) {
                "temp" != i.data.uidType ? i.likemovieFn() : i.setData({
                    showLogin: !0
                });
            });
        },
        hideSheet: function() {
            this.setData({
                showLogin: !1
            });
        },
        loginend: function() {
            var t = this;
            e.setPageUid(this).then(function(e) {
                t.hideSheet(), t.likemovieFn();
            });
        },
        likemovieFn: function() {
            var e = this, i = this.data.movie;
            (0, t._post)("v2/movies/like", {
                movieid: i.id,
                uid: this.data.uid
            }, "想看").then(function(t) {
                i.buystaus = 1 === t.type ? 3 : 4, wx.showToast({
                    title: 1 === t.type ? "已取消想看" : "已想看"
                }), e.setData({
                    movie: i
                });
            });
        },
        handleErrImg: function(t) {
            console.log("moviedetail", t);
            var e = this.data.movie;
            e.pic = "/images/zhanwei.png", this.setData({
                movie: e
            });
        }
    }
});