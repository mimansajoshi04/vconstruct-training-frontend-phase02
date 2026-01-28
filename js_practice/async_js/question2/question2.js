// AI USE
// Used AI to generate the request data. I just provided the skeleton i.e. the keys

/*
Problem 2: Multi-API Data Aggregator with Timeout
(Asynchronous JavaScript)

Context
An analytics dashboard fetches data from multiple backend services. Some services may respond slowly or fail.

Problem Statement
Implement logic to fetch data from multiple asynchronous APIs concurrently. Each API call should have a timeout limit. If a request exceeds the timeout, it should be treated as a failure without stopping other requests.
The system should:
· Fetch all APIs at the same time
· Apply a timeout to each request
· Combine only successful responses into a final report
· Handle partial failures gracefully

*/


// this is a mock api request wrapped inside promise.
function sendAPIRequest(request, delay){
    // this causes the actual delay just like the apis in backend services
    return new Promise((resolve)=>{
        // console.log(
        //     "REQUEST DETAILS \n", 
        //     request
        // );
        setTimeout(
            () => resolve(
                {
                    requestDetails : request,
                    delay : delay,
                    message :`Mock API took ${delay}ms to execute.`
                }
            ),
            // delay given as input, can be different for different api
            delay
        );
    })
}

// the function that checks for the timer threshold, if the time exceeds then the promise is rejected
function sendRequest(request, threshold){
    
    // this promise and the request starts independently. the first one to give the result decided what would be the result
    return new Promise((resolve, reject)=>{

        // set timer according to the api threshold
        const timer = setTimeout(
            ()=>reject({
                error: `Time limit for this API has expired! Threshold: ${threshold}`,
            }),
            threshold
        );

        // if the request responds first
        request
        .then(
            response =>{
                // clear the timer and resolve the promise
                clearTimeout(timer);
                resolve(response);
            }
        )
        .catch(
            error =>{
                // clear the timer and reject the promise
                clearTimeout(timer);
                reject(error);
            }
        )
    });
}

// function sends api requests concurrently
async function fetchAllAPIs(requestData, delay){
    const requests = [];

    // creating a new promise for all
    requestData.forEach(
        request =>{
            requests.push(
                sendRequest(sendAPIRequest(request,delay), request?.service?.serviceTimeThresholdMs ?? 4500)  
            );
        }
    );

    // counting the total time taken by the script to run
    const time1 = Date.now();
    // promise starts and settles when all do. does not stop other request
    const results = await Promise.allSettled(requests);

    const time2 = Date.now();

    console.log(
        `Time taken by each API: ${delay}`,
        `Time for which the entire script run: ${time2-time1}`
    );
    
    // generate report
    let successfulResponsesReport = [];
    let failedResponsesReport = [];

    results.forEach(
        response =>{
            if(response.status.toLowerCase()==="fulfilled"){
                successfulResponsesReport.push(response);
            }else{
                failedResponsesReport.push(response);
            }
        }
    )

    // returning report
    return {
        successfulResponsesReport : successfulResponsesReport,
        failedResponsesReport : failedResponsesReport
    }
}


// request data, generated using AI, only the skeleton was provided by me
const requestData = [
    {
        id: "REQ_001",
        service: {
            serviceId: 3,
            serviceName: "Fetch User Data",
            serviceTimeThresholdMs: 4000
        }
    },
    {
        id: "REQ_002",
        service: {
            serviceId: 7,
            serviceName: "Update Account Settings",
            serviceTimeThresholdMs: 3000
        }
    },
    {
        id: "REQ_003",
        service: {
            serviceId: 12,
            serviceName: "Process Payment",
            serviceTimeThresholdMs: 5000
        }
    },
    {
        id: "REQ_004",
        service: {
            serviceId: 8,
            serviceName: "Generate Report",
            serviceTimeThresholdMs: 7000
        }
    },
    {
        id: "REQ_005",
        service: {
            serviceId: 15,
            serviceName: "Send Notification",
            serviceTimeThresholdMs: 2000
        }
    },

];


// every request can have its own delay, that can be added to the request data and accessed in the similar way as threshold
let delay = 4500;

// generate report and console.log
async function generateReport(requestData, delay){
    let report = await fetchAllAPIs(requestData, delay);
    console.log(report);
}

// call function
generateReport(requestData, delay)
