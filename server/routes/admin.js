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
var qualityModel = mongoose.model('quality');
var introModel = mongoose.model('intro');
var cardModel = mongoose.model('card');
var infoModel = mongoose.model('info');

var mongoose = require('mongoose');
var db = mongoose.connection;

/**
 * 请求home页
 *
 * @param  {[type]} '/admin/home' [description]
 * @param  {[type]} (req,         res)          [description]
 * @return {[type]}               [description]
 */
router.get('/admin/home', (req, res) => {
    var getBanner = bannerModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getBanner])
    .then((results) => {
        var bannerList = results[0];

        res.render('admin/home', {
            banner: bannerList
        });
    });
});

/**
 * 添加首页轮播图
 *
 * @param  {[type]}   '/admin/add/banner' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/banner', jsonParser, (req, res) => {
    if (req.body) {
        bannerModel.create(req.body, (err, doc) => {
            if (err) {
                res.send(err);
            }

            bannerModel.find({}, (err, result) => {
                if (err) return handleError(err);
                // res.send(result);
                res.send(result)
            });
        });
    }
});


/**
 * 删除banner
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/banner', (req, res) => {
    let id = req.query.id;

    bannerModel.findByIdAndRemove(id, err => {
        if (err) {
            res.send(util.unifyRes({
                code: 500,
                result: '删除失败'
            }));
        }

        res.send(util.unifyRes({ms: 'delete success'}));
    });
});

/**
 * 请求关于我们
 *
 * @param  {[type]} '/admin/about' [description]
 * @param  {[type]} (req,          res)          [description]
 * @return {[type]}                [description]
 */
router.get('/admin/about', (req, res) => {
    var getLeader = leaderModel.find({});
    var getIntro = introModel.find({});
    var getQuality = qualityModel.find({});
    var getCard = cardModel.find({});
    var getInfo = infoModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getLeader, getIntro, getQuality, getCard, getInfo])
    .then((results) => {
        var leader = results[0];
        var intro = results[1];
        var quality = results[2];
        var card = results[3];
        var info = results[4];

        res.render('admin/about', {
            leader: leader,
            intro: intro,
            quality: quality,
            card: card,
            info: info
        });
    });
});

/**
 * 添加资质证书
 *
 * @param  {[type]}   '/admin/add/banner' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/info', jsonParser, (req, res) => {
    if (req.body) {
        cardModel.create(req.body, (err, doc) => {
            if (err) {
                res.send(err);
            }

            cardModel.find({}, (err, result) => {
                if (err) return handleError(err);
                // res.send(result);
                res.send(result)
            });
        });
    }
});

/**
 * 添加资质证书
 *
 * @param  {[type]}   '/admin/add/banner' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/card', jsonParser, (req, res) => {
    if (req.body) {
        cardModel.create(req.body, (err, doc) => {
            if (err) {
                res.send(err);
            }

            cardModel.find({}, (err, result) => {
                if (err) return handleError(err);
                // res.send(result);
                res.send(result)
            });
        });
    }
});

/**
 * 删除资质证书
 *
 * @param  {[type]} '/admin/delete/card' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/card', (req, res) => {
    let id = req.query.id;

    cardModel.findByIdAndRemove(id, err => {
        if (err) {
            res.send(util.unifyRes({
                code: 500,
                result: '删除失败'
            }));
        }

        res.send(util.unifyRes({ms: 'delete success'}));
    });
});

/**
 * 添加 董事长寄语
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/leader', jsonParser, (req, res) => {
    if (req.body) {
        leaderModel.remove({}).then(() => {
            leaderModel.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                }

                leaderModel.find({}, (err, result) => {
                    if (err) return handleError(err);
                    // res.send(result);
                    res.send(result)
                });
            });
        });
    }
});

/**
 * 添加 质量保障
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/quality', jsonParser, (req, res) => {
    if (req.body) {
        qualityModel.remove({}).then(() => {
            qualityModel.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                }

                qualityModel.find({}, (err, result) => {
                    if (err) return handleError(err);
                    // res.send(result);
                    res.send(result)
                });
            });
        });
    }
});

/**
 * 添加 公司简介
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/intro', jsonParser, (req, res) => {
    if (req.body) {
        introModel.remove({}).then(() => {
            introModel.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                }

                introModel.find({}, (err, result) => {
                    if (err) return handleError(err);
                    res.send({
                        msg: '公司简介设置成功',
                        result: result
                    });
                });
            });
        });
    }
});

module.exports = router;