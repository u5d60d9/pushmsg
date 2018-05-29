var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var conns= new Map();
const ioc = require('socket.io-client');
var svrsocket = ioc('http://localhost:3000');

app.get('/', function(req, res){
		res.send('<h1>Hello world</h1>');
		});

app.get('/api/send/:user/:msg',function(req,res){
	res.send(req.params.user + ":" + req.params.msg);
var user = req.params.user;
var msg = req.params.msg;
var clientid = conns.get(user);
//console.log(clientid);

//用户没有连接
if (clientid == undefined){
   console.log("user " + user + " not connected!");
   return;	
}
svrsocket.emit('push',{'user':user,'msg':msg});
});

//full version
app.get('/api/send/:tenant/:grp/:user/:msg',function(req,res){
	
});
io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('disconnect', function(){
				console.log('user disconnected');
				});
		socket.on('set-name', function(data) {
				 var iterator1 = conns.entries();
				 while(v = iterator1.next().value){
				    console.log(v);
				    if(v[1]==socket.id)
				    conns.delete(v[0]);
				 }

				conns.set(data,socket.id);
				console.log(socket.id+":"+data);
				});
		socket.on('push', function(data) {
				console.log('push:'+data.msg+","+conns.get(data.user));
			 socket.broadcast.to(conns.get(data.user)).emit('msg',data.msg);
				});
		});

http.listen(3000, function(){
		console.log('listening on *:3000');
		});

