
var mysql =  require('mysql');                  
var pool =  mysql.createPool({
host : 'localhost',
user : 'root',
password: 'root'
});	

module.exports = {
	dbinsert : function(table,json, callback){
		
		var inquery = 'INSERT INTO AirLine.'.concat(table,' VALUES (').concat(json.Id,' , ').concat(json.GroupId,' , ').concat(json.Status,' , ').concat( json.SheduleId,' , ').concat(json.code,')');
      
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
    /*UPDATE Customers
		SET ContactName='Alfred Schmidt', City='Hamburg'
		WHERE CustomerName='Alfreds Futterkiste'; 
     * 
     * 
     */
    dbread : function(table,json, callback){
		
		var inquery = 'SELECT * FROM AirLine.'.concat(table,' WHERE Id = ').concat(json.Id);
      	
        pool.getConnection(function(err, connection){
  			connection.query(inquery , function(err, rows){
  				//console.log(inquery);
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
		
      	var inquery1 = 'INSERT INTO AirLine.'.concat(table1,' VALUES (').concat(json.s.Id,' , ').concat(json.s.Type,' , ').concat(json.s.Date,' , ').concat( json.s.Time,' , ').concat(json.s.Status,' , ').concat(json.s.Departure,' , ').concat(json.s.Arrive,')');
       
        var inquery2 = 'INSERT INTO AirLine.'.concat(table2,' VALUES (').concat(json.f.Id,' , ').concat(json.f.GroupId,' , ').concat(json.f.Status,' , ').concat( json.f.SheduleId,' , ').concat(json.f.code,')');
        //
        pool.getConnection(function(err, connection){
  			connection.query(inquery1, function(err, rows){
  				if(err)	{
  					callback(false, err);
  				}else{
  					connection.query(inquery2, function(err, rows){
  						if(err)	{
  							callback(false, err);
  						}else{
  							callback(true, "no");
  						}
  					});
  					
  				}
  			});
  			
  		connection.release();
		});
    },
    
    dbonetooneread : function(table1,table2,json, callback){
		
		var inquery2 = 'SELECT Id FROM AirLine.'.concat(table1,' WHERE Id= ').concat(json.s.Id);
		
      	var inquery1 = 'SELECT * FROM AirLine.'.concat(table2,' WHERE SheduleId= (').concat(inquery2,')');
       
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
    },
    
    dbonetooneupdate : function(table1,table2,json, callback){
		
		var inquery2 = 'SELECT Id FROM AirLine.'.concat(table1,' WHERE Id= ').concat(json.s.Id);
		
      	var inquery1 = 'UPDATE AirLine.'.concat(table2,' SET ').concat('GroupId=',json.f.GroupId).concat(' , Code=',json.f.Code).concat(' WHERE SheduleId= (').concat(inquery2,')');

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
    },		
    
    dbonetomanywrite : function(table1,table2,table3,json, callback){
		
		var inquery1 = 'INSERT INTO AirLine.'.concat(table1,' VALUES (').concat(json.s.Id,' , ').concat(json.s.Type,' , ').concat(json.s.Date,' , ').concat( json.s.Time,' , ').concat(json.s.Status,' , ').concat(json.s.Departure,' , ').concat(json.s.Arrive,')');
       
        var inquery2 = 'INSERT INTO AirLine.'.concat(table2,' VALUES (').concat(json.f.Id,' , ').concat(json.f.GroupId,' , ').concat(json.f.Status,' , ').concat( json.f.SheduleId,' , ').concat(json.f.code,')');
        
        var inquery3 = 'INSERT INTO AirLine.'.concat(table3,' VALUES (').concat(json.t.Id,' , ').concat(json.t.SheduleId,' , ').concat(json.t.SeatId,' , ').concat( json.t.CustId,' , ').concat(json.t.Price,')');
        //
        pool.getConnection(function(err, connection){
  			connection.query(inquery1, function(err, rows){
  				if(err)	{
  					callback(false, err);
  				}else{
  					connection.query(inquery2, function(err, rows){
  						if(err)	{
  							callback(false, err);
  						}else{
  							connection.query(inquery3, function(err, rows){
  								if(err)	{
  									callback(false, err);
  								}else{
  									callback(true, "no");
  								}
  							});
  						}
  					});
  				}
  			});
  			
  		connection.release();
		});
    },
    
    dbonetomanyread : function(table1,table2,table3,json, callback){
		
		var inquery2 = 'SELECT Id FROM AirLine.'.concat(table1,' WHERE Id= ').concat(json.s.Id);
		
      	var inquery1 = 'SELECT * FROM AirLine.'.concat(table2,' WHERE SheduleId= (').concat(inquery2,')');
      	
      	var inquery3 = 'SELECT * FROM AirLine.'.concat(table3,' WHERE SheduleId= (').concat(inquery2,')');
       
        pool.getConnection(function(err, connection){
  			connection.query(inquery1, function(err, rows){
  				if(err)	{
  					callback(false, err);
  				}else{
  					connection.query(inquery3, function(err, rows){
  						if(err)	{
  							callback(false, err);
  						}else{
  							callback(true, "no");
  						}
  					});
  				}
  			});
  			
  		connection.release();
		});
    },
    
    dbonetomanyupdate : function(table1,table2,table3,json, callback){
		
		var inquery2 = 'SELECT Id FROM AirLine.'.concat(table1,' WHERE Id= ').concat(json.s.Id);
		
      	var inquery1 = 'UPDATE AirLine.'.concat(table2,' SET ').concat('GroupId=',json.f.GroupId).concat(' , Code=',json.f.Code).concat(' WHERE SheduleId= (').concat(inquery2,')');
      	
      	var inquery3 = 'UPDATE AirLine.'.concat(table3,' SET ').concat('SeatId=',json.t.SeatId).concat(' , CustomerId=',json.t.CustomerId).concat(' WHERE SheduleId= (').concat(inquery2,')');

        pool.getConnection(function(err, connection){
  			connection.query(inquery1, function(err, rows){
  				if(err)	{
  					callback(false, err);
  				}else{
  					connection.query(inquery3, function(err, rows){
  						if(err)	{
  							callback(false, err);
  						}else{
  							callback(true, "no");
  						}
  					});
  				}
  			});
  			
  		connection.release();
		});
    }
    					
    
    
};
