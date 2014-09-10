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
    return routs;

};
module.exports.MongoTestP2_Table1_n = MongoTestP2_Table1_n;