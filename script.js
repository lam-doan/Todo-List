// retrieve todo from local storage or initial an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const taskInput = document.getElementById("taskInput");
const todoList  = document.getElementById("todoList");
const addButton = document.querySelector(".btn");

// initialize
document.addEventListener("DOMContentLoaded", function() {
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", function(event)  {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    displayTask();
});

function addTask() {
    const new_task = taskInput.value.trim();
    if (new_task !== "") {
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
                <input type="checkbox"
                class="todo-checkbox"
                id="input-${index}" ${item.disabled ? "checked" : ""
            }>
            <p id="todo-${index}" class="${item.disabled ? "disabled" : ""
            }" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p)
    });
}

function editTask(index) {
    const todoItem     = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
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

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTask();
}
function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}




