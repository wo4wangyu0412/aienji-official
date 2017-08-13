module.exports = function (app) {
    app.use('/', require('./friend'));
    app.use('/', require('./aienji'));
    app.use('/', require('./admin'));
    app.use('/page2', require('./page2'));
};
