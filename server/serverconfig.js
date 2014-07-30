/**
 * Created by sasitha on 7/21/14.
 */


var serverIpAddress = "127.0.0.1";
var serverOperatingPort = "3000";
var serverConnectedDatabase = "air_ticket_model";

var postRouts = require('./mongoPostRoutsWithVal');
var postRoutsConfig = {"filename":"mongoPostRoutsWithVal", "function":"MongoPostRoutsWithVal"};

module.exports.serverIpAddress = serverIpAddress;
module.exports.serverOperatingPort = serverOperatingPort;
module.exports.serverConnectedDatabase = serverConnectedDatabase;
module.exports.postRouts  = postRouts;
module.exports.postRoutsConfig = postRoutsConfig;