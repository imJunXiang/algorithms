function loadModal(e) {
    var n = e.app, o = e.page;
    n.$operation.activityModal || (n.$operation.activityModal = {
        hasShowModal: !1
    }), o.activityModal = new ActivityModal({
        page: o
    }), o.getModalData().then(function(e) {
        e && o.guidFavourite && o.guidFavourite();
    }).catch(function(e) {
        return console.log(e);
    });
}

function loadSidebar(e) {
    var n = (e.app, e.page);
    n.operationSidebar = new OperationSidebar({
        page: n
    }), n.getSidebarData().then().catch(function(e) {
        return console.log(e);
    });
}

function getOperationConfig(e) {
    return e.$operation ? Promise.resolve(e.$operation) : e.request().get("https://api.maoyan.com/operation/componentPages.json").header({
        "content-type": "application/json"
    }).query({
        channelId: e.channelId
    }).end().then(function(e) {
        return e.body;
    }).then(function(e) {
        var n = e.success, o = e.data, t = {};
        if (n && o.success) {
            var a = o.componentPagesMap;
            Object.keys(a).forEach(function(e) {
                t[e] = a[e].map(function(e) {
                    return e.url;
                });
            });
        }
        return t;
    }).catch(function(e) {
        return console.log(e), {};
    }).then(function(n) {
        return e.$operation = n, e.$operation;
    });
}

var _slicedToArray = function() {
    function e(e, n) {
        var o = [], t = !0, a = !1, r = void 0;
        try {
            for (var i, c = e[Symbol.iterator](); !(t = (i = c.next()).done) && (o.push(i.value), 
            !n || o.length !== n); t = !0) ;
        } catch (e) {
            a = !0, r = e;
        } finally {
            try {
                !t && c.return && c.return();
            } finally {
                if (a) throw r;
            }
        }
        return o;
    }
    return function(n, o) {
        if (Array.isArray(n)) return n;
        if (Symbol.iterator in Object(n)) return e(n, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), ActivityModal = require("./modal"), OperationSidebar = require("./sidebar"), loginScript = require("../../../scripts/login"), COMPONENTS_MAP = {
    1: loadModal,
    4: loadSidebar
};

module.exports = {
    onShow: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.page, o = getApp();
        Promise.all([ getOperationConfig(o), loginScript.openId() ]).then(function(e) {
            var t = _slicedToArray(e, 2), a = t[0];
            t[1];
            Object.keys(a).forEach(function(e) {
                COMPONENTS_MAP[e] && a[e].indexOf("/" + n.route) >= 0 && COMPONENTS_MAP[e]({
                    app: o,
                    page: n
                });
            });
        });
    },
    onLoad: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.page;
    },
    onUnload: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.page;
        n.hideModal && n.hideModal();
    },
    onHide: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = e.page;
        n.hideModal && n.hideModal();
    }
};