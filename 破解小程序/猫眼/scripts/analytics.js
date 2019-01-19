function isType(e, r) {
    return (void 0 === e ? "undefined" : _typeof(e)) === r;
}

function isNumber(e) {
    return isType(e, "number");
}

function rnd() {
    return 65535 * Math.random();
}

function rndSeed() {
    return Math.ceil(rnd()).toString(16);
}

function genRequestId() {
    return _.now().toString(16) + "-" + rndSeed() + "-" + rndSeed();
}

function setCache(e, r) {
    try {
        wx.setStorageSync(storagePrefix + e, r);
    } catch (e) {
        error("setCache error :", e);
    }
}

function getCache(e) {
    try {
        return wx.getStorageSync(storagePrefix + e);
    } catch (e) {
        return error("getCache error :", e), undef;
    }
}

function removeCache(e) {
    try {
        wx.removeStorageSync(storagePrefix + e);
    } catch (e) {
        error("removeCache error: ", e);
    }
}

function LXCUID(e) {
    function r(e, r) {
        var t, a = 0;
        for (t = 0; t < r.length; t++) a |= s[t] << 8 * t;
        return e ^ a;
    }
    var t = getCache("lxcuid");
    if (t) return t;
    var a, n, o = function() {
        for (var e = 1 * new Date(), r = 0; e === 1 * new Date() && r < 200; ) r++;
        return e.toString(16) + r.toString(16);
    }, c = +(Math.random() + "").slice(2), i = e.ua || "", s = [], u = 0;
    for (a = 0; a < i.length; a++) n = i.charCodeAt(a), s.unshift(255 & n), s.length >= 4 && (u = r(u, s), 
    s = []);
    s.length > 0 && (u = r(u, s)), i = u;
    var d = 0;
    e.sc && (d = e.sc.split("*"), d = +d[0] * +d[1]);
    var l = [ o(), c, i, d, o() ].map(function(e) {
        return e.toString(16);
    }).join("-");
    return setCache("lxcuid", l), l;
}

function InitEnv() {
    return new Promise(function(e) {
        var r = wx.getSystemInfoSync(), t = "MicroMessengerWXA (" + r.model + "; " + r.system + "; " + r.pixelRatio + "dpr; language/" + r.language + ") " + r.platform + "/" + r.version + " NetType/";
        env.ct = r.platform, env.sc = r.screenWidth + "*" + r.screenHeight, env.ua = t;
        var a = getCache("wxid"), n = getCache("wxunionid");
        a && (env.wxid = a), n && (env.wxunionid = n), wx.getNetworkType({
            success: function(r) {
                env.net = r.networkType.toUpperCase(), env.ua = env.ua.replace(/(NetType\/).*/, "$1" + r.networkType.toUpperCase()), 
                e(env);
            },
            fail: function() {
                e(env);
            }
        });
    });
}

function removeEnv(e) {
    delete env[e];
}

function setEnv(e, r, t) {
    var a = _.extend({}, env), n = !1;
    "category" === e && (r = "data_sdk_" + r), "wxid" !== e && "wxunionid" !== e || setCache(e, r), 
    "msid" === e && env.scene && removeEnv("scene"), "msid" === e && (n = !0), env[e] = r;
    var o = _.extend({}, env);
    t && t(a, o, n);
}

function getEnv(e) {
    return e ? e && env[e] : env;
}

function MSID() {
    var e = [], r = _.now();
    return e.push(r.toString(16)), e.push(rndSeed()), e.push(rndSeed()), e.push(rndSeed()), 
    e.join("-");
}

function retry(e, r) {
    if (!forbid || r == NM_APP_QUIT && r == NM_PAGE_DISAPPEAR) if (r == NM_MODULE_VIEW_LIST) {
        if (MAX_RETRY >= mvlRetryTime) return mvlRetryTime++, void setTimeout(function() {
            postData(e, undef, r);
        }, retryInterval(mvlRetryTime));
        mvlCurrentSendData = [], mvlRetryTime = 0, clearTimeout(mvlSendTimer), mvlSendTimer = null, 
        createSendTimer(e, NM_MODULE_VIEW_LIST);
    } else {
        if (MAX_RETRY >= retryTime) return retryTime++, void setTimeout(function() {
            postData(e, undef, r);
        }, retryInterval(retryTime));
        r == NM_APP_QUIT && (removeCache(sendCacheKey), clearTimeout(mvlSendTimer), mvlSendTimer = null), 
        currentSendData = [], retryTime = 0, cacheSendTimer = null, lxCacheData.length && createSendTimer(e), 
        forbid = !1;
    }
}

function sendData(e, r, t) {
    _.isArray(r) && r.length && wx.request({
        method: "POST",
        url: e,
        data: r,
        success: function(r) {
            400 > r.statusCode ? successHandle(e, t) : (retry(e, t), reportError("report.js", "wx-request-fail", r.statusCode));
        },
        fail: function() {
            retry(e, t), reportError("report.js", "wx-request-fail", "report fail");
        },
        complete: function(e) {}
    });
}

function successHandle(e, r) {
    if (r == NM_MODULE_VIEW_LIST) return mvlRetryTime = 0, clearTimeout(mvlSendTimer), 
    mvlSendTimer = null, mvlCurrentSendData = [], void createSendTimer(e, NM_MODULE_VIEW_LIST);
    r == NM_APP_QUIT && (clearTimeout(mvlSendTimer), mvlRetryTime = 0, mvlSendTimer = null, 
    removeCache(sendCacheKey)), forbid = !1, retryTime = 0, currentSendData = [], cacheSendTimer = null, 
    lxCacheData.length && createSendTimer(e);
}

function postData(e, r, t) {
    if (r) t == NM_MODULE_VIEW_LIST ? mvlRetryTime = 0 : retryTime = 0, sendData(e, r, t); else {
        var a = undef;
        a = t == NM_MODULE_VIEW_LIST ? mvlCurrentSendData : currentSendData, sendData(e, a, t);
    }
}

function cachePost(e, r) {
    if (lastQuitCachedData || (lastQuitCachedData = getCache(sendCacheKey) || []) && lastQuitCachedData.length && (currentSendData = lastQuitCachedData, 
    cacheSendTimer = !0, postData(e, currentSendData)), r) switch (lxCacheData.push(r), 
    r.nm) {
      case NM_PAGE_DISAPPEAR:
        var t = getEnv(), a = constructMvlData();
        lxCacheData = lxCacheData.concat(a);
        var n = [ Object.assign({
            evs: lxCacheData
        }, t) ];
        lxCacheData = [], currentSendData = currentSendData.concat(n, mvlCurrentSendData), 
        mvlCurrentSendData = [], forbid = !0, cacheSendTimer && (clearTimeout(cacheSendTimer), 
        cacheSendTimer = null), cacheSendTimer = !0, postData(e, currentSendData, NM_PAGE_DISAPPEAR);
        break;

      case NM_APP_QUIT:
        var a = constructMvlData();
        if (lxCacheData = lxCacheData.concat(a), currentSendData.length) currentSendData[0].evs = currentSendData[0].evs.concat(lxCacheData); else {
            var t = getEnv(), n = [ Object.assign({
                evs: lxCacheData
            }, t) ];
            currentSendData = currentSendData.concat(n);
        }
        lxCacheData = [], currentSendData = currentSendData.concat(mvlCurrentSendData), 
        mvlCurrentSendData = [], forbid = !0, setCache(sendCacheKey, currentSendData), cacheSendTimer && (clearTimeout(cacheSendTimer), 
        cacheSendTimer = null), cacheSendTimer = !0, postData(e, currentSendData, NM_APP_QUIT);
        break;

      case NM_BIZ_ORDER:
      case NM_BIZ_PAY:
        var t = getEnv(), n = [ Object.assign({
            evs: lxCacheData
        }, t) ];
        lxCacheData = [], currentSendData = currentSendData.concat(n), cacheSendTimer && (clearTimeout(cacheSendTimer), 
        cacheSendTimer = null), cacheSendTimer = !0, postData(e, currentSendData, NM_PAGE_DISAPPEAR);
        break;

      default:
        cacheSendTimer || forbid || createSendTimer(e);
    }
}

function createSendTimer(e, r) {
    if (r) return void (mvlSendTimer = setTimeout(function() {
        var r = constructMvlData();
        if (r.length) {
            var t = getEnv(), a = [ Object.assign({
                evs: r
            }, t) ];
            mvlCurrentSendData = mvlCurrentSendData.concat(a);
        }
        mvlCurrentSendData.length ? postData(e, mvlCurrentSendData, NM_MODULE_VIEW_LIST) : (clearTimeout(mvlSendTimer), 
        mvlSendTimer = null);
    }, 5e3));
    cacheSendTimer = setTimeout(function() {
        if (!lxCacheData.length) return clearTimeout(cacheSendTimer), void (cacheSendTimer = null);
        var r = getEnv(), t = [ Object.assign({
            evs: lxCacheData
        }, r) ];
        lxCacheData = [], currentSendData = currentSendData.concat(t), postData(e, currentSendData);
    }, DELAY_TIME);
}

function mvlCatchPost(e, r) {
    var r = _.isObj(r) ? r : {};
    if (r.mvlId && r.evs) {
        var t = r.mvlId, a = r.evs.val_lab ? r.evs.val_lab : {};
        a._tm = r.evs.tm, a._seq = r.evs.seq, mvlMap[t] ? mvlMap[t].val_lab.mv_list.push(a) : (r.evs.val_lab = {
            mv_list: [ a ]
        }, mvlMap[t] = r.evs);
    }
    mvlSendTimer || createSendTimer(e, NM_MODULE_VIEW_LIST);
}

function constructMvlData() {
    var e = [];
    for (var r in mvlMap) e.push(mvlMap[r]);
    return mvlMap = {}, e;
}

function envCallback(e, r, t) {
    if (JSON.stringify(e) !== JSON.stringify(r)) {
        if (t && lxCacheData.length) {
            var a = getEnv(), n = [ Object.assign({
                evs: lxCacheData
            }, a) ];
            lxCacheData = [], currentSendData = currentSendData.concat(n);
        }
        var o = constructMvlData();
        if (o.length > 0) {
            var c = [ Object.assign({
                evs: o
            }, e) ];
            mvlCurrentSendData = mvlCurrentSendData.concat(c);
        }
    }
}

function configOptions(e, r) {
    if ("domainReport" == r.catMode) return void (catOptions.url = "https://catfront.dianping.com/api/log?v=1");
    if (e && "nginxReport" == r.catMode) {
        var t = /^(https:\/\/)[^\/]+/, a = e.match(t);
        return void (a && (catOptions.url = a[0] + "/lx-cat"));
    }
}

function reportError(r, t, a, n) {
    if (catOptions.url) try {
        var o = getCurrentPages(), c = "app.js";
        o.length && (c = o[o.length - 1].__route__);
        var i = [ {
            project: "wx-lx-sdk",
            pageUrl: c,
            resourceUrl: r,
            category: n ? "jsError" : "ajaxError",
            sec_category: t || "",
            level: "error",
            unionId: getEnv("lxcuid"),
            timestamp: _.now(),
            content: "" + a || ""
        } ];
        wx.request({
            method: "POST",
            url: catOptions.url,
            data: "c=" + encodeURIComponent(JSON.stringify(i)),
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {},
            fail: function() {
                error("cat report error:", e);
            }
        });
    } catch (e) {
        error("reportError error:", e);
    }
}

function Tracker() {
    var e = this;
    InitEnv().then(function(e) {
        hasInit = !0;
    }), e._opts = {}, e._config = {}, e.rewriteApp(), e.rewritePage(), requestId = genRequestId();
}

function createSfrom(e, r) {
    var t = getCache(S_FROM);
    t || (t = []), t.length >= MAX_S_FROM && t.shift(), r ? t.push({
        seq: e.seq,
        category: getEnv().category,
        cid: r.val_cid,
        bid: e.val_bid,
        val_lab: e.val_lab || {}
    }) : t.push({
        seq: e.seq,
        category: getEnv().category,
        cid: currentCid,
        bid: e.val_bid,
        val_lab: e.val_lab || {}
    }), setCache(S_FROM, t);
}

function resetEvsData() {
    seq = 1, setEnv("msid", MSID(), envCallback), removeCache(S_FROM);
}

function WebEvsWrapper(e, r, t, a, n, o) {
    try {
        currentLch ? currentLch && currentLch !== getEnv("lch") && (resetEvsData(), currentLch = getEnv("lch")) : currentLch = getEnv("lch"), 
        HALF_HOUR_MS < Date.now() - lastEventTimestamp && resetEvsData(), lastEventTimestamp = Date.now();
        var c = {
            nm: e,
            tm: _.now(),
            nt: NT_WECHART,
            seq: seq++,
            isauto: ISAUTO_WECHART,
            req_id: r
        };
        if (c = _.extend(c || {}, globalLngLat), c = _.extend(c || {}, tempEvsData), tempEvsData = {}, 
        currentCid) c.val_cid = currentCid; else {
            var i = getCurrentPages();
            i && i.length && (c.val_cid = i[i.length - 1].__route__);
        }
        if (t && (c.val_lab = t), valRef && (c.val_ref = valRef), a && (c.val_bid = a), 
        refRequestId && (c.refer_req_id = refRequestId), o && (c = _.extend(c || {}, o), 
        o.refer_req_id || delete c.refer_req_id, o.val_ref || delete c.val_ref), e == NM_MODULE_CLICK && n && !0 === n.sf && createSfrom(c, o), 
        e == NM_PAGE_VIEW || e == NM_BIZ_ORDER || e == NM_BIZ_PAY) {
            var s = getCache(S_FROM);
            s && (c.s_from = s);
        }
        return c;
    } catch (e) {
        return reportError("index.js", "lx-api-error", e.message, !0), null;
    }
}

var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : _typeof2(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
}, undef = void 0, _ = {}, ObjectProto = Object.prototype, toStr = ObjectProto.toString, hasOwn = ObjectProto.hasOwnProperty, storagePrefix = "_lx_sdk_";

_.isStr = function(e) {
    return e && isType(e, "string");
}, _.isObj = function(e) {
    return e && "[object Object]" === toStr.call(e);
}, _.now = function() {
    return new Date() - 0;
}, _.isArray = Array.isArray || function(e) {
    return "[object Array]" === toStr.call(e);
}, _.isArrayLike = function(e) {
    if (!e) return !1;
    var r = e.length;
    return !!_.isArray(e) || !!(e && isNumber(r) && r >= 0) && (!_.isObj(e) || !(r > 1) || r - 1 in e);
}, _.each = function(e, r, t) {
    if (e) {
        var a, n, o;
        if (_.isArrayLike(e)) for (n = 0, o = e.length; n < o && !1 !== r.call(t, e[n], n, e); n++) ; else for (a in e) if (hasOwn.call(e, a) && !1 === r.call(t, e[a], a, e)) break;
    }
}, _.extend = function e(r, t, a) {
    var n, o = !0 === r;
    return o || (a = t, t = r), t && _.isObj(t) || (t = {}), a && _.isObj(a) || (a = {}), 
    _.each(a, function(r, c) {
        o && _.isObj(a[c]) ? (n = t[c] = {}, e(o, n, a[c])) : t[c] = a[c];
    }), t;
}, _.toArray = function(e, r, t) {
    var a = [];
    return _.isArrayLike(e) && _.each(e, function(e) {
        a.push(r ? r.call(t, e) : e);
    }, t), a;
};

var error = function() {
    _.toArray(arguments).unshift("[LX SDK]"), console;
}, warn = function() {
    _.toArray(arguments).unshift("[LX SDK]"), console;
}, env = {
    sdk_ver: "1.7.0",
    ch: "weixin",
    lch: "wx"
};

env.lxcuid = LXCUID(env);

var NM_APP_START = "AS", NM_APP_QUIT = "AQ", NM_PAGE_VIEW = "PV", NM_PAGE_DISAPPEAR = "PD", NM_MODULE_CLICK = "MC", NM_MODULE_SYSTEM_CHECK = "SC", NM_MODULE_VIEW = "MV", NM_MODULE_EDITOR = "ME", NM_BIZ_ORDER = "BO", NM_BIZ_PAY = "BP", NM_MODULE_VIEW_LIST = "MVL", NT_WECHART = 3, MAX_RETRY = 3, DELAY_TIME = 500, cacheSendTimer = null, retryTime = 0, forbid = !1, sendCacheKey = "lx_send_cache_data", lastQuitCachedData = undef, currentSendData = [], lxCacheData = [], mvlRetryTime = 0, mvlCurrentSendData = [], mvlMap = {}, mvlSendTimer = null, catOptions = {}, retryInterval = function(e) {
    var r = Math;
    return r.ceil(r.min(1e3 * (.5 + r.random()) * r.pow(2, e), 15e3));
}, S_FROM = "lx_cache_sf", MAX_S_FROM = 500, ISAUTO_WECHART = 7, HALF_HOUR_MS = 18e5, lastEventTimestamp = Date.now(), seq = 1, hasInit = !1, startTime = Date.now(), pvTime = undef, currentCid = undef, valRef = undef, currentLch = undef, currentSource = undef, requestId, refRequestId, asRequestId, tempEvsData = {}, globalLngLat = {}, isFirstStart = !0, TrackerProto = Tracker.prototype;

TrackerProto.init = function(e, r, t) {
    var a = this, n = a._opts;
    if (!n.reportUrl) {
        a._config = _.extend(a._config || {}, t), t && t.catMode && configOptions(e, t), 
        n.reportUrl = e;
        var o = r.appnm, c = r.category;
        o || error("没有设置应用标识（appnm） !"), c || (r.category = o), r.appnm = o, resetEvsData(), 
        _.each(r || {}, function(e, r) {
            if (!_.isStr(r) || undef === e) return n[r];
            a.set(r, e), n[r] = e;
        });
    }
}, TrackerProto.setUTM = function(e) {
    if (e) {
        var r = this, t = e || {}, a = t.query || {}, n = t.referrerInfo || {}, o = [ "utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign" ], c = {};
        if ("clear" === t) return void removeEnv("utm");
        if (a && _.each(o, function(e) {
            _.isStr(a[e]) && (c[e] = a[e]);
        }), n.extraData) {
            var i = n.extraData;
            if (_.isStr(i)) try {
                i = JSON.parse(i);
            } catch (e) {
                i = {}, reportError("index.js", "lx-api-error", e.message, !0);
            }
            _.each(o, function(e) {
                _.isStr(i[e]) && (c[e] = i[e]);
            });
        }
        _.each(o, function(e) {
            _.isStr(t[e]) && (c[e] = t[e]);
        }), c.utm_source || 1037 != t.scene && 1038 != t.scene || t.referrerInfo && t.referrerInfo.appId && (c.utm_source = t.referrerInfo.appId, 
        c.utm_medium = "otherApp"), Object.keys(c).length > 0 ? (r.set("utm", c), !currentSource && c.utm_source ? currentSource = c.utm_source : currentSource && currentSource !== c.utm_source && (resetEvsData(), 
        currentSource = c.utm_source)) : warn("没有设置utm(站外来源)!");
    }
}, TrackerProto.set = function(e, r) {
    setEnv(e, r, envCallback);
}, TrackerProto.get = function(e) {
    return getEnv(e);
}, TrackerProto.start = function(e) {
    if (this._config.hasAs) return void warn("AS（应用启动）灵犀集成自动上报，请注释灵犀 start 接口调用！");
    var e = _.isObj(e) ? e : undef;
    startTime = Date.now(), asRequestId = genRequestId(), requestId = null, currentCid = undef;
    var r = WebEvsWrapper(NM_APP_START, asRequestId, e);
    r.isauto = 6, this.send(r);
}, TrackerProto.quit = function(e) {
    var e = _.isObj(e) ? e : {}, r = Date.now() - startTime;
    e = _.extend({
        duration: "" + r
    }, e), this._config.hasAq = !0;
    var t = WebEvsWrapper(NM_APP_QUIT, asRequestId, e);
    t.isauto = 6, this.send(t);
}, TrackerProto.pageView = function(e, r) {
    requestId || currentCid ? (!requestId || currentCid && currentCid !== e) && (valRef = currentCid, 
    refRequestId = requestId, requestId = genRequestId()) : (isFirstStart || (valRef = e), 
    requestId = genRequestId()), this._config.hasPv = !0, pvTime = Date.now(), currentCid = e;
    var t = WebEvsWrapper(NM_PAGE_VIEW, requestId, r);
    this.send(t), isFirstStart = !1;
}, TrackerProto.pageDisappear = function(e, r) {
    if (!this._config.hasPv || !requestId) return void warn("该页面没有上报PV(页面展示)事件，请确认!");
    var e = _.isObj(e) ? e : {};
    if (pvTime) {
        var t = Date.now() - pvTime;
        e = _.extend({
            duration: "" + t
        }, e);
    }
    this._config.hasPd = !0;
    var a = WebEvsWrapper(NM_PAGE_DISAPPEAR, requestId, e);
    r && (a.isauto = 6), this.send(a), pvTime = undef;
}, TrackerProto.moduleView = function(e, r) {
    var t = WebEvsWrapper(NM_MODULE_VIEW, requestId, r, e);
    this.send(t);
}, TrackerProto.systemCheck = function(e, r) {
    var t = WebEvsWrapper(NM_MODULE_SYSTEM_CHECK, requestId, r, e);
    this.send(t);
}, TrackerProto.moduleClick = function(e, r, t) {
    var a = WebEvsWrapper(NM_MODULE_CLICK, requestId, r, e, t);
    this.send(a);
}, TrackerProto.moduleEdit = function(e, r) {
    var t = WebEvsWrapper(NM_MODULE_EDITOR, requestId, r, e);
    this.send(t);
}, TrackerProto.order = function(e, r, t) {
    t = _.extend(t || {}, {
        order_id: r
    });
    var a = WebEvsWrapper(NM_BIZ_ORDER, requestId, t, e);
    this.send(a);
}, TrackerProto.pay = function(e, r, t) {
    t = _.extend(t || {}, {
        order_id: r
    });
    var a = WebEvsWrapper(NM_BIZ_PAY, requestId, t, e);
    this.send(a);
}, TrackerProto.send = function(e) {
    var r = this, t = r._opts.reportUrl;
    if (t) {
        if ("MVL" == e.nm) return void mvlCatchPost(t, {
            mvlId: e.val_bid + e.req_id + getEnv("category"),
            evs: e
        });
        cachePost(t, e);
    } else error("Must config reportUrl!");
}, TrackerProto.presetGeolocation = function(e, r) {
    var t = parseFloat(e), a = parseFloat(r);
    return t && (tempEvsData.lng = t), a && (tempEvsData.lat = a), this;
}, TrackerProto.resetGeolocation = function(e, r) {
    var t = parseFloat(e), a = parseFloat(r);
    t && (globalLngLat.lng = t), a && (globalLngLat.lat = a);
}, TrackerProto.turnOnValidate = function() {
    var e = "", r = parseInt("10000000", 36), t = parseInt("ZZZZZZZZ", 36);
    return e = parseInt(Math.random() * (t - r) + r).toString(36).toUpperCase(), setEnv("_lx_validcode", e), 
    e;
}, TrackerProto.sendEvsAsycBefore = function() {
    var e = {};
    return currentCid && (e.val_cid = currentCid), valRef && (e.val_ref = valRef), requestId && (e.req_id = requestId), 
    refRequestId && (e.refer_req_id = refRequestId), e;
}, TrackerProto.sendEvsAsycAfter = function(e, r) {
    if (!_.isObj(r) || !_.isObj(e)) return !1;
    var t = "" + r.nm.toUpperCase(), a = undef;
    switch (t) {
      case "MC":
        a = WebEvsWrapper(NM_MODULE_CLICK, requestId, r.valLab, r.valBid, r.options, e);
        break;

      case "MV":
        a = WebEvsWrapper(NM_MODULE_VIEW, requestId, r.valLab, r.valBid, undef, e);
        break;

      case "ME":
        a = WebEvsWrapper(NM_MODULE_EDITOR, requestId, r.valLab, r.valBid, undef, e);
        break;

      case "BO":
        r.valLab = _.extend(r.valLab || {}, {
            order_id: r.orderId
        }), a = WebEvsWrapper(NM_BIZ_ORDER, requestId, r.valLab, r.valBid, undef, e);
        break;

      case "BP":
        r.valLab = _.extend(r.valLab || {}, {
            order_id: r.orderId
        }), a = WebEvsWrapper(NM_BIZ_PAY, requestId, r.valLab, r.valBid, undef, e);
        break;

      default:
        return;
    }
    this.send(a);
}, TrackerProto.moduleViewList = function(e, r) {
    if (e && _.isStr(e)) {
        var t = WebEvsWrapper("MVL", requestId, r, e);
        this.send(t);
    }
}, TrackerProto.rewriteApp = function() {
    var r = this;
    try {
        var t = App;
        App = function(a) {
            try {
                [ "onShow", "onHide" ].forEach(function(e) {
                    var t = a[e];
                    "onShow" == e && (a[e] = function(e) {
                        r._config.hasAs = !1, r._config.hasAq = !1, e.scene && r.set("scene", e.scene), 
                        r.setUTM(e), r.start({
                            custom: e
                        }), r._config.hasAs = !0, t && t.call(this, e);
                    }), "onHide" == e && (a[e] = function(e) {
                        t && t.call(this, e), r._config.hasAq ? warn("PD（页面离开）灵犀集成自动上报，请注释灵犀 quit 接口调用！") : r.quit();
                    });
                });
            } catch (r) {
                reportError("index.js", "lx-api-error", e.message, !0);
            }
            t(a);
        };
    } catch (e) {
        reportError("index.js", "lx-api-error", e.message, !0);
    }
}, TrackerProto.rewritePage = function() {
    var e = this;
    try {
        var r = Page;
        Page = function(t) {
            try {
                [ "onUnload", "onShow", "onHide" ].forEach(function(r) {
                    var a = t[r];
                    "onShow" == r && (t[r] = function() {
                        e._config.hasPv = !1, e._config.hasPd = !1, a && a.apply(this, arguments);
                    }), "onHide" == r && (t[r] = function() {
                        a && a.apply(this, arguments), e._config.hasPv && !e._config.hasPd ? e.pageDisappear({}, !0) : warn("PD（页面离开）灵犀集成自动上报，请注释灵犀 pageDisappear 接口调用！");
                    }), "onUnload" == r && (t[r] = function() {
                        a && a.apply(this, arguments), e._config.hasPv && !e._config.hasPd ? e.pageDisappear({}, !0) : warn("PD（页面离开）灵犀集成自动上报，请注释灵犀 pageDisappear 接口调用！");
                    });
                });
            } catch (e) {
                reportError("index.js", "lx-api-error", e.message, !0);
            }
            r(t);
        };
    } catch (e) {
        reportError("index.js", "lx-api-error", e.message, !0);
    }
};

var index = new Tracker();

module.exports = index;