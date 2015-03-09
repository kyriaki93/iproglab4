var ExampleView = function (container,model) {

	this.container=container;
	container.hide();
	

	model.addObserver(this);
	
	// Side menu part//
	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.confirmBtn = container.find("#confirm");
	this.sideMenu = container.find("#sideMenu");
	
	this.numberOfGuests.html(model.getNumberOfGuests);
	
	this.totalCost = container.find("#totalCost");
	this.dishName = container.find("#dishName");
	this.dishPrice = container.find("#dishPrice");
	
	this.fullPrice = function() {
			
			var output =0.00;

			if(model.menu == 0){
				output += "0.00";
			}	
			if(model.menu != 0){
				selected = model.menu;
				for(var i=0; i < selected.length; i++){
				one = selected[i];
				output += model.getDishPrice(one);
				
				}
			}

			return output;
				
	}
	
	this.totalCost.html(this.fullPrice);
	
	this.getPrice = function() {
		
		
			var output ='';

			if(model.menu == 0){
				output += "0.00";
			}	
			if(model.menu != 0){
				selected = model.menu;
				for(var i=0; i < selected.length; i++){
				one = selected[i];
				output += model.getDishPrice(one) + "<br>";
				
				}
			}

			return output;
	}
	
	this.dishPrice.html(this.getPrice);
	

	this.getNames = function() {
			var output ='';

			if(model.menu == 0){
				output += "Pending";
			}	
			if(model.menu != 0){
				selected = model.menu;
				for(var i=0; i < selected.length; i++){
					one = selected[i];
					var dish = model.getDish(one);
					output += '<span class="remove" id="'+ one +'"><input type="submit" value="x" class="btn btn-default btn-xs"></span> '+dish.name +'<br/>';
				}
			}
			return output;
	}
	this.removeDish = container.find('.remove');
	this.dishName.html(this.getNames);
	
	this.dishName.html(this.getNames);
	
	///////////////////////////////
	
	
	// Search Menu View //
	this.searchM = container.find('#searchM');
	
	this.searchMenu = function() {
	var div = '';
	div += '<div id="searchMenuView">'
    div += '<h3><b>SELECT DISH</b></h3>'
    div += '<div class="row"><div class="col-md-4"><div class="input-group">'
    div += '<input type="text" id="searchString" class="form-control" placeholder="Enter key words">'
    div += '<span class="input-group-btn">'
    div += '<button id="searchButton" class="btn btn-default" type="button">Search</button></span></div></div>'
    div += '<div class="col-md-4">'
    div += '<select id ="typeSelect" class="form-control" multiple="multiple">'
    div += '<option class="dropdown" id="starter" value"starter">Starter</option>'
    div += '<option class="dropdown" id="main" value="main">Main</option>'
    div += '<option class="dropdown" id="dessert" value="dessert" selected="selected">Dessert</option></select></div></div></div>';
	
	return div;
	}
	
	this.searchM.html(this.searchMenu);
	
	this.dropdown = container.find('.dropdown');
	this.searchBtn = container.find('#searchButton');
	
	
	///////////////////////////////
	
	
	//selectView part//
	this.allDishes = container.find("#allDishes");
		
	this.getDishes = function() {
	
	var selectedType = model.getCurrentType();
	var filter = model.searchWord;
	
	var get = model.getAllDishes(selectedType, filter);
		var div = '';
		div += '<div class="row">';
		for(i=0;i<get.length;i++){
			var dish = get[i];
			div += "<div class='col-md-3' style='margin:1% 1% 0 1%;'><br />"
			div += "<center><img class='images' id='"+ dish.id +"' src=images/"+dish.image+" width=100%></center><br/><br/>";
			div += "<div id='foodhead'><center><h3>"+dish.name+"</h3></center></div>";
			div += "<p>"+dish.description +"</p></div>"
		}
		
		div += "</div><br/><br/><br/><br/><br/></br>";
		return div;
	};
		
	this.allDishes.html(this.getDishes);
	
	
	this.images = container.find('.images');
	
	
	
	///////////////////////////////


	
	//Single dish view//
	this.dishView = container.find("#dishView");
		
	
	this.getDish = function() {
		
	var getId = model.getCurrentDish();
	
	var dish = model.getDish(getId);
	var name = model.getAllIngredients(getId);
	var quantity = model.getQuantity(getId);
	var unit = model.getUnit(getId);
	var price = model.getIngredientPrice(getId);
	var pending = model.pending(getId);
		var div = '';
			div += '<div class="row">';			
			div += "<div class='col-md-5'><div><center><h2>"+ dish.name +"</h2></center></div>"
			div += "<img src=images/"+dish.image+" width=100%><br/><br/>";
			div += "<p>"+dish.description +"</p>"
			div += "<div id='foodhead'><center><button class='btn btn-default' type='submit' id='backBtn' style='margin:0% 0% 10% 0%;'>Back to Select Dish</button></center></div>";
			
		
		
			div += "</div>";
			div += "<div class='row'><div class='col-md-4'><center><h2>Ingredients</h2></center><br><div id='quantity' class='col-md-2'>"+ quantity +"</div><div id='amount' class='col-md-2'>"+ unit +"</div><div id='name' class='col-md-6'>"+ name +"</div><div id='price' class='col-md-2'>"+ price +"</div></div><div id='pending' class='col-md-3'>"+ pending +"<center><span class='confirmDishBtn' id='"+ getId+"'><input class='btn btn-default' type='submit' value='Confirm Dish' style='margin:6% 6% 6% 6%;'></span></center></div>";
		return div;

	};
		
	this.dishView.html(this.getDish);
	
	
	this.backBtn = container.find('#backBtn');
	this.confirmDishBtn = container.find('.confirmDishBtn');
	
	
	
	///////////////////////////////



	//MenuOverView//
	this.menuOverView = container.find("#menuOverView");
	
	this.test = function() {
	this.getMenu = function() {
		
		var div = '';
		
		div += '<div class="row"><div class="col-md-12"><center><div><b><h3>My Dinner: <span id="num"></span> people</h3></b>'
        div += '<button class="btn btn-default" id="goBackBtn" type="submit">Go back and edit dinner</button>'
        div += '</div></center></div>';

			var price = 0;
			
			if(model.menu != 0){
				selected = model.menu;
				for(var i=0; i < selected.length; i++){
				one = selected[i];
				var dish = model.getDish(one);
				var p = model.getDishPrice(one);
			price += p;
			div += '<center><div class="row">';
			div += "<div class='col-md-3' style='margin: 2% 2% 2% 2%'><center><h2>"+ dish.name+ "</h2><img src=images/"+dish.image+" width=100%><br/><h5>"+ p +" SEK</h5></center></div>";
			}
			div += '<div class="col-md-12"><h2>Total price: '+ price +' KR</h2><br><button class="btn btn-default" type="submit" id="print">Print full recipe!</button></div>'; 
			div += '</div></center>'; 
				
			}
			else{
				div += model.currentId;
			}
		return div;
		
	
	};
	this.menuOverView.html(this.getMenu);
	
	}
	this.goBackBtn = container.find('#goBackBtn');
	this.num = container.find("#num");
	this.printBtn = container.find("#print");
	
	
	
	//Print page//



	this.printPage = container.find("#printPage");
	
	this.getPrint = function() {
		var div = '';
		
		div += '<div class="row"><div class="col-md-12"><center><div><b><h3>My Dinner: <span id="num2"></span> people</h3></b>'
        div += '<button class="btn btn-default" id="goBackAgainBtn" type="submit">Go back and edit dinner</button>'
        div += '</div></center></div>';
		if(model.menu != 0){
			selected = model.menu;
			for(var i=0; i < selected.length; i++){
				one = selected[i];
				div += '<div class="row">';					
				var dish = model.getDish(one);
				div += "<div class='col-md-12'><div class='col-md-2' style='margin: 2% 2% 2% 2%'><img src=images/"+dish.image+" width=100%></div><div class='col-md-3'><h2>"+ dish.name+ "</h2><br/><p>"+dish.description+"</p></div><div class='col-md-4'><h2>Preperation</h2><br><p>"+ dish.description +"</p></div></div>";		
			
			div += '</div>';
			}
		}
		else{
			div +='Nothing to print';
		}
		return div;
	};
		
	this.printPage.html(this.getPrint); 
	
	this.num2 = container.find("#num2");
	this.b = container.find("#goBackAgainBtn");

	//When a update is detected --> runs
	this.update = function (obj){
		//side menu update
		this.numberOfGuests.html(model.getNumberOfGuests);
		this.totalCost.html(this.fullPrice);
		this.dishPrice.html(this.getPrice);
		this.dishName.html(this.getNames);
		this.removeDish = container.find('.remove');
		
		//select view update
		this.allDishes.html(this.getDishes);
		this.images = container.find('.images');
		
		//singleDish view update
		this.dishView.html(this.getDish);
		this.backBtn = container.find('#backBtn');
		this.confirmDishBtn = container.find('.confirmDishBtn');

		//menuOverview
		this.test();
		this.goBackBtn = container.find('#goBackBtn');
		this.num = container.find("#num");
		this.printBtn = container.find("#print");
		this.num.html(model.getNumberOfGuests);
		
		//PrintPage
		this.printPage.html(this.getPrint);
		this.num2 = container.find("#num2");
		this.num2.html(model.getNumberOfGuests);
		this.b = container.find("#goBackAgainBtn");

		//refresh controller
		exampleViewController.refresh();
	}




}