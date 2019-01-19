function fontLength(e) {
    if (!e || !e.length) return 0;
    for (var t = 0, a = 0, s = e.length; a < s; a++) {
        var i = e.charCodeAt(a);
        t += i >= 0 && i <= 128 ? 1 : 2;
    }
    return t;
}

var event = require("../../scripts/event"), app = getApp(), selectBar = {
    data: {
        showBgModal: !1,
        selectItems: {},
        selectedItems: {
            brandId: -1,
            areaId: -1,
            districtId: -1,
            lineId: -1,
            stationId: -1,
            hallType: -1,
            serviceId: -1
        },
        selectBarItems: [ {
            type: "area",
            name: "全城",
            isActive: !1
        }, {
            type: "brand",
            name: "品牌",
            isActive: !1
        }, {
            type: "feature",
            name: "特色",
            isActive: !1
        } ],
        activeAreaFilter: {
            type: "district",
            subType: "areaId",
            subItems: []
        }
    },
    resetSelectedItems: function() {
        this.setData({
            selectedItems: {
                brandId: -1,
                areaId: -1,
                districtId: -1,
                lineId: -1,
                stationId: -1,
                hallType: -1,
                serviceId: -1
            },
            activeAreaFilter: {
                type: "district",
                subType: "areaId",
                subItems: []
            },
            selectBarItems: [ {
                type: "area",
                name: "全城",
                isActive: !1
            }, {
                type: "brand",
                name: "品牌",
                isActive: !1
            }, {
                type: "feature",
                name: "特色",
                isActive: !1
            } ]
        });
    },
    onTapBrandItem: function(e) {
        var t = e.currentTarget.dataset, a = t.id, s = t.name, i = this.data, r = i.selectedItems, n = i.selectBarItems;
        n[1].name = -1 === a ? "品牌" : s, r.brandId = a, this.setData({
            selectedItems: r,
            selectBarItems: n
        }), this.toggleSelectBar(), this.emit("refreshCinemas", r);
    },
    onTapServiceItem: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.selectedItems;
        a.serviceId = t, this.setData({
            selectedItems: a
        });
    },
    onTapHallTypeItem: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.selectedItems;
        a.hallType = t, this.setData({
            selectedItems: a
        });
    },
    resetFeatureItems: function() {
        var e = this.data.selectedItems;
        e.serviceId = -1, e.hallType = -1, this.setData({
            selectedItems: e
        });
    },
    confirmFeatureItems: function() {
        this.toggleSelectBar(), this.emit("refreshCinemas", this.data.selectedItems);
    },
    onTapAreaTitle: function(e) {
        var t = e.target.dataset.type, a = this.data, s = a.activeAreaFilter, i = a.selectItems, r = a.selectedItems, n = ("district" === t ? r.areaId : r.stationId, 
        "district" === t ? r.districtId : r.lineId);
        s.type = t, s.subType = "district" === t ? "areaId" : "stationId", i[t] && i[t].subItems.forEach(function(e) {
            e.id == n && (s.subItems = e.subItems);
        }), this.setData({
            activeAreaFilter: s
        });
    },
    onTapFirstLVItems: function(e) {
        var t = e.target.dataset, a = t.id, s = (t.count, t.name), i = this.data, r = i.selectBarItems, n = i.selectItems, c = i.selectedItems, d = i.activeAreaFilter;
        void 0 !== n["" + d.type] && (n["" + d.type].subItems.forEach(function(e) {
            e.id == a && (d.subItems = e.subItems || [], d.name = s);
        }), c[d.type + "Id"] = a, -1 != a && d.subItems.length || (c["" + d.subType] = -1, 
        r[0].name = -1 === a ? "全城" : s), this.setData({
            selectedItems: c,
            activeAreaFilter: d
        }), -1 != a && d.subItems.length || this.confirmFeatureItems());
    },
    onTapSecondLVItems: function(e) {
        var t = e.currentTarget.dataset, a = t.id, s = t.name, i = this.data, r = i.selectBarItems, n = i.selectedItems, c = i.activeAreaFilter;
        "district" === c.type ? n.areaId = a : n.stationId = a, r[0].name = -1 === a ? c.name : s, 
        this.setData({
            selectedItems: n,
            selectBarItems: r
        }), this.confirmFeatureItems();
    },
    getSelectItems: function(e, t) {
        var a = this, s = app.$location;
        return app.request().get("/proxy/mmcs/cinema/v1/select/items.json").header({
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).query({
            cityId: s.city ? s.city.id : 1,
            channelId: app.channelId,
            movieId: e,
            showDate: t
        }).end().then(function(e) {
            var t = e.body.data;
            return t.line = t.subway, t.hallType && t.hallType.subItems && t.hallType.subItems.forEach(function(e) {
                e.nameLength = fontLength(e.name);
            }), a.setData({
                selectItems: t
            }), t;
        });
    },
    onTapSelectBar: function(e) {
        var t = e.currentTarget.dataset.index;
        this.toggleSelectBar(t);
    },
    closeModal: function() {
        this.toggleSelectBar();
    },
    toggleSelectBar: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, t = this.data.selectBarItems.map(function(t, a) {
            return t.isActive = a == e && !t.isActive, t;
        }), a = !!t.filter(function(e) {
            return e.isActive;
        }).length;
        this.emit("toggleSelectBar", a), this.setData({
            selectBarItems: t,
            showBgModal: a
        });
    },
    doNothing: function() {}
};

event.attach(selectBar), module.exports = selectBar;