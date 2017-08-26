var WebSocketServer = require("ws").Server;
var mysql = require('mysql');

//database connection
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});
var wss = new WebSocketServer({port:8100});

function SearchAnswers(msg){
	console.log('message from client: '+msg);
     connection.query('SELECT * FROM answers', function(err, rows, fields)
   {
        console.log('Connection result error '+err);
        console.log(rows)

        if (!err) {
            rows.forEach(function(row) {
                var str = JSON.stringify(rows)
                var parsed = JSON.parse(str);
            });
        }else {
            console.log('Error while performing Query.' + err);
        }       
    });
    connection.query('insert into answers(answers) values (?)',[msg],function(err, rows, fields){
        if (err) throw err;
        //else readData();;
    });
}

wss.on('connection', function connection(ws) {
    // Store the remote systems IP address as "remoteIp".
   // var remoteIp = ws.upgradeReq.connection.remoteAddress;
    // Print a log with the IP of the client that connected.
    //console.log('Connection received: ', remoteIp);
 
    //ws.on('message',wss.tempData);
	ws.on('message', function(msg){

		SearchAnswers(msg);
	});

	ws.on('close', function() {
		console.log('closing connection');
	});
});
