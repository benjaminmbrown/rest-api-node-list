var restify = require('restify');
var mongojs = require('mongojs');

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000,function(){
	console.log("Server started on port 3000");
})

