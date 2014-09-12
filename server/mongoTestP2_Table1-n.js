/**
 * Created by sasitha on 9/2/14.
 */


var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var MongoTestP2_Table1_n = function() {
    var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
    var routs = {};

    routs['/phase_2_TableMap_1_n_write'] = function(req, res){
        var flights_collection_json = req.body['flight_collection'];
        var schedule_collection_json = req.body['schedule_collection'];
        var customer_collection_json = req.body['customer_collection'];
        var flightId = schedule_collection_json['flight_id'], databaseId;
        var validate = {
            "id":flightId
        };
        mInstant.dbinsert(dburl, "flights_collection", flights_collection_json, function(error){
            if(!error){

                mInstant.dbreadone(dburl, 'flights_collection', validate, function(data){
                    databaseId = data['id'];
                    if(flightId === databaseId){
                        mInstant.dbinsert(dburl, 'schedule_collection', schedule_collection_json, function(error){
                            if(!error){
                                mInstant.dbinsert(dburl, 'customer_collection', customer_collection_json , function(error){
                                    if(!error){
                                        res.statusCode = 200;
                                        res.send("data inserted successfully");
                                    }else{
                                        res.statusCode = 404;
                                        res.send("error");
                                    }
                                })

                            }else{

                            }
                        });

                    }else{
                        res.statusCode = 404;
                        res.send("error");
                    }
                });
            }else{
                res.statusCode = 404;
                res.send("error");
            }
        });
    };
    routs['/phase_2_TableMap_1_n_read'] = function(req, res){
        var query_request_json = req.body;
        var flight_collection_query  ={
            "id":query_request_json['id']
        };
        mInstant.dbreadone(dburl, "flights_collection", flight_collection_query, function(data){
            //console.log(data);
            if(data !== null){
                var schedule_collection_query = {
                    "flight_id":data['id']
                };
                var customer_collection_query = {
                    "flight_id":data['id']
                };
                var results = {};
                results["flights_collection"] = data;
                mInstant.dbreadone(dburl, "schedule_collection", schedule_collection_query, function(shedule_data){
                    results["schedule_collection"] = shedule_data;
                    mInstant.dbreadone(dburl, "customer_collection", customer_collection_query, function(customer_data){
                        results["customer_collection"] = customer_data;
                        res.statusCode = 200;
                        res.json(results);
                    });

                });
            }else{
                res.statusCode = 200;
                res.send("data not found");
            }

        });
    };
    routs['/phase_2_TableMap_1_n_update'] = function(req, res){
        var flights_collection_json = req.body['flight_collection'];
        var schedule_collection_json = req.body['schedule_collection'];
        var customer_collection_json = req.body['customer_collection'];

        var flight_collection_query = {
            "id":flights_collection_json['id']
        };
        mInstant.dbreadone(dburl, "flights_collection", flight_collection_query, function(data){
            if(data !== null){
                var schedule_collection_query = {
                    "flight_id":data['id']
                };
                var customer_collection_query = {
                    "flight_id":data['id']
                };
                mInstant.dbupdate(dburl, "schedule_collection", schedule_collection_query, schedule_collection_json, function(){
                    mInstant.dbupdate(dburl, "customer_collection", customer_collection_query, customer_collection_json, function(){
                        res.statusCode = 200;
                        res.send("update successful");
                    });

                })
            }
        });

    };
    return routs;

};
module.exports.MongoTestP2_Table1_n = MongoTestP2_Table1_n;