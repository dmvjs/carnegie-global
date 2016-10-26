var toLocal = require('./ui/getLocalizedString')
    , localStrings = require('./ui/localizedStrings')
    , getKeyForLanguageOrLocalCenter = require('./ui/getKeyForLanguageOrLocalCenter')
    , useDefaultFeeds = window.__languageForCarnegie === undefined && window.__localCenter === undefined
    , useArabicUI = window.__languageForCarnegie === "ar"
    , useChineseUI = window.__languageForCarnegie === "zh"
    , useRussianUI = window.__languageForCarnegie === "ru"
    , useMoscowCenter = window.__localCenter === "moscow"
    , useBeijingCenter = window.__localCenter === "beijing"
    , useBeirutCenter = window.__localCenter === "beirut"
    , useBrusselsCenter = window.__localCenter === "brussels"
    , useNewDelhiCenter = window.__localCenter === "newDelhi";

var menus = [{
    title: ''
    , sub: toLocal(localStrings.readOffline)
    , feeds: [getLatestAnalysis(), getMostPopular()]
}, {
    title: toLocal(localStrings.languages)
    , feeds: [{
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
        , name: toLocal(localStrings.english)
        , filename: 'global-en.json'
        , type: 'json'
        , required: useDefaultFeeds
        , language: 'en'
    }, {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ru'
        , name: toLocal(localStrings.russian)
        , type: 'json'
        , filename: 'global-ru.json'
        , required: useRussianUI
        , language: 'ru'
    }, {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=zh'
        , name: toLocal(localStrings.chinese)
        , type: 'json'
        , filename: 'global-zh.json'
        , required: useChineseUI
        , language: 'zh'
    }, {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ar'
        , name: toLocal(localStrings.arabic)
        , dir: 'rtl'
        , type: 'json'
        , filename: 'global-ar.json'
        , required: useArabicUI
        , language: 'ar'
    }]
}, {
    title: toLocal(localStrings.globalCenters)
  , feeds: [
        getBeijingCenterFeed()
      , getBeirutCenterFeed()
    , {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=brussels'
        , name: toLocal(localStrings.brussels)
        , type: 'json'
        , filename: 'center-brussels.json'
        , required: useBrusselsCenter
        , language: 'en'
    },
        getMoscowCenterFeed()
    , {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=india'
        , name: toLocal(localStrings.newDelhi)
        , type: 'json'
        , filename: 'center-newDelhi.json'
        , required: useNewDelhiCenter
        , language: 'en'
    }, {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
        , name: toLocal(localStrings.washingtonDC)
        , filename: 'global-en.json'
        , type: 'json'
        , required: useDefaultFeeds
        , language: 'en'
    }]
}];

function getBeijingCenterFeed () {
    var key = getKeyForLanguageOrLocalCenter();
    var isZH = key === 'zh';
    var url = 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beijing';
    if (isZH) {
        url = 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=zh';
    }
    return {
        url: url
        , name: toLocal(localStrings.beijing)
        , type: 'json'
        , filename: isZH ? 'global-zh.json' : 'center-beijing.json'
        , required: isZH ? useChineseUI : useBeijingCenter
        , language: isZH ? 'zh' : 'en'
    };
}

function getBeirutCenterFeed () {
    var key = getKeyForLanguageOrLocalCenter();
    var isAR = key === 'ar';
    var url = 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beirut';
    if (isAR) {
        url = 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ar';
    }
    return {
        url: url
        , name: toLocal(localStrings.beirut)
        , type: 'json'
        , filename: isAR ? 'global-ar.json' : 'center-beirut.json'
        , required: isAR ? useArabicUI : useBeirutCenter
        , language: isAR ? 'ar' : 'en'
    };
}

function getMoscowCenterFeed () {
    var key = getKeyForLanguageOrLocalCenter();
    var isRU = key === 'ru';
    var url = 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=moscow';
    if (isRU) {
        url = 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ru';
    }
    return {
        url: url
        , name: toLocal(localStrings.moscow)
        , type: 'json'
        , filename: isRU ? 'global-ru.json' : 'center-moscow.json'
        , required: isRU ? useRussianUI : useMoscowCenter
        , language: isRU ? 'ru' : 'en'
    };
}

function getLanguage () {
    var key = getKeyForLanguageOrLocalCenter();
    var language = 'en';
    if (['ar', 'zh', 'ru'].indexOf(key) > -1) {
        language = key;
    }
    return language
}

function getMostPopular () {
    var key = getKeyForLanguageOrLocalCenter();
    var language = getLanguage();
    var urls = {
        en: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-top5.json.txt'
        , ar: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beirut-arabic-top5.json.txt'
        , ru: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-moscow-russian-top5.json.txt'
        , zh: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beijing-chinese-top5.json.txt'
        , moscow: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-moscow-top5.json.txt'
        , brussels: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-brussels-top5.json.txt'
        , beijing: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beijing-top5.json.txt'
        , beirut: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beirut-top5.json.txt'
        , newDelhi: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-india-top5.json.txt'
    };
    return {
        url: urls[key]
        , name: toLocal(localStrings.mostPopular)
        , filename: language + '-top5.json'
        , type: 'json'
        , language: language
    }
}

function getLatestAnalysis () {
    var key = getKeyForLanguageOrLocalCenter();
    var isLang = ['en', 'ar', 'ru', 'zh'].indexOf(key) > -1;
    var language = getLanguage();
    var urls = {
        en: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=global'
        , ar: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ar'
        , ru: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ru'
        , zh: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=zh'
        , moscow: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=moscow'
        , brussels: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=brussels'
        , beijing: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beijing'
        , beirut: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beirut'
        , newDelhi: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=india'
    };
    return {
        url: urls[key]
        , name: toLocal(localStrings.latestAnalysis)
        , filename: (isLang ? 'global-' : 'center-') + key + '.json'
        , type: 'json'
        , required: true
        , language: language
    }
}

module.exports = menus;