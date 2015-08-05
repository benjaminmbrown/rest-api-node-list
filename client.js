var restify = require('restify');
var server = require('./server');

var client = restify.createJsonClient({
	url: 'http://localhost:3000'
});

var testProduct = {
	id: '1',
	name: "Apple iPad AIR",
    os: "iOS 7, upgradable to iOS 7.1",
    chipset: "Apple A7",
    cpu: "Dual-core 1.3 GHz Cyclone (ARM v8-based)",
    gpu: "PowerVR G6430 (quad-core graphics)",
    sensors: "Accelerometer, gyro, compass",
    colors: "Space Gray, Silver"
};


client.post('/product', testProduct, function(err,req,res,product){
	if(err){
		console.log('error occurred>>');
		console.log(err);
	}
	else{
		console.log('Saved product >>');
		console.log(product);
	}
})