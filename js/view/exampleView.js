 //ExampleView Object constructor
var ExampleView = function (container, model) {

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
				dish = selected[i];
				totaltPrice = model.getTotalMenuPrice();
				output += totaltPrice;
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
				dish = selected[i];
				dishPrice = model.getPriceOfDish(dish).toFixed(1);
				output += dishPrice +"</br>";				
				
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
					dish = selected[i];
					output += '<span class="remove" id="'+ dish.RecipeID +'"><input type="submit" value="x" class="btn btn-default btn-xs"></span> '+dish.Title +'<br/>';
				}
			}
			return output;
	}
	this.removeDish = container.find('.remove');
	this.dishName.html(this.getNames);
	
	this.dishName.html(this.getNames);


	this.menuOverView = container.find("#menuOverView");

	this.test = function() {
	this.getMenu = function() {
		
		var div = '';
		
		div += '<div class="row"><div class="col-md-12"><center><div><b><h3>My Dinner: <span id="num"></span> people</h3></b>'
        div += '<button class="btn btn-default" onclick="goBackBtn()" type="submit">Go back and edit dinner</button>'
        div += '</div></center></div>';

			var price = 0;
			
			if(model.menu != 0){
				selected = model.menu;
				for(var i=0; i < selected.length; i++){
				dish = selected[i];
				dishPrice = model.getPriceOfDish(dish).toFixed(1);

				price = model.getTotalMenuPrice().toFixed(1);

			 div += '<center><div class="row">';
			 div += "<div class='col-md-3' style='margin: 2% 2% 2% 2%'><center><h2>"+ dish.Title+ "</h2><img src='"+dish.ImageURL+"' width='100%'><br/><h5>"+ dishPrice +" SEK</h5></center></div>";
			 }
			 div += '<div class="col-md-12"><h2>Total price: '+ price +' KR</h2><br><button class="btn btn-default" type="submit" onclick="print()">Print full recipe!</button></div>'; 
			 div += '</div></center>'; 
				
			}
			else{
				div += 'No dishes in menu';
			}
		return div;
		
	
	};
	this.menuOverView.html(this.getMenu);
	
	}
	this.num = container.find("#num");

this.update = function (obj){
		//side menu update
		this.numberOfGuests.html(model.getNumberOfGuests);
		this.totalCost.html(this.fullPrice);
		this.dishPrice.html(this.getPrice);
		this.dishName.html(this.getNames);
		this.removeDish = container.find('.remove');
		this.test();
		this.num = container.find("#num");
		this.num.html(model.getNumberOfGuests);
	}

}