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

var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/user/add', (req, res) => res.render('user/add'));

router.get('/about', (req, res) => {
    var getLeader = leaderModel.find({});
    var getIntro = introModel.find({});
    var getQuality = qualityModel.find({});
    var getCard = cardModel.find({});
    var getInfo = infoModel.find({});
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getLeader, getIntro, getQuality, getCard, getInfo, getType1, getType2, getProduct])
    .then((results) => {
        var leader = results[0];
        var intro = results[1];
        var quality = results[2];
        var card = results[3];
        var info = results[4];
        var type1List = results[5];
        var type2List = results[6];
        var productList = results[7];

        res.render('about/index', {
            leader: leader,
            intro: intro,
            quality: quality,
            card: card,
            info: info,
            type1: type1List,
            type2: type2List,
            product: productList
        });
    });
});

router.get('/product', (req, res) => {

    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getType1, getType2, getProduct, getBanner])
    .then((results) => {
        var type1List = results[0];
        var type2List = results[1];
        var productList = results[2];
        var bannerList = results[3];

        res.render('product/index', {
            type1: type1List,
            type2: type2List,
            product: productList,
            banner: bannerList
        });
    });
});

router.get('/contact', (req, res) => {
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    var getBanner = bannerModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getType1, getType2, getProduct, getBanner])
    .then((results) => {
        var type1List = results[0];
        var type2List = results[1];
        var productList = results[2];
        var bannerList = results[3];

        res.render('contact/index', {
            type1: type1List,
            type2: type2List,
            product: productList,
            banner: bannerList
        });
    });
});

router.get('/news/detail', (req, res) => {
    var id = req.query.id;
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});

    var getNews = newsModel.findById(id);
    // res.render('news-detail');
    Promise.all([getNews, getType1, getType2, getProduct])
    .then((results) => {
        var newsDetail = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];

        res.render('news/detail', {
            news: newsDetail,
            type1: type1List,
            type2: type2List,
            product: productList
        });
    });
});

router.get('/product/detail', (req, res) => {
    var id = req.query.id;
    console.log(id);
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});

    var getDeatil = productModel.findById(id);
    // res.render('news-detail');
    Promise.all([getDeatil, getType1, getType2, getProduct])
    .then((results) => {
        var getDeatil = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];

        res.render('product/detail', {
            detail: getDeatil,
            type1: type1List,
            type2: type2List,
            product: productList
        });
    });
});

router.get('/news', (req, res) => {
    var getNews, type = req.query.type;
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});

    if (type) {
        getNews = newsModel.find({type: type});
    }
    else {
        getNews = newsModel.find({});
    }

    Promise.all([getNews, getType1, getType2, getProduct])
    .then((results) => {
        var newsList = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];

        res.render('news/index', {
            news: newsList,
            type1: type1List,
            type2: type2List,
            product: productList
        });
    });
});

router.get('/home', (req, res) => {
    var getBanner = bannerModel.find({});
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getBanner, getType1, getType2, getProduct])
    .then((results) => {
        var bannerList = results[0];
        var type1List = results[1];
        var type2List = results[2];
        var productList = results[3];

        res.render('home/index', {
            banner: bannerList,
            type1: type1List,
            type2: type2List,
            product: productList
        });
    });
});

module.exports = router;