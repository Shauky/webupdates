/*global desc, task, jake, fail, complete */

(function() {
	
	"use strict";

	task('default', ["lint","test", "ghost"]);
	
	//Casper smoke tests

	desc("Casper smoke test");
	task("ghost", [], function(){
		var ghost = require("./src/smoke_test.js");
		console.log("Casper starts phantom!");
		ghost.ghostFunc();
	}, {async: true});

	//JSHint

	desc("Lints eveything");
	task("lint", [], function(){
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
	task("test", [], function(){
		var reporter = require("nodeunit").reporters["default"];
		reporter.run(['src/server/_server_test.js'], null, function(failures){
			console.log("All tests done");   // add with server running?
			complete();
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