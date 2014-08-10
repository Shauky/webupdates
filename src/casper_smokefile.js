//This is where all the scraping happens

"use strict";

//Server starts and immediately begins collecting data
//using PhantomJs and Casper. Run from Jakefile.

var casper = require('casper').create();

	casper.start('http://maldivestraveller.com', function(){
			this.echo(this.getTitle());
	});

	// casper.thenOpen('http://phantomjs.org', function(){
	// 		this.echo(this.getTitle());
	// });

casper.run();