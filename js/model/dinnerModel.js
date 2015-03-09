//DinnerModel Object constructor
var DinnerModel = function() {

	var numGuest = 3;
	var observers = [];
	var currentType = 'dessert';
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

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
	//var dish = this.getDish(id);
	//var type = dish.type; 
	//console.log("removeDishFromMenu in dinnerModel");
	//if(chosenDishes[type] === id) {
	//	delete selectedDishes[type];
	//	notifyObservers();
	//	}

	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
	  return $(dishes).filter(function(index,dish) {
		var found = true;
		if(filter){
			found = false;
			$.each(dish.ingredients,function(index,ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });	
	}

	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  for(key in dishes){
			if(dishes[key].id == id) {
				return dishes[key];
			}
		}
	}


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
			'id':1,
		'name':'Apple Walnut Crostini',
		'type':'starter',
		'image':'apple.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':1,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Black Bean Cakes',
		'type':'starter',
		'image':'black.jpg',
		'description':"Place beans in a large pot and add water until beans are submerged by 3 to 4 inches. Add the garlic and onion, squeeze in orange juice, then add the squeezed orange halves. Cover and place over high heat until water comes to a boil, then uncover pot and reduce heat to a bare simmer. Cook until beans are completely tender and creamy, 1 to 2 hours, stirring occasionally, and adding water if tops of beans become exposed.",
		'ingredients':[{ 
			'name':'dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Salad',
		'type':'starter',
		'image':'salad.jpg',
		'description':"Mix collard greens, kale, romaine, cabbage, pear, onion, orange bell pepper, avocado, carrot, tomatoes, walnuts, and raisins together in a large bowl. Combine olive oil, vinegar, honey, oregano, chili powder, mustard, garlic, salt, and black pepper in a glass jar with a lid. Cover jar with lid and shake vigorously until dressing is well mixed. Pour dressing over salad; toss to coat.",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Chicken Salad',
		'type':'main',
		'image':'chicken.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs.",
		'ingredients':[{ 
			'name':'ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'red pepper',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'Pizza',
		'type':'main',
		'image':'pizza.jpg',
		'description':"In a large mixing bowl, combine flours and salt. In a small mixing bowl, stir together 200 grams (about 1 cup) lukewarm tap water, the yeast and the olive oil, then pour it into flour mixture. Knead with your hands until well combined, approximately 3 minutes, then let the mixture rest for 15 minutes.",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'Chili Soup',
		'type':'main',
		'image':'soup.jpg',
		'description':"Heat a large Dutch oven over medium-high heat. Remove casings from sausage. Add sausage, onion, and the next 4 ingredients (onion through jalapeño) to pan; cook 8 minutes or until sausage and beef are browned, stirring to crumble.Add chili powder and the next 7 ingredients (chili powder through bay leaves), and cook for 1 minute, stirring constantly.",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolate Ice cream',
		'type':'dessert',
		'image':'ice.jpg',
		'description':" First put the dry ingredients in a bowl. Add the milk and cream and mix until combined. Pour the mixture into your ice cream maker and mix according to the directions for your machine. After 30 minutes it is ready to be put into a container to finishing freezing in the freezer.",
		'ingredients':[{ 
			'name':'Cocoa',
			'quantity':1,
			'unit':'cup',
			'price':6
			},{
			'name':'Brown sugar',
			'quantity':3/4,
			'unit':'cup',
			'price':3
			},{
			'name':'Milk',
			'quantity':1/2,
			'unit':'cup',
			'price':2
			},{
			'name':'Heavy cream',
			'quantity':3,
			'unit':'cup',
			'price':9
			},{
			'name':'Vanilla',
			'quantity':1,
			'unit':'tablespoon',
			'price':4
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'vanilla.jpg',
		'description':"Pour everything into the bowl of a mixer or whisk in a bowl by hand. Pour it into your ice cream maker and freeze according to the directions. When it is done, put it into a container and let it freeze for 2 hours or until frozen.",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':7
			}]
		},{
		'id':202,
		'name':'Strawberry Ice cream',
		'type':'dessert',
		'image':'strawberry.jpg',
		'description':"In a bowl, add 1/2 cup sugar to the strawberries. Add the lemon juice. Give this strawberry a good sir and let it sit for 2 hours at room temperature. After two hours, the strawberries will have let go of their juice and created a yummy syrup.",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':8
			}]
			
		}
	];

}