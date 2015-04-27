var SelectDishView = function(container, model) {
	
	this.allDishes = container.find("#allDishes");
	this.searchButton = container.find("#searchButton");
	this.searchBar = container.find("#searchBar");


	model.addObserver(this);


	
	this.update = function(){

	$.fn.setCurrentDish = function(id) {
		model.setCurrentDish(id);
		$("#selectDishView").hide();
		$("#dishDetailView").show();
	};

		var returnstring = "";
		if(model.isLoading() && !model.checkError()){
		   returnstring = "loading..."
		} else if (model.checkError()){
			this.allDishes.html("There seems to be an error...");
		} else {
			var dishes = model.getAllDishes();
			
			if(dishes.length == 0){
				returnstring += "Your search did not generate any dishes.";
			} else {
				returnstring += "<div class='row'>";
				for(var i = 0; i<dishes.length;i++){
					returnstring += "<div class='col-md-3 clickable' style='margin:1% 1% 0 1%;'><br />";
					returnstring += "<center><div class='dishImage' onclick='$(this).setCurrentDish("+dishes[i].RecipeID+")' id= '"+dishes[i].RecipeID+"'><img class='images' id='"+ dishes[i].RecipeID +"' src='"+dishes[i].ImageURL+"' width='100%' ></div></center><br/><br/>";
					returnstring += "<div id='foodhead'><center><h3>"+dishes[i].Title+"</h3></center></div>";
					returnstring += "</div>";
	
				}
				returnstring  += "</div><br/><br/><br/><br/><br/></br>";;
			}

			this.allDishes.html(returnstring);
		}
		this.images = container.find(".images")
	}

	var generateAllDishes = function(){
		model.generateDishes();
	};

	
	
	generateAllDishes();

};

		