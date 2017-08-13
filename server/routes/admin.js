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
 * 请求关于我们
 *
 * @param  {[type]} '/admin/about' [description]
 * @param  {[type]} (req,          res)          [description]
 * @return {[type]}                [description]
 */
router.get('/admin/about', (req, res) => {
    var getLeader = leaderModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getLeader])
    .then((results) => {
        var Leader = results[0];

        res.render('admin/about', {
            leader: Leader
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



module.exports = router;