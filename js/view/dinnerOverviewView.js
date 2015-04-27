var DinnerOverviewView = function (container, model) {

	model.addObserver(this);


	this.menuOverView = container.find("#menuOverView");
	this.menuOverView.html('heeej');
	
	// this.test = function() {
	// this.getMenu = function() {
		
	// 	var div = '';
		
	// 	div += '<div class="row"><div class="col-md-12"><center><div><b><h3>My Dinner: <span id="num"></span> people</h3></b>'
 //        div += '<button class="btn btn-default" id="goBackBtn" type="submit">Go back and edit dinner</button>'
 //        div += '</div></center></div>';

	// 		var price = 0;
			
	// 		if(model.menu != 0){
	// 			selected = model.menu;
	// 			for(var i=0; i < selected.length; i++){
	// 			one = selected[i];
	// 			var dish = model.getDish(one);
	// 			var p = model.getDishPrice(one);
	// 		price += p;
	// 		div += '<center><div class="row">';
	// 		div += "<div class='col-md-3' style='margin: 2% 2% 2% 2%'><center><h2>"+ dish.name+ "</h2><img src=images/"+dish.image+" width=100%><br/><h5>"+ p +" SEK</h5></center></div>";
	// 		}
	// 		div += '<div class="col-md-12"><h2>Total price: '+ price +' KR</h2><br><button class="btn btn-default" type="submit" id="print">Print full recipe!</button></div>'; 
	// 		div += '</div></center>'; 
				
	// 		}
	// 		else{
	// 			div += model.currentId;
	// 		}
	// 	return div;
		
	
	// };
	// this.menuOverView.html('this.getMenu');
	
	// }
	// this.num = container.find("#num");

	 this.update = function(arg){
	 	this.menuOverView.html('heeej');
	// 	this.test();
	// 	this.num = container.find("#num");
	// 	this.num.html(model.getNumberOfGuests);
	 }
	
}