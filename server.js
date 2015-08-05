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
	console.log('get all endpoint');
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
	console.log('save (POST) endpoint');
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
server.put('/product/:id', function (req, res, next) {
    // get the existing product
    db.products.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/product with the server/product
 
        var updProd = {}; // updated products 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updProd[n] = data[n];
        }
        for (var n in req.params) {
            updProd[n] = req.params[n];
        }
        db.products.update({
            id: req.params.id
        }, updProd, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/product/:id', function (req, res, next) {
	console.log('delete endpoint')
    db.products.remove({
        id: req.params.id
    }, function (err, data) {
    	console.log('writehead');
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});


server.get('/product/:id', function (req, res, next) {
    db.products.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

module.exports = server;