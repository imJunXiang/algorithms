function getRandom(e) {
    return e[Math.floor(Math.random() * e.length)];
}

function getBubble() {
    for (var e = [], t = 0; t < 10; t++) {
        var a = (Math.floor(750 * Math.random()), getRandom(bubble)), d = a.src, h = a.width, n = a.height, r = getRandom(delayArr);
        e.push({
            src: d,
            height: n,
            width: h,
            delay: r
        });
    }
    return e;
}

var bubble = [ {
    src: "http://p0.meituan.net/movie/9f7e41492649d94b7f5e2e111afec9d01211.png",
    width: 30,
    height: 26
}, {
    src: "http://p0.meituan.net/movie/6f80c9dde79984d1f0f1af303535d8c51826.png",
    width: 40,
    height: 39
}, {
    src: "http://p0.meituan.net/movie/b43d539b297f0dce33aab1e2b6bece991911.png",
    width: 27,
    height: 28
} ], delayArr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

module.exports = {
    getBubble: getBubble,
    getRandom: getRandom
};