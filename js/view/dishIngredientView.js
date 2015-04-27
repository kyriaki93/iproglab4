 //dishIngredientView Object constructor
var DishIngredientView = function (container, model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
 	var dishID = model.getPending();
	this.numberOfGuests = container.find("#numberOfGuests");
	this.numberOfGuests.html(model.getNumberOfGuests());
	this.menuDetails = container.find("#menuDetails");
	this.dishPrice = container.find("#selectedDishPrice");

	model.addObserver(this);
	
	this.update = function(){
		this.menuDetails.html(getMenuDetails().ingredientDetails);
		this.numberOfGuests.html(model.getNumberOfGuests());
		this.dishPrice.html(getMenuDetails().totalPrice);
	}

	var getMenuDetails = function(){
		var pendingDish = model.getPending();

		if(pendingDish!="none"){
			var returnstring = "";
			var totalPrice = 0;
			for(ingredient in pendingDish.Ingredients){
				
				returnstring += "<div class='row'>";
				if(pendingDish.Ingredients[ingredient].Unit === null){
									returnstring += "<div class='col-md-3'>"+(pendingDish.Ingredients[ingredient].Quantity*model.getNumberOfGuests()).toFixed(1)+"</div>";
				} else {
					returnstring += "<div class='col-md-3'>"+(pendingDish.Ingredients[ingredient].Quantity*model.getNumberOfGuests()).toFixed(1)+" "+pendingDish.Ingredients[ingredient].Unit+"</div>";
				}
				
				returnstring += "<div class='col-md-6'>"+pendingDish.Ingredients[ingredient].Name+"</div>";
				returnstring += "<div class='col-md-1'> SEK </div>";
				returnstring += "<div class='col-md-1'>"+(pendingDish.Ingredients[ingredient].Quantity*model.getNumberOfGuests()).toFixed(2)+"</div>";
				returnstring += "</div>";
				totalPrice += pendingDish.Ingredients[ingredient].Quantity * model.getNumberOfGuests();
				pendingDish.pricePerPerson = totalPrice/model.getNumberOfGuests();
			}

			var dishDetails = {
				'ingredientDetails':returnstring,
				'totalPrice':totalPrice};
		} else {
			var dishDetails = {
				'ingredientDetails':"none",
				'totalPrice':0};
		}
		return dishDetails;
	}

	this.menuDetails.html(getMenuDetails().ingredientDetails);
	this.dishPrice.html(getMenuDetails().totalPrice);
	this.addButton = container.find("#addButton");
}