var overlay = {
    base: "transition: opacity .2s ease-out; position: fixed; z-index: 100; left: 0; top: 0; background: rgba(33, 33, 33, 0.7);",
    init: "opacity: 0;",
    show: "opacity: 1; bottom: 0; right: 0;",
    hide: "opacity: 0; bottom: 0; right: 0;"
};

module.exports = function(t, a) {
    var o = {
        current: [],
        page: "position: absolute; height: 100%;",
        overlay: [ overlay.base, overlay.init ].join("")
    }, i = function(t, a) {
        var o = this.data.modal;
        a.base = "transition: transform .2s ease-out; position: fixed; z-index: 200; left: 0; right: 0; overflow: hidden; background: #fff;", 
        a.height = a.height || "80%", a.init = "bottom: 0; transform: translate(0, 100%); height: 0;", 
        a.show = "bottom: 0; transform: translate(0, 0); height: " + a.height + ";", a.hide = "bottom: 0; transform: translate(0, 100%); height: " + a.height + ";", 
        o[t] = [ a.base, a.init ].join(""), this.setData({
            modal: o
        });
    }, e = function(t, a) {
        var o = this.data.modal;
        o.current.push(t), o["overlay-" + t] = o.overlay = [ overlay.base, overlay.show ].join(""), 
        o["isShow-" + t] = !0, o[t] = [ a.base, a.show ].join(""), a.noBottom && (o["overlay-" + t] = o["overlay-" + t].replace("bottom: 0;", "")), 
        this.setData({
            modal: o
        });
    }, r = function(t, a) {
        var o = this.data.modal;
        if (o.current && o.current.length) {
            o["overlay-" + t] = o.overlay = [ overlay.base, overlay.hide ].join(""), o[t] = [ a.base, a.hide ].join(""), 
            o["isShow-" + t] = !1, this.setData({
                modal: o
            });
            var i = this;
            !function() {
                setTimeout(function() {
                    var o = i.data.modal;
                    o.current = o.current.filter(function(a) {
                        return a !== t;
                    }), o["overlay-" + t] = o.overlay = [ overlay.base, overlay.init ].join(""), o[t] = [ a.base, a.init ].join(""), 
                    i.setData({
                        modal: o
                    });
                }, 200);
            }();
        }
    }, n = function(t, a) {
        ~this.data.modal.current.indexOf(t) ? r.apply(this, arguments) : e.apply(this, arguments);
    };
    t.onTapModalOverlay = function() {
        var a = this.data.modal, o = a.current.slice(-1)[0];
        o && t[o].hide();
    };
    for (var s in a) a.hasOwnProperty(s) && (t[s] = {
        show: e.bind(t, s, a[s]),
        hide: r.bind(t, s, a[s]),
        toggle: n.bind(t, s, a[s])
    }, i.call({
        data: {
            modal: o
        },
        setData: function() {}
    }, s, a[s]));
    t.setData({
        modal: o
    });
};