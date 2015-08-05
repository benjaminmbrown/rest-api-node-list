var restify = require('restify');
var mongojs = require('mongojs');

//replace db user/pw with your own mongolab creds
var db = mongojs('mongodb://<dbuser>:<dbpassword>@ds031193.mongolab.com:31193/rest-api-study', ['products']);
//for use with localdb:
// var db = mongojs('productsdb', ['products']);


var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000,function(){
	console.log("Server started on port 3000");
});

//restify middleware
server.get("/products", function(req,res,next){

	db.products.find(function(err,products){
		res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
		res.end(JSON.stringify(products));
	});

	return next();
});
//saves product
server.post("/product", function(req,res,next){

	var product = req.params;

	db.products.save(product, function(err,data){
		res.writeHead(200,{
			"Content-Type" : 'application/json; charset=utf-8'
		})
		res.end(JSON.stringify(data));
	})

	return next();
});

//update existing product
server.put("/product/:id", function(res,req,next){
	db.products.findOne(
	{id: req.params.id},
	 function(err,data){

		var updatedProducts = {};

		//merge 2 objects
		for(var n in data){
			updatedProducts[n] = data[n];
		}

		for(var n in req.params){
			updateProducts[n] = req.params[n];
		}

		db.products.update(
		{id: req.params.id}, 
		updatedProducts, 
		{multi:false},
		function(err,data){
			res.writeHead(200, {
				"Content-Type" : 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(data));
		});
	});
	return next();
});



server.del('/product/:id', function (req, res, next) {
    db.products.remove({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

module.exports = server;