/**
 * Created by sasitha on 7/20/14.
 */
var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var MongoPostRoutsNoVal = function(){
var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
    var routs = {};
    routs['/flights_collection'] = function(req, res){
        var flights_collection_json = req.body;
        mInstant.dbinsert(dburl, "flights_collection", flights_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully ");
        });

    };
    routs['/schedule_collection'] = function(req, res){
        var schedule_collection_json = req.body;
        mInstant.dbinsert(dburl, "schedule_collection", schedule_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully ");
        });
    };

    routs['/customer_collection'] = function(req, res){
        var customer_collection_json = req.body;
        mInstant.dbinsert(dburl, "customer_collection", customer_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully ");
        });
    };
    routs['/airport_collection'] = function(req, res){
        var airport_collection_json = req.body;
        mInstant.dbinsert(dburl, "airport_collection", airport_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully ");
        });
    };
    routs['/seats_collection'] = function(req, res){
        var seats_collection_json = req.body;
        mInstant.dbinsert(dburl, "seats_collection", seats_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully ");
        });
    };
    routs['/ticket_collection'] = function(req, res){
        var ticket_collection_json = req.body;
        mInstant.dbinsert(dburl, "ticket_collection", ticket_collection_json, function(){
            res.statusCode = 200;
            res.send("data inserted successfully ");
        });
    };


    return routs;

};
module.exports.MongoPostRoutsNoVal = MongoPostRoutsNoVal;