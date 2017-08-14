var mongoose = require('mongoose');
var db = mongoose.connection;
var model = require('./models');
var schema = require('./schema');
mongoose.Promise = global.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1:27017/friend', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function(err) {
    console.log('dbs open err');
});

db.once('open', function() {
    console.log('sdbs open success');
});

model.create('people', schema.people, 'people');
model.create('visitor', schema.visitor, 'visitor');
model.create('banner', schema.banner, 'banner');
model.create('leader', schema.leader, 'leader');
model.create('intro', schema.intro, 'intro');
model.create('quality', schema.quality, 'quality');
model.create('card', schema.card, 'card');
model.create('info', schema.info, 'info');

