Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, env = "production", eapi = void 0, ad_host = "http://mpintra.wesai.com/advertisement", ad_proxy = "http://mpintra.wesai.com/AdProxy", cms_proxy = void 0;

switch (env) {
  case "dev":
    eapi = "http://127.0.0.1:9999/";
    break;

  case "development":
    eapi = "http://ticket.dev.wesai.com/api", cms_proxy = "http://topics-cms.dev.wesai.com:8884/api";
    break;

  case "test":
    eapi = "http://ticket.test.wesai.com/api", cms_proxy = "http://topics-cms.test.wesai.com/api";
    break;

  case "production":
    eapi = "https://ticket.wesai.com/api", cms_proxy = "http://topics-cms.intra.wesai.com/api";
    break;

  case "pre":
    eapi = "https://ticket-pre.wesai.com/api", cms_proxy = "http://topics-cms.intra.wesai.com/api";
    break;

  default:
    eapi = "https://ticket.wesai.com/api", cms_proxy = "http://topics-cms.intra.wesai.com/api";
}

var token = function() {
    return "{{token}}";
}, url = function() {
    return eapi + "/rest/" + token();
}, urls = {
    production: {
        detail: url() + "/Java/item/queryItemDetailInfo/",
        getConfirmation: url() + "/Cart/Cart/getConfirmation/%7B%7D",
        cityList: url() + "/Com/Location/getCompareCitiesList/%7B%7D",
        geo: url() + "/Com/Location/geo/",
        ip: url() + "/Com/Location/ip/%7B%7D",
        category: url() + "/Item/Item/getItemTypesByPid/%7B%7D",
        projectList: url() + "/Java/item/queryItem/",
        recommend: url() + "/Java/item/queryRecommendItems/",
        getUserOrderList: url() + "/Order/Order/getUserOrderList/",
        getUserYuPiaoOrderList: url() + "/Order/Order/getUserChannelOrderList/",
        cancelUserOrder: url() + "/Order/Order/cancelUserOrder/",
        orderDetail: url() + "/Order/Order/getUserOrderDetail/",
        userInfoUrl: url() + "/User/User/getUserInfo/",
        outStockUrl: url() + "/Java/item/recordOutstock/",
        checkMobileIsRegister: url() + "/User/User/checkMobileIsRegister/",
        sendSmsCode: url() + "/User/User/sendSmsCode/",
        setReservationUser: url() + "/User/User/setReservationUser/",
        noseat: url() + "/Java/item/queryItemScreeningsPrices/",
        ticketsDiscount: url() + "/Cart/Cart/getTicketsDiscount/",
        noseatTicketsUrl: url() + "/Cart/Cart/addNoSeatTickets/",
        seatScreening: url() + "/Java/item/queryItemScreenings/",
        seatArea: url() + "/Java/item/queryItemPriceAndSVG/",
        seatSvg: url() + "/Java/item/queryItemSeat/",
        seatAreaByUser: url() + "/Item/NItem/getShowInfoAndAreaSeatsByUser/",
        autoSeatAndAddCart: url() + "/Item/Seat/autoSeatAndAddCart/",
        userSeats: url() + "/Cart/Cart/getUserSeats/",
        selectSeat: url() + "/Cart/Cart/mtSeatTicket/",
        userBonus: url() + "/Marketing/Bonus/getUserBonusByPage/",
        getHotWords: url() + "/Item/Item/getHotWords/%7B%7D",
        getProvince: url() + "/Com/Location/getProvinces/%7B%7D",
        getCity: url() + "/Com/Location/getCitiesByProId/",
        getDistrict: url() + "/Com/Location/getDistrictsByCityId/",
        customAddressApi: url() + "/User/User/findPdasByUuid/%7B%7D",
        customSavePdaApi: url() + "/User/User/savePda/",
        customUpdatePdaApi: url() + "/User/User/updatePda/",
        customDelPdaApi: url() + "/User/User/delPda/",
        customisDefaultApi: url() + "/User/User/setDefaultDeliveryAddress/",
        createOrder: url() + "/Order/Order/createOrder/",
        getPaymentForm: url() + "/Order/Payment/getPaymentForm/",
        m_sendCodeMobile: eapi + "/sms/" + token() + "/sendCodeMobile/",
        m_verifyCodeMobile: eapi + "/sms/" + token() + "/verifyCodeMobile/",
        m_checkVerifyCode: eapi + "/sms/" + token() + "/checkVerifyCode/",
        m_findById: url() + "/User/User/findById/",
        bindMobileWithUser: url() + "/User/User/verifyCodeAndBindUser/",
        setOpenID: url() + "/User/wechat/setopenid/",
        getNativePaymentForm: url() + "/Order/Payment/getNativePaymentForm/",
        dynamicFormGetByOnlineId: url() + "/Com/DynamicForm/getByOnlineId/",
        uploadImage: eapi + "/upload/image/" + token(),
        checkSmsCode: url() + "/User/User/checkSmsCode/",
        bindUser: url() + "/User/User/bindUser/",
        getUseCard: url() + "/User/User/getUseCard/",
        bindWechatUser: url() + "/User/User/bindUser/",
        wechatRefreshToken: url() + "/User/wechat/setopenid/",
        getNewPaymentForm: url() + "/Order/Payment/getNewPaymentForm/",
        getItemADInfo: "https://mpintra.wesai.com/ad/get_item_ad_info/",
        getADInfo: "https://mpintra.wesai.com/ad/get_ad_info/",
        bindOAUser: url() + "/User/User/verifyCodeAndBindUser/",
        OARefreshToken: url() + "/User/wechat/setopenid/",
        BindWeiXinCard: url() + "/User/User/bindWeiXinCard/",
        setCardOpenId: url() + "/User/wechat/setCardOpenId/",
        getCardList: url() + "/User/User/getCardList/",
        activeCard: url() + "/User/User/activeCard/",
        deleteCard: url() + "/User/User/returnDeleteCard/",
        getCardConsumption: url() + "/Order/Order/getCardConsumption/",
        getCardDetail: url() + "/User/User/getCardDetail/",
        getMoneyVirtualcard: url() + "/Order/Order/getVirCardPayMoney/",
        getCardConsumptionDetail: url() + "/Order/Order/getCardConsumptionDetail/",
        getTicketCardByOrder: url() + "/Order/Order/getCadInfo/",
        getRecommendProducts: url() + "/Item/Item/getRecommendProducts/",
        getGoodsBusiness: url() + "/Item/Item/getGoodsBusiness/",
        createSubOrder: url() + "/Order/Order/createSubOrder/",
        getSubOrderPaymentForm: url() + "/Order/Payment/getSubOrderPaymentForm/",
        getSubOrderDetail: url() + "/Order/Order/getSubOrderDetail/",
        getInvoiceStatus: url() + "/Order/Invoice/getInvoiceStatus/",
        getInvoiceCode: url() + "/invoice/redirect/",
        getToken: eapi + "/rest/User/WeChat/miniAppInitToken",
        getUserInfo: url() + "/User/WeChat/UserInfoAndLogin/",
        proxyCurl: url() + "/Com/Helper/proxyCurl/",
        releaseURL: ad_host + "/adlist",
        viewURL: ad_host + "/view",
        clickURL: ad_host + "/click",
        wxclickURL: ad_proxy + "/wxxcx_click",
        getCategoryURL: cms_proxy + "/getCategoryByCityAndClient",
        statisticsAdd: eapi + "/rest/small/" + token() + "/User/WeChat/statisticsAdd/",
        getIndexVenueItems: url() + "/Item/Item/getIndexVenueItems/",
        allAdList: ad_host + "/all_adlist"
    },
    development: {
        detail: eapi + "detail/",
        category: eapi + "category/",
        getHotWords: eapi + "getHotWords/",
        geo: eapi + "geo/",
        cityList: eapi + "cityList/",
        ip: eapi + "ip/",
        categories: eapi + "categories/",
        recommend: eapi + "recommend/",
        projectList: eapi + "projectList/",
        noseat: eapi + "noseat/",
        ticketsDiscount: eapi + "getTicketsDiscount/",
        seatScreening: eapi + "seatscreentime/",
        seatArea: eapi + "seatArea/",
        seatSvg: eapi + "seatSvg/",
        seatAreaByUser: eapi + "getShowInfoAndAreaSeatsByUser/",
        autoSeatAndAddCart: eapi + "autoSeatAndAddCart/",
        userSeats: eapi + "userSeats/",
        selectSeat: eapi + "userSelectSeat/",
        getConfirmation: eapi + "getConfirmation/",
        getUserOrderList: eapi + "getUserOrderList/",
        orderDetail: eapi + "orderDetail/",
        getNativePaymentForm: eapi + "getNativePaymentForm/",
        dynamicFormGetByOnlineId: eapi + "getByOnlineId/",
        getUseCard: eapi + "getUseCard/",
        getRecommendProducts: eapi + "getRecommendProducts/",
        getGoodsBusiness: eapi + "getGoodsBusiness/",
        getSubOrderDetail: eapi + "getSubOrderDetail/",
        noseatTicketsUrl: eapi + "addNoSeatTickets/",
        createOrder: eapi + "createOrder/",
        getPaymentForm: eapi + "getPaymentForm/",
        getProvince: eapi + "getProvince/",
        getCity: eapi + "getCity",
        getDistrict: eapi + "getDistrict"
    }
};

Object.assign(urls.production, {
    bindMobile: eapi + "/sam/mobile",
    sendVerify: eapi + "/api/sendVerify",
    captchaSliderVerify: eapi + "/api/captchaSliderVerify",
    captchaSlider: eapi + "/api/captchaSlider"
});

var expUrl = urls["dev" === env ? "development" : "production"];

if ("dev" === env) for (var key in urls.production) expUrl[key] ? expUrl[key] = expUrl[key] : expUrl[key] = urls.production[key];

Object.assign(expUrl, {
    env: env
}), exports.default = _extends({}, expUrl);