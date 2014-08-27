var express = require("express");
var bodyParser = require('body-parser');
var fs      = require('fs');
//var routs = require('./routs_with_validation');
var postRoutsFileImport = "";
var serverConfigurations = require('./serverconfig');
var sampleServer = function(){

    var server = this;


    server.setupVariables = function(ipAddress, port){

        server.ipaddress = ipAddress;
        server.port = port;

        console.log("setting up server variables..........");
        console.log("server Ip Address : " + ipAddress);
        console.log("server Port : " + port);
    };

    server.terminatior = function(signal){

        if(typeof signal === "string"){
            console.log('%s: Received %s - terminating server ...',
                Date(Date.now()), signal);
        }
        console.log("server scoped ......");
    };

    server.populateCache = function() {
        if (typeof server.zcache === "undefined") {
            server.zcache = { 'index.html': '' };
        }
        server.zcache['index.html'] = fs.readFileSync('index.html');
    };

    server.cache_get = function(key) {
        return server.zcache[key];
    };


    server.createRoutes = function(){
        console.log("loading routs.....");
        //server.routes = routs.ServerRouts();
        server.postRoutConfig = serverConfigurations.postRoutsConfig;
        var postRoutFileName = server.postRoutConfig["filename"];
        var postRoutCallFunction = server.postRoutConfig["function"];
        postRoutsFileImport = require('./'+postRoutFileName);
        switch (postRoutCallFunction){
            case "MongoPostRoutsNoVal":
                server.postRouts = postRoutsFileImport.MongoPostRoutsNoVal();
                console.log("Loading mongodb routs without validations..........");
                break;
            case "MongoPostRoutsWithVal":
                console.log("Loading mongodb routs with validations..........");
                server.postRouts = postRoutsFileImport.MongoPostRoutsWithVal();
                break;
            case "MysqlPostRoutsNoVal":
                console.log("Loading mysql routs with out validation");
                server.postRouts = postRoutsFileImport.MysqlPostRoutsNoVal();
                break;
            case "MongoTestP2Table1":
                console.log("Loading test phase 2 one table ..........");
                server.postRouts = postRoutsFileImport.MongoTestP2Table1();
                break;
            case "MongoTestP2_Table1_1":
                console.log("Loading test phase 2 one to one relationship ..........");
                server.postRouts = postRoutsFileImport.MongoTestP2_Table1_1();
                break;
            default :
                server.postRouts = {};
                console.log("Loading default routs....... Check your routs before using the server....");
                break;
        }

    };

    server.initializeServer = function(){

        server.createRoutes();
        server.application = express();
        server.application.use(bodyParser.json());
        for(var rout in server.postRouts){
            server.application.post(rout, server.postRouts[rout]);
        }


    };

    server.initialize = function(){
        var ip = serverConfigurations.serverIpAddress;
        var port = serverConfigurations.serverOperatingPort;
        server.setupVariables(ip, port);
        server.populateCache();
        server.initializeServer();
    };

    server.start = function(){

        if(server.port && server.ipaddress){
            server.application.listen(server.port, server.ipaddress, function(){
                console.log("server starts.......");
            });
        }else{
            console.log("initialization failed.............");
        }

    };

};


var dbserver = new sampleServer();
dbserver.initialize();
dbserver.start();

