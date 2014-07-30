/**
 * Created by sasitha on 7/21/14.
 */


var serverIpAddress = "127.0.0.1";
var serverOperatingPort = "3000";
var serverConnectedDatabase = "test";

var postRouts = require('./msqlPostRoutsNoVal');
var postRoutsConfig = {"filename":"msqlPostRoutsNoVal", "function":"MsqlPostRoutsNoVal"};

module.exports.serverIpAddress = serverIpAddress;
module.exports.serverOperatingPort = serverOperatingPort;
module.exports.serverConnectedDatabase = serverConnectedDatabase;
module.exports.postRouts  = postRouts;
module.exports.postRoutsConfig = postRoutsConfig;