// Problem 3: Task Tracker with Prototypes
/*
QUESTIONS

1.	Model tasks correctly
    a.	Create tasks using a constructor function.
    b.	Attach shared methods using prototypes.
2.	Add shared functionality
    a.	Detect whether a task is overdue.
    b.	Format task titles consistently.
3.	Analyze tasks
    a.	Sort tasks by priority.
    b.	Check whether some tasks are overdue.
    c.	Check whether all tasks have valid titles.

*/


// function Task
function Task(id, title,status,priority, dueDate){
    this.id = id;
    this.title = title;
    this.status = status;
    this.priority = priority;
    this.dueDate = dueDate;
}


// adding isOverdue function to the prototype so that it is shared 
Task.prototype.isOverdue = function(){
    let current_date = new Date();
    let dueDate = new Date(this.dueDate);

    // console.log(dueDate);
    // console.log(current_date>dueDate);

    this.overdue = (this.status.toLowerCase()!=="completed" && current_date>dueDate);
}


// adding formatTitle function to the prototype so that it is shared 
Task.prototype.formatTitle = function(){
    
    this.title= this.title.split(" ")
        .map(
            (item) => item.at(0).toUpperCase() + item.slice(1)
        )
        .join(" ");
}

// Task tracker
function TaskTracker(tasks){
    this.orignal_data = tasks;
    this.tasks = [];
}

// creating tasks
TaskTracker.prototype.createTasks = function(){
    this.orignal_data.forEach(
        task => this.tasks.push(
            new Task(task.id, task.title, task.status, task.priority, task.dueDate)
        )
    );
};

// sort callback function
// sort objects on the basis of priority
// considering 1 -> higher priority n-> lower_priority    
// sorted from higher priority to lower priority
TaskTracker.prototype.callBackSortFunction = function(task1, task2){
    if(task1.priority>task2.priority)
        return 1;
    if(task1.priority<task2.priority)
        return -1;
    return 0;
};

// sort function
TaskTracker.prototype.sortTaskByPriority = function(){
        this.tasks.sort(this.callBackSortFunction);
    };


// adding shared functionality for all tasks
TaskTracker.prototype.addSharedFunctionality = function(){
    this.tasks.forEach(
        task => {
            task.isOverdue();
            task.formatTitle();

            // can also be called using the following statement
            //Task.prototype.isOverdue.call(task); 
        }
    );
};

// analysis of all tasks in this task tracker
TaskTracker.prototype.analyzeTasks = function(){
    
    // are some tasks overdue
    let someTasksOverdue = this.tasks.some(
        task=>task.overdue
    );

    console.log(
        "Are some tasks overdue: ",
        someTasksOverdue?"YES":"NO"
    );

    // are all title valid for tasks
    let allTtitleValid = this.tasks.every(
        task => task.title.length>0
    );

    console.log(
        "Is the title of every task valid: ",
        allTtitleValid?"YES":"NO"
    );
}

// display data about all the tasks in detail
TaskTracker.prototype.displayTasks = function(){

    console.log("Task data is as follows: ");

    this.tasks.forEach(
        task => {
            console.log(
                "Task type:", typeof task,
                "\nTask id: ", task.id,
                "\nTask title: ", task.title,
                "\nTask status: ", task.status,
                "\nTask dueDate: ", task.dueDate,
                "\nTask priority: ", task.priority,
                "\nTask overdue: ", task.overdue,
            );
        }  

    );
}

// creating a caller function which will directly call the rest of the functions and solve te question
TaskTracker.prototype.solveQuestion = function(){
    this.createTasks();
    this.addSharedFunctionality();
    this.sortTaskByPriority();
    this.analyzeTasks();    
    this.displayTasks();
    
}


// given mock_data for usage and code creation
mock_data = [
  {
    id: 1,
    title: "submit report",
    status: "completed",
    priority: 2,
    dueDate: "2025-01-10"
  },
  {
    id: 2,
    title: "fix login bug",
    status: "pending",
    priority: 1,
    dueDate: "2025-01-05"
  },
  {
    id: 3,
    title: "update docs",
    status: "pending",
    priority: 3,
    dueDate: "2025-01-20"
  }
]


// creating a tasktracker and then within it creating multiple tasks
let taskTracker = new TaskTracker(mock_data);

// solve the question.
taskTracker.solveQuestion();

