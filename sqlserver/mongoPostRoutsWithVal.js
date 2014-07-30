/**
 * Created by sasitha on 7/20/14.
 */
var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var validation = require('./mongovalidate');
var MongoPostRoutsWithVal = function(){
    var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
    var routs = {};
    routs['/flights_collection'] = function(req, res){
        var flights_collection_json = req.body;
        validation.flight_collection_validate(flights_collection_json, function(status, message){
           if(status){
               res.statusCode = 200;
               mInstant.dbinsert(dburl, "flights_collection", flights_collection_json, function(){
                   res.send("data inserted successfully ");
               });
           }else{
               res.statusCode = 404;
               res.send(message);

           }
        });

    };
    routs['/schedule_collection'] = function(req, res){
        var schedule_collection_json = req.body;
        validation.schedule_collection_validation(schedule_collection_json, function(status, message){
            if(status){
                res.statusCode = 200;
                mInstant.dbinsert(dburl, "flights_collection", schedule_collection_json, function(){
                    res.send("data inserted successfully ");
                });
            }else{
                res.statusCode = 404;
                res.send(message);

            }
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
module.exports.MongoPostRoutsWithVal = MongoPostRoutsWithVal;