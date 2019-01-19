Object.defineProperty(exports, "__esModule", {
    value: !0
});

var tplObj = {}, calculateStyle = function(t, e, r, a, p) {
    var l = (r.windowHeight, r.windowWidth), n = (e.width, e.height, 414 / l);
    switch (t) {
      case 1:
        return [ {
            imgUrl: "http://p0.meituan.net/scarlett/f6ba2761f6c5edae388dae732c88189310597.png",
            height: "128rpx",
            width: "283rpx",
            bottom: "100rpx",
            left: "40rpx",
            transform: "scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p0.meituan.net/scarlett/d256661f6112529eee1f6541f2cde770863.png",
            height: "18rpx",
            width: "64rpx",
            bottom: (a ? 50 : 100) + "rpx",
            right: "40rpx",
            transform: "scale(" + (a ? .5 : 1) + ")"
        } ];

      case 2:
        return [ {
            imgUrl: "https://p0.meituan.net/scarlett/a5ac1ff9d31cdd1420a5c30951c47e7f6875.png",
            height: "64rpx",
            width: "64rpx",
            top: (a ? 50 : 100) + "rpx",
            left: "40rpx",
            transform: "scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p0.meituan.net/scarlett/88b2ae8090212d94bbf2acc0fe9ee56b6499.png",
            height: "130rpx",
            width: "90rpx",
            top: (a ? 50 : 100) + "rpx",
            right: "40rpx",
            transform: "scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p0.meituan.net/scarlett/4e46187689efe909cdf19b9b70145dc218840.png",
            height: "132rpx",
            width: "268rpx",
            bottom: (a ? 50 : 100) + "rpx",
            left: "50%",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p1.meituan.net/scarlett/3b63eed3e31270231ce85dded51bc16f4050.png",
            height: "22rpx",
            width: "262rpx",
            bottom: (a ? 45 : 90) + "rpx",
            left: "50%",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        } ];

      case 3:
        return [ {
            imgUrl: "https://p1.meituan.net/scarlett/5c878628bdf7c781e28cb74c3f9f349918115.png",
            height: "118rpx",
            width: "356rpx",
            left: "50%",
            bottom: (a ? 50 : 100) + "rpx",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p1.meituan.net/scarlett/3b63eed3e31270231ce85dded51bc16f4050.png",
            height: "22rpx",
            width: "262rpx",
            bottom: (a ? 40 : 80) + "rpx",
            left: "50%",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        } ];

      case 4:
        return [ {
            imgUrl: "https://p0.meituan.net/scarlett/0dc07d838f038a3895e1b20d385835983528.png",
            height: "46rpx",
            width: "162rpx",
            left: "50%",
            top: (a ? 40 : 80) + "rpx",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p1.meituan.net/scarlett/cabfe4911ef5575f6b5982d27bb2ed1719997.png",
            height: "120rpx",
            width: "450rpx",
            left: "50%",
            bottom: (a ? 50 : 100) + "rpx",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p1.meituan.net/scarlett/3b63eed3e31270231ce85dded51bc16f4050.png",
            height: "22rpx",
            width: "262rpx",
            bottom: (a ? 40 : 80) + "rpx",
            left: "50%",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        } ];

      case 5:
        return [ {
            imgUrl: "https://p1.meituan.net/scarlett/d4b276d2aa3bfd6f3af609930946d12517482.png",
            height: "158rpx",
            width: "208rpx",
            left: "50%",
            bottom: (p ? 100 * n : a ? 50 : 100) + "rpx",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p1.meituan.net/scarlett/3b63eed3e31270231ce85dded51bc16f4050.png",
            height: "22rpx",
            width: "262rpx",
            bottom: (a ? 40 : 80) + "rpx",
            left: "50%",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        } ];

      case 6:
        return [ {
            imgUrl: "https://p1.meituan.net/scarlett/fc42fca8e95b4c7c466c659871c4a67417771.png",
            height: "104rpx",
            width: "354rpx",
            left: "50%",
            bottom: (a ? 50 : 100) + "rpx",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        }, {
            imgUrl: "https://p1.meituan.net/scarlett/3b63eed3e31270231ce85dded51bc16f4050.png",
            height: "22rpx",
            width: "262rpx",
            bottom: (a ? 40 : 80) + "rpx",
            left: "50%",
            transform: "translate(-50%,0) scale(" + (a ? .5 : 1) + ")"
        } ];

      default:
        return [];
    }
}, tplArr = [ {
    title: "原图",
    id: 0
}, {
    title: "爱情公寓",
    id: 1,
    imgUrl: "https://p0.meituan.net/scarlett/01e41bb0a1eac1e9c86a6a25d81b941618130.png"
}, {
    title: "精灵旅社",
    id: 2,
    imgUrl: "https://p0.meituan.net/scarlett/48d98119282fd91e05e7250f36bd7cb115279.png"
}, {
    title: "巨齿鲨",
    id: 3,
    imgUrl: "https://p0.meituan.net/scarlett/7f9ceef06a7522e7ac776c76610c6a1c16742.png"
}, {
    title: "欧洲攻略",
    id: 4,
    imgUrl: "https://p1.meituan.net/scarlett/ab10599b166951433024c9c4b15a580017642.png"
}, {
    title: "苏丹",
    id: 5,
    imgUrl: "https://p1.meituan.net/scarlett/5af9e3ab366e69a078d8eadfacfa1e6716703.png"
}, {
    title: "一出好戏",
    id: 6,
    imgUrl: "https://p0.meituan.net/scarlett/b48fb82778abcbec56d1dbb74479f4c519576.png"
} ];

exports.tplObj = tplObj, exports.tplArr = tplArr, exports.calculateStyle = calculateStyle;