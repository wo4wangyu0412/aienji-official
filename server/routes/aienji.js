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

var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/user/add', (req, res) => res.render('user/add'));

router.get('/about', (req, res) => {
    var getLeader = leaderModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getLeader])
    .then((results) => {
        var Leader = results[0];

        res.render('about/index', {
            leader: Leader
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