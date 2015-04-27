var SelectDishController = function(view, model ) {

	//search Ctrl
	view.searchButton.click(function(){
		var keyword = document.getElementById("searchBar").value;
		model.searchDishes(keyword);
	})

}