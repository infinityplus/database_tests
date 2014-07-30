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
               mInstant.dbinsert(dburl, "flights_collection", flights_collection_json, function(){
                   res.statusCode = 200;
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
                mInstant.dbinsert(dburl, "schedule_collection", schedule_collection_json, function(){
                    res.statusCode = 200;
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
        validation.customer_collection_validation(customer_collection_json, function(status, message){
            if(status){
                mInstant.dbinsert(dburl, "customer_collection", customer_collection_json, function(){
                    res.statusCode = 200;
                    res.send("data inserted successfully ");
                })
            }else{
                req.statusCode = 404;
                res.send(message);
            }
        });
    };
    routs['/airport_collection'] = function(req, res){
        var airport_collection_json = req.body;
        validation.airport_collection_validation(airport_collection_json, function(status, message){
            if(status){
                mInstant.dbinsert(dburl, "airport_collection", airport_collection_json, function(){
                    res.statusCode = 200;
                    res.send("Data inserted successfully ")
                });
            }else{
                req.statusCode = 404;
                res.send(message);
            }
        });
    };
    routs['/seats_collection'] = function(req, res){
        var seats_collection_json = req.body;
        validation.seats_collection_validation(seats_collection_json, function(status, message){
            if(status){
                mInstant.dbinsert(dburl, "seats_collection", seats_collection_json, function(){
                    res.statusCode = 200;
                    res.send("Data inserted successfully ");
                })
            }else{
                res.statusCode = 200;
                res.send(message);
            }
        });
    };
    routs['/ticket_collection'] = function(req, res){
        var ticket_collection_json = req.body;
        validation.ticket_collection_validation(ticket_collection_json, function(status, message){
            if(status){
                mInstant.dbinsert(dburl, "ticket_collection", ticket_collection_json, function(){
                    res.statusCode = 200;
                    res.send("Data inserted successfully ");
                })
            }else{
                res.statusCode = 200;
                res.send(message);
            }
        });
    };
    return routs;
};
module.exports.MongoPostRoutsWithVal = MongoPostRoutsWithVal;