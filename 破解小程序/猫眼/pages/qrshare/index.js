var app = getApp();

app.MoviePage({
    onLoad: function(a) {
        wx.showLoading({
            title: "加载中"
        });
        var p = "";
        a.q ? p = a.q.split("path=")[1] : a.path && (p = a.path), wx.redirectTo({
            url: "/pages" + p
        });
    }
});