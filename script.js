// retrieve todo from local storage or initial an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
// select the text input field
const taskInput = document.getElementById("taskInput");
// select the task list
const todoList  = document.getElementById("todoList");
// select the Add button
const addButton = document.querySelector(".btn");

// initialize
// run the function when the HTNL content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // when user clicls the "Add" button, the addTask() function runs
    addButton.addEventListener("click", addTask);
    // if the user presses "Enter", addTask() function is triggered
    taskInput.addEventListener("keydown", function(event)  {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    // call display task function
    displayTask();
});

function addTask() {
    // get the text input from taskInput element
    // and remove whitespaces from both sides of a string
    const new_task = taskInput.value.trim();
    // ensure the input is not empty
    if (new_task !== "") {
        // add a new task (an object include 2 properties: text(value) and disabled(bool))
        // to the todo array
        todo.push({
            text: new_task,
            disabled: false,
        });
        saveToLocalStorage();
        taskInput.value = "";
        displayTask();
    }
}

function displayTask() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input 
                    type="checkbox"
                    class="todo-checkbox"
                    id="input-${index}"
                    ${item.disabled ? "checked" : ""}
                >
                <p 
                id="todo-${index}"
                class="${item.disabled ? "disabled" : ""}"
                onclick="editTask(${index})">${item.text}
                </p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            togglenAndDeleteTask(index);
        });
        todoList.appendChild(p)
    });
}

function togglenAndDeleteTask(index) {
    // toogle the completion status
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTask();
    if (todo[index].disabled) {
        setTimeout(() => {
            deleteTask(index);
        }, 1000); 
    }
}

function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTask();
}

function editTask(index) {
    const task     = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    task.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTask();
    });
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
