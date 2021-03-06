//DinnerModel Object constructor
var DinnerModel = function() {

	var guests = 3;
	var currentDish = 200;
	var current = 'none';
	this.currentId = 0;
	this.menu = [];

	var observers = [];	
	var dishes = [];
	var loading = true;
	var error = false;
 	
 	//get ID from confirm dish and put it in menu
	this.changeId = function(id){
		this.currentId = id;
		console.log(this.currentId);

		//put also the same id to menu
		this.menu.push(current);
		notifyObservers();
	}

	//get ID from confirmed dish and get that dish from API
	this.setCurrentDish = function(id){
		loading = true;
		notifyObservers();
		var apiKey = "dvxrV2fipnzly1OxypUK685yXpq8i4v1";
		var url= "http://api.bigoven.com/recipe/"+id+"?api_key="+apiKey;
		$.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
                current = data;
                loading = false;
                error = false;
                notifyObservers();

            }, 
            error: function(){
            	error = true;
            	alert('nej')
            	notifyObservers();
            }
        });
	}

	//used to get id from from selected dish
	this.getCurrentDish = function(){
		return current;
		console.log(current);
	}

 	this.isLoading = function(){
 		return loading;
 	}

	this.addObserver = function(observer) {
		observers.push(observer);
	}


	var notifyObservers = function(arg) 
	{
		for(var i=0; i<observers.length; i++) 
		{
			observers[i].update(arg);
		}
	}

	this.setNumberOfGuests = function(num) {
		guests = num;
		notifyObservers();
	}

	this.getNumberOfGuests = function() {
		return guests;
	}

	this.getFullMenu = function() {
		return this.menu;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var totalMenuPrice = 0;
		for(dish in this.menu) {
			totalMenuPrice += this.menu[dish].total;
		}
		return totalMenuPrice;
	}

	this.generateDishes = function(type, filter){
		loading = true;
		notifyObservers();
		type = 'Desserts';

		var apiKey = "dvxrV2fipnzly1OxypUK685yXpq8i4v1";
		var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&api_key="+apiKey+"&any_kw="+type;
		
		$.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
                dishes = data.Results;
                loading = false;
                error = false;
                notifyObservers();
            }, 
            error: function() {
            	error = true;
            	notifyObservers();
            }
        });
	}

	this.searchDishes = function(keyword){
		loading = true;
		notifyObservers();
		var apiKey = "dvxrV2fipnzly1OxypUK685yXpq8i4v1";
		var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="+keyword+"&api_key="+apiKey;
		
		$.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
            	loading = false;
            	error = false;
                dishes = data.Results;
                notifyObservers();
            }, 
            error: function(){
            	error = true;
            	notifyObservers();
            }
        });
	}

	this.checkError = function(){
		return error;
	}

	this.getPriceOfDish = function(dish){
		var priceOfDish = 0;
		for(ingredient in dish.Ingredients){
			priceOfDish += dish.Ingredients[ingredient].Quantity * guests;
		}
		return priceOfDish;
	}

	this.getAllDishes = function() {
		return dishes;
	}

  this.removeDishFromMenu = function(id) {

    for(dish in this.menu){
      if(this.menu[dish].RecipeID == id){
        this.menu.splice(dish, 1);
      }
    }

  }

}