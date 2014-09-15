ngXenophilous
=============
A collection of functions which make Angular a little less of a pain to work with from jQuery or common JavaScript.

These functions are designed to be as stand-alone as possible and complement Angular without being too confusing.


Installation
------------
Install with bower.


FAQ
---
* *Why this module* - Because I was having problems getting Angular to work with jQuery or *any* other JavaScript library without a load of faff.
* *Why the stupid name* - [The internet](https://answers.yahoo.com/question/index?qid=20080712230820AAAhkXC) informs me that Xenophilous is the opposit of Xenophobic (self contained). Which is certainly the attitude we are trying to foster here.


Features
========

ngApply
-------
Run a function as if we were executing inside a controller.

	ngApply(controller, function)

Example:

	ngApply('userController', function($scope) {
		$scope.user.name = 'John Smith';
		$scope.user.message = 'Buwhahaha';
	});
