function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
        return o;
    }
    return Array.from(e);
}

var _module$exports, app = getApp(), CONFIG_URL = "https://lina.dianping.com/api/get?key=maoyansh-show-config", DATA_KEY = "publicClass";

module.exports = (_module$exports = {
    key: DATA_KEY
}, _defineProperty(_module$exports, DATA_KEY + "Init", function(e) {
    var t = this;
    app.request().get(CONFIG_URL).end().then(function(o) {
        var r = o.body, a = r.code, i = r.data;
        if (200 === a && i && i.value) {
            var s = i.value, n = s.public_class_performanceId, l = s.public_class_performanceIds, p = s.public_class_hotels, u = s.public_class_interests, c = s.public_class_bookHotel, _ = s.public_class_userType, y = s.public_class_userTypes, m = s.public_class_hotel_tips, d = s.public_class_hotel_buy_tips;
            if (-1 == [ n ].concat(_toConsumableArray(l)).indexOf(+e)) return;
            t.setData(_defineProperty({
                isPublicClassShow: !0
            }, DATA_KEY, {
                userType: _ || 1,
                name: "",
                companyName: "",
                position: "",
                city: "",
                interest: -1,
                interests: u || [],
                userTypes: y || [],
                bookHotel: c || 1,
                hotelTips: m || "",
                hotelBuyTips: d || "",
                hotel: -1,
                hotels: p || []
            }));
        }
    });
}), _defineProperty(_module$exports, "onPubClsInputBlur", function(e) {
    var t = e.detail.value, o = e.target.dataset.name, r = DATA_KEY + "." + o;
    this.setData(_defineProperty({}, r, (t + "").trim()));
}), _defineProperty(_module$exports, "publicInfoValiDate", function() {
    var e = this.data[DATA_KEY], t = e.userType, o = (e.bookHotel, e.name), r = e.companyName, a = e.city;
    e.interest, e.interests, e.hotels, e.hotel;
    return 2 != t || r ? o ? !!a || this.toast("请选择你所在的城市") : this.toast("请填写参会人真实姓名") : this.toast("请填写企业机构名称");
}), _defineProperty(_module$exports, "getAllPublicData", function() {
    var e = this.data[DATA_KEY], t = e.userType, o = e.bookHotel, r = e.position, a = e.name, i = e.companyName, s = e.city, n = e.interest, l = e.interests, p = e.hotels, u = e.hotel;
    return {
        participationPeopleType: t,
        orderHotel: o,
        organizationName: 1 == t ? "" : i,
        hotelName: 1 == o ? "" : p[u] || "",
        interestedContent: l[n] || "",
        peopleName: a,
        position: r,
        cityName: function(e) {
            return "Array" === toString.call(e).slice(8, -1);
        }(s) ? s.join(" ") : s
    };
}), _defineProperty(_module$exports, "publicFormSubmit", function(e) {
    if ("boolean" == typeof this.publicInfoValiDate()) {
        var t = this.getAllPublicData();
        t.orderId = e, app.request().post("https://wx.maoyan.com/maoyansh/myshow/ajax/participationPeople/insert").header("content-type", "application/json").query({
            sellChannel: 7,
            token: app.$user.token
        }).send(t).end();
    }
}), _module$exports);