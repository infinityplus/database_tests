var mInstant = require('./msqldb');
var url = require( "url" );
var queryString = require( "querystring" );
var MsqlPostRoutsNoVal = function(){

    var routs = {};
    routs['/flights_collection'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table = "Flight";

          mInstant.dbinsert(table,flights_collection_json, function(status,err){
            if(status){
                res.statusCode = 200;
                res.send("done");
            }else{
                res.statusCode = 400;
                res.send(err);
            }
        });

    };
	
	routs['/flights_collection_get'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table = "Flight";

          mInstant.dbread(table,flights_collection_json, function(status,err){
            if(status){
                res.statusCode = 200;
                res.send("done");
            }else{
                res.statusCode = 400;
                res.send(err);
            }
        });

    };
    
    routs['/flights_collection_update'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table = "Flight";

          mInstant.dbupdate(table,flights_collection_json, function(status,err){
            if(status){
                res.statusCode = 200;
                res.send("done");
            }else{
                res.statusCode = 400;
                res.send(err);
            }
        });

    };
    
	/*
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