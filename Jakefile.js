/*global desc, task, jake, fail, complete */

(function() {
	
	"use strict";

	var NODE_VERSION = "v0.11.14-pre";

	task('default', ["lint","test","nodeVersion", "ghost"]);
	
	//Casper smoke tests

	desc("Casper smoke test");
	task("ghost", [], function(){
		var ghost = require("./src/smoke_test.js");
		console.log("Casper starts phantom!");
		ghost.ghostFunc();
	}, {async: true});

	// Ensure correct version of node is present

	desc("Ensure correct version of node is present");
	task("nodeVersion", [], function(){

	function failWithQualifier(qualifier){
		fail("Incorrect node version. Expected " + qualifier + "[ " + expectedString + " ], but was [" + actualString + " ].");	
	}

	var expectedString = NODE_VERSION;
	var actualString = process.version;
	var expected = parseNodeVersion( "expected Node version", expectedString);
	var actual = parseNodeVersion( "actual Node version", actualString);

	if(process.env.strict) {
		if (actual[0] !== expected[0] || actual[1] !== expected[1] || actual[2] !== expected[2]) {
			failWithQualifier("exactly");
		}else{
			if (actual[0] < expected [0]) failWithQualifier("at least");
			if(actual[0] === expected[0] && actual[1] < expected[1]) failWithQualifier("at least");
			if(actual[0]=== expected[0] && actual[1] === expected[1] && actual[2] < expected[2]) failWithQualifier("at least"); }

		}

		console.log(" Node version was ", parseNodeVersion(" ", NODE_VERSION));
	});	

	function parseNodeVersion(description, versionString){
		var versionMatcher = /^v(\d+)\.(\d+)\.(\d+).+[a-zA-Z]$/;
		var versionInfo = versionString.match(versionMatcher);
		if(versionInfo === null) fail ("Could not parse " + description + " (was'" + versionString + "')");

		var major = parseInt(versionInfo[1], 10);
		var minor = parseInt(versionInfo[2], 10);
		var bugfix = parseInt(versionInfo[3], 10);

		return [major, minor, bugfix];
	}


	//JSHint

	desc("Lints eveything");
	task("lint", ["nodeVersion"], function(){
	    var lint = require("./build/lint/lint_runner.js");

	 	var files = new jake.FileList();
	 	files.include("**/*.js");
	 	files.exclude("node_modules");
	 	var options = nodeLintOptions();
	 	var globals = nodeLintGlobals();
		var pass = lint.validateFileList(files.toArray(), options, globals);
				if (!pass) fail("Lint failed");

	});

	//nodeunit

	desc("Test everything");
	task("test", ["nodeVersion"], function(){
		var reporter = require("nodeunit").reporters["default"];
		reporter.run(['src/server/_server_test.js'], null, function(failures){
			console.log("All tests done");   // add with server running
			complete();						 // deploy node ./server.sh
		});
	}, {async: true});


	function nodeLintOptions(){
	    return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: true,
			node: true
		};
	}

	function nodeLintGlobals(){
		return {
			describe: false,
			it: false,
			beforeEach: false,
			afterEach: false
		};
	}

}());