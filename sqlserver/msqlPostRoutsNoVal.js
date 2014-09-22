var mInstant = require('./msqldb');
var url = require( "url" );
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
    
    routs['/flights_onetoonewrite'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table1 = "Shedule";
       var table2 = "Flight";

          mInstant.dbonetoonewrite(table1,table2,flights_collection_json, function(status,err){
            if(status){
                res.statusCode = 200;
                res.send("done");
            }else{
                res.statusCode = 400;
                res.send(err);
            }
        });

    };
    
    routs['/flights_onetooneread'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table1 = "Shedule";
       var table2 = "Flight";

          mInstant.dbonetooneread(table1,table2,flights_collection_json, function(status,err){
            if(status){
                res.statusCode = 200;
                res.send("done");
            }else{
                res.statusCode = 400;
                res.send(err);
            }
        });

    };

    routs['/flights_onetooneupdate'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table1 = "Shedule";
       var table2 = "Flight";

       mInstant.dbonetooneupdate(table1,table2,flights_collection_json, function(status,err){
           if(status){
               res.statusCode = 200;
               res.send("done");
           }else{
               res.statusCode = 400;
               res.send(err);
           }
       });

    };
    
    routs['/flights_onetomanywrite'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table1 = "Shedule";
       var table2 = "Flight";
       var table3 = "Ticket";
	   //console.log(flights_collection_json);
       mInstant.dbonetomanywrite(table1,table2,table3,flights_collection_json, function(status,err){
           if(status){
               res.statusCode = 200;
               res.send("done");
           }else{
               res.statusCode = 400;
               res.send(err);
           }
       });

    };
    
    routs['/flights_onetomanyread'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table1 = "Shedule";
       var table2 = "Flight";
       var table3 = "Ticket";
	   //console.log(flights_collection_json);
       mInstant.dbonetomanyread(table1,table2,table3,flights_collection_json, function(status,err){
           if(status){
               res.statusCode = 200;
               res.send("done");
           }else{
               res.statusCode = 400;
               res.send(err);
           }
       });

    };
    
    routs['/flights_onetomanyupdate'] = function(req, res){
       var flights_collection_json = req.body;
       var flights_table_data = [];
       var table1 = "Shedule";
       var table2 = "Flight";
       var table3 = "Ticket";
	   //console.log(flights_collection_json);
       mInstant.dbonetomanyupdate(table1,table2,table3,flights_collection_json, function(status,err){
           if(status){
               res.statusCode = 200;
               res.send("done");
           }else{
               res.statusCode = 400;
               res.send(err);
           }
       });

    };
    
    return routs;

};
module.exports.MsqlPostRoutsNoVal = MsqlPostRoutsNoVal;