var mongoInstant = "";
var msqlClient = require('mysql');
function getConn(){
	var conn = msqlClient.createConnection({
		host : 'localhost',
	  	user : 'root',
	  	password: 'root'
	});
	return conn;
}

module.exports = {
	dbinsert : function(table,json, callback){
		var connection = getConn();
        connection.query('INSERT INTO test.customer SET ?', json, function(err, result) {
            if(err){
                callback(false,err);
            }else{
            	connection.end();
                callback(true,err);
            }
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