var store = require("../../../../../scripts/store");

Component({
    properties: {
        name: {
            type: String,
            value: " "
        },
        address: {
            type: String,
            value: " "
        },
        city: {
            type: String,
            value: ""
        },
        guide: {
            type: Boolean
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    data: {
        show: !1
    },
    methods: {
        handleTap: function() {
            return this.data.guide ? (this.setGuideInfo(), this.openGuide()) : this.openMap();
        },
        openGuide: function() {
            this.triggerEvent("statsOpenGuide"), wx.showToast({
                icon: "loading",
                title: "加载中..."
            }), setTimeout(function() {
                wx.navigateTo({
                    url: "/pages/showsubs/guide/index"
                });
            }, 100);
        },
        openMap: function() {
            var e = this.data, t = e.latitude, i = e.longitude, n = e.name, a = e.address;
            t && i && wx.openLocation({
                latitude: t,
                longitude: i,
                name: n,
                address: a
            }), this.triggerEvent("statsOpenMap");
        },
        setGuideInfo: function() {
            var e = this.data, t = e.latitude, i = e.longitude, n = e.name, a = e.address, s = e.guide;
            store.set("_guide_info", {
                name: n,
                address: a,
                latitude: t,
                longitude: i,
                guide: s
            });
        }
    }
});