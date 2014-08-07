//Main tests on server, this is where all the logic gets tested.

"use strict";

var server = require("./server.js");
var http = require("http");


// Uncomment everything and just call this to server from shell
// server.start()


//Stops the server dead in its tracks!
exports.tearDown = function(done){
	server.stop(function(){
		console.log("Stopped Callback on Server");
	});
	console.log("Teardown Ends");
	done();
};



exports.testHttpServer = function(test){
	server.start(8080);
	http.get("http://localhost:8080", function(res){
 	console.log("Got respose" + res.statusCode);
 	test.done();
 	}).on('error', function(e) {
		console.log("You broke the internet. 404 on Test Server" + e.message);
	});
};
