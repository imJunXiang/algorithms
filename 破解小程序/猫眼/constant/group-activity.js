function _defineProperty(_, e, A) {
    return e in _ ? Object.defineProperty(_, e, {
        value: A,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : _[e] = A, _;
}

var _module$exports;

module.exports = (_module$exports = {
    DOMAIN: "https://purchase-movie.maoyan.com",
    GA_STATUS: {
        PRE: "0",
        ON_GOING: "1",
        END: "2",
        DEPRECATED: "3"
    },
    GA_AWARD_TYPE: {
        CAPTAIN: "1",
        ALL: "2"
    },
    GA_GROUP_OPT: {
        OPEN: "1",
        ASSISTANCE: "2"
    },
    GA_AWARD_FLOW_ICON: {
        CAPTAIN: "http://p1.meituan.net/scarlett/9b5ab07fa56add2eb8260157c92207d458144.png",
        ALL: "http://p1.meituan.net/scarlett/98d43e9eac2c893324f8bfbc4808b56c57905.png"
    },
    GA_MINE_TABS: [ "全部", "待开奖", "已中奖", "未中奖", "未成团" ],
    GA_TIP_USER_NUM: 3e4,
    GA_TIP_PRIZE_STOCK: 10,
    GA_TIP_NEW_DATE: 2592e5,
    GA_STD_USER_NUM: 1e4,
    GA_PAY_RESULTS: {
        1: "未支付",
        2: "支付成功",
        3: "支付失败",
        4: "已退款",
        5: "处理中",
        6: "退款中"
    },
    GA_PAY_STATUS: {
        NOT: 1,
        SUCCESS: 2,
        FAIL: 3,
        REFUND: 4,
        ONGOING: 5,
        REFUNDING: 6
    },
    GA_GROUP_STATUS: {
        NOT_FULL: "2",
        SUCCESS: "4",
        FAIL: "5"
    },
    GA_ROLE: {
        CAPTAIN: "1",
        CREW: "2"
    },
    GA_PRIZE_STATUS: {
        NOT_ROLL: "1",
        WIN: "2",
        CONSOLATION: "3",
        LOSS: "4"
    },
    COOKIE: {
        RISK: "group_risk",
        NAME: "CSRF_AP"
    }
}, _defineProperty(_module$exports, "GA_PRIZE_STATUS", {
    ALL: 0,
    WAIT: 1,
    WIN: 2,
    LOSS: 3,
    NO_GROUP: 4
}), _defineProperty(_module$exports, "JUMP_TYPE", {
    TO_H5: 2,
    TO_OTHER: 1
}), _module$exports);