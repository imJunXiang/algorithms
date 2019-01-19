Page({
    data: {
        longitude: 0,
        latitude: 0
    },
    onLoad: function(t) {
        var o = this;
        this.setData({
            markers: [ {
                iconPath: "/images/btoPosAc.png",
                id: 0,
                latitude: t.latitude,
                longitude: t.longitude,
                width: 20,
                height: 20
            } ],
            options: t
        }), this.mapCtx = wx.createMapContext("myMap"), new Promise(function(t, e) {
            wx.getLocation({
                type: "gcj02",
                success: function(e) {
                    console.log(o, "-="), o.setData({
                        longitude: e.longitude,
                        latitude: e.latitude
                    }), o.mapCtx.moveToLocation(), t(e);
                }
            });
        }).then(function(t) {
            console.log(t);
            var e = o, i = {
                url: "https://apis.map.qq.com/ws/direction/v1/walking/?from=" + t.latitude + "," + t.longitude + "&to=" + e.data.options.latitude + "," + e.data.options.longitude + "&key=5TBBZ-ZI2WU-Q7CVG-4J4GO-Y2Z5H-TWBZY",
                method: "GET",
                dataType: "json",
                success: function(t) {
                    var o = t.data;
                    if (0 == o.status) {
                        for (var i = o.result.routes[0].polyline, a = [], n = 2; n < i.length; n++) i[n] = Number(i[n - 2]) + Number(i[n]) / 1e6;
                        for (n = 0; n < i.length; n += 2) a.push({
                            latitude: i[n],
                            longitude: i[n + 1]
                        });
                        e.setData({
                            polyline: [ {
                                points: a,
                                color: "#3385ffAA",
                                width: 5
                            } ]
                        });
                    }
                }
            };
            wx.request(i);
        });
    },
    onReady: function() {},
    dingweidian: function() {
        this.mapCtx.moveToLocation();
    }
});