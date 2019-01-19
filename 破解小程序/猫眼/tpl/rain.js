var _slicedToArray = function() {
    function t(t, i) {
        var n = [], e = !0, o = !1, r = void 0;
        try {
            for (var a, h = t[Symbol.iterator](); !(e = (a = h.next()).done) && (n.push(a.value), 
            !i || n.length !== i); e = !0) ;
        } catch (t) {
            o = !0, r = t;
        } finally {
            try {
                !e && h.return && h.return();
            } finally {
                if (o) throw r;
            }
        }
        return n;
    }
    return function(i, n) {
        if (Array.isArray(i)) return i;
        if (Symbol.iterator in Object(i)) return t(i, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), tpl = require("../scripts/tpl"), app = getApp();

module.exports = tpl.extends({
    key: "rain",
    NUM: 20,
    DURATION: 4e3,
    DELAY: 2e3,
    TIMING_FUNCTION: "linear",
    main: 0,
    height: 0,
    width: 0,
    photo_with: 40,
    TRANSLATEX: .3,
    timer: null,
    HASRAIN: !1,
    IMG_MAP: {},
    previousCount: 0,
    data: {
        points: [],
        show: !0
    },
    queueAnimation: function(t, i) {
        var n = this;
        if (0 !== this.main && 0 !== this.height && 0 !== this.width && this.HASRAIN) {
            this.timer && clearTimeout(this.timer);
            var e = !1;
            this.previousCount > t && (e = !0), this.previousCount = t;
            var o = this.data.points.map(function(t) {
                return t.animation.option.transition.duration = 0, t.animation.translate(0, 0).step(), 
                t.animationData = t.animation.export(), t;
            });
            if (this.setData({
                points: o
            }), this.IMG_MAP[t]) {
                var r = this.IMG_MAP[t], a = this.data.points.map(function(t) {
                    return t.animation.option.transition.duration = n.DURATION * t.animation.__y / n.main, 
                    t.animation.translate(t.animation.__x, t.animation.__y).step(), t.animationData = t.animation.export(), 
                    t.imgURL = r, t;
                });
                this.timer = setTimeout(function() {
                    n.setData({
                        points: a,
                        show: !0
                    });
                }, e || i ? 100 : this.DELAY);
            }
        }
    },
    configRainAnimation: function(t, i, n) {
        var e = this;
        return this.DELAY = i, this.IMG_MAP = n, this.HASRAIN = t && Object.keys(n).length > 0, 
        this.HASRAIN ? this.getPlayAreaHeight().then(function(t) {
            var i = _slicedToArray(t, 3), n = i[0], o = i[1], r = i[2];
            e.main = Number(n), e.height = Number(o), e.width = Number(r), e.photo_with = 40 * e.width / 375;
            for (var a = [], h = 0; h < e.NUM; h++) {
                var s = e.getflooryRandInt(e.width - e.photo_with), u = -e.getflooryRandInt(e.main) - e.photo_with;
                a.push({
                    left: s,
                    top: u,
                    animation: e.getAnimation(s, u)
                });
            }
            e.setData({
                points: a
            });
        }).catch(function(t) {
            return console.log(t);
        }) : void this.setData({
            show: !1
        });
    },
    getAnimation: function(t, i) {
        var n = wx.createAnimation({
            timingFunction: this.TIMING_FUNCTION
        }), e = this.height - i, o = this.getflooryRandInt(this.width * this.TRANSLATEX);
        return o *= Math.random() > .5 ? 1 : -1, (o + t + this.photo_with > this.width || o + t < 0) && (o = -o), 
        n.__x = o, n.__y = e, n;
    },
    getflooryRandInt: function(t) {
        return Math.floor(Math.random() * t);
    },
    getPlayAreaHeight: function() {
        return Promise.all([ this.promiseifySelector(".seat-block"), this.promiseifySelector(".main") ]).then(function(t) {
            var i = _slicedToArray(t, 2), n = i[0];
            return [ i[1].height, n.height, n.width ];
        });
    },
    promiseifySelector: function(t) {
        return new Promise(function(i, n) {
            wx.createSelectorQuery().select(t).boundingClientRect(function(t) {
                var e = t.height, o = t.width;
                e && o ? i({
                    height: e,
                    width: o
                }) : n(null);
            }).exec();
        });
    }
});