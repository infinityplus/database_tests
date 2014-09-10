/**
 * Created by sasitha on 8/27/14.
 */

var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var MongoTestP2_Table1_1 = function(){
    var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
    var routs = {};

    routs['/phase_2_TableMap_1_1_write'] = function(req, res){
        var flights_collection_json = req.body['flight_collection'];
        var schedule_collection_json = req.body['schedule_collection'];
        var requestId = schedule_collection_json['id'], databaseId;
        var validate = {
            "id":requestId
        };
        mInstant.dbinsert(dburl, "flights_collection", flights_collection_json, function(error){
            if(!error){
                mInstant.dbreadone(dburl, 'flights_collection', validate, function(data){
                    databaseId = data['id'];
                    if(requestId === databaseId){
                        mInstant.dbinsert(dburl, 'schedule_collection', schedule_collection_json, function(error){
                            if(!error){
                                res.statusCode = 200;
                                res.send("data inserted successfully");
                            }else{
                                res.statusCode = 404;
                                res.send("error");
                            }
                        })
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
    routs['/phase_2_TableMap_1_1_read'] = function(req, res){
        var query_request_json = req.body;
        var flight_collection_query  ={
          "id":query_request_json['id']
        };
        mInstant.dbreadone(dburl, "flights_collection", flight_collection_query, function(data){
            //console.log(data);
            if(data !== null){
                var schedule_collection_query = {
                    "id":data['id']
                };
                mInstant.dbreadone(dburl, "schedule_collection", schedule_collection_query, function(data){
                    //console.log(data);
                    res.statusCode = 200;
                    res.json(data);
                });
            }else{
                res.statusCode = 200;
                res.send("data not found");
            }

        });

    };
    routs['/phase_2_TableMap_1_1_update'] = function(req, res){
        var flights_collection_json = req.body['flight_collection'];
        var schedule_collection_json = req.body['schedule_collection'];

        var flight_collection_query = {
            "id":flights_collection_json['id']
        };
        mInstant.dbreadone(dburl, "flights_collection", flight_collection_query, function(data){
            if(data !== null){
                var schedule_collection_query = {
                    "id":data['id']
                };
                mInstant.dbupdate(dburl, "schedule_collection", schedule_collection_query, schedule_collection_json, function(){
                    res.statusCode = 200;
                    res.send("update successful");
                })
            }
        });

    };
/*    routs['/one_to_one_table_1-1'] = function(req, res){
        var one_to_one_table_1 = req.body['one_to_one_table_1'];
        mInstant.dbinsert(dburl, "one_to_one_table_1", one_to_one_table_1, function(){

            var one_to_one_table_2 = req.body['one_to_one_table_2'];
            var requestId, databaseId;
            requestId = one_to_one_table_2["id"];
            var validate = {
                "id":requestId
            };
            mInstant.dbreadone(dburl, 'one_to_one_table_1', validate, function(data){
                //console.log(data);
                databaseId = data['id'];
                if(requestId === databaseId){
                    mInstant.dbinsert(dburl, 'one_to_one_table_2', one_to_one_table_2, function(){
                        //console.log(data);
                        res.statusCode = 200;
                        res.send("data inserted successfully");
                    });
                }else{
                    res.statusCode = 404;
                    res.send("id not found error");
                }

            });
        });

    };*/
/*    routs['/one_to_one_table_2'] = function(req, res){

        *//*  requests id should be matched with the table one id. If it matched then only enter value to second table.
            else do not enter.
         *//*
        var one_to_one_table_2 = req.body;
        var requestId, databaseId;
        requestId = one_to_one_table_2["id"];
        var validate = {
            "id":requestId
        };
        mInstant.dbreadone(dburl, 'flights_collection', validate, function(data){
            //console.log(data);
            databaseId = data['id'];
            if(requestId === databaseId){
                mInstant.dbinsert(dburl, 'one_to_one_table_2', one_to_one_table_2, function(){
                    //console.log(data);
                    res.statusCode = 200;
                    res.send("data inserted successfully");
                });
            }else{
                res.statusCode = 404;
                res.send("id not found error");
            }

        });
    };*/
    return routs;
    // "database_test_phase_2"
};
module.exports.MongoTestP2_Table1_1 = MongoTestP2_Table1_1;
