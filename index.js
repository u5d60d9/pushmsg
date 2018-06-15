var app = require('express')();                                  
var http = require('http').Server(app);                            
var io = require('socket.io')(http);                      
var log4js = require('log4js');                           
                                                          
var logger = log4js.getLogger();                             
logger.level = 'all';                                        
                                                             
var conns= new Map();                                           
const ioc = require('socket.io-client');                               
var svrsocket = ioc('http://localhost:3000');                          
                                                                       
app.get('/', function(req, res){                                                            
                res.send('<h1>Hello world</h1>');                      
                });                                                    
                                                                       
app.get('/api/send/:user/:cstname/:msg',function(req,res){             
        res.send(req.params.user + ":" + req.params.msg);              
var user = req.params.user;                                            
var msg = req.params.msg;                                              
var cstname = req.params.cstname;                                      
var clientid = conns.get(user);                                        
                                                                       
if (clientid == undefined){                                            
   logger.debug("user " + user + " not connected!");                   
   return;                                                             
}                                                                      
svrsocket.emit('push',{'user':user,'cst':cstname,'msg':msg});          
});                                                                    
                                                                       
//full version                                                                              
app.get('/api/send/:tenant/:grp/:user/:cstname/:msg',function(req,res){                     
                                                                                            
});                                                                                         
io.on('connection', function(socket){                                                       
                logger.debug('a user connected:'+socket.id);                                
                socket.on('disconnect', function(){                                         
                                logger.warn('user disconnected');      
             });                                    
                socket.on('set-name', function(data) {                 
                                 var iterator1 = conns.entries();      
                                 while(v = iterator1.next().value){    
                                    logger.debug(v);                   
                                    if(v[1]==socket.id)                
                                    conns.delete(v[0]);                
                                 }                                     
                                                                       
                                conns.set(data,socket.id);             
                                logger.info(socket.id+":"+data);       
                                });                                    
                socket.on('push', function(data) {                     
                                logger.debug(data);                    
                                 socket.broadcast.to(conns.get(data.user)).emit('msg',data);
                                });                                                         
                });                                                                         
                                                                                            
http.listen(3000, function(){                                                               
                logger.info('listening on *:3000');                                         
                });                                                                         
                                                                                 
