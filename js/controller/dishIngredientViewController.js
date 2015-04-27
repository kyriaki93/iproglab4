var DishIngredientController = function(view, model) {
	view.addButton.click(function(){
		model.addDishToMenu(model.getPending());
		model.removePending();
	});
	
}