

// Solving the question on class basis. 
// So that the 5th part of the question: use of *this* keyword would be done.

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

class question1{

    constructor(user_data){
        this.user_data = [];
        this.active_users = [];

        user_data.forEach((user)=>{
            // pushing deep copy of all users

            this.user_data.push({
                ...user, 
                roles : [...user.roles],
            });
        });
    }

    // question 01
    filter_active_users(){
        this.active_users = this.user_data.filter(
            (user)=> user.isActive
        );
    }

    // get the total number of users
    get total_users(){
        return this.user_data.length;
    }

    // get the total number of active users
    get total_active_users(){
        return this.active_users.length;
    }

    solve_question_01(){
        // Logging user_data to the console.
        this.filter_active_users();
        // console.log("Question 01(a): Filtered user data: ", this.active_users);

        // to log to the console the snapshot
        console.log(
            "Question 01(a): Filtered user data: ",
            JSON.parse(JSON.stringify(this.active_users))
        );

        // Logging the number of active user and total users to the console.
        console.log("Question 01(b): Total users: ", this.total_users);
        console.log("Question 01(b): Total active users: ", this.total_active_users);

        
    }

    // question 02a
    format_names(){
        this.active_users.forEach(user=>{
            user.name = user.name
                .toLowerCase()
                .split(" ")
                .map(word => word[0].toUpperCase() + word.slice(1))
                .join(" ");
        });
    }

    solve_question_02a(){
        this.format_names();
        // Logging the derived user_data to the console.
        console.log("Question 02(a): Formatted user names to lowercase: ", this.active_users);
    }

    // question 02b
    derive_age(){
        this.active_users.forEach(user=>{
            user.isAdult = user.age >= 18
        });
    }

    solve_question_02b(){
        this.derive_age();
        // Logging the derived user_data to the console.
        console.log("Question 02(b): Derived property isAdult: ", this.active_users);
    }

    // question 03a
    validate_admin_user(){
        return this.active_users.some(
            user => {
                return user.roles.some(
                    (role) => role.toLowerCase()==="admin"
                );
            }
        );
    }

    solve_question_03a(){

        let is_one_admin = this.validate_admin_user();
        console.log(
            "Question 03(a): Admin user exists: ", 
            is_one_admin ? "YES" : "NO"
        );

    }

    // question 03b
    validate_email_address(){
        let validity = this.active_users.every(
            user =>{
                let email_regex = "[a-z]+@[a-z]+\.[a-z]+"
                let val = user.email.match(email_regex);
                //console.log(val);
                if(val)
                    return true;
                return false;
            }
        );
        //console.log("here", validity);
        return validity;
    }

    solve_question_03b(){
        let all_email_valid = this.validate_email_address();
        console.log(
            "Question 03(b): Does all users have valid email addresses: ", 
            all_email_valid ? "YES" : "NO" 
        );
    }

    //question 04
    calculate_average_age(user_data){
    
        let aggregate_age = 0;
        let total_users = user_data.length;
        for(let user in user_data){
            aggregate_age = aggregate_age + user_data[user].age;
        }

        // console.log(aggregate_age);
        return aggregate_age/total_users;
    }

    solve_question_04(){
        let average_age = this.calculate_average_age(this.active_users); 

        // logging the average age to the console.
        console.log(
            "Question 04(a): Average age of active users: ", 
            average_age
        );
    }

    solve_question(){
        this.solve_question_01();
        this.solve_question_02a();
        this.solve_question_02b();
        this.solve_question_03a();
        this.solve_question_03b();
        this.solve_question_04();
    }
}



// question solution
mock_user_data = [ { id: 1, name: "john doe", email: "john@example.com", age: 22, roles: ["user"], isActive: true

}, { id: 2, name: "jane smith", email: "jane@company.com", age: 17, roles: ["admin"], isActive: true }, { id: 3, name: "mark lee", email: "mark@oldmail", age: 30, roles: ["user"], isActive: false } ]

let solution = new question1(mock_user_data);
solution.solve_question();
