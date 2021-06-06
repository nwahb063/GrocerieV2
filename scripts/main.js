function navSelected(navVis, navHid){
	var s1 = document.getElementById(navVis);
	var s2 = document.getElementById(navHid);
	s1.style.display = "flex";
	s2.style.display = "none";

	if(navVis == "Cart") {
		showItemCart();
	}
}

// #sidenav-selected {
// 	color: #f1f1f1;
//   }


// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

	if(tabName == "Cart") {
		showItemCart();
	}
}


	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2, slct3) {
    var s1 = document.getElementById(slct1);
	var s2 = document.getElementById(slct2);
	var s3 = document.getElementById(slct3);
	

	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, s1.value, s3.checked);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	// Sort Array
	optionArray.sort(function(a, b) {
		if (a.price < b.price) {
        	return -1;
		}
		if (a.price > b.price) {
			return 1;
		}
	});


	for (i = 0; i < optionArray.length; i++) {
			
		var productName = optionArray[i].name;
		var productPrice = optionArray[i].price;

		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		s2.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName + " " + productPrice + " $"));
		s2.appendChild(label);
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));    
	}
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";


	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));


	

	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
}

function showItemCart() {

	// build list of selected item
	var chosenProducts = [];
	var para = document.createElement("P");
	para.innerHTML = "You selected : \n";
	para.appendChild(document.createElement("br"));
	var ele = document.getElementsByName("product");
	var c = document.getElementById('displayCart');
	c.innerHTML = "";


	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			var img = document.createElement('img');
			img.src = 'icon/' + ele[i].value + '.png';
			img.style.width = "50px";
			img.style.height = "50px";
			para.appendChild(img);

			var bold = document.createElement('strong'),
			textnode = document.createTextNode(ele[i].value); 
			bold.appendChild(textnode);
			para.appendChild(bold);

			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}


	if (ele.length > 0) {
		// add paragraph and total price
		c.appendChild(para);
		c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts).toFixed(2) + " $"));
	} else {
		var bold = document.createElement('strong'),
		textnode = document.createTextNode("There is no item in your cart \n");
		bold.appendChild(textnode);
		c.appendChild(bold);
	}
}