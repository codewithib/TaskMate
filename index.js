// grabbing all html element
const addBtn = document.querySelector(".add");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".task-list");
const clearBtn = document.querySelector(".clear");


// Creating add task function
const addTask = (event) => {
    if (event) event.preventDefault();

    let taskText = taskInput.value.trim();

    // Alert to show if task field is empty
    if (taskText === "") {
        alert("Please input your task");
        return;
    }

    // Create and add task
    createTaskElement(taskText, false);

    //Clear input field
    taskInput.value = "";

    // Save task to localStorage
    saveTask();
}

// Function to create task element

const createTaskElement = (taskText, isCompleted = false) => {
    let li = document.createElement("li");
    li.classList.toggle("list");


    // Create span for the task text
    let taskTextSpan = document.createElement("span");
    taskTextSpan.classList.add("task-text");
    taskTextSpan.textContent = taskText;
    li.appendChild(taskTextSpan);

    if (isCompleted) {
        li.classList.add("completed");
    }


    // Creating a div to group check and delete button
    let delCheckContainer = document.createElement("div");
    delCheckContainer.classList.toggle("del-check-container");
    li.appendChild(delCheckContainer);

    taskList.appendChild(li);
    inProgressCounter();
    allTaskCounter();

    // Create a delete button for individual task
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(221, 221, 221, 0.6)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
    deleteBtn.classList.toggle("icon-btn");
    delCheckContainer.appendChild(deleteBtn);
    deleteBtn.addEventListener ("click", (event) => {
        if (event.target !== li || li.classList.includes("completed")) {
            if (confirm("are you sure you want to delete this task")) {
                li.remove();
                updateCounter();
                inProgressCounter();
                allTaskCounter();
                saveTask();
            }
        }

        
    });

    // Create complete button for task

    let completeBtn = document.createElement("button");
    completeBtn.classList.toggle("icon-btn")

    // Define initial (unchecked) SVG
    let uncheckedSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00FFC4"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';

    // Define checked SVG
    let checkedSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00FFC4"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';

    // Set initial state
    let isChecked = isCompleted;
    completeBtn.innerHTML = isChecked ? checkedSVG : uncheckedSVG;
    delCheckContainer.appendChild(completeBtn);

    // Toggle event listener

    completeBtn.addEventListener("click", () => {
        isChecked = !isChecked; // Toggle boolean state
        completeBtn.innerHTML = isChecked ? checkedSVG : uncheckedSVG;
        li.classList.toggle("completed");
        updateCounter();
        inProgressCounter();
        saveTask();
    });


}

// Creating delete tasks function
const deleteTask = (event) => {
    event.preventDefault();
    if (taskList.children.length > 0) {
        if (confirm("Are you sure you want to remove all task?")) {
            taskList.innerHTML = "";
            updateCounter();
            inProgressCounter();
            allTaskCounter();
            saveTask();
            
        }
    }
}

// function counter to display in progress task
const inProgressCounter = () => {
    let displayInProgress = document.querySelector("span.in-progress");
    let inProgress = document.querySelectorAll("li:not(.completed").length;
    displayInProgress.textContent = inProgress;
 
} 

// function to update counter

const updateCounter = () => {
    let displayDone = document.querySelector("span.done");
    let completedTasks = document.querySelectorAll(".completed").length;
    displayDone.textContent = completedTasks;
 

}

// Function to calculate all total task

const allTaskCounter = () => {
    let totalDisplay = document.querySelector("span.total");
    let totalTask = document.querySelectorAll("li").length;
    totalDisplay.textContent = totalTask;
    

}

// function to save task to localStorage

const saveTask = () => {
    let tasks = [];
    let getItems = taskList.querySelectorAll("li");
    for (let item of getItems) {
        tasks.push({
            text: item.childNodes[0].textContent.trim(),
            completed: item.classList.contains("completed")
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load saved task from localStorage to page

const loadTask = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (let task of tasks) {
        if (typeof task === 'string') {
            createTaskElement(task);
        } else {
            createTaskElement(task.text, task.completed);
        }
        
    }

    updateCounter();
}

loadTask();




// Calling function for event adding task
addBtn.addEventListener("click", (addTask));
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask(event);
    }
});

// Calling function for delete task
clearBtn.addEventListener("click", deleteTask);

