/**
 * Created by sasitha on 7/21/14.
 */


var serverIpAddress = "127.0.0.1";
var serverOperatingPort = "3000";
var serverConnectedDatabase = "database_test_phase_2";

var postRouts = require('./mongoTestP2_Table1-n');
var postRoutsConfig = {"filename":"mongoTestP2_Table1-n", "function":"MongoTestP2_Table1_n"};

module.exports.serverIpAddress = serverIpAddress;
module.exports.serverOperatingPort = serverOperatingPort;
module.exports.serverConnectedDatabase = serverConnectedDatabase;
module.exports.postRouts  = postRouts;
module.exports.postRoutsConfig = postRoutsConfig;