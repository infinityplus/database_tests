/**
 * Created by sasitha on 7/20/14.
 */
var MongoClient = require('mongodb').MongoClient;
var mongoInstant = "";

module.exports = {

  dbconnect: function(){
      MongoClient.connect('mongodb://127.0.0.1:27017/test', function(error, db){
          if(!error){
              mongoInstant = db;
              console.log("connected to the db");
          }
      });
  },

  dbinsert :function(dburl,collection_name, json, callback){
      MongoClient.connect(dburl, function(error, db){
          if(!error){
              var collection = db.collection(collection_name);
              collection.insert(json, function(err, docs) {
                  collection.count(function(err, count) {
                      db.close();
                      callback();
                  });
              });

          }
      });
  }



};