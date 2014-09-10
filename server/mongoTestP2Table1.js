/**
 * Created by sasitha on 8/12/14.
 */
var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var MongoTestP2Table1 = function(){
    var dburl = 'mongodb://127.0.0.1:27017/database_test_phase_2';
    var routs = {};
    routs['/single_table_collection'] = function(req, res){
        var single_table_collection_json = req.body;
        mInstant.dbinsert(dburl, "single_table_collection", single_table_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully");
        });

    };
    routs['/single_table_document_find'] = function(req, res){
      var single_table_document_find = req.body;
        mInstant.dbread(dburl, 'single_table_collection', single_table_document_find, function(data){
            //console.log(data);
            res.statusCode = 200;
            res.json(data);
        });
    };
    routs['/single_table_document_update'] = function(req, res){
        var single_table_document_update = req.body;
        mInstant.dbupdate(dburl, 'single_table_collection', single_table_document_update, function(){
           res.statusCode = 200;
           res.send("data updated successfully");
        })
    };
    return routs;
   // "database_test_phase_2"
};
module.exports.MongoTestP2Table1 = MongoTestP2Table1;