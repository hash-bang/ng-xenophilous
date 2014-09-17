ngXenophilous
=============
A collection of functions which make Angular a little less of a pain to work with from jQuery or common JavaScript.

These functions are designed to be as stand-alone as possible and complement Angular without being too confusing.


	var app = angular.module('app', []);
	
	app.controller('widgetController', function($scope) {
		$scope.widgets = [];
	});


	// Now for some jQuery:

	$(function() {
		$.getJSON('http://somewebsite.com/api/json', function(data) {

			// Use ngApply() to run code or manipulate variables as if we were inside the Angular environment

			ngApply('widgetController', function($scope) {
				$scope.widgets = data;
			});
		});
	});





Installation
------------
Install with bower:

	bower install ng-xenophilous


And insert the script loader into your header file:

	<script src="/bower_components/ng-xenophilous/ngXenophilous.js"></script>


FAQ
---
* *Why this module* - Because I was having problems getting Angular to work with jQuery or *any* other JavaScript library without a load of faff.
* *Why the stupid name* - [The internet](https://answers.yahoo.com/question/index?qid=20080712230820AAAhkXC) informs me that Xenophilous is the opposite of Xenophobic (self contained). Which is certainly the attitude we are trying to foster here.
* *How do you recommend using this module* - Really this is just an add-on to Angular which enables it to work a bit better with external libraries. Use Angular for the majority of your coding and the functions provided by ngXenophilous for small jobs. I would certainly not recommend writing anything more than single liners - move your complex stuff to an Angular controller.


Features
========

ngApply(controllerName, function)
---------------------------------
Run a function as if we were executing inside a controller.

This function will find the controller by its name and execute code within its local scope.

**Example:**

	ngApply('userController', function($scope) {
		$scope.user.name = 'John Smith';
		$scope.user.message = 'Buwhahaha';
	});


ngBroadcast(eventName, parameters...)
-------------------------------------
Broadcast an event downwards though all controllers.

This is functionally identical to `$rootScope.$broadcast()` except that its called externally from Angular.

**Example:**

	ngBroadcast('myCustomEvent', 'foo', 'bar', 'baz');


Utility functions
-----------------
The following functions are also provided but they arn't really intended to be called directly. They are provided here in case you ever really want access to Angular controllers and so on but its recommended you use the above wrapper functions when manipulating things.


ngGetScope(controllerName)
--------------------------
Retrieve the scope of a named controller. This is really just a utility function which gets used by the other functions to properly look up the controller.
Its not a good idea to use this directly as updates to the object wont be detected by Angular. See `ngApply()` for the recommended way to execute Angular scope-aware code.

**Example:**

	var widgetScope = ngGetScope('widgetController');


ngGetRootScope()
----------------
Similar to `ngGetScope()` but this time returns the Angular `$rootScope` object.

**Example:**
	
	var rootScope = ngGetRootScope();
