var ExampleViewController = function(view, model ) {
 
 this.searchWord = '';
 
//add 1 when plus button is hit
 view.plusButton.click(function(){
 model.setNumberOfGuests(model.getNumberOfGuests() + 1);
 });

//remove 1 when plus button is hit
 view.minusButton.click(function(){
 model.setNumberOfGuests(model.getNumberOfGuests() - 1);
 });



this.refresh = function(){

//remove dish
 view.removeDish.click(function(){
 	
	var id = $(this).attr('id');
 	id = parseInt(id);
	
	//model.setCurrentDish(id);
	
	menu = model.menu;
	var index = menu.indexOf(id);
	menu.splice(index,1);
	

 });	
 
//When the confirm button is hit, hide and show following 
 view.confirmBtn.click(function(){
 	$(searchMenuView).hide();
 	$(dishView).hide();
	$(startView).hide();
 	$(menuOverView).show();
	$(allDishes).hide();
	$(sideMenu).hide();
	$(printPage).hide();



 });	
// clickable images - Go to Single dish view //
view.images.click(function(){
	// get id from clickable picture
	var id = ($(this).attr('id'));
	model.setCurrentDish(id);
	
	//go to dishview
 	$(searchMenuView).hide();
	$(allDishes).hide();
 	$(dishView).show();
	$(menuOverView).hide();
	$(printPage).hide();

 });
 //back to select view
 view.backBtn.click(function(){
 	$(searchMenuView).show();
 	$(allDishes).show();
 	$(dishView).hide();
	$(printPage).hide();
 });
 
 //back editing dinner
 view.goBackBtn.click(function(){
 	$(searchMenuView).show();
 	$(allDishes).show();
 	$(dishView).hide();
    $(menuOverView).hide();
	$(sideMenu).show();
	$(printPage).hide();


 });
 
   //Put the selected Dish to menu
 view.confirmDishBtn.click(function(){

 	var id = $(this).attr('id');

 	id = parseInt(id);
	model.changeId(id);
 });

 //Search Button
  view.searchBtn.click(function(){

	searchWord = $('#searchString').val();
	model.changeSearchWord(searchWord);

 });
 
  view.dropdown.click(function(){
 	var id = $(this).attr('id');	
 	model.setCurrentType(id);
 });
 
 
 view.printBtn.click(function(){
 	$(menuOverView).hide();
	$(printPage).show();
	
 }); 
 
 view.b.click(function(){
 	$(menuOverView).show();
	$(printPage).hide();
	
 }); 
 
 
 }


 this.refresh();
 


}