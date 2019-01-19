function getLen(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
}

function dot(t, i) {
    return t.x * i.x + t.y * i.y;
}

function getAngle(t, i) {
    var s = getLen(t) * getLen(i);
    if (0 === s) return 0;
    var e = dot(t, i) / s;
    return e > 1 && (e = 1), Math.acos(e);
}

function cross(t, i) {
    return t.x * i.y - i.x * t.y;
}

function getRotateAngle(t, i) {
    var s = getAngle(t, i);
    return cross(t, i) > 0 && (s *= -1), 180 * s / Math.PI;
}

var Finger = function(t) {
    this.preV = {
        x: null,
        y: null
    }, this.pinchStartLen = null, this.scale = 1, this.isDoubleTap = !1, this.rotate = t.rotate || function() {}, 
    this.touchStart = t.touchStart || function() {}, this.multipointStart = t.multipointStart || function() {}, 
    this.multipointEnd = t.multipointEnd || function() {}, this.pinch = t.pinch || function() {}, 
    this.swipe = t.swipe || function() {}, this.tap = t.tap || function() {}, this.doubleTap = t.doubleTap || function() {}, 
    this.longTap = t.longTap || function() {}, this.singleTap = t.singleTap || function() {}, 
    this.pressMove = t.pressMove || function() {}, this.touchMove = t.touchMove || function() {}, 
    this.touchEnd = t.touchEnd || function() {}, this.touchCancel = t.touchCancel || function() {}, 
    this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.touchTimeout = null, 
    this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, 
    this.preTapPosition = {
        x: null,
        y: null
    };
};

Finger.prototype = {
    start: function(t) {
        if (t.touches) {
            this.now = Date.now(), this.x1 = t.touches[0].pageX, this.y1 = t.touches[0].pageY, 
            this.delta = this.now - (this.last || this.now), this.touchStart(t), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30), 
            this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
            var i = this.preV;
            if (t.touches.length > 1) {
                this._cancelLongTap();
                var s = {
                    x: t.touches[1].pageX - this.x1,
                    y: t.touches[1].pageY - this.y1
                };
                i.x = s.x, i.y = s.y, this.pinchStartLen = getLen(i), this.multipointStart(t);
            }
            this.longTapTimeout = setTimeout(function() {
                this.longTap(t);
            }.bind(this), 750);
        }
    },
    move: function(t) {
        if (t.touches) {
            var i = this.preV, s = t.touches.length, e = t.touches[0].pageX, n = t.touches[0].pageY;
            if (this.isDoubleTap = !1, s > 1) {
                var h = {
                    x: t.touches[1].pageX - e,
                    y: t.touches[1].pageY - n
                };
                null !== i.x && (this.pinchStartLen > 0 && (t.scale = getLen(h) / this.pinchStartLen, 
                this.pinch(t)), t.angle = getRotateAngle(h, i), this.rotate(t)), i.x = h.x, i.y = h.y;
            } else null !== this.x2 ? (t.deltaX = e - this.x2, t.deltaY = n - this.y2) : (t.deltaX = 0, 
            t.deltaY = 0), this.pressMove(t);
            this.touchMove(t), this._cancelLongTap(), this.x2 = e, this.y2 = n, t.touches.length > 1 && this._cancelLongTap();
        }
    },
    end: function(t) {
        this._cancelLongTap();
        var i = this;
        t.touches.length < 2 && this.multipointEnd(t), this.touchEnd(t), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.preV.y - this.y2) > 30 ? (t.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), 
        this.swipeTimeout = setTimeout(function() {
            i.swipe(t);
        }, 0)) : this.tapTimeout = setTimeout(function() {
            i.tap(t), i.isDoubleTap ? (i.doubleTap(t), clearTimeout(i.touchTimeout), i.isDoubleTap = !1) : i.touchTimeout = setTimeout(function() {
                i.singleTap(t);
            }, 250);
        }, 0), this.preV.x = 0, this.preV.y = 0, this.scale = 1, this.pinchStartLen = null, 
        this.x1 = this.x2 = this.y1 = this.y2 = null;
    },
    cancel: function(t) {
        clearTimeout(this.touchTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), 
        clearTimeout(this.swipeTimeout), this.preV.x = 0, this.preV.y = 0, this.scale = 1, 
        this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.touchCancel(t);
    },
    _cancelLongTap: function() {
        clearTimeout(this.longTapTimeout);
    },
    _swipeDirection: function(t, i, s, e) {
        return Math.abs(t - i) >= Math.abs(s - e) ? t - i > 0 ? "Left" : "Right" : s - e > 0 ? "Up" : "Down";
    }
}, module.exports = Finger;