//DinnerModel Object constructor
var DinnerModel = function() {

	var numGuest = 3;
	var observers = [];
	var currentType = 'Desserts';
	var currentDish = 200;
	this.searchWord = '';
	this.currentId = 0;
	this.menu = [];

	this.addObserver = function(observer) {
		observers.push(observer);
	}

	var notifyObservers = function(obj) {
		for (var i=0;i<observers.length;i++){
				observers[i].update(obj);
				console.log(observers[i]);
			}
	}
	
	this.changeId = function(id){
		this.currentId = id;
		console.log(this.currentId);
		//put also the same id to menu
		this.menu.push(id);
		notifyObservers();
	}

	
	this.setCurrentDish = function(id){
		currentDish = id;
		console.log(currentDish);
		notifyObservers();
	}
	
	//used to get id from from selected dish
	this.getCurrentDish = function(){
		return currentDish;
	}
	
	//current type in optionbar
	this.setCurrentType = function(type){
		currentType = type;
		console.log(currentType);
		notifyObservers();
	
	}
	
	this.getCurrentType = function(){
		return currentType;
	
	}
	
	this.changeSearchWord = function(word) {
		this.searchWord = word;
		console.log(this.searchWord);
		notifyObservers();
	}
	
	
	this.setNumberOfGuests = function(num) {
		numGuest = num;
		console.log(numGuest);
		notifyObservers();
	}
	
	
	this.getNumberOfGuests = function() {
		return numGuest;
	}

	this.getSelectedDish = function(type) {
		var id = selectedDishes[type];
		var dish = this.getDish(id);

		return dish;
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return menu;
	}

	//Returns all ingredients for all the dishes on the menu... //gets ingredients from a specifik ID!!! 
	this.getAllIngredients = function(id) {
		name = "";
		var dish = this.getDish(id);
		var ingredients = dish.ingredients;

		for (i=0; i<ingredients.length; i++){
			var ingredient = ingredients[i];
			name += ingredient.name +'</br>';
		}

		return name;	
		
	}
	
	//quantity 
	this.getQuantity = function(id) {
		quantity = "";
		var dish = this.getDish(id);
		var ingredients = dish.ingredients;

		for (i=0; i<ingredients.length; i++){
			var ingredient = ingredients[i];
			quantity += ingredient.quantity +'</br>';
		}

		return quantity;	
		
	}
	
	//gets units from dish
	this.getUnit = function(id) {
		unit = "";
		var dish = this.getDish(id);
		var ingredients = dish.ingredients;

		for (i=0; i<ingredients.length; i++){
			var ingredient = ingredients[i];
			unit += ingredient.unit +'</br>';
		}

		return unit;	
		
	}
	
	//Price - ingredient
	this.getIngredientPrice = function(id) {
		price = "";
		var dish = this.getDish(id);
		var ingredients = dish.ingredients;

		for (i=0; i<ingredients.length; i++){
			var ingredient = ingredients[i];
			price += 'SEK ' + ingredient.price +'</br>';
		}

		return price;	
		
	}
	
	this.pending = function(id) {
		price = 0;
		var dish = this.getDish(id);
		var ingredients = dish.ingredients;

		for (i=0; i<ingredients.length; i++){
			var ingredient = ingredients[i];
			price += ingredient.price;
		}

		return '<div class="col-md-4"><br>Pending: SEK '+ price*numGuest +'</div>';	
		
	}
	
	//Price for a dish
	this.getDishPrice = function(id) {

		var price = 0;

		var dish = this.getDish(id);
		var ingredients = dish.ingredients;

		for (i=0; i<ingredients.length; i++){
			var ingredient = ingredients[i];
			price += ingredient.price;
		}

		return (price*numGuest);
	}	
	//////////////////////////////
	//			API				//	
	//////////////////////////////

	//NEEDS UPDATE
	this.getAllDishes = function (type,filter) {
	    var apiKey = "dvxrV2fipnzly1OxypUK685yXpq8i4v1";
		var url = "http://api.bigoven.com/recipes?api_key="+apiKey+"&pg=2&rpp=5&any_kw="+type;
		$.ajax({
			type: "GET",
			dataType: 'json',
			cache: false,
			url: url,
			success: function(data){
				// Parse the  data:
        		var resultsString = "";
        		for (var i in data.Results){
            		console.log( data.Results[i] );
					resultsString += "<div class='col-md-3' style='margin:1% 1% 0 1%;'><br/>"
					resultsString += "<center><img class ='images' id='"+ data.Results[i].RecipeID +"' width='300' src='"+data.Results[i].ImageURL+"' ></center><br/><br/> ";
           			resultsString += "<div id='foodhead'><center><h3>"+data.Results[i].Title+"</h3></center></div></div>";
        }
		
		//selectView
        $("#hej").html(resultsString);
			},
			error: function(xhr,status,error) {
       			console.error(error);
				notifyObservers();
     	 }
		});
	}

	//NEEDS UPDATE
	//function that returns a dish of specific ID
	
	this.getDish = function (id) {
		var apiKey = "dvxrV2fipnzly1OxypUK685yXpq8i4v1";
		var recipeID = id;
		var url = "http://api.bigoven.com/recipe/" + recipeID + "?api_key="+apiKey;
		$.ajax({
			type: "GET",
			dataType: 'json',
			cache: false,
			url: url,
			success: function(data){
				console.log(data);
			}
				
		});
		
	}




} 