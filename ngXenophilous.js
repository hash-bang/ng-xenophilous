/**
* Run a given function within a controller scope
* This has the effect that Angular is aware of variable changes within scope
* @param string controller The name of the controller to run the function within
* @param function cb The function to execute
*/
function ngApply(controller, cb) {
	var controllerObj = $("[ng-controller='" + controller + "']");
	if (!controllerObj.length)
		return console.error('Cannot find controller', controller);

	var angularObj = angular.element(controllerObj);
	if (!angularObj || !angularObj.scope)
		return console.error('Found controller', controller, 'but Angular didnt return a matching internal object!');

	var scope = angularObj.scope();
	if (!scope)
		return console.error('Angular controller', controller, 'exists but it doesnt seem to have a scope!');

	scope.$apply(function() {
		cb(scope);
	});
}
