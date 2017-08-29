var express = require('express');
var app = express();
var router = express.Router();
var cookie = require('cookie-parser');
var util = require('../util/util');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({limit: '50mb'});
var fileParser = bodyParser({uploadDir:'./uploads'});
var mongoose = require('mongoose');
var personModel = mongoose.model('people');
var bannerModel = mongoose.model('banner');
var leaderModel = mongoose.model('leader');
var qualityModel = mongoose.model('quality');
var introModel = mongoose.model('intro');
var cardModel = mongoose.model('card');
var infoModel = mongoose.model('info');
var newsModel = mongoose.model('news');
var type1Model = mongoose.model('type1');
var type2Model = mongoose.model('type2');
var productModel = mongoose.model('product');
var contactModel = mongoose.model('contact');
var userModel = mongoose.model('user');
var downModel = mongoose.model('down');
var upload = require('../models/fileuploads');

var mongoose = require('mongoose');
var db = mongoose.connection;
var token = 'asdashj3h4j34j23k34h3jh4j3423';
router.use(cookie());

router.get('/login', (req, res) => {
    res.render('admin/login');
});

/**
 * 登录
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.post('/admin/login', jsonParser, (req, res) => {
    if (req.body) {
        var userName = req.body.userName || '';
        var passWord = req.body.passWord || '';
        console.log(userName, passWord);

        userModel.findOne({userName: userName}, (err, doc) => {
            if (err) {
                res.send(err);
            }

            if (doc && doc.passWord === passWord) {
                res.send(util.unifyRes({
                    msg: '登录成功',
                    result: token
                }));
            }
            else {
                res.send(util.unifyRes({
                    code: 500,
                    ms: '用户名或密码错误'
                }));
            }
        });
    }
});

router.use((req, res, next) => {
    var cookie = req.headers.cookie || '';
    console.log(111, token , cookie);

    if (cookie.indexOf(token) === -1) {
        res.redirect('/login');
    }

    next();
});

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
 * 添加公司信息
 *
 * @param  {[type]}   '/admin/add/banner' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/companyinfo', jsonParser, (req, res) => {
    if (req.body) {
        infoModel.remove({}).then((err) => {
            infoModel.create(req.body, (err, doc) => {
                infoModel.find({}, (err, result) => {
                    res.send(util.unifyRes({
                        result: result
                    }));
                });
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
        introModel.remove({}).then((err) => {
            console.log(err);
            if (err) {
                res.send(util.unifyRes({
                    code: 500,
                    result: false,
                    msg: '清楚数据库失败'
                }));
                res.end();
            }

            introModel.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                    res.end();
                }

                introModel.find({}, (err, result) => {
                    if (err) return handleError(err);
                    res.send({
                        msg: '公司简介设置成功',
                        result: result
                    });
                    res.end();
                });
            });
        });
    }
});


/**
 * 请求news页
 *
 * @param  {[type]} '/admin/home' [description]
 * @param  {[type]} (req,         res)          [description]
 * @return {[type]}               [description]
 */
router.get('/admin/news', (req, res) => {
    var getNews = newsModel.find({});

    Promise.all([getNews])
    .then((results) => {
        var newsList = results[0];

        res.render('admin/news', {
            news: newsList
        });
    });
});

/**
 * 添加 新闻
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/news', jsonParser, (req, res) => {
    if (req.body) {
        newsModel.create(req.body, (err, doc) => {
            if (err) {
                res.send(err);
            }

            newsModel.find({}, (err, result) => {
                if (err) {
                    res.send(err);
                }

                res.send({
                    msg: '新闻发布成功',
                    result: result
                });
            });
        });
    }
});

/**
 * 删除news
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/news', (req, res) => {
    let id = req.query.id;

    newsModel.findByIdAndRemove(id, err => {
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
 * 查找news
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/search/news', (req, res) => {
    let id = req.query.id;

    newsModel.findById(id, (err, result) => {
        if (err) {
            res.send(util.unifyRes({
                code: 500,
                result: '删除失败'
            }));
        }

        res.send(util.unifyRes({result: result}));
    });
});

/**
 * 修改news
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.post('/admin/update/news', jsonParser, (req, res) => {
    if (req.body) {
        var id = req.body.id;

        newsModel.findByIdAndUpdate(id, {$set: req.body}, (err, doc) => {
            if (err) {
                res.send(err);
            }

            res.send({
                msg: '新闻修改成功',
                result: doc
            });
        });
    }
});

/**
 * 请求product页
 *
 * @param  {[type]} '/admin/product' [description]
 * @param  {[type]} (req,         res)          [description]
 * @return {[type]}               [description]
 */
router.get('/admin/product', (req, res) => {
    var getType1 = type1Model.find({});
    var getType2 = type2Model.find({});
    var getProduct = productModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getType1, getType2, getProduct])
    .then((results) => {
        var type1List = results[0];
        var type2List = results[1];
        var productList = results[2];

        res.render('admin/product', {
            type1: type1List,
            type2: type2List,
            product: productList
        });
    });
});

/**
 * 添加 产品类别
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/product/type', jsonParser, (req, res) => {
    var model = req.body.type == 1 ? type1Model: type2Model;

    if (req.body) {
        if (req.body.id) {
            model.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
                if (err) {
                    req.send(err);
                    req.end();
                }

                res.send(util.unifyRes({
                    msg: '新闻修改成功',
                    result: doc
                }));
            });
        }
        else {
            model.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                }

                model.find({}, (err, result) => {
                    if (err) {
                        res.send(err);
                    }

                    res.send(util.unifyRes({
                        msg: '产品成功',
                        result: model
                    }));
                });
            });
        }
    }
});

/**
 * 删除产品类别
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/product/type', (req, res) => {
    var type = req.query.type;
    let id = req.query.id;

    var model = type == 1 ? type1Model: type2Model;
    console.log(model);
    model.findByIdAndRemove(id, err => {
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
 * 添加 产品详情
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/product/add', jsonParser, (req, res) => {
    var model = productModel;

    if (req.body) {
        if (req.body.id) {
            model.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
                if (err) {
                    req.send(err);
                    req.end();
                }

                res.send(util.unifyRes({
                    msg: '修改产品成功',
                    result: doc
                }));
            });
        }
        else {
            model.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                }

                model.find({}, (err, result) => {
                    if (err) {
                        res.send(err);
                    }

                    res.send(util.unifyRes({
                        msg: '新增产品成功',
                        result: doc
                    }));
                });
            });
        }
    }
});

/**
 * 删除产品
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/product', (req, res) => {
    let id = req.query.id;

    productModel.findByIdAndRemove(id, err => {
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
 * 查找产品
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/search/product', (req, res) => {
    let id = req.query.id;

    productModel.findById(id, (err, result) => {
        if (err) {
            res.send(util.unifyRes({
                code: 500,
                result: '删除失败'
            }));
        }

        res.send(util.unifyRes({result: result}));
    });
});

/**
 * 请求contact页
 *
 * @param  {[type]} '/admin/product' [description]
 * @param  {[type]} (req,         res)          [description]
 * @return {[type]}               [description]
 */
router.get('/admin/contact', (req, res) => {
    var getContact = contactModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getContact])
    .then((results) => {
        var contactList = results[0];

        res.render('admin/contact', {
            contact: contactList
        });
    });
});

/**
 * 请求contact页
 *
 * @param  {[type]} '/admin/product' [description]
 * @param  {[type]} (req,         res)          [description]
 * @return {[type]}               [description]
 */
router.get('/admin/down', (req, res) => {
    var getContact = contactModel.find({});
    var getDown = downModel.find({});
    // res.send(db.model('Person'));
    Promise.all([getContact, getDown])
    .then((results) => {
        var contactList = results[0];
        var downList = results[1];

        res.render('admin/down', {
            contact: contactList,
            down: downList
        });
    });
});


/**
 * 添加 联系人卡片
 *
 * @param  {[type]}   '/admin/add/leader' [description]
 * @param  {[type]}   jsonParser          [description]
 * @param  {Function} (req,               res)          [description]
 * @return {[type]}                       [description]
 */
router.post('/admin/add/contact', jsonParser, (req, res) => {
    var model = contactModel;

    if (req.body) {
        if (req.body.id) {
            model.findByIdAndUpdate(req.body.id, req.body, (err, doc) => {
                if (err) {
                    req.send(err);
                    req.end();
                }

                res.send(util.unifyRes({
                    msg: '联系方式修改成功',
                    result: doc
                }));
            });
        }
        else {
            model.create(req.body, (err, doc) => {
                if (err) {
                    res.send(err);
                }

                model.find({}, (err, result) => {
                    if (err) {
                        res.send(err);
                    }

                    res.send(util.unifyRes({
                        msg: '添加成功',
                        result: model
                    }));
                });
            });
        }
    }
});

/**
 * 删除联系人
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/contact', (req, res) => {
    let id = req.query.id;

    contactModel.findByIdAndRemove(id, err => {
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
 * 删除联系人
 *
 * @param  {[type]} '/admin/delete/banner' [description]
 * @param  {[type]} (req,                  res           [description]
 * @return {[type]}                        [description]
 */
router.get('/admin/delete/down', (req, res) => {
    let id = req.query.id;

    downModel.findByIdAndRemove(id, err => {
        if (err) {
            res.send(util.unifyRes({
                code: 500,
                result: '删除失败'
            }));
        }

        res.send(util.unifyRes({ms: 'delete success'}));
    });
});

var cpUpload = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'file', maxCount: 1}]);
/**
 * 上传文件
 *
 * @param  {[type]} 'admin/file-upload' [description]
 * @param  {[type]} (req,               res           [description]
 * @return {[type]}                     [description]
 */
router.post('/admin/file-upload', cpUpload, (req, res) => {
    var piclist = req.files, pic, file;

    pic = '/static/upload/' + piclist.pic[0].filename;
    file = '/static/upload/' + piclist.file[0].filename;

    var data = {
        pic: pic,
        file: file,
        title: req.body.title
    };

    downModel.create(data, (err, dac) => {
        if (err) throw err;

        res.redirect('/admin/down');
    });
});

module.exports = router;