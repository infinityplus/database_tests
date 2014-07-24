/**
 * Created by sasitha on 7/20/14.
 */
var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var validation = require('./mongovalidate');
var ServerRouts = function(){
    var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
    var routs = {};
    routs['/flights_collection'] = function(req, res){
        console.log(req.body);
        res.send("done");
       /* validation.flight_collection_validate(flights_collection_json, function(status, message){
            //status = false;
            //console.log(status);
            //res.statusCode = 404;
           if(status){
               res.statusCode = 200;
               res.send("completed");
               mInstant.dbinsert(dburl, "flights_collection", flights_collection_json, function(){
                   res.send(message);
               });
           }else{
               res.statusCode = 404;
               res.send(message);
           }
        });*/

    };
    routs['/schedule_collection'] = function(req, res){
        var schedule_collection_json = req.body;
        mInstant.dbinsert(dburl, "schedule_collection", schedule_collection_json, function(){
           res.send("done");
           // res.statusCode = 404;
            //res.send("failed");
        });
    };

    routs['/customer_collection'] = function(req, res){
        var customer_collection_json = req.body;
        mInstant.dbinsert(dburl, "customer_collection", customer_collection_json, function(){
            res.send("done");
          //  res.statusCode = 404;
           // res.send("failed");
        });
    };
    routs['/airport_collection'] = function(req, res){
        var airport_collection_json = req.body;
        mInstant.dbinsert(dburl, "airport_collection", airport_collection_json, function(){
            res.send("done");
           // res.statusCode = 404;
           // res.send("failed");
        });
    };
    routs['/seats_collection'] = function(req, res){
        var seats_collection_json = req.body;
        mInstant.dbinsert(dburl, "seats_collection", seats_collection_json, function(){
            res.send("done");
           // res.statusCode = 404;
           // res.send("failed");
        });
    };
    routs['/ticket_collection'] = function(req, res){
        var ticket_collection_json = req.body;
        mInstant.dbinsert(dburl, "ticket_collection", ticket_collection_json, function(){
            res.send("done");
            //res.statusCode = 404;
            //res.send("failed");
        });
    };


    return routs;

};
module.exports.ServerRouts = ServerRouts;