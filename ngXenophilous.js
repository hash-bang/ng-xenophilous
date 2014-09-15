/**
* Run a given function within a controller scope
* This has the effect that Angular is aware of variable changes within scope
* @param string controller The name of the controller to run the function within
* @param function cb The function to execute
*/
function ngApply(controller, cb) {
	var controller = $("[ng-controller='" + controller + "']");
	if (!controller)
		return console.error('Cannot find controller', controller);

	var scope = controller.scope();

	scope.$apply(function() {
		cb(scope);
	});
}
