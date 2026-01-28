// Problem 4: API Response Processor

/*
QUESTIONS
1. Safely read API data 
    a. Handle missing nested fields without causing runtime errors. 

2. Normalize the responses 
    a. Convert backend-style keys to frontend-friendly keys. 
    b. Format string values consistently. 

3. Generate a summary 
    a. Count total API requests. 
    b. Count successful responses. 

4. Organize processing logic 
    a. Store processed data inside an object. 
    b. Use object methods and this to manage state. 

5. Preserve data integrity 
    a. Do not mutate the original API response array. 

*/


let mockData = [ { request_id: "REQ_101", payload: { user: { id: 1, name: "john doe", email: "john@example.com" } }, status: "success" }, { request_id: "REQ_102", payload: {}, status: "failed" } ]


// preventing the mutation of data
// creating a copy of data
// this loses the prototype chain, only gets the details.
let apiData = JSON.parse(JSON.stringify(mockData));

console.log("=========FUNCTIONS ONLY===============")
// QUESTION 3a -> GENERATE SUMMARIES: Total number of requests
// count the total number of API requests
// we may count it directly using the .length
// or we may count it on the basis of the unique request ids

// counting on the basis of length
let totalAPIRequestsByLength = apiData.length;
console.log(
    "Total number of API Requests by length: ", 
    totalAPIRequestsByLength
);

// counting on the basis of the uniqueness of the request ids
// we can do this using the map => storing the request ids and searching if it was earlier present or not
// just like the hashmap from java

// count the successful responses
// method 1 using map and reduce -> may be complicated
// it also iterates twice -> not suggested
let totalNumberOfSuccessfulResponses = apiData
    .map(
        (item)=> item.status.toLowerCase()==="success"?1:0
    )
    .reduce(
        (a,b)=>a+b,
        0
    );

// logging to the console
console.log(
    "Total number of successful responses: Method 1:",
    totalNumberOfSuccessfulResponses
);

// method 2 using the forEach loop;
totalNumberOfSuccessfulResponses = 0;
apiData.forEach(
    (item)=>{
        if(item.status.toLowerCase()==="success")
            totalNumberOfSuccessfulResponses++;
    }
);

// logging to the console
console.log(
    "Total number of successful responses: Method 2:",
    totalNumberOfSuccessfulResponses
);

/*
let us assume that in the frontend we will be needing these defined set of keys
- these keys will be accessed from the data and then shown on the frontend side
- I am assuming that we are working on a project where we search for some user
- a fetch request is then sent to the backend which returns data to us about the user
- now we have to display on the frontend, what data is being recieved
- if any part of the data is missing, then how would we handle that.
- e.g. If we take a situation where -> while registeration of the user, the email field was optional
- now, when we fetch user details, we would not get the "email" key, so how would we handle that?

*/

// i was trying to implement using this, but then i omitted this approach
// this be the required keys for the user details
// let definedSetOfKeys = ["id", "name", "email"]
// let processedData = [];


// final approach -> object wise
let processedData = {
    data : [],
    totalNumberOfSuccessfulResponses : 0,
    totalAPIRequestsByLength : 0, 

    normalizeUserDetails : function(userPayLoad){

        let userDetails = {}
        userDetails.id = userPayLoad?.id ?? "Not Available";

        userDetails.name = userPayLoad?.name?.split(" ")
                .map((word) => word.at(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ") ?? "Not available";

        userDetails.email = userPayLoad?.email ?? "Not Available";

        return userDetails;
    },

    normalizeResponse : function(response){

        // normalize the response
        // console.log(response);
        let normalizedResponse = {};
        normalizedResponse.requestId = response?.request_id ?? "Not Available";

        // normalize userPayLoad
        let userPayLoad = response?.payload?.user ?? {};

        normalizedResponse.userDetails = this.normalizeUserDetails(userPayLoad);
        normalizedResponse.status = response?.status ?? "Not Available";

        return normalizedResponse;
    },

    process : function (apiData){

        apiData.forEach(
            res => {
                if(res.status.toLowerCase()==="success"){
                    this.totalNumberOfSuccessfulResponses++;
                }
                // this part can also be omitted, like directly pushing the res if the status is not success
                this.data.push(this.normalizeResponse(res));
                this.totalAPIRequestsByLength++;
            }
        );
    },

    displayData : function(){
        console.log(
            "Processed data: \n", this.data,
            "\nTotal number of requests by length: ", this.totalAPIRequestsByLength,
            "\nTotal number of successful responses: ", this.totalNumberOfSuccessfulResponses
        );
    }
}

// logging to the console the object wise approach
console.log("=======OBJECT WISE===============");
processedData.process(mockData);
processedData.displayData();

// logging orignal data to the console to check the data integrity(data mutation)
console.log("=======ORIGNAL DATA===============");
console.log(mockData);
