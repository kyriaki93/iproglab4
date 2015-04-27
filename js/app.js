$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"), model);
	var exampleViewController = new ExampleViewController(exampleView, model);

	var dishDetailView = new DishDetailView($("#dishDetailView"), model);
	var dishDetailViewController = new DishDetailViewController(dishDetailView, model);

	var selectedDishView = new SelectDishView($("#selectDishView"), model);
	var selectDishController = new SelectDishController(selectedDishView, model);

	//var dinnerPreparationView = new DinnerPreparationView($("#dinnerPreparationView"),model);
});