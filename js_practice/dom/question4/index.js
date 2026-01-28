/*
Problem 4: Recently Viewed Items Tracker 
(DOM & Browser Storage APIs) 

Context 
An application displays a list of products. When a user clicks on a product, it should be added to a “recently viewed” list. 

Problem Statement 
Implement functionality to track and display recently viewed products with browser persistence. 

The system should: 
    - Track the last 5 viewed products 
    - Avoid duplicate entries 
    - Persist data using localStorage 
    - Use sessionStorage for session-specific metadata 
    - Safely handle missing or corrupted stored data 
    - Update the DOM dynamically when items are viewed 
*/

// local storage keys
const keyRecent = "recentlyViewed";
const keyProduct = "allProducts";

// session storage keys
const keySessionCount = "sessionCount";

// save in session storage
const saveSessionDetails = (key, value) =>{
    try{
        sessionStorage.setItem(key, value);
    }catch(error){
        console.error("Error in saving in session storage: ", error);
    }
}

// get from session storage
const getSessionDetails = (key, defaultVal) =>{
    try{
        return sessionStorage.getItem(key) || defaultVal;
    }catch(error){
        console.error("Error in getting session storage details: ", error);
        return defaultVal;
    }
}

// save in local storage
const saveLocalDetails = (key, value) =>{
    try{
        localStorage.setItem(key, JSON.stringify(value));
    }catch(error){
        console.error("Error in saving in local storage: ", error);
    }
}

// get from local storage
const getLocalDetails = (key, defaultVal) =>{
    try{
        return JSON.parse(localStorage.getItem(key)) || defaultVal;
    }catch(error){
        console.error("Error in getting local storage details: ", error);
        return defaultVal;
    }
}


const renderRecentlyViewed = ()=> {

    let session = document.getElementById("session-count");
    session.innerHTML = `Session count : ${getSessionDetails(keySessionCount, 0)}`;

    let container = document.getElementById("recent-products-container");
    container.innerHTML = "";


    getLocalDetails(keyRecent, []).forEach(
        prod =>{
            const article = document.createElement("article");
            article.innerHTML = `
            <ul>
                <li>Product: <strong>${prod.name}</strong></li>
                <li>Cost: <strong>${prod.cost}</strong></li>
            </ul>
            `;
            container.appendChild(article);
        }
    )
}

document.querySelectorAll(".view-btn").forEach(button => {
    button.addEventListener("click", (event)=>{
        let prodId = event.target.id;
        const allProds = getLocalDetails(keyProduct, {});
        
        let recentlyViewed = getLocalDetails(keyRecent, []);

        let newRecents = recentlyViewed.filter(i => i.id!==prodId);
        newRecents.unshift(allProds[prodId]);
        
        //console.log(newRecents);
        saveLocalDetails(keyRecent, newRecents.slice(0,5));
        saveSessionDetails(keySessionCount, Number(getSessionDetails(keySessionCount, 0)) + 1);

        renderRecentlyViewed();

        
    })
});

document.getElementById("reset-btn").addEventListener("click", (event)=>{
    saveLocalDetails(keyRecent, []);
    renderRecentlyViewed();
})


document.addEventListener("DOMContentLoaded", ()=>{
    let allProds = document.querySelectorAll("#products article");
    let products = {};
    allProds.forEach(
        product =>{
            
            let id = product.getAttribute("prod");
            productDetails = product.querySelectorAll("ul li");
            let name = productDetails[0].innerText.split(":")[1].trim();
            let cost = productDetails[1].innerText.split(":")[1].trim();

            products[id] = {
                    id:id,
                    name: name,
                    cost:cost
                }
        }
    );

    saveLocalDetails(keyProduct, products);
    saveSessionDetails(keySessionCount, 0);
    renderRecentlyViewed();
});
