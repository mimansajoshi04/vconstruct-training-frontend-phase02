
// I HAVE GENERATED THE MOCK USER DATA FROM CHATGPT USING THE FOLLOWING PROMPT
/*
PROMPT:
create a mock user data for 7 users. type: json 
details: 
id : USR_001 
name: <name> 
email: <email mock> 
username:<username> 
dob:<string>

SIMILARLY GENERATED MOCK NOTIFICATION DATA FROM CHATGPT

AI USE
- function readJsonFile (took help to read the file data using the FileReader)
*/

// to read any JSON file
function readJsonFile(file){
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload =()=>{
            try{
                let data = reader.result;
                //console.log(data);
                resolve(JSON.parse(data));
            } catch {
                reject("Could not parse file text");
            }
        };

        reader.onerror = () => reject("File read error");
        reader.readAsText(file);    
    })
}

// function to find which notification to send
function findNotificationToSend(notifications, totalNotifications){
    // generate random number to find a random notification
    let randomIndex = Math.floor(Math.random() * totalNotifications);
    return notifications[randomIndex];
}

// function to generate random failure message
function getRandomFailureMessage(){
    // random failure messages are returned so that we may see different results each time
    const failureMessages = [
        "Oops! Something went wrong",
        "Nope!",
        "Try again!",
        "Failed!",
        "Error!"
    ];

    // similar logic as random notification picking
    let total = failureMessages.length;
    return failureMessages[
        Math.floor(Math.random()*total)
    ];
}

// to decide the success or failure of the message
function decideRandomStatus(user,value){
    // randomValue helps to decide whether we take this reminder response as successful or failed
    let randomValue = Math.random();
    let response;

    // if value >=0.5 success response else failes
    if(randomValue>=0.5){
        // response will be success
        response = {
            ok:true,
            status: "success",
            message: "Reminder successfully sent!",
            notification: value,
            userDetails:user

        }
    }else{
        // response will be failed
        response = {
            ok:false,
            status: "failed",
            message: getRandomFailureMessage(),
            notification:value,
            userDetails:user
        }
    }
    // logging to the console
    //console.log(response);

    // return the response
    return response;
}

// function to send the final reminder
function send(user, notification){
    // MAIN FUNCTION TO BE TAKEN AS CONSIDERATION FOR SUBMISSION
    return new Promise((resolve, reject)=>{
        try{
            // checking user's email validity
            if(user.email?.length>0 && user.email?.match("[a-z0-9]+@[a-z]+\.[a-z]+")){
                let response = decideRandomStatus(user,notification);
                if(!response.ok)
                    // failed to send reminder from the backend
                    reject(response);

                // successfully send the reminder
                resolve(response);
            }
            else if(user.email?.length>0){
                // invalid email format, thus reject
                reject({
                    ok:false,
                    status: "failed", 
                    message: "Invalid email id",
                    userDetails:user
                });
            }
            else{
                // email does not exist, thus reject
                reject({
                    ok:false,
                    status: "failed", 
                    message: "Email id for user does not exist",
                    userDetails:user
                });
            }
        } catch(error){
            // log to the console the error while email validation and notification system
            console.error("Error: ", error);

            // reject this because there was a error sending the reminder to the user
            reject({
                ok:false,
                status:"failed",
                message:"Failed due to internal error",
                userDetails:user
            });
        }
    });
}

// function to send Reminders
async function sendReminders(userData, notifications) {

    // MAIN FUNCTION TO BE TAKEN AS CONSIDERATION FOR SUBMISSION

    // total number of notifications
    let totalNotifications = notifications?.reminders?.length ?? 0;
    
    let totalAttemptedNotifications = 0;
    let totalSuccessfulNotifications = 0;
    let totalFailedNotifications = 0;

    // document element to add details about the user reminders
    sectionElement = document.getElementById("userReminderStatus");

    // send reminders to the people 
    // -> used this iterative approach because the question wanted to send reminders one by one not parallely
    for(user of ( userData?.users ?? [] )){

        // random notification to be sent as reminder
        let notification = findNotificationToSend(notifications?.reminders, totalNotifications);

        // getting all elements to be used during the DOM Manipulation
        const pTag = document.createElement("p"); // for every user
        const heading = document.createElement("h2"); // heading for each user
        const innerP = document.createElement("p"); // the innerHTML for the each user response

        try{
            // using async await for the asynchronous job
            let response = await send(user,notification);
            heading.innerHTML = `Success for ${user.name || user.id}: `;            
            innerP.innerHTML = `
                <p class="userDetails">
                    <h3>User Details</h3>
                    <ul>
                        <li> id: ${response.userDetails.id}</li>
                        <li> name: ${response.userDetails.name}</li>
                        <li> email: ${response.userDetails.email}</li>
                        <li> username: ${response.userDetails.id}</li>
                        <li> dob: ${response.userDetails.id ?? "Not Available"}</li>
                    </ul>
                </p>

                <p class="reminderType">
                    <h3> Reminder Details </h3>
                    <ul>
                        <li>Reminder Name: ${response.notification.reminder_name}</li>
                        <li>Reminder Type: ${response.notification.reminder_type}</li>
                    </ul>
                </p>

                <p class="responseDetails">
                    <h3> Response Details </h3>
                    <ul>
                        <li>"ok": ${response.ok}</li>
                        <li>"status: ${response.status}</li>
                        <li>"message": ${response.message}</li>
                    </ul>
                </p>
            `;
            
            // class name for the styling green background color
            innerP.className = "response successful";
            
            console.log("Positive response: ", response);

            // incrementing the totalSuccessfulNotifications
            totalSuccessfulNotifications++;

        }catch(response){

            heading.innerHTML = `Failed for ${response.userDetails.name || response.userDetails.id}: `
            
            innerP.innerHTML = `
                <p class="userDetails">
                    <h3>User Details</h3>
                    <ul>
                        <li> id: ${response.userDetails.id}</li>
                        <li> name: ${response.userDetails.name}</li>
                        <li> email: ${response.userDetails.email}</li>
                        <li> username: ${response.userDetails.id}</li>
                        <li> dob: ${response.userDetails.id ?? "Not Available"}</li>
                    </ul>
                </p>

                <p class="responseDetails">
                    <h3> Response Details </h3>
                    <ul>
                        <li>"ok": ${response.ok}</li>
                        <li>"status: ${response.status}</li>
                        <li>"message": ${response.message}</li>
                    </ul>
                </p>
            `
            // class name for the styling green background color
            innerP.className = "response failed";

            // logging to the console why this response failed
            console.error("Negative response: ", response);

            // incrementing the totalFailedNotifications
            totalFailedNotifications++;
        }

        // setting class names for styling
        pTag.className = "user";
        
        // appending the elements to the tag
        pTag.appendChild(heading);
        pTag.appendChild(innerP);
        sectionElement.appendChild(pTag);

        // counting total number of reminder notification updates
        totalAttemptedNotifications++;
    }

    // adding summary to the document
    let summaryElement = document.getElementById("summary");

    let head = document.createElement("h2");
    head.innerHTML = "Summary: "

    let attempted = document.createElement("p");
    let successful = document.createElement("p");
    let failed = document.createElement("p");

    attempted.innerHTML = `Attempted reminders: ${totalAttemptedNotifications}`;
    successful.innerHTML = `Successfull reminders: ${totalSuccessfulNotifications}`;
    failed.innerHTML = `Failed reminders: ${totalFailedNotifications}`;

    summaryElement.append(head, attempted,successful,failed);
}

// using DOM for the file inputs because I dont know how to read the file
// I HAVE TAKEN THE HELP FROM AI TO LEARN AND WRITE THE CODE FOR READING THE FILE DETAILS
document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("myForm");
    const userInput = document.getElementById("userMockData");
    const notificationInput = document.getElementById("notificationMockData");

    form.addEventListener("submit", async (e) =>{
        e.preventDefault();
        try{
            // for every new reminder send request this clears the sectionElement so that the previous ones are not seen
            let sectionElement = document.getElementById("userReminderStatus");
            sectionElement.innerHTML = '';

            // similar logic for the summary as above
            let summary = document.getElementById("summary");
            summary.innerHTML = '';
            
            // reading data from the file
            const userData = await readJsonFile(userInput.files[0]);
            const notificationData = await readJsonFile(notificationInput.files[0]);

            // send reminders -> MAIN FUNCTION
            sendReminders(userData, notificationData);
        }catch(err){
            // log to the console the basic error
            console.error("Error reading files:", err);
        }
    });
});
