/*

Problem 3: Dynamic Form Validation System
(DOM Manipulation & Events)

Context
A web page contains a user registration form with multiple input fields such as name, email, and password.

Problem Statement
Create a validation system that dynamically validates user input as the user types and when the form is submitted.

The system should:
    Validate inputs on both input change and form submission
    Display validation feedback visually using CSS classes
    Prevent form submission if any field is invalid
    Use event bubbling instead of attaching individual listeners to each input
*/  


// function to validate name
const validateName = (name)=>{
    
    let validation = document.getElementById("name-validation");

    if(name.trim().length>0){
        name = name.trim();
        if(/\d/.test(name)){  // Returns true if a number is found) -> got this logic online
            //console.log(name);
            return {
                valid:false,
                elem:validation,
                message: "Invalid name: cannot contain digits"
            };
        }else{
            return {
                valid:true,
                elem:validation,
                message: "Valid name!"
            };
        }
        
    }

    return {
        valid:false,
        elem:validation,
        message: ""
    };
}

// function to validate email
const validateEmail = (email)=>{
    
    let validation = document.getElementById("email-validation");

    if(email.trim().length>0){
        email = email.trim();
        if(!email.match("^[a-z0-9]+@[a-z]+[\.][a-z]+$")){ 
            //console.log(email);
            return {
                valid:false,
                elem:validation,
                message: "email must look like \'abc12@xyz.com\'"
            };
        }else{
            //console.log(email);
            return {
                valid:true,
                elem:validation,
                message: "Valid email!"
            };
        }
        
    }

    return {
        valid:false,
        elem:validation,
        message: ""
    };
}


// function to validate the password
const validatePassword = (password)=>{
    
    let validation = document.getElementById("password-validation");

    if(password.trim().length>0){
        if(password.trim().length<8){
            return {
                valid:false,
                elem:validation,
                message: "password must be atleast 8 characters"
            };
        }else{
            return {
                valid:true,
                elem:validation,
                message: "password length valid!"
            };
        }
    }

    return {
        valid:false,
        elem:validation,
        message: ""
    };
}

// function to validate the confirm password field
const validateConfirmPassword = (password)=>{
    
    let validation = document.getElementById("confirm-password-validation");
    let pwd = password.trim();

    if(pwd.length>0){
        if(pwd.length<8){
            return {
                valid:false,
                elem:validation,
                message: "password must be atleast 8 characters"
            };
        }else{
            let ea_password = document.getElementById("password").value.trim();
            if(pwd === ea_password){
                return {
                    valid:true,
                    elem:validation,
                    message: "valid!"
                };
            }
            else{
                return {
                    valid:false,
                    elem:validation,
                    message: "password and confirm password do not match!"
                };
            }
        }
    }

    return {
        valid:false,
        elem:validation,
        message: ""
    };
}

// event bubbling for the form on input
document.getElementById("form").addEventListener("input", (e)=>{
    let targetElement = e.target; // this gives us the target element and not the form element.
    let validation;
    let id = targetElement.getAttribute("id");

    // using switch for the validation according to the element
    switch(id){
        case "name":
            validation = validateName(targetElement.value);
            break;

        case "email":
            validation = validateEmail(targetElement.value);
            break;

        case "password":
            validation = validatePassword(targetElement.value);
            break;

        case "confirm-password":
            validation = validateConfirmPassword(targetElement.value);
            break;

        default:
            validation = {};
        
    }

    // changing the style of the element
    if(validation?.valid){
        validation?.elem?.classList?.add("success");
        validation?.elem?.classList?.remove("error");
    }else{
        validation?.elem?.classList?.add("error");
        validation?.elem?.classList?.remove("success");
    }

    validation.elem.innerText = validation?.message;
});


// event handling for form reset button
document.getElementById("reset-btn").addEventListener("click", (e)=>{
    let all_elem = document.getElementsByClassName("field-validation");
    //console.log(all_elem)
    for(element of all_elem){
        element.innerText = "";
        element?.classList?.remove("success", "error");
    }
});

// function to check the total validity of the form

// if not this way, then we can keep some variable in the outer scope, and then used directly
// it will make sure that the function isnt called again
// but it will create new variables in the scope.
const checkFormValidity = () =>{
    let validname = validateName(document.getElementById("name").value);
    if(!validname.valid){
        alert("Invalid name!");
        return false;
    }

    let validemail = validateEmail(document.getElementById("email").value);
    if(!validemail.valid){
        alert("Invalid email!");
        return false;
    }

    let validpassword = validatePassword(document.getElementById("password").value);
    if(!validpassword.valid){
        alert("Invalid password!");
        return false;
    }

    let validConfirmPassword = validateConfirmPassword(document.getElementById("confirm-password").value);
    if(!validConfirmPassword.valid){
        alert("Invalid Confirm Password");
        return false;
    }

    alert("Form Valid");
    return true;
}

// event handling for form on submission
document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    let validity = checkFormValidity();
    if(validity)
        console.log("Form can be submitted!"); // can submit the form here. we can send requests to our apis and do the needed
})
