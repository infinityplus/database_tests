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
          if (!error) {
              var collection = db.collection(collection_name);
              collection.insert(json, function (err, docs) {
                  collection.count(function (err, count) {
                      db.close();
                      callback();
                  });
              });

          }
      });
  },

  dbread :function(dburl, collection_name, json, callback){
        MongoClient.connect(dburl, function(error, db){
            if(!error){
                var collection = db.collection(collection_name);
                var data_array = [];
                var stream = collection.find({id:json['id']}).stream();
                stream.on("data", function(item) {
                    data_array.push({id:json['id'], data:item});
                });
                stream.on("end", function() {
                    db.close();
                    callback(data_array);
                });
            }
        });
  },

  dbreadone :function(dburl, collection_name, json, callback){
        MongoClient.connect(dburl, function(error, db){
            if(!error){
                var collection = db.collection(collection_name);

                collection.findOne(json, function(error, item){
                    if(!error){
                        db.close();
                        callback(item);
                    }
                } );
            }else{
                callback("none");
            }
        })
  },

  dbupdate : function(dburl, collection_name, json, callback){
        MongoClient.connect(dburl, function(error, db){
            var collection = db.collection(collection_name);
            collection.update(
                {id:json['id']},
                {
                    id:json['id'],
                    code:json['code'],
                    status:json['status'],
                    belongsto:{
                        group_id:json['belongsto']['group_id'],
                        passengers:{
                            frist_class:json['belongsto']['passengers']['frist_class'],
                            business_class:json['belongsto']['passengers']['business_class'],
                            Economy_cllass:json['belongsto']['passengers']['Economy_cllass']
                        }
                    }
                },
                function(error){
                    db.close();
                    callback();
                }
            )
        })
  }



};