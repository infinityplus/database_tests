/**
 * Created by sasitha on 7/20/14.
 */
var mInstant = require('./mongodb');
var url = require( "url" );
var queryString = require( "querystring" );
var ServerRouts = function(){
var dburl = 'mongodb://127.0.0.1:27017/air_ticket_model';
  var routs = {};
    routs['/'] = function(req, res){
        var json = req.body;
        mInstant.dbinsert(dburl, "flights_collection", json, function(){
            res.send("done");
        });

    };
    routs['/:id'] = function(req, res){
        res.send("");
    };

    return routs;

};
module.exports.ServerRouts = ServerRouts;