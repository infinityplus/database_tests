/**
 * Created by sasitha on 7/23/14.
 */

var reg_numbers = /^\d+$/;
var reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
                            message = "Data validation error no passengers found";
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
    },

    customer_collection_validation : function(json, callback){
        var message = "NULL";
        if(reg_numbers.test( json["id"])){
            if(reg_email.test(json["email"])){
                if(json["name"]["first_name"] !== null && json["name"]["second_name"] !== null){
                    if(json["tickets"]!== null){
                         message = "Data validation successful";
                         callback(true, message);
                    }else{
                        message = "Data validation error no tickets found.";
                        callback(false, message);
                    }
                }else{
                    message = "Data validation error no name found.";
                    callback(false, message);
                }
            }else{
                message = "Data validation error no email address found or email address is not valid.";
                callback(false, message);
            }
        }else{
            message = "Data validation error no ID entry found in the document";
            callback(false,message);
        }
    },

    airport_collection_validation : function(json, callback){
        var message = "NULL";
        if(reg_numbers.test(json["id"])){
            if(json["name"] !== null){
                if(json["city"] !== null){
                    if(json["country"] !== null){
                        message = "Data validation successful";
                         callback(true, message);
                    }else{
                        message = "Data validation error no country name found";
                        callback(false, message);
                    }
                }else{
                    message = "Data validation error no city name found.";
                    callback(false, message);
                }
            }else{
                message = "Data validation error no airport name found.";
                callback(false,message);
            }
        }else{
            message = "Data validation error no ID entry found in the document";
            callback(false, message);
        }
    },

    seats_collection_validation : function(json, callback){
        var message = "NULL";
        if(reg_numbers.test(json["id"])){
            if(json["status"] === "vacant" || json["status"] === "filled"){
                if(reg_numbers.test(json["class"]["id"])){
                    if(json["class"]["type"] === "economy" || json["class"]["type"] === "busyness"){
                        if(json["reserved"] === "NaN"){
                             message = "Data validation successful";
                             callback(true, message);
                        }else{
                            message = "Data validation error invalid reservation";
                            callback(false, message);
                        }
                    }else{
                        message = "Data validation error no seat type found.";
                        callback(false,message);
                    }
                }else{
                    message = "Data validation error no class id found";
                    callback(false, message);
                }
            }else{
                message = "Data validation error no status found or incorrect status found.";
                callback(false, message);
            }
        }else{
            message = "Data validation error no ID entry found in the document";
            callback(false, message);
        }
    },

    ticket_collection_validation : function(json, callback){
        var message = "NULL";
        if(reg_numbers.test(json["id"])){
            if(reg_numbers.test(json["belongs_to"])){
                if(reg_numbers.test(json["sheduled_for"])){
                    if(reg_numbers.test(json["owndto"])){
                        message = "Data validation successful";
                         callback(true, message);
                    }else{
                        message = "Data validation error";
                        callback(false, message);
                    }
                }else{
                    message = "Data validation error";
                    callback(false, message);
                }
            }else{
                message = "Data validation error ";
                callback(false, message);
            }
        }else{
            message = "Data validation error no ID entry found in the document";
            callback(false, message);
        }
    }
};