//Main Server and Webupdates for Maldives Traveller

//server starts and immediately begins collecting data
//using PhantomJs and Casper

"use strict";
var http = require("http");
var server;



//PhantomCode (grep, wget, json, casper)










// Server Code
exports.start = function(portNumber){
	server = http.createServer();

	server.on("request", function(req, res){
		console.log("Received Request");

		var body = "<html><head><title>A Simple Node Server for Web Updates.</title></head>" +
				"<body> This is a spike for a basic web server in node." + 
				"follow up on with tdjs13.mp4 </body></html>";

		res.end(body);
	});
	server.listen(portNumber);
	console.log("server started");
};


exports.stop = function(callback) {
	server.close(callback);
};
