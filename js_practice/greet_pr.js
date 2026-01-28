let name = "Khushi";

let obj = {
    name: "Mimansa",
    greet1: (name) => {console.log("Greet1: ", this.name, name);},
    greet2: function(name){console.log("Greet2: ", this.name, name);},
    greet3: function greet(name){"Greet3: ", console.log(this.name, name);},
    
    greet4: () => {console.log("Greet4: ", this.name);},
    greet5: function(){console.log("Greet5: ", this.name);},
    greet6: function greet(){"Greet6: ", console.log(this.name);},
    greet7(name){
        console.log("Greet7: ", this.name, name);
    },
    greet8(){
        console.log("Greet8: ", this.name);
    }
}

// trying different types of functions to check which references does the 'this' keyword take
console.log(obj.greet1("Mangesh"));
console.log(obj.greet2("Mangesh"));
console.log(obj.greet3("Mangesh"));
console.log(obj.greet4());
console.log(obj.greet5());
console.log(obj.greet6());
console.log(obj.greet7("Mangesh"));
console.log(obj.greet8());
