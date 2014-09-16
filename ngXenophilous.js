/**
* Run a given function within a controller scope
* This has the effect that Angular is aware of variable changes within scope
* @param string controller The name of the controller to run the function within
* @param function cb The function to execute
*/
function ngApply(controller, cb) {
	var scope = ngGetController(controller);
	if (!scope)
		return;

	scope.$apply(function() {
		cb(scope);
	});
}


/**
* Return a Angular controller scope object by name
* This function isn't really meant to be used alone, see ngApply() for a more useful function
* @see ngApply()
* @param string controller The name of the controller to find
* @return object|null Either the angular scope object or null if nothing was found
*/
function ngGetController(controller) {
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

	var scope = angularObj.scope();
	if (!scope) {
		console.error('Angular controller', controller, 'exists but it doesnt seem to have a scope!');
		return null;
	}

	return scope;
}
