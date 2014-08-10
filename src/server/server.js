//Main Server Webupdates for Maldives Traveller

"use strict";

var fs = require("fs");
var http = require("http");
var server;

// Server Code

exports.start = function(portNumber){
	if (!portNumber) throw "Required port number for webserver";
	portNumber = 8080;

	server = http.createServer();

	server.on("request", function(req, res){
		console.log("Received Request");
		res.end("Hello World");
	});
	server.listen(portNumber);
	console.log("Server listening on: " + portNumber);
};

exports.stop = function(callback) {
	server.close(callback);
	console.log("Server Stopped");
};
