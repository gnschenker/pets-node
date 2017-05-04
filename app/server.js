var express = require("express");
var app     = express();
var path    = require("path");
var mustacheExpress = require('mustache-express');
var os = require("os");

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://mongodb:27017/pets';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  insertDocuments(db, function(){
      db.close();
  });
});



images = [
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr05/15/9/anigif_enhanced-buzz-26388-1381844103-11.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr01/15/9/anigif_enhanced-buzz-31540-1381844535-8.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr05/15/9/anigif_enhanced-buzz-26390-1381844163-18.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr06/15/10/anigif_enhanced-buzz-1376-1381846217-0.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr03/15/9/anigif_enhanced-buzz-3391-1381844336-26.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr06/15/10/anigif_enhanced-buzz-29111-1381845968-0.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr03/15/9/anigif_enhanced-buzz-3409-1381844582-13.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr02/15/9/anigif_enhanced-buzz-19667-1381844937-10.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr05/15/9/anigif_enhanced-buzz-26358-1381845043-13.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr06/15/9/anigif_enhanced-buzz-18774-1381844645-6.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr06/15/9/anigif_enhanced-buzz-25158-1381844793-0.gif",
    "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr03/15/10/anigif_enhanced-buzz-11980-1381846269-1.gif"
];

app.set('view engine', 'html');
app.engine('html', mustacheExpress());          // register file extension 
app.set('views', __dirname);

app.get('/',function(req,res){
    var hostname = os.hostname();
    var index = Math.floor(Math.random() * 13);
    getPet(index, function(url){
        res.render('index', {
                url: url,
                hostname: hostname
            });
    })

    // res.render('index', {
    //         url: images[index],
    //         hostname: hostname
    //     });
});

var insertDocuments = function(db, callback) {
    var i = 0;
    var pets = images.map(function(item){
        return {
            index: i++,
            url: item
        }
    })
   db.collection('pets').insertMany( pets, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
};

var getPet = function(index, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection('pets');
        collection.findOne({index: index}, function(err, doc) {
            assert.equal(null, err);
            callback(doc.url);
            db.close();
        });
    });
}

app.listen(3000, '0.0.0.0');

console.log("Running at Port 3000");