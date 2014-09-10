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
    },	
    /*UPDATE Customers
		SET ContactName='Alfred Schmidt', City='Hamburg'
		WHERE CustomerName='Alfreds Futterkiste'; 
     * 
     * 
     */
    dbread : function(table,json, callback){
		
		var inquery = 'SELECT * FROM AirLine.'.concat(table,' WHERE Id = ?');
      	
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
    },
    
    dbupdate : function(table,json, callback){
		
		var inquery = 'UPDATE AirLine.'.concat(table,' SET '.concat('GroupId=',json.GroupId).concat(', Status=',json.Status).concat(' WHERE Id=',json.Id));
      
        pool.getConnection(function(err, connection){
  			connection.query(inquery, function(err, rows){
  				if(err)	{
  					callback(false, err);
  				}else{
  					callback(true, "no");
  				}
  			});
  		connection.release();
		});
    },
    
    dbonetoonewrite : function(table1,table2,json, callback){
		
		//var inquery = 'UPDATE AirLine.'.concat(table,' SET '.concat('GroupId=',json.GroupId).concat(', Status=',json.Status).concat(' WHERE Id=',json.Id));
      	var inquery1 = 'INSERT INTO AirLine.'.concat(table2,' VALUES ').concat(json.sId,' , ').concat(json.Type,' , ').concat(json.sDate,' , ').concat( json.Time,' , ').concat(json.Status,' , ').concat(json.Departure,' , ').concat(json.Arrive);
        console.log(inquery1);
        pool.getConnection(function(err, connection){
  			connection.query(inquery1, function(err, rows){
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