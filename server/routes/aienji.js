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

var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/user/add', (req, res) => res.render('user/add'));

router.get('/about', (req, res) => {
    var getLeader = leaderModel.find({});
    var getIntro = introModel.find({});
    var getQuality = qualityModel.find({});
    var getCard = cardModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getLeader, getIntro, getQuality, getCard])
    .then((results) => {
        var leader = results[0];
        var intro = results[1];
        var quality = results[2];
        var card = results[3];

        res.render('about/index', {
            leader: leader,
            intro: intro,
            quality: quality,
            card: card
        });
    });
});

router.get('/product', (req, res) => res.render('product/index'));

router.get('/news', (req, res) => res.render('news/index'));

router.get('/contact', (req, res) => res.render('contact/index'));

router.get('/news/detail', (req, res) => res.render('news/detail'));

router.get('/product/detail', (req, res) => res.render('product/detail'));

router.get('/home', (req, res) => {
    var getBanner = bannerModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getBanner])
    .then((results) => {
        var bannerList = results[0];

        res.render('home/index', {
            banner: bannerList
        });
    });
});

module.exports = router;