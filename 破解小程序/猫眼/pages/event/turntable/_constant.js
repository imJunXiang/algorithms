var PRIZE_TYPE = {
    none: 0,
    voucher: 1,
    growth: 2,
    ticket: 3
}, PRIZES = {
    4: {
        text: "1",
        prizeType: PRIZE_TYPE.voucher,
        index: 1,
        type: "success"
    },
    7: {
        text: "50",
        prizeType: PRIZE_TYPE.growth,
        index: 2,
        type: "success"
    },
    3: {
        text: "3",
        prizeType: PRIZE_TYPE.voucher,
        index: 3,
        type: "success"
    },
    10: {
        text: "赞接再厉",
        prizeType: PRIZE_TYPE.none,
        index: 4,
        type: "error"
    },
    6: {
        text: "100",
        prizeType: PRIZE_TYPE.growth,
        index: 5,
        type: "success"
    },
    2: {
        text: "5",
        prizeType: PRIZE_TYPE.voucher,
        index: 6,
        type: "success"
    },
    5: {
        text: "200",
        prizeType: PRIZE_TYPE.growth,
        index: 7,
        type: "success"
    },
    9: {
        text: "2",
        prizeType: PRIZE_TYPE.growth,
        index: 8,
        type: "success"
    },
    8: {
        text: "10",
        prizeType: PRIZE_TYPE.growth,
        index: 9,
        type: "success"
    },
    1: {
        text: "免费电影票",
        prizeType: PRIZE_TYPE.ticket,
        index: 10,
        type: "success"
    }
}, SHARE_TITLES = [ "猫眼会员日，和我一起免单", "我成了猫眼会员，万万没想到……", "我是猫眼 VIP，免费看电影！", "免费看电影，要不要一起？", "周末的免费电影票就靠你了！", "帮我点一下，一起免费看电影" ], BET_MSG = {
    0: "meow~什么都没抽到",
    1: "棒！恭喜你获得 @value 元代金券",
    2: "棒！恭喜你获得 @value 成长值",
    3: "棒！恭喜你获得电影票"
}, TASK_NAMES = {
    1: "btn-buy",
    2: "btn-write",
    3: "btn-comment",
    4: "btn-want-see",
    7: "btn-praise"
};

module.exports = {
    PRIZE_TYPE: PRIZE_TYPE,
    PRIZES: PRIZES,
    SHARE_TITLES: SHARE_TITLES,
    BET_MSG: BET_MSG,
    TASK_NAMES: TASK_NAMES
};