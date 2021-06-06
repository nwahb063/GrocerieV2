// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

function onClickCategory(id, slct) {
	var s1 = document.getElementById(id);
	var s2 = document.getElementById(slct);

	var checkedOrganicProduct = document.getElementById("OrganicProduct");
	var checkedVegeterian = document.getElementById("sans_lactose");
	var checkedGlutenFree = document.getElementById("allergie_noix");
	
	if(Number.isInteger(id)){
		populateListProduct(s2, categorie, checkedOrganicProduct.checked, checkedSans_lactose.checked, checkedAllergie_noix.checked);
	}else {
		for (let i=0; i<categorie.length; i++) {
			if (categorie[i].name === id){
				if(categorie[i].selected == false){
					s1.style.color = "green";
					categorie[i].selected = true;
					populateListProduct(s2, categorie, checkedOrganicProduct.checked, checkedSans_lactose.checked, checkedAllergie_noix.checked);
					break;
				}else {
					s1.style.color = "black";
					categorie[i].selected = false;
					populateListProduct(s2, categorie, checkedOrganicProduct.checked, checkedSans_lactose.checked, checkedAllergie_noix.checked);
					break;
				}
			}
		}
	}
}

 function populateListProduct(s2, arrayCategorie, checkedOrganicProduct, checkedSans_lactose , checkedAllergie_noix){
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";

	// obtain a reduced list of products based on restrictions
	var optionArray = restrictListProducts(products, arrayCategorie, checkedOrganicProduct, checkedSans_lactose , checkedGlutenFree);

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
		var productImage = optionArray[i].img;

		var img = document.createElement('img');
		img.src = productImage;
		img.style.width = "50px";
		img.style.height = "50px";
		s2.appendChild(img);

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

var categorie = [
	{
		name: "Pains",
		selected: false
	},
	{
		name: "Viandes",
		selected: false
	},
	{
		name: "Legumes",
		selected: false
	},
	{
		name: "Fruits",
		selected: false
	},
	{
		name: "Produits Laitiers",
		selected: false
	},
];


var products = [
	{
		name: "Pain",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: false,
		price: 1.99,
		category: "Pains"
	},	{
		name: "Tomate",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: false,
		price: 1.99,
		category: "Legumes"
	},
	{
		name: "Lait",
		img: "",
		sans_lactose: false,
		allergie_noix: true,
		organic: false,
		price: 2.99,
		category: "Produits Laitiers"
	},
	{
		name: "Orange",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: false,
		price: 3.99,
		category: "Fruits"
	},
	{
		name: "brocoli",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: true,
		price: 3.99,
		category: "Legumes"
	},
	{
		name: "Fromage",
		img: "",
		sans_lactose: false,
		allergie_noix: true,
		organic: false,
		price: 3.99,
		category: "Produits Laitiers"
	},
	{
		name: "Yaourt",
		img: "",
		sans_lactose: false,
		allergie_noix: true,
		organic: false,
		price: 3.99,
		category: "Produits Laitiers"
	},
	{
		name: "Boeuf",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: false,
		price: 2.35,
		category: "Viandes"
	},
	{
		name: "Noix",
		img: "",
		sans_lactose: true,
		allergie_noix: false,
		organic: false,
		price: 4.99,
		category: "Fruits"
	},
	
	{
		name: "Poulet",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: false,
		price: 6.99,
		category: "Viandes"
	},
	{
		name: "Poisson",
		img: "i",
		sans_lactose: true,
		allergie_noix: true,
		organic: false,
		price: 9.99,
		category: "Viandes"
	},
	{
		name: "Laitue",
		img: "",
		sans_lactose: true,
		allergie_noix: true,
		organic: true,
		price: 0.99,
		category: "Legumes"
	},
	
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, arrayCategorie, checkedOrganicProduct, checkedSans_lactose, checkedAllergie_noix) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		var product = { name: null, price: null };
		
		for (let x = 0; x < arrayCategorie.length; x++){
			if(arrayCategorie[x].selected == true) {
				if(prods[i].category == arrayCategorie[x].name) {
					if(checkedOrganicProduct == false && checkedSans_lactose == false && checkedAllergie_noix == false){
						product.name = prods[i].name;
						product.price = prods[i].price;
						product.img = prods[i].img
						product_names.push(product);
					}else {
						if (checkedOrganicProduct == true && checkedSans_lactose == true && checkedAllergie_noix == true){
							if(prods[i].organic == true && prods[i].Sans_lactose == true && prods[i].Allergie_noix == true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;
								product_names.push(product);
							}
						} else if (checkedOrganicProduct == true && checkedAllergie_noix == true) {
							if(prods[i].organic == true && prods[i].Allergie_noix == true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;
								product_names.push(product);
							}
						} else if (checkedSans_lactose == true && checkedAllergie_noix == true) {
							if(prods[i].Sans_lactose == true && prods[i].Allergie_noix== true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;
								product_names.push(product);
							}
						} else if (checkedAllergie_noix == true && checkedOrganicProduct == true) {
							if(prods[i].Allergie_noix == true && prods[i].organic == true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;g
								product_names.push(product);
							}
						} else if (checkedOrganicProduct == true) {
							if(prods[i].organic == true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;
								product_names.push(product);
							}
						} else if (checkedSans_lactose == true) {
							if(prods[i].Sans_lactose == true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;
								product_names.push(product);
							}
						} else if (checkedAllergie_noix == true) {
							if(prods[i].Allergie_noix == true) {
								product.name = prods[i].name;
								product.price = prods[i].price;
								product.img = prods[i].img;
								product_names.push(product);
							}
						}
					}
				}
			}
		}
	}
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}