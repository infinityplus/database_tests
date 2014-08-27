/**
 * Created by sasitha on 8/27/14.
 */

var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var MongoTestP2_Table1_1 = function(){
    var dburl = 'mongodb://127.0.0.1:27017/database_test_phase_2';
    var routs = {};
    routs['/one_to_one_table_1'] = function(req, res){
        /*
            insert the value for the collection one
         */
        var one_to_one_table_1 = req.body;
        mInstant.dbinsert(dburl, "one_to_one_table_1", one_to_one_table_1, function(){
            res.statusCode = 200;
            res.send("data inserted successfully");
        });

    };
    routs['/one_to_one_table_2'] = function(req, res){
        /*
            requests id should be matched with the table one id. If it matched then only enter value to second table.
            else do not enter.
         */
        var one_to_one_table_2 = req.body;
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
                res.statusCode = 200;
                res.send("id not found error");
            }

        });
    };
    return routs;
    // "database_test_phase_2"
};
module.exports.MongoTestP2_Table1_1 = MongoTestP2_Table1_1;
