var mongoInstant = "";
//var msqlClient = require('mysql');
// function getConn(){
	// var conn = msqlClient.createConnection({
		// host : 'localhost',
	  	// user : 'root',
	  	// password: 'root'
	// });
	// return conn;
// }

var mysql =  require('mysql');                  
var pool =  mysql.createPool({
host : 'localhost',
user : 'root',
password: 'root'
});	

module.exports = {
	dbinsert : function(table,json, callback){
		
		var inquery = 'INSERT INTO AirLine.'.concat(table,' SET ?');
      
        pool.getConnection(function(err, connection){
  			connection.query(inquery, json, function(err, rows){
  				if(err)	{
  					callback(false, err);
  				}else{
  					callback(true, "no");
  				}
  			});
  		connection.release();
		});
    }	
};
/*
module.exports = {

  dbconnect: function(){
      MongoClient.connect('mongodb://127.0.0.1:27017/test', function(error, db){
          if(!error){
              mongoInstant = db;
              console.log("connected to the db");
          }
      });
  },

  dbinsert :function(dburl,collection_name, json, callback){
      MongoClient.connect(dburl, function(error, db){
          if (!error) {
              var collection = db.collection(collection_name);
              collection.insert(json, function (err, docs) {
                  collection.count(function (err, count) {
                      db.close();
                      callback();
                  });
              });

          }
      });
  }
};
*/

//host : 'localhost', user :'root', password : 'root' 