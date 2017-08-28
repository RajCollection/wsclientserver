# wsclientserver

install websocket module ws:
  npm install ws
  
create a varaible WebSocketServer
var WebSocketServer = require("ws").Server;

install mysql module:
  npm install mysql

create a varaible mysql
var mysql = require('mysql');

configure your database
//database connection
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'test'
});

//use port number, you can use any port number other than 8100
var wss = new WebSocketServer({port:8100});

