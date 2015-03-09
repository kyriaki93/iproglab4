$(function() {
	

	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the main controller
	var exampleView = new ExampleView($("#exampleView"),model);
	window.exampleViewController = new ExampleViewController(exampleView,model);

	var startView = new StartView($("#startView"),model);
	var startController = new StartController(startView, model);
	
});