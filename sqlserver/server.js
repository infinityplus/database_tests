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
        //server.routes = routs.ServerRouts();
        server.postRoutConfig = serverConfigurations.postRoutsConfig;
        var postRoutFileName = server.postRoutConfig["filename"];
        var postRoutCallFunction = server.postRoutConfig["function"];
        postRoutsFileImport = require('./'+postRoutFileName);
        switch (postRoutCallFunction){
            case "MongoPostRoutsNoVal":
                server.postRouts = postRoutsFileImport.MongoPostRoutsNoVal();
                break;
            case "MongoPostRoutsWithVal":
                server.postRouts = postRoutsFileImport.MonogPostRoutsWithVal();
                break;
            case "MsqlPostRoutsNoVal":
                server.postRouts = postRoutsFileImport.MsqlPostRoutsNoVal();
                break;
            default :
                server.postRouts = {};
        }

    };

    server.initializeServer = function(){

        server.createRoutes();
        server.application = express();
        server.application.use(bodyParser.json());
        for(var rout in server.postRouts){
            server.application.post(rout, server.postRouts[rout]);
        }
       /* for (var r in server.routes) {
            server.application.get(r, server.routes[r]);
            server.application.post(r, server.routes[r]);
        }*/


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
