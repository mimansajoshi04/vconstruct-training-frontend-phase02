
// User data MOCK INPUT
user_data = [ { id: 1, name: "john doe", email: "john@example.com", age: 22, roles: ["user"], isActive: true

}, { id: 2, name: "jane smith", email: "jane@company.com", age: 17, roles: ["admin"], isActive: true }, { id: 3, name: "mark lee", email: "mark@oldmail", age: 30, roles: ["user"], isActive: false } ]


/*
QUESTIONS

1. Filter the data
    a. Work only with users who are active.
    b. Ensure the original data remains unchanged.

2. Normalize user information
    a. Format user names consistently.
    b. Add a derived property indicating whether the user is an adult.

3. Validate conditions
    a. Check whether at least one user has an admin role.
    b. Check whether all active users have valid email addresses.

4. Generate insights
    a. Calculate the average age of active users.

5. Organize logic using objects
    a. Use object methods to generate summaries.
    b. Access all data using the this keyword.

*/

// QUESTION 01:
//Filtering the data
let filtered_user_data = user_data.filter(
    (item)=> item.isActive
);

// Logging user_data to the console.
console.log("Question 01(a): Filtered user data: ", filtered_user_data);

// Logging the number of active user and total users to the console.
console.log("Question 01(b): Total active users: ", filtered_user_data.length);
console.log("Question 01(b): Total users: ", user_data.length);




// QUESTION 02.a
// formatting user names for each item
filtered_user_data.forEach(item=>{
    item.name = item.name.toLowerCase();
});

// Logging the derived user_data to the console.
console.log("Question 02(a): Formatted names for active users: ", filtered_user_data);



// QUESTION 02.b
// deriving property for each item
filtered_user_data.forEach(item=>{
    item.isAdult = item.age >= 18
});

// Logging the derived user_data to the console.
console.log("Question 02(b): Derived property isAdult: ", filtered_user_data);


// QUESTION 03. a
// Searching if there exists atleast one admin user.
let is_one_admin = filtered_user_data.some(
    item => {
        let role = item.roles[0];
        //console.log(role);
        // MULTIPLE USER ROLES POSSIBILITY CHECK.
        return role.toLowerCase() === "admin";
    }
);

//Logging to the console if the admin user exists or not.
console.log(
    "Question 03(a): Admin user exists: ", 
    is_one_admin ? "YES" : "NO"
);


// QUESTION 03.b.

// IGNORE THE FOLLOWING COMMENT
/*filtered_user_data.forEach(item=>{
    let email_regex = "[a-z]+@[a-z]+\.[a-z]+"
    let val = item.email.match(email_regex);
    if(val)
        console.log(val, val.length);
})*/


// Validating if all active users have valid email addresses on the basis of the regex matching.
let all_email_valid = filtered_user_data.every(
    item =>{
        let email_regex = "[a-z]+@[a-z]+\.[a-z]+"
        let val = item.email.match(email_regex);
        if(val)
            return true;
        return false;
    }
);

// Logging to the console about the validation of email addresses.
console.log(
    "Question 03(b): Does all users have valid email addresses: ", 
    all_email_valid ? "YES" : "NO" 
);


// QUESTION 04 a.
// Function declaration to calculate average age
function calculate_average_age(user_data){
    
    let aggregate_age = 0;
    total_users = user_data.length;
    for(user in user_data){
        aggregate_age = aggregate_age + user_data[user].age;
    }

    // console.log(aggregate_age);
    return aggregate_age/total_users;
}

// function call to calculate average age
let average_age = calculate_average_age(filtered_user_data); 

// logging the average age to the console.
console.log(
    "Question 04(a): Average age of active users: ", 
    average_age
);
