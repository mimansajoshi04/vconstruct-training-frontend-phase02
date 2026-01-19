// Pricing logic for a shopping cart
// mock data
data = [ { id: "P101", name: "Laptop", price: 60000.456, quantity: 1, category: "electronics" }, { id: "P102", name: "Mouse", price: 799.99, quantity: 2, category: "electronics" }, { id: "P103", name: "Notebook", price: 99.5, quantity: 3, category: "stationery" } ]

/*
QUESTIONS

1. Prepare cart data
    a. Sort cart items by price.
    b. Locate the first item belonging to a specific category.

2. Validate cart items
    a. Ensure all items have a quantity greater than zero.

3. Calculate pricing
    a. Compute the total cart value.
    b. Apply tax and discount rules.

4. Encapsulate logic
    a. Group pricing logic inside an object.
    b. Use this to access tax rates, discounts, and cart data.

5. Ensure correctness
    a. Round monetary values appropriately.
    b. Do not mutate the original cart data.
*/

// deep copy
sorted_cart_data = JSON.parse(JSON.stringify(data));

//Question 01a
function sort_data( prod1, prod2){

    if(!prod1.price || !prod2.price)
        return 0;

    if(prod1.price>prod2.price)
        return 1;

    if(prod1.price<prod2.price)
        return -1;

    return 0;
}

// sorting the data according to the price
sorted_cart_data.sort(sort_data);

// logging to the console
console.log(
    `Question 01(a): Sorting the data on the basis of price:` ,
    "\n",
    sorted_cart_data
);


// Question 01b
function findFirstProduct(category,sorted_cart_data){
    // finding the very first product w.r.t the given category on the basis of price
    for (let prod of sorted_cart_data){
        if(prod.category.toLowerCase() === category.toLowerCase()){
            return [prod.id, {...prod}];
        }
    }

    return null;
}


// setting a particular category and finding the first product of that category on the basis of price
let category = "electronics";
let [prod_id, firstProductByCategory] = findFirstProduct(category,sorted_cart_data);

// logging to the console information about the first product found
console.log(
    `Question 01(b): First product found for ${category} on the basis of price:\n`, 
    prod_id, 
    "\n", 
    firstProductByCategory
);


// Question 2a
// function to validate the quantity of the every product in the cart
function validate_cart_data(cart_data){
    return cart_data.every(
        (item) => item.quantity>0
    );
}

// checking if the cart is valid
let is_cart_valid = validate_cart_data(sorted_cart_data);

// logging to the console if the cart is valid or not
console.log(
    "Question 02a: Cart validity: ", 
    is_cart_valid?"Valid":"Not Valid"
);


// Question 03a
pricing_object = {
    cart : [],
    tax: 8.5, // default value for tax
    discount: 0, // default value for discount


    // function for computation of the total price value for the cart
    computeTotalCartValue: function(){
        let total_value = 0;
        this.cart.forEach(
            item => {
                total_value = total_value + (item.price*item.quantity);
            }
        );

        // this computation can also be done using the reduce method
        // this.cart.reduce((sum,item)=>sum + item.price*item.quantity, 0);

        return total_value;
    },

    // function for computation of the discounted price
    applyDiscount : function(total_value){
        return total_value * (1-(this.discount/100));
    },

    // function for compuation of price after taxes
    computeTaxes : function(final_price){
        return final_price = final_price * (this.tax/100) + final_price;
    },

    // getter to get the final_price for the cart 
    get final_price_for_cart(){
        let price = this.computeTaxes(
                this.applyDiscount(
                    this.computeTotalCartValue()
                )
            );
        
        // rounding off to 2 decimal places.
        return Math.round(price*100)/100;

    },

    // getter for tax value
    get get_tax(){
        return this.tax;
    },

    // getter for discount value
    get get_discount(){
        return this.discount;
    },

    // setter for tax value
    set set_tax_value(tax_value){
        if(tax_value>100 || tax_value<0){
            console.log("Invalid Tax value");
            return;
        }

        this.tax = tax_value;
    },

    // setter for discount value
    set set_discount_value(discount_value){
        if(discount_value>100 || discount_value<0){
            console.log("Invalid Discount value");
            return;
        }
        this.discount = discount_value;
    },

    // setter for the cart data -> creating a deep copy
    // does not keep the prototype chain. -> DISADVANTAGE
    // may write a recusrive function to create a deep clone, unlike this.
    set cart_data(cart_data){
        //console.log("setting cart data using the setter")
        this.cart = JSON.parse(JSON.stringify(cart_data));
    },

}

// finding the price for the cart
pricing_object.cart_data = sorted_cart_data;

// setting tax or discount values by user
pricing_object.set_tax_value = 10;
pricing_object.set_discount_value = 25;

//logging to the console the price for the cart
console.log(
    `Question 03(Final Price for Cart): 
    \nTaxes: ${pricing_object.get_tax}%
    \nDiscount: ${pricing_object.get_discount}%
    \nPrice: `, 
    pricing_object.final_price_for_cart
);
