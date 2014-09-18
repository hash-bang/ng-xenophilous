/**
* Storage of the $rootScope if we've already had to find it
* @var object
*/
var ngRootScope = null;

/**
* Cache of Angular named controllers if we've already had to find them
* @var object
*/
var ngControllers = {};

/**
* Run a given function within a controller scope
* This has the effect that Angular is aware of variable changes within scope
* @param string controller The name of the controller to run the function within
* @param function cb The function to execute
*/
function ngApply(controller, cb) {
	var scope = ngGetScope(controller);
	if (!scope) {
		console.error('Cannot find controler', controller, 'when attempting to apply code');
		return;
	}

	scope.$apply(function() {
		cb(scope);
	});
}

/**
* Broadcast an event into the $rootScope downwards though all controllers
* This function is the equivelent of Angulars `$rootScope.$broadcast()`
* @param string event The event name to broadcast
* @param mixed parameters,... Optional parameters to include in the broadcast
*/
function ngBroadcast(eventName) {
	var rootScope = ngGetRootScope();
	if (!rootScope) {
		console.error('Tried to broadcast', eventName, 'but the $rootScope cannot be found');
		return;
	}

	var args = arguments;
	if (!rootScope.$$phase) {
		rootScope.$apply(function() {
			rootScope.$broadcast.apply(rootScope, args);
		});
	} else {
		setTimeout(function() {
			rootScope.$apply(function() {
				rootScope.$broadcast.apply(rootScope, args);
			});
		}, 0);
	}
}

// Utility functions {{{
/**
* Return a Angular controller scope object by name
* This function isn't really meant to be used alone, see ngApply() for a more useful function
* @see ngApply()
* @param string controller The name of the controller to find
* @return object|null Either the angular scope object or null if nothing was found
*/
function ngGetScope(controller) {
	if (ngControllers[controller]) // We have seen this controller before
		return ngControllers[controller].scope();

	var controllerObj = $("[ng-controller='" + controller + "']");
	if (!controllerObj.length) {
		console.error('Cannot find controller', controller);
		return null;
	}

	var angularObj = angular.element(controllerObj);
	if (!angularObj || !angularObj.scope) {
		console.error('Found controller', controller, 'but Angular didnt return a matching internal object!');
		return null;
	}
	ngControllers[controller] = angularObj;

	var scope = angularObj.scope();
	if (!scope) {
		console.error('Angular controller', controller, 'exists but it doesnt seem to have a scope!');
		return null;
	}

	return scope;
}

/**
* Return the Angular $rootScope object
* @return null|object Either the Angular $rootScope object or null if we cant find it
*/
function ngGetRootScope() {
	// Method 0 - We already have the rootScope cached
	if (ngRootScope)
		return ngRootScope;

	// Method 1 - Use an entry in ngControllers
	for (var c in ngControllers) {
		ngRootScope = ngControllers[c].scope().$root;
		return ngRootScope;
	}

	// Method 2 - Find any controller and use its rootScope
	var controllerObj = $('[ng-controller]');
	if (!controllerObj.length) {
		console.error('Cant find any controller in order to retrieve rootScope');
		return;
	}

	var angularObj = angular.element(controllerObj);
	if (!angularObj || !angularObj.scope) {
		console.error('Found controller', controller, 'while looking for $rootScope but Angular didnt return a matching internal object!');
		return null;
	}

	var scope = angularObj.scope();
	if (!scope) {
		console.error('Angular controller', controller, 'exists but it doesnt seem to have a scope!');
		return null;
	}

	ngRootScope = scope.$root;
	return ngRootScope;
}
// }}}
