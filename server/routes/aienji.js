var express = require('express');
var app = express();
var router = express.Router();
var util = require('../util/util');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({limit: '50mb'});
var mongoose = require('mongoose');
var personModel = mongoose.model('people');
var bannerModel = mongoose.model('banner');
var leaderModel = mongoose.model('leader');
var introModel = mongoose.model('intro');
var qualityModel = mongoose.model('quality');
var cardModel = mongoose.model('card');
var infoModel = mongoose.model('info');
var newsModel = mongoose.model('news');
var type1Model = mongoose.model('type1');
var type2Model = mongoose.model('type2');
var productModel = mongoose.model('product');
var contactModel = mongoose.model('contact');

var mongoose = require('mongoose');
var db = mongoose.connection;
var getInfo = infoModel.find({});

router.get('/down', (req, res) => {
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});
    var getContact = contactModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getType1, getType2, getProduct, getBanner, getInfo, getContact])
    .then((results) => {
        var type1List = results[0];
        var type2List = results[1];
        var productList = results[2];
        var bannerList = results[3];
        var infoList = results[4];
        var contactList = results[5];

        res.render('download/index', {
            type1: type1List,
            type2: type2List,
            product: productList,
            banner: bannerList,
            info: infoList,
            contact: contactList
        });
    });
});

router.get('/about', (req, res) => {
    var getLeader = leaderModel.find({});
    var getIntro = introModel.find({});
    var getQuality = qualityModel.find({});
    var getCard = cardModel.find({});
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getLeader, getIntro, getQuality, getCard, getInfo, getType1, getType2, getProduct, getBanner])
    .then((results) => {
        var leader = results[0];
        var intro = results[1];
        var quality = results[2];
        var card = results[3];
        var info = results[4];
        var type1List = results[5];
        var type2List = results[6];
        var productList = results[7];
        var bannerList = results[8];

        res.render('about/index', {
            leader: leader,
            intro: intro,
            quality: quality,
            card: card,
            info: info,
            type1: type1List,
            type2: type2List,
            product: productList,
            banner: bannerList
        });
    });
});

router.get('/product', (req, res) => {
    var type1Id = req.query.type1;
    var type2Id = req.query.type2;

    if (type2Id) {
        var getProduct = productModel.find({type2Id: type2Id});
    }
    else {
        var getProduct = productModel.find({});
    }

    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getBanner = bannerModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getType1, getType2, getProduct, getBanner, getInfo])
    .then((results) => {
        var type1List = results[0];
        var type2List = results[1];
        var productList = results[2];
        var bannerList = results[3];
        var infoList = results[4];

        res.render('product/index', {
            type1: type1List,
            type2: type2List,
            product: productList,
            banner: bannerList,
            type1Id: type1Id,
            type2Id: type2Id,
            info: infoList
        });
    });
});

router.get('/contact', (req, res) => {
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});
    var getContact = contactModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getType1, getType2, getProduct, getBanner, getInfo, getContact])
    .then((results) => {
        var type1List = results[0];
        var type2List = results[1];
        var productList = results[2];
        var bannerList = results[3];
        var infoList = results[4];
        var contactList = results[5];

        res.render('contact/index', {
            type1: type1List,
            type2: type2List,
            product: productList,
            banner: bannerList,
            info: infoList,
            contact: contactList
        });
    });
});

router.get('/news/detail', (req, res) => {
    var id = req.query.id;
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});


    var getNews = newsModel.findById(id);
    // res.render('news-detail');
    Promise.all([getNews, getType1, getType2, getProduct, getInfo, getBanner])
    .then((results) => {
        var newsDetail = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];
        var infoList = results[4];
        var bannerList = results[5];

        res.render('news/detail', {
            news: newsDetail,
            type1: type1List,
            type2: type2List,
            product: productList,
            info: infoList,
            banner: bannerList
        });
    });
});

router.get('/product/detail', (req, res) => {
    var id = req.query.id;

    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getDeatil = productModel.findById(id);
    var getBanner = bannerModel.find({});

    Promise.all([getDeatil, getType1, getType2, getProduct, getInfo, getBanner])
    .then((results) => {
        var getDeatil = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];
        var infoList = results[4];
        var bannerList = results[5];

        res.render('product/detail', {
            detail: getDeatil,
            type1: type1List,
            type2: type2List,
            product: productList,
            info: infoList,
            banner: bannerList
        });
    });
});

router.get('/news', (req, res) => {
    var getNews, type = req.query.type;
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});

    if (type) {
        getNews = newsModel.find({type: type});
    }
    else {
        getNews = newsModel.find({});
    }

    Promise.all([getNews, getType1, getType2, getProduct, getInfo, getBanner])
    .then((results) => {
        var newsList = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];
        var infoList = results[4];
        var bannerList = results[5];

        res.render('news/index', {
            news: newsList,
            type1: type1List,
            type2: type2List,
            product: productList,
            info: infoList,
            banner: bannerList
        });
    });
});

router.get('/home', (req, res) => {
    var getBanner = bannerModel.find({});
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getNews = newsModel.find({});
    var getInfo = infoModel.find({});
    var getIntro = introModel.find({});

    // res.send(db.model('Person'));
    Promise.all([getBanner, getType1, getType2, getProduct, getInfo, getNews, getIntro])
    .then((results) => {
        var bannerList = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];
        var infoList = results[4];
        var newsList = results[5];
        var introList = results[6];

        var showList = [], showNews = [];

        for (let i = 0, j = productList.length; i < j; i++) {
            if (i % 6 === 0) {
                for (let k = 0; k < 6; k++) {
                    if ((k + i) < j) {
                        if (!showList[parseInt(i / 6)]) {
                            showList[parseInt(i / 6)] = [];
                        }

                        showList[parseInt(i / 6)].push(productList[k + i]);
                    }
                }
            }
        }

        for (let i = 0, j = newsList.length; i < j; i++) {
            if (i % 6 === 0) {
                for (let k = 0; k < 6; k++) {
                    if ((k + i) < j) {
                        if (!showNews[parseInt(i / 6)]) {
                            showNews[parseInt(i / 6)] = [];
                        }

                        showNews[parseInt(i / 6)].push(newsList[k + i]);
                    }
                }
            }
        }

        res.render('home/index', {
            banner: bannerList,
            type1: type1List,
            type2: type2List,
            product: productList,
            info: infoList,
            showList: showList,
            showNews: showNews,
            news: newsList,
            intro: introList
        });
    });
});

module.exports = router;