//Main File Server without tests for Webupdates. Maldives Traveller

"use strict";

var fs = require("../../node_modules/node-fs/lib/fs.js");
var http = require("http");

// Server Code
var	server = http.createServer();

server.on("request", function(req, res){
		console.log("Received Request");
		fs.readFile("index.html", function(err, data){
			if(err) throw(err);
			res.end(data);
		});
	});

server.listen(8080);
console.log("Server listening on:8080");