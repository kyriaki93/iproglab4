var DishDetailView = function (container, model) {

	this.dishView = container.find("#detailDish");
	model.addObserver(this);
	

	this.getDish = function() {

	$.fn.changeId = function(id) {
		model.setCurrentDish(id);
		model.changeId(id);
	};
	var dish = model.getCurrentDish();
	
	var div = '';
		if(dish == "none"){
			div += ("No pending dishes");
		} else {
		
						
			div += "<div class='col-md-5'><div><center><h2>"+ dish.Title +"</h2></center></div>"
			div += "<img src='"+dish.ImageURL+"'' width='100%'><br/><br/>";
			div += "<p>"+dish.Description+"</p>"
			div += "<div id='foodhead'><center><button class='btn btn-default' type='submit' onclick='backBtn()' style='margin:0% 0% 10% 0%;'>Back to Select Dish</button></center></div></div>";
			
		
		
			div += "<div class='row'><div class='col-md-12'><center><h2>Ingredients</h2></center><br></div>";
			
			var totalPrice = [];
			total = 0;
			for(ingredient in dish.Ingredients){
			div += "<div class='col-md-3'>"+dish.Ingredients[ingredient].Quantity+"</div><div class='col-md-2'>"+dish.Ingredients[ingredient].Unit+"</div><div class='col-md-5'>"+dish.Ingredients[ingredient].Name+"</div><div class='col-md-2'>"+dish.Ingredients[ingredient].Quantity * model.getNumberOfGuests()+" SEK</div>";
			
			totalPrice.push(dish.Ingredients[ingredient].Quantity * model.getNumberOfGuests());
		
			}
			for(var i in totalPrice) { total += totalPrice[i];
			dish.total = total;
			 }
			
			div +="<div class='col-md-6'><center><span class='confirmDishBtn' onclick='$(this).changeId("+dish.RecipeID+")'><input class='btn btn-default' type='submit' value='Confirm Dish' style='margin:6% 6% 6% 6%;'></span></center></div></div>"
			


		}
			
		return div;
	};
		
	this.dishView.html(this.getDish);
	
	
	this.update = function(){
		this.getDish();
		this.dishView.html(this.getDish);
	};
}