/**
 * Created by sasitha on 7/23/14.
 */

var MongoClient = require('mongodb').MongoClient;
var mongoInstant = "";
var reg_numbers = /^\d+$/;
module.exports = {

    flight_collection_validate: function(json, callback){
        var message = "NULL";
        if(reg_numbers.test(json["id"])){
            if(reg_numbers.test(json["code"]) && json["code"] !== null){
                if(json["status"] == 'flying' || json["status"] == "grounded"){
                    if(reg_numbers.test(json["belongsto"]["group_id"])){
                        if(json["belongsto"]["passengers"] !== null){
                            message = "Data validation successful ";
                            callback(true,message);
                        }else{
                            message = "Data validation error no passengers found"
                            callback(false, message);
                        }
                    }else{
                        message = "Data validation error GROUP ID not found";
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
    },

    schedule_collection_validation: function(json, callback){
        var message = "NULL";
        if(reg_numbers.test(json["id"])){
            if(json["type"] !== null){
                if(json["date"] !== null){
                    if(json["status"] == "On Shedule"){
                        if(json["time"]["departure"] !== null){
                            if(json["time"]["arrival"] !== null){
                                if(json["departure_airport"] !== null){
                                    if(json["arraival_airport"] !== null){
                                        if(json["tickets"] !== null){
                                            message = "Data validation successful";
                                            callback(true, message);
                                        }else{
                                            message = "Data validation error no tickets found in the document.";
                                            callback(false, message);
                                        }
                                    }else{
                                        message = "Data vlidation error no arraival airport found.";
                                        callback(false, message);
                                    }
                                }else{
                                    message = "Data validation error no departure air port found";
                                    callback(false, message);
                                }
                            }else{
                                message = "Data validation error no arrival time is found.";
                                callback(false, message);
                            }
                        }else{
                            message = "Data validation error no departure time is found.";
                            callback(false, message);
                        }
                    }else{
                        message = "Data validation error no status found or status is invalid.";
                        callback(false, message);
                    }
                }else{
                    message = "Data validation error no date found in the document.";
                    callback(false, message);
                }
            }else{
                message = "Data validation error no type entry found in the document.";
                callback(false, message);
            }
        }else{
            message = "Data validation error no ID entry found in the document.";
            callback(false, message);
        }
    }

};