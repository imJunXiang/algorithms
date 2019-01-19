function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

function getCpsPackage() {
    var e = app.store.get("__cps_package__"), t = app.store.get("__cps_write_time__"), a = Date.now();
    if (e && t && a - t < 7776e6) return e;
}

function calcSeatSize() {
    for (var e = seatData.regions, t = 0, a = 0, i = 0; i < e.length; i++) {
        var s = e[i];
        t += s.rowSize, a = a < s.columnSize ? s.columnSize : a;
    }
    return {
        seatHeight: 45 * t,
        seatWidth: 45 * a
    };
}

function calcSeatPos(e) {
    var t = calcSeatSize(), a = t.seatHeight, i = t.seatWidth;
    return {
        seatTop: (a + 100) * (1 - e.scaleTo) * originX / 100,
        seatLeft: (i + 100) * (1 - e.scaleTo) * originY / 100
    };
}

function calcSelectedSeatOffset(e) {
    for (var t = e.region, a = e.row, i = e.column, s = 0, n = 0, r = 0; r < seatData.regions.length; r++) {
        var o = seatData.regions[r];
        if (t === o.regionId) {
            for (var c = 0; c < o.rows.length; c++) {
                var l = o.rows[c];
                if (l.rowNum === a) {
                    s += 1;
                    for (var d = 0; d < l.seats.length; d++) {
                        if (l.seats[d].columnId === i) {
                            n += 1;
                            break;
                        }
                        n += 1;
                    }
                    break;
                }
                s += 1;
            }
            break;
        }
        s += o.rowSize;
    }
    return {
        top: 45 * s,
        left: 45 * n
    };
}

function translateToRightPosition(e, t, a) {
    var i, s, n = calcSeatSize(), r = n.seatHeight, o = n.seatWidth, c = getContainerInfo().content, l = c.width, d = c.height, u = (o + 100) * a, h = (r + 100) * a, g = u - l, f = h - d, m = e < l / 2 ? 0 : (e + 22.5 + 30 - l / 2) * a, p = t < d / 2 ? 0 : (t + 16 - d / 2) * a;
    return i = m > g ? g : m, s = p > f ? f : p, {
        translateX: i,
        translateY: s
    };
}

function handleScale(e, t) {
    var a = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [], s = e.data, n = s.seatWidth, r = s.seatHeight, o = s.content;
    if (0 === i.length) {
        i = [ o.width / 2, o.height / 2 ];
    }
    var c = void 0, l = void 0, d = t.scaleTo === t.scaleMin, u = d ? t.scaleMax : t.scaleMin;
    originX = i[0] / (n * u) * 100, originY = i[1] / (r * u) * 100, originX = originX > 99 ? 100 : originX, 
    originY = originY > 99 ? 100 : originY, originX = originX < 0 ? 0 : originX, originY = originY < 0 ? 0 : originY, 
    d ? (l = 0, c = 0) : (l = (n - o.width + 40) * (originX / 100), c = (r + 205 - o.scrollHeight) * (originY / 100), 
    c = c < 0 ? 0 : c, l = l < 0 ? 0 : l), t.scaleFrom = t.scaleTo, t.seatTop = c, t.seatLeft = l, 
    e.setData({
        scaleFrom: t.scaleTo,
        scaleInfo: t,
        allowScroll: a,
        originX: originX,
        originY: originY
    });
}

function scaleThumb(e, t) {
    var a = e.data.seatWidth, i = e.data.seatHeight, s = e.data.content.width, n = e.data.content.height, r = (e.data.translateX, 
    e.data.translateY, e.data.thumbInitScale), o = s * r / t, c = n * r / t;
    o > a * r && (o = a * r), c > i * r && (c = i * r);
    var l = s / a, d = n / i, u = e.data.aliasX, h = e.data.aliasY;
    u = u ? u * l : a / 2 * r - o / 2, h = h ? h * d : i / 2 * r - c / 2, drawRedRect(u, h, o, c), 
    e.setData({
        aliasX: u,
        aliasY: h
    });
}

function drawRedRect(e, t, a, i) {
    var s = wx.createContext();
    s.setStrokeStyle("#dd403b"), s.setLineWidth(1), s.rect(e, t, a, i), s.stroke(), 
    wx.drawCanvas({
        canvasId: "red-react",
        actions: s.getActions()
    });
}

function translateThumb(e) {
    var t = e.data.scaleInfo, a = e.data.thumbInitScale, i = (e.data.aliasX + e.data.translateX) * a, s = (e.data.aliasY + e.data.translateY) * a;
    drawRedRect(i, s, e.data.content.width * a / t.scaleTo, e.data.content.height * a / t.scaleTo), 
    e.setData({
        aliasX: i,
        aliasY: s
    });
}

function objPick(e, t) {
    return t.reduce(function(t, a) {
        return void 0 !== e[a] && (t[a] = e[a]), t;
    }, {});
}

function seatDataMemery(e) {
    var t = void 0, a = getApp().page(), i = seatData;
    return function() {
        return t && i === seatData ? t : (i = seatData, t = e(), a = getApp().page(), t);
    };
}

function getAllColumns() {
    var e;
    return (e = []).concat.apply(e, _toConsumableArray(seatData.regions.map(function(e) {
        return e.rows;
    })));
}

function getAllSeats() {
    var e;
    return (e = []).concat.apply(e, _toConsumableArray(getAllColumns().map(function(e) {
        return e.seats.forEach(function(t) {
            t.rowNum = e.rowNum;
        }), e.seats;
    })));
}

function getSeatMap() {
    var e = {};
    return seatData.regions.forEach(function(t) {
        var a = objPick(t, [ "colSize", "rowSize", "regionId", "regionName" ]);
        t.rows.forEach(function(e) {
            var t = objPick(e, [ "rowId", "rowNum" ]);
            e.seats.forEach(function(e) {
                e.columnId && (t[e.columnId] = e);
            }), a[e.rowId] = t;
        }), e[t.regionId] = a;
    }), e;
}

function getSeatNoMap() {
    return (getAllSeatsMem() || []).reduce(function(e, t) {
        return t.seatNo && (e[t.seatNo] = t), e;
    }, {});
}

function getSelectedBg() {
    return "";
}

function getSeatBg(e) {
    var t = seatData, a = t.section, i = t.sections, s = a[e.sectionId], n = seatData.image.soldImages, r = i.length;
    if (e.seatStatus === stMap.N) {
        if ("N" === e.seatType) return r > 1 ? s.sectionNormalImage : "";
        if ("L" === e.seatType || "R" === e.seatType) return r > 1 ? s.sectionLoverImage : "";
    } else if (-1 !== stMap.LK.indexOf(e.seatStatus)) {
        var o = n.length;
        if (o) return n[lockSeatIndex++ % o];
    }
    return "";
}

function selectSeatItem(e, t) {
    var a = getAllSeatsMem(), i = a.indexOf(e), s = void 0, n = void 0;
    t = void 0 === t ? !e.selected : t, "L" === e.seatType ? n = a[i + 1] : "R" === e.seatType && (n = a[i - 1]), 
    e.selected = t, s = e.selected ? "N" === e.seatType ? getSelectedBg() : "" : getSeatBg(e), 
    e.style = s ? "background-image: url(" + s + ")" : "", n && (n.selected = t, n.style = s ? "background-image: url(" + s + ")" : "");
}

function selectSeat(e) {
    var t = e.rowNum || e.row, a = e.seatNo || e.no, i = seatData.regions.filter(function(t) {
        return t.regionId === e.region || t.regionId === e.regionId;
    });
    if (0 === i.length) return !1;
    i = i[0].rows;
    for (var s = 0, n = i.length; s < n; s++) if (t === i[s].rowNum) {
        for (var r = i[s].seats, o = 0; o < r.length; o++) if (a === r[o].seatNo) {
            selectSeatItem(r[o]);
            break;
        }
        break;
    }
    for (var c = 0; c < seatData.regions.length; c++) seatData.regions[c].regionId === i.regionId && (seatData.regions[c].rows = i);
    return seatData;
}

function getSelectedData(e) {
    for (var t = [], a = 0; a < e.regions.length; a++) for (var i = e.regions[a].rows, s = 0, n = i.length; s < n; s++) for (var r = i[s].seats, o = 0; o < r.length; o++) r[o].selected && t.length <= MAX_SELECTED && (r[o].regionId = e.regions[a].regionId, 
    r[o].regionName = e.regions[a].regionName, t.push(r[o]));
    return t;
}

function getSeatsPrice(e) {
    var t = void 0, a = void 0, i = e.length;
    return i <= 0 ? {
        totalPrice: "",
        desc: "",
        seatsPriceDetail: ""
    } : (a = seatData.price[e[0].sectionId], t = a.seatsPrice[i], t && t.totalPrice && (t.totalPrice = t.totalPrice.replace(/元|￥/, ""), 
    t.seatsPriceDetail = a.seatsPriceDetail[i] || {}, t.seatsPriceDetail.detail && t.seatsPriceDetail.detail.forEach(function(e) {
        e.desc = e.desc.map(function(e) {
            return e.replace(/(-)(\d+)/, "$1¥$2");
        });
    })), t || {
        totalPrice: "",
        desc: "",
        seatsPriceDetail: ""
    });
}

function setHideValue(e, t) {
    var a = {
        max_selected_hidden: !0,
        otherday_confirm_hidden: !0,
        loading_hidden: !0,
        selectseat_error_hidden: !0,
        selectseat_error_hidden2: !0,
        submitOrder_hidden: !0,
        submitOrder_fail_hidden: !0,
        goback_slectseats_hidden: !0,
        max_selected_num: MAX_SELECTED,
        scaleRatio: 2,
        migrateCount: migrateSeatNum
    };
    for (var i in a) if (a.hasOwnProperty(i) && i === e) {
        a[e] = t;
        break;
    }
    return a;
}

function checkSeat(e, t) {
    var a = {
        sideFlag: !0,
        middleFlag: !0
    };
    return a = checkSideIsEmpty(e, t, "left", a), a = checkSideIsEmpty(e, t, "right", a);
}

function checkSideIsEmpty(e, t, a, i) {
    var s = "left" == a ? "right" : "left";
    i = i || {
        sideFlag: !0,
        middleFlag: !0
    };
    var n = getNextSeat(e, t, a);
    if (n && n.seatStatus === stMap.N && !n.selected) {
        var r = getNextSeat(n, t, a);
        if (r && r.selected) return i.middleFlag && (i.middleFlag = !1), i;
        if (!r || -1 !== stMap.LK.indexOf(r.seatStatus) || r.seatStatus === stMap.E) for (var o = getNextSeat(e, t, s); o && -1 === stMap.LK.indexOf(o.seatStatus) && o.seatStatus !== stMap.E; ) {
            if (!o.selected) return i.sideFlag && (i.sideFlag = !1), i;
            o = getNextSeat(o, t, s);
        }
    }
    return i;
}

function getNextSeat(e, t, a) {
    for (var i = null, s = [], n = 0, r = t.length; n < r; n++) if (t[n].rowId === e.rowId) {
        s = t[n].seats;
        break;
    }
    for (var o = 0; o < s.length; o++) if ("left" === a) {
        if (s[o].seatNo === e.seatNo && s[o - 1] && s[o - 1].sectionId === e.sectionId) {
            i = s[o - 1];
            break;
        }
    } else if (s[o].seatNo === e.seatNo && s[o + 1] && s[o + 1].sectionId === e.sectionId) {
        i = s[o + 1];
        break;
    }
    return i;
}

function getSelectedSeats(e) {
    var t = {};
    t.count = e.length, t.list = [];
    for (var a = 0; a < e.length; a++) {
        var i = {}, s = getSeatNoMapMem(), n = s[e[a].seatNo];
        i = _extends({}, n), t.list.push(i);
    }
    return t;
}

function getContainerInfo(e) {
    var t = {}, a = 0, i = 9;
    recommendData && recommendData.length > 0 && (i = 16), seatData.notice && seatData.notice.length && (a = 5.6);
    var s = 100 - i - 16 - a, n = i;
    return e && e.length > 0 && (e.length > 4 ? (s = 56 - a, n = 28) : (s = 62 - a, 
    n = 22)), t.content = {
        displayHeight: s,
        height: s * windowHeight / 100,
        width: windowWidth,
        scrollHeight: 75 * windowHeight / 100
    }, t.footer = {
        displayHeight: n,
        height: n * windowHeight / 100,
        width: windowWidth
    }, t;
}

function getBuyBlock(e) {
    var t = getContainerInfo(e);
    return _extends({}, t, {
        isShowRecommend: !(e.length > 0)
    });
}

function updateBuyBlock(e, t) {
    var a = getBuyBlock(t);
    e.setData(a);
}

function getScaleInfo() {
    var e = getContainerInfo(), t = e.content.width, a = e.content.height, i = calcSeatSize(), s = i.seatWidth, n = i.seatHeight, r = (t - 40) / s, o = a / n, c = Math.min(o, r), l = 0, d = 0;
    c = c > 1 ? 1 : c, c = c < .3 ? .3 : c, s < t && n < a ? (l = c, d = 1) : (l = c, 
    d = c);
    var u = calcSeatPos({
        scaleTo: d
    });
    return {
        scaleFrom: l,
        scaleTo: d,
        scaleMin: c,
        scaleMax: 1,
        seatTop: u.seatTop,
        seatLeft: u.seatLeft
    };
}

function expoOut(e) {
    return 1 - Math.pow(1, -2 * e);
}

function getTranslateObj(e) {
    var t = e.containerInfo || getContainerInfo(), a = t.content, i = calcSeatSize(), s = i.seatWidth;
    i.seatHeight;
    return s *= e.scaleTo, {
        translateX: s > a.width ? (s + 50 - a.width) / 2 : 0,
        translateY: 0
    };
}

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _slicedToArray = function() {
    function e(e, t) {
        var a = [], i = !0, s = !1, n = void 0;
        try {
            for (var r, o = e[Symbol.iterator](); !(i = (r = o.next()).done) && (a.push(r.value), 
            !t || a.length !== t); i = !0) ;
        } catch (e) {
            s = !0, n = e;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (s) throw n;
            }
        }
        return a;
    }
    return function(t, a) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, app = getApp(), Finger = require("../../vendors/finger.js"), risk = require("../../scripts/risk.js"), Date2 = app.require("scripts/date2.js"), MobileConfirm = require("../../tpl/mobile-confirm"), user = require("../../scripts/user"), AccessLimit = require("../../tpl/access-limit"), Rain = require("../../tpl/rain"), seatData = {}, recommendData = [], MAX_SELECTED = 4, Timer = null, ToastTimer = null, ThumbTimer = null, windowWidth = 0, windowHeight = 0, ratio = 0, migrateSeatNum = 0, PageToastStatus = setHideValue("loading_hidden", !0), seatImgMap = {
    "可选": app.imageSrcPrefix + "/images/seat-normal.png",
    "不可选": app.imageSrcPrefix + "/images/seat-disabled.png",
    "已选": app.imageSrcPrefix + "/images/seat-selected.png",
    "情侣座": app.imageSrcPrefix + "/images/seat-lover.png"
}, stMap = {
    E: 0,
    N: 1,
    LK: [ 2, 3, 4 ]
}, lockSeatIndex = 0, scaleTimeout, isPinch = !1, isSetOrigin = !1, scrollTimeout, originX = 0, originY = 0, scrollInfo = {}, lastAnimation = 0, timespan = 40, preScale, scaleDir, getAllColumnsMem = seatDataMemery(getAllColumns), getAllSeatsMem = seatDataMemery(getAllSeats), getSeatMapMem = seatDataMemery(getSeatMap), getSeatNoMapMem = seatDataMemery(getSeatNoMap);

app.MoviePage({
    data: {
        seatData: {},
        selectedData: [],
        pageToastData: PageToastStatus,
        scaleInfo: {
            scaleTo: 1
        },
        checkedseats: JSON.stringify({
            count: 0,
            list: [],
            sectionId: ""
        }),
        rowNumberPosition: "absolute",
        scrollLeft: 0,
        translateX: 0,
        translateY: 0,
        content: {
            displayHeight: 75
        },
        footer: {
            displayHeight: 9
        },
        seatImgMap: seatImgMap,
        x: 0,
        y: 0,
        showSide: !0,
        scrollTop: 0,
        allowScroll: !0,
        originX: originX,
        originY: originY,
        needDuration: !1,
        hasShownAuth: !1
    },
    findSelectedSeats: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (e.length) {
            var a = getSeatMapMem(), i = a[t], s = seatData.regions.filter(function(e) {
                return e.regionId === t;
            });
            s = s[0].rows;
            var n = e.split("|"), r = seatData.lastSelectedSeat.selectedSeatType, o = r && r.split("|");
            n.forEach(function(e, t) {
                var a = e.split(":"), s = _slicedToArray(a, 2), n = s[0], r = s[1], c = i[n][r];
                c.seatType = o[t] || "N", c.seatStatus = 1, selectSeatItem(c, !0);
            });
            var c = getSelectedData(seatData), l = getSeatsPrice(c), d = l.totalPrice, u = l.desc, h = l.seatsPriceDetail;
            c.length;
            updateBuyBlock(this, c);
            var g = getSelectedSeats(c);
            this.setData({
                totalPrice: d,
                desc: u,
                seatsPriceDetail: h,
                regions: seatData.regions,
                selectedData: c,
                checkedSeats: JSON.stringify(g)
            });
        }
    },
    handleSelect: function(e) {
        if (!isPinch) {
            var t = e.currentTarget, a = this, i = {}, s = selectSeat(t.dataset), n = getSelectedData(s), r = getSeatsPrice(n), o = r.totalPrice, c = r.desc, l = r.seatsPriceDetail, d = a.data.scaleInfo.scaleTo, u = getScaleInfo(), h = (u.scaleTo === u.scaleMax || u.scaleTo === d) && u.scaleMin !== u.scaleMax;
            u.scaleTo = u.scaleMax;
            var g = getContainerInfo().content, f = (g.width, g.height, u.scaleTo, calcSeatPos(u));
            u.seatLeft = f.seatLeft, u.seatTop = f.seatTop;
            if (n.length > MAX_SELECTED) return s = selectSeat(t.dataset), n = getSelectedData(s), 
            this.setData({
                pageToastData: setHideValue("max_selected_hidden", !1)
            }), ToastTimer && clearTimeout(ToastTimer), ToastTimer = setTimeout(function() {
                a.setData({
                    pageToastData: setHideValue("max_selected_hidden", !0)
                });
            }, 1e3), !1;
            if (n.length && 0 !== n.filter(function(e) {
                return e.sectionId !== t.dataset.section;
            }).length) return s = selectSeat(t.dataset), n = getSelectedData(s), this.toast("请选择同一颜色区域的座位"), 
            !1;
            var m = getBuyBlock(n);
            if (i = getSelectedSeats(n), this.setData(_extends({}, m, {
                totalPrice: o,
                desc: c,
                seatsPriceDetail: l,
                regions: s.regions,
                selectedData: n,
                checkedSeats: JSON.stringify(i)
            })), h) {
                var p = calcSelectedSeatOffset(t.dataset), S = p.top;
                handleScale(this, u, !0, [ p.left * u.scaleMin, S * u.scaleMin ]);
            } else this.setData({
                scaleInfo: u
            });
            this.rain.queueAnimation(n.length);
        }
    },
    handleRecommend: function(e) {
        for (var t, a = e.currentTarget, i = JSON.parse(a.dataset.seats), s = a.dataset.remind, n = 0; n < i.length; n++) {
            var r = i[n];
            r.regionId = r.sectionId, t = selectSeat(r);
        }
        var o = getSelectedData(t), c = getSelectedSeats(o), l = calcSeatSize(), d = (l.seatHeight, 
        l.seatWidth, getContainerInfo());
        d.content;
        updateBuyBlock(this, o), this.rain.IMG_MAP.hasOwnProperty(o.length) || this.toast(s, 1500);
        var u = this.data.scaleInfo;
        u.scaleTo = u.scaleMin, scaleDir = 0, preScale = 0;
        var h = {
            translateX: 0,
            translateY: 0
        }, g = calcSeatPos(u);
        u.seatTop = g.seatTop, u.seatLeft = g.seatLeft;
        var f = getSeatsPrice(o), m = f.totalPrice, p = f.desc, S = f.seatsPriceDetail;
        this.setData(_extends({
            isShowRecommend: !1,
            regions: t.regions,
            selectedData: o,
            totalPrice: m,
            desc: p,
            seatsPriceDetail: S,
            checkedSeats: JSON.stringify(c),
            scaleInfo: u,
            scaleFrom: u.scaleTo
        }, h)), isSetOrigin = !0, this.rain.queueAnimation(o.length, !0);
    },
    handleCancelSeat: function(e) {
        var t = e.currentTarget, a = selectSeat(t.dataset, !1), i = getSelectedData(a), s = getSelectedSeats(i);
        updateBuyBlock(this, i);
        var n = getSeatsPrice(i), r = n.totalPrice, o = n.desc, c = n.seatsPriceDetail;
        this.setData({
            regions: a.regions,
            selectedData: i,
            totalPrice: r,
            desc: o,
            seatsPriceDetail: c,
            checkedSeats: JSON.stringify(s)
        }), this.rain.queueAnimation(i.length);
    },
    onGetPhoneNumber: function(e) {
        var t = this, a = this, i = function(i) {
            function s(t) {
                a.setData({
                    hasShownAuth: !0
                }), app.setMobile(t), app.request().post("/user/mobile").header({
                    token: app.$user && app.$user.token
                }).send({
                    mobile: t,
                    type: 1
                }).end().then(function(t) {
                    a.submitOrder(e);
                }).catch(function(t) {
                    console.error(t), a.submitOrder(e);
                });
            }
            i ? s(i) : (t.mobileConfirm.show(), t.mobileConfirm.on("success", function(e) {
                s(e);
            }));
        };
        user.getPhoneNumber(e, i.bind(this));
    },
    submitOrder: function(e) {
        var t = this, a = getSelectedData(seatData), i = e.target, s = i.dataset.seats, n = i.dataset.seqno, r = i.dataset.cinemaid, o = void 0;
        try {
            o = getCpsPackage();
        } catch (e) {
            this.reportError(e);
        }
        var c = this;
        if (s) {
            var l, d, u, h = !0;
            if (a.forEach(function(e) {
                var a = e.regionId, i = e.sectionId;
                u = seatData.section[i].sectionName, l && d ? d === i && l === a || (t.toast("请不要选择不同区的座位！"), 
                h = !1) : (l = a, d = i);
            }), h) {
                for (var g = JSON.parse(s), f = g.list, m = f.length, p = seatData.regions.filter(function(e) {
                    return e.regionId === l;
                })[0].rows, S = 0; S < m; S++) {
                    var D = f[S];
                    if ("L" !== D.seatType && "R" !== D.seatType) {
                        var v = checkSeat(D, p);
                        if (!v.middleFlag) return console.log("中间留有空位"), this.setData({
                            pageToastData: setHideValue("selectseat_error_hidden", !1)
                        }), setTimeout(function() {
                            c.setData({
                                pageToastData: setHideValue("selectseat_error_hidden", !0)
                            });
                        }, 1e3), !1;
                        if (!v.sideFlag) return console.log("旁边留有空位"), this.setData({
                            pageToastData: setHideValue("selectseat_error_hidden2", !1)
                        }), setTimeout(function() {
                            c.setData({
                                pageToastData: setHideValue("selectseat_error_hidden2", !0)
                            });
                        }, 1e3), !1;
                    }
                }
                if (migrateSeatNum > 0 && m < migrateSeatNum) return this.toast("本次改签的座位数不得小于" + migrateSeatNum), 
                !1;
                var w = app.openPlatform.get(), T = {
                    url: "/proxy/createorder/v9/create.json",
                    method: "POST",
                    success: function(e) {
                        var t = e.body.data;
                        if (c.setData({
                            pageToastData: setHideValue("submitOrder_hidden", !0)
                        }), t) {
                            wx.setStorageSync("orderInfo", t), app._orderInfo = t, c.data.orderId = t.id;
                            var a = "/pages/cinema/seat?" + app.queryStringify(c.options), i = {
                                url: "../order/buy?orderId=" + t.id + "&cinemaId=" + r + "&backUrl=" + encodeURIComponent(a)
                            };
                            c.data.migrate && "orderlist" == c.data.migrate.source && (i.url += "&source=" + c.data.migrate.source), 
                            app.goto(i.url);
                            try {
                                c.stats("order", "b_wgbkrr1f", {
                                    order_id: t.id,
                                    movie_id: t.order.movieId,
                                    movie_name: t.order.movieName,
                                    cinema_id: t.order.cinemaId
                                });
                            } catch (e) {
                                c.reportError(e);
                            }
                        }
                    },
                    failure: function() {
                        c.setData({
                            pageToastData: setHideValue("submitOrder_fail_hidden", !1),
                            orderErrorMsg: "网络异常, 请稍后再试"
                        });
                    }
                };
                g.list = g.list.map(function(e) {
                    var t = _extends({}, e, {
                        type: e.seatType
                    });
                    return delete t.seatType, t;
                });
                var I = {
                    channelId: app.channelId,
                    clientType: "wechat_small_program",
                    migrate: JSON.stringify(this.data.migrate),
                    orderSource: "movie",
                    seats: JSON.stringify(g),
                    sectionName: u,
                    seqNo: n,
                    originalPrice: this.data.totalPrice
                };
                if (this.mobileType) {
                    var y = [ "input", "wechat" ];
                    I.userPhone = app.$user.mobile, I.wechatMobileAuth = y.indexOf(this.mobileType);
                } else I.userPhone = app.$user.mobile;
                if (w) {
                    var b = w.extChannelId, _ = w.extUserId, P = w.extSubChannel;
                    I.extChannelId = b, I.extUserId = _, I.extSubChannel = P, I.cityId = app.getPropSafely("city.id", app.$location, 0);
                }
                o && (I.cpsPackage = o), d && (I.sectionId = d);
                var x = new Promise(function(t) {
                    risk.params(e, t);
                });
                this.setData({
                    pageToastData: setHideValue("submitOrder_hidden", !1)
                }), Timer && clearTimeout(Timer), Timer = setTimeout(function() {
                    x.then(function(e) {
                        I.deviceInfoByQQ = app.deviceInfoByQQ(e), app.$uuid && (T.url += (~T.url.indexOf("?") ? "&" : "?") + "uuid=" + encodeURIComponent(app.$uuid)), 
                        app.request().post(T.url).header({
                            "x-ta": "1",
                            "x-host": "http://maoyanapi.vip.sankuai.com",
                            token: app.$user.token
                        }).send(I).end().then(function(e) {
                            return T.success(e);
                        }).catch(function(e) {
                            c.setData({
                                pageToastData: setHideValue("submitOrder_hidden", !0)
                            });
                            var a = e && e.res && e.res.data.error;
                            if (a) {
                                if (401 === a.code) return void app.logout();
                                var i = 19e6 === a.code && a.attach;
                                if (i) return t.accessLimit.onConfirm = function() {
                                    return t.refreshSeat();
                                }, t.accessLimit.render(i), void t.accessLimit.show();
                                var s = a ? a.message : "抱歉，您的座位已被其他用户选中，请重新选择";
                                return void wx.showModal({
                                    title: "预订失败",
                                    content: s,
                                    showCancel: !1,
                                    confirmText: "知道了",
                                    success: function() {
                                        105206 === a.code && wx.showLoading({
                                            title: "重新获取座位"
                                        }), c.refreshSeat().catch(function() {}).then(function() {
                                            wx.hideLoading();
                                        });
                                    }
                                });
                            }
                            t.handleError(e);
                        });
                    });
                }, 500);
            }
        }
    },
    formSubmit: function(e) {
        app.collectFormId(e.detail.formId);
    },
    showNotice: function(e) {
        seatData.showNotice = !seatData.showNotice;
        var t = getContainerInfo(), a = t.content;
        this.setData({
            seatData: seatData,
            content: a
        });
    },
    showPriceDetail: function(e) {
        this.setData({
            showPriceDetail: !this.data.showPriceDetail
        });
    },
    maxSelectedChange: function(e) {
        this.setData({
            pageToastData: setHideValue("max_selected_hidden", !0)
        });
    },
    loadingChange: function(e) {
        this.setData({
            pageToastData: setHideValue("loading_hidden", !0)
        });
    },
    confirmDesc: function() {
        this.setData({
            pageToastData: setHideValue("otherday_confirm_hidden", !0)
        });
    },
    confirmSelect: function() {
        this.setData({
            pageToastData: setHideValue("otherday_confirm_hidden", !0)
        });
    },
    fetchSeatInfo: function() {
        var e = this;
        return this.loading(), app.request().post("/hostproxy/seat/v8/show/seats.json").header({
            token: app.$user.token,
            "x-host": "http://maoyanapi.vip.sankuai.com"
        }).query({
            seqNo: this.options.seqNo,
            channelId: app.channelId
        }).end().then(function(t) {
            return e.loading(!1), t;
        }).catch(function(t) {
            throw e.loading(!1), t;
        });
    },
    onLoad: function(e) {
        var t = this;
        this.options = e;
        var a, i = this;
        scrollInfo = {
            scrollTop: 0,
            scrollLeft: 0
        }, this.rain = new Rain({
            page: this
        }), this.mobileConfirm = new MobileConfirm({
            page: this
        }), this.accessLimit = new AccessLimit({
            page: this
        }), this.accessLimit.onConfirm = this.render.bind(this), risk.params(), app.updateCode(), 
        this.finger = new Finger({
            pinch: function(e) {
                isPinch = !0, preScale = preScale || e.scale;
                var t = scaleDir;
                if (e.scale > preScale) scaleDir = 1; else {
                    if (!(e.scale < preScale)) return;
                    scaleDir = 0;
                }
                var s = getScaleInfo();
                if (s.scaleTo = scaleDir ? s.scaleMax : s.scaleMin, s.scaleTo !== i.data.scaleFrom && s.scaleMax !== s.scaleMin && t !== scaleDir) {
                    var n = calcSeatPos(s);
                    s.seatTop = n.seatTop, s.seatLeft = n.seatLeft;
                    var r = e.touches[0].clientX, o = e.touches[0].clientY, c = e.touches[1].clientX, l = e.touches[1].clientY, d = scrollInfo, u = d.scrollLeft, h = d.scrollTop;
                    u = u || 0, h = h || 0, a = [ (r + c) / 2 - 40 + u, (o + l) / 2 - 75 + h ], handleScale(i, s, !1, a);
                }
            },
            pressMove: function(e) {},
            touchStart: function(e) {
                ThumbTimer && clearTimeout(ThumbTimer);
            },
            touchEnd: function(e) {
                preScale = null, scaleDir = null, a = [], setTimeout(function() {
                    isPinch = !1;
                }, 500);
            }
        }), wx.getSystemInfo({
            success: function(e) {
                windowWidth = e.windowWidth, windowHeight = e.windowHeight, ratio = e.pixelRatio, 
                i.setData({
                    ratio: ratio,
                    scaleFrom: "0.1"
                });
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function(e) {}
        }), app.checkLogin({
            warn: "选座前请先登录",
            success: function() {
                t.setData({
                    pageToastData: setHideValue("loading_hidden", !0)
                }), t.render();
            },
            fail: function() {
                return app.goto(-1);
            }
        }), e.sourceOrderId ? (migrateSeatNum = e.seatCount, this.setData({
            migrate: {
                migrateTarget: !0,
                sourceOrderId: e.sourceOrderId,
                source: e.source
            }
        })) : migrateSeatNum = 0;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        clearTimeout(this.backTimer);
    },
    onUnload: function() {
        PageToastStatus = {
            max_selected_hidden: !0,
            otherday_confirm_hidden: !0,
            loading_hidden: !0,
            selectseat_error_hidden: !0,
            selectseat_error_hidden2: !0,
            submitOrder_hidden: !0,
            submitOrder_fail_hidden: !0,
            goback_slectseats_hidden: !0
        }, this.setData({
            pageToastData: PageToastStatus
        }), clearTimeout(this.backTimer);
    },
    touchstart: function(e) {
        this.finger.start(e);
    },
    touchmove: function(e) {
        this.finger.move(e);
    },
    touchend: function(e) {
        this.finger.end(e);
    },
    touchcancel: function(e) {
        console.log("touchCancel", e), this.finger.cancel(e);
    },
    scroll: function(e) {
        var t = this;
        scrollInfo = e.detail, isSetOrigin ? (isSetOrigin = !1, this.data.showSide || this.setData({
            showSide: !0
        })) : (this.data.showSide && this.setData({
            showSide: !1
        }), scrollTimeout && clearTimeout(scrollTimeout), scrollTimeout = setTimeout(function() {
            t.setData({
                scrollTop: scrollInfo.scrollTop,
                showSide: !0
            });
        }, 200));
    },
    onShareAppMessage: function() {
        var e = this.data.seatData, t = e.showDate, a = e.showTime, i = t.split("-"), s = "/pages/cinema/seat?" + app.shareParams(this.options);
        s = encodeURIComponent(s);
        var n = "pages/movie/index?redirect=" + s;
        return {
            title: "《" + seatData.movieName + "》 " + i[1] + "月" + i[2] + "日 " + a + "场次座位图",
            path: n
        };
    },
    render: function() {
        var e = this, t = this;
        this.fetchSeatInfo().then(function(a) {
            var i = a.body.data;
            i.user && i.user.userPhone && 0 !== i.user.mobileSourceType && (app.setMobile(i.user.userPhone), 
            e.setData({
                hasMobile: !0
            })), seatData = function() {
                var e = {};
                return Object.keys(i).forEach(function(t) {
                    "price" !== t && (i[t] && "object" === _typeof(i[t]) ? Object.keys(i[t]).forEach(function(a) {
                        return e[a] = i[t][a];
                    }) : e[t] = i[t]);
                }), e;
            }(), seatData.sections = [];
            for (var s in seatData.section) seatData.section.hasOwnProperty(s) && seatData.sections.push(seatData.section[s]);
            if (seatData.sections.length > 1) {
                var n = app.get("hasShownGuide"), r = !1;
                seatData.sections.sort(function(e, t) {
                    return e.sectionPrice !== t.sectionPrice && (r = !0), e.index - t.index;
                }), !n && r ? (e.setData({
                    showGuide: !0
                }), app.set("hasShownGuide", !0)) : e.setData({
                    showGuide: !1
                });
            }
            seatData.price = i.price;
            var o = seatData, c = o.defaultReminder, l = !1;
            if (c) {
                var d = c.indexOf("{"), u = c.indexOf("}");
                seatData.beforeRemindTime = c.substr(0, d), seatData.afterRemindTime = c.substr(u + 1), 
                seatData.remindTime = c.substring(d + 1, u), l = !0;
            }
            if (seatData.notice && seatData.notice.length) {
                var h = wx.getSystemInfoSync(), g = void 0;
                g = h.windowWidth <= 320 ? 22 : h.windowWidth >= 414 ? 27 : 24, seatData.noticeMaxLength = g;
            }
            recommendData = [];
            var f = seatData, m = f.recommendation;
            if (m.isShowRecommendation) {
                var p = m.bestRecommendation;
                for (var S in p) p.hasOwnProperty(S) && p[S] && 0 !== Object.keys(p[S]).length && recommendData.push(p[S]);
            }
            for (var D = 0; D < recommendData.length; D++) {
                for (var v = recommendData[D].seats, w = 0, T = v.length; w < T; w++) if (v[w].rowId && v[w].columnId) {
                    for (var I, y = v[w].rowId, b = v[w].columnId, _ = seatData.regions.filter(function(e) {
                        return e.regionId === v[w].sectionId;
                    })[0].rows, P = _.filter(function(e) {
                        return e.rowId === y;
                    })[0], x = 0; x < P.seats.length && (!P.seats[x].columnId || P.seats[x].columnId !== b); ) x++;
                    I = P.seats[x], v[w].seatNo = I.seatNo, v[w] = v[w];
                }
                recommendData[D].seats = JSON.stringify(v), recommendData[D].count = v.length;
            }
            MAX_SELECTED = seatData.buyNumLimit ? seatData.buyNumLimit : 4;
            var M = Math.min(MAX_SELECTED, 5);
            recommendData = recommendData.sort(function(e, t) {
                return e.count > t.count ? 1 : e.count === t.count ? 0 : -1;
            }).slice(0, M), recommendData = recommendData.filter(function(e) {
                return e.count > 0;
            });
            var N = seatData.regions[0].colSize, k = setHideValue("loading_hidden", !0);
            k = setHideValue("otherday_confirm_hidden", !seatData.desc);
            var O = getScaleInfo();
            console.log("request scaleInfo:", O);
            var L, C = getContainerInfo(), E = C.content, A = C.footer;
            L = N % 2 == 0 ? N / 2 * 45 - 5 : (N + 1) / 2 * 45 - 5;
            var H = calcSeatSize(), X = H.seatHeight, R = H.seatWidth, Y = getTranslateObj({
                containerInfo: C,
                scaleTo: O.scaleTo
            });
            seatData.showDateText = new Date2(seatData.showDate).toString("E M月d日"), seatData.watermark = seatData.watermark.replace("w.h/", "");
            var B = !0;
            seatData.regions.forEach(function(e) {
                e.rows.forEach(function(e) {
                    e.seats.forEach(function(e) {
                        1 === e.seatStatus && (B = !1);
                        var t = getSeatBg(e);
                        e.style = t ? "background-image: url(" + t + ")" : "";
                    });
                });
            }), t.setData(_extends({
                cinemaId: i.cinema.cinemaId,
                footer: A,
                content: E,
                regions: seatData.regions,
                seatData: seatData,
                showRemind: l,
                recommendSeats: recommendData,
                isShowRecommend: recommendData.length > 0,
                selectedData: getSelectedData(seatData),
                pageToastData: k,
                middleLinePosition: L,
                hallHeight: 18 * O.scaleTo,
                seatWidth: R,
                seatHeight: X,
                show: i.show,
                scaleFrom: O.scaleTo,
                scaleInfo: O
            }, Y), function() {
                var t = i.seat.image, a = t.doIconRain, s = t.iconRainTriggerMillis, n = t.iconRains;
                e.rain.configRainAnimation(a, s, n);
            });
            var F = seatData.lastSelectedSeat, q = F.selectedSeats, V = F.selectedRegionId;
            if (e.findSelectedSeats(q, V), wx.setNavigationBarTitle({
                title: seatData.cinemaName
            }), setTimeout(function() {
                l = !1, t.setData({
                    showRemind: l
                });
            }, 5e3), B) return void wx.showModal({
                title: "该场次已售完",
                content: "请选择其他场次",
                showCancel: !1,
                confirmText: "知道了",
                success: function() {
                    wx.navigateBack();
                }
            });
        }).catch(function(a) {
            if (a.res && a.res.data.error) {
                t.setData({
                    pageToastData: setHideValue("loading_hidden", !0)
                });
                var i = AccessLimit.getAttachFromError(a);
                return i ? (e.accessLimit.onConfirm = e.render.bind(e), e.accessLimit.render(i), 
                void e.accessLimit.show()) : (t.toast(a.res.data.error.message, 3e3), void (t.backTimer = setTimeout(function() {
                    wx.navigateBack();
                }, 3e3)));
            }
        });
    },
    refreshSeat: function() {
        var e = this;
        return this.fetchSeatInfo().then(function(t) {
            var a = t.body.data, i = a.seat.regions;
            seatData = Object.assign({}, seatData, {
                regions: i
            }), seatData.regions.forEach(function(e) {
                e.rows.forEach(function(e) {
                    e.seats.forEach(function(e) {
                        var t = getSeatBg(e);
                        e.style = t ? "background-image: url(" + t + ")" : "";
                    });
                });
            });
            var s = getSelectedData(seatData);
            e.setData({
                seatData: seatData,
                regions: i,
                selectedData: [],
                checkedSeats: JSON.stringify({
                    count: 0,
                    list: []
                })
            });
            var n = seatData.lastSelectedSeat, r = n.selectedSeats, o = n.selectedRegionId;
            e.findSelectedSeats(r, o), updateBuyBlock(e, s);
        }).catch(function(t) {
            e.handleError(t);
        });
    },
    setOrigin: function() {
        var e = this, t = Object.assign({}, this.data.scaleInfo), a = this.data.scaleInfo;
        a.seatTop = 0, a.seatLeft = 0, originX = originY = 0, this.setData({
            allowScroll: !0
        }), scrollInfo = {
            scrollTop: t.seatTop,
            scrollLeft: t.seatLeft
        }, setTimeout(function() {
            e.setData({
                scaleInfo: a,
                originX: originX,
                originY: originY,
                translateX: t.seatLeft,
                translateY: t.seatTop,
                scrollTop: t.seatTop
            });
        }, 50), isSetOrigin = !0;
    },
    hideGuide: function() {
        this.setData({
            showGuide: !1
        });
    }
});