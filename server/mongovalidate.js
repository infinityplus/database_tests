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
                            message = "Data validation successful ";
                            callback(true,message);
                        }else{
                            message = "Data validation error GROUP ID not found";
                            callback(false,message);
                        }

                    }else{
                        message = "error4";
                        callback(false,message);
                    }

                }else{
                    message = "Data validation error no STATUS entry found or an invalid STATUS entry found.";
                    callback(false,message);
                }
            }else{
                message = "Data validation error no CODE entry found in the document";
                callback(false,message);
            }
        }else{
            message = "Data validation error no ID entry found in the document.";
            callback(false,message);
        }
    }

};