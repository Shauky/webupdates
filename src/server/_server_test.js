//Main tests on server, this is where all the server logic gets tested.

"use strict";

var server = require("./server.js");
var http = require("http");

//Stops the server dead in its tracks!

exports.tearDown = function(done){
	server.stop(function(){
	});
	done();
};

exports.testHttpServer = function(test){
	server.start(8080);
	var request = http.get("http://localhost:8080");
	request.on("response", function(response){
 		var receivedData = false;
 		response.setEncoding("utf8");
 		test.equals(200, response.statusCode, "Status code");

 	response.on("data", function(chunk) {
 		receivedData = true;
 		test.equals("Hello World", chunk, "response text"); 
 		test.done();	

 	response.on('error', function(e) {
		console.log("You broke the internet.404 on Test Server" + e.message);
			});
		});
	 });
};

exports.test_stopCalledWhenServerIsntRunning = function(test){
	test.throws(function (){
		throw new Error("Server already stopped");
	}, Error);
	test.done();
};
