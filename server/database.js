/**
 * Created by sasitha on 7/20/14.
 */

var monogDb = require('./mongodb');

var DbHelper = function(){

    var dbInstant;

    var connectDatabase = function(){
        dbInstant = monogDb.ConectMongo();
    };

    var insertData = function(){
        var collection = dbInstant.collection('test_insert');
        collection.insert({a:2}, function(err, docs) {
            collection.count(function(err, count) {
                console.log(format("count = %s", count));
                db.close();
            });
        });
    };
};
module.exports.DbHelper = DbHelper;