//Casperjs

(function(){
"use strict";

var child_process = require("child_process");

// Run casper process using node childprocess.exec.

var command = "cd src && casperjs casper_smokefile.js";

exports.ghostFunc = function(){
	console.log("Ghost function running.");
		child_process.exec(command, function(error, stdout,stderr) { 
			if (error !== null){ 
				console.log(stderr);
				throw error;
			}else{
				console.log(stdout); // This is still taking too long. Try swarm <===================================================
				console.log("Child process completes!");
			}	
		});
	};
}());
