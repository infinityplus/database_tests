/**
 * Created by sasitha on 7/20/14.
 */
var mInstant = require('./msqldb');
var url = require( "url" );
var queryString = require( "querystring" );
var MsqlPostRoutsNoVal = function(){
//var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
    var routs = {};
    routs['/flights_collection'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];

/*
        for(var id in flights_collection_json){
            flights_table_data[id] = flights_collection_json[id]; // get only what neceary
        }
        for(var k in flights_table_data){
        	console.log(flights_table_data[k]);
        }*/

        //res.send("done");
          mInstant.dbinsert(flights_collection_json, function(status,err){
            if(status){
                console.log("data inserted sucessfully");
                res.statusCode = 200;
                res.send("done");
            }else{
                console.log("data not enterd");
                console.log(err);
                res.statusCode = 400;
                res.send("error");
            }
        });

    };

    /*
    routs['/schedule_collection'] = function(req, res){
        var schedule_collection_json = req.body;
        mInstant.dbinsert(dburl, "schedule_collection", schedule_collection_json, function(){
            res.send("done");
        });
    };

    routs['/customer_collection'] = function(req, res){
        var customer_collection_json = req.body;
        mInstant.dbinsert(dburl, "customer_collection", customer_collection_json, function(){
            res.send("done");
        });
    };
    routs['/airport_collection'] = function(req, res){
        var airport_collection_json = req.body;
        mInstant.dbinsert(dburl, "airport_collection", airport_collection_json, function(){
            res.send("done");
        });
    };
    routs['/seats_collection'] = function(req, res){
        var seats_collection_json = req.body;
        mInstant.dbinsert(dburl, "seats_collection", seats_collection_json, function(){
            res.send("done");
        });
    };
    routs['/ticket_collection'] = function(req, res){
        var ticket_collection_json = req.body;
        mInstant.dbinsert(dburl, "ticket_collection", ticket_collection_json, function(){
            res.send("done");
        });
    };*/
    return routs;

};
module.exports.MsqlPostRoutsNoVal = MsqlPostRoutsNoVal;