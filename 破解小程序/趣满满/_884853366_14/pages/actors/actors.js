Page({
    data: {
        actors: [],
        index: []
    },
    handleErrImg: function(a) {
        var t = a.currentTarget.dataset.index, s = this.data.actors;
        s[t].img = "/images/actorsDefault.png", this.setData({
            actors: s
        });
    },
    onLoad: function(a) {
        this.setData({
            actors: JSON.parse(a.actors)
        });
    }
});