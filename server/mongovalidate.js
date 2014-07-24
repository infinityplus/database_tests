/**
 * Created by sasitha on 7/23/14.
 */

var MongoClient = require('mongodb').MongoClient;
var mongoInstant = "";
var reg_numbers = /^\d+$/;
module.exports = {

    flight_collection_validate: function(json, callback){
        var message = "NULL";
        if(reg_numbers.test(json.id)){
            if(reg_numbers.test(json.code)){
                if(json.status == 'working' || json.status == "grounded"){
                    if(json.code != null){
                        if(reg_numbers.test(json.belongsto.group_id)){
                            message = "successfully added ";
                            callback(true,message);
                        }else{
                            message = "error5";
                            callback(false,message);
                        }

                    }else{
                        message = "error4";
                        callback(false,message);
                    }

                }else{
                    message = "error3";
                    callback(false,message);
                }
            }else{
                message = "error2";
                callback(false,message);
            }
        }else{
            message = "error1";
            callback(false,message);
        }
    }

};