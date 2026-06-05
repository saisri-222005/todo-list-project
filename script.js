const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

loadTasks();

addBtn.addEventListener("click", function () {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    createTask(task);
    saveTasks();
    updateStats();

    taskInput.value = "";
});

function createTask(task, completed = false) {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    if (completed) {
        taskText.classList.add("completed");
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskText.addEventListener("click", function () {
        taskText.classList.toggle("completed");
        saveTasks();
        updateStats();
    });

    editBtn.addEventListener("click", function () {
        const newTask = prompt(
            "Edit your task:",
            taskText.textContent
        );

        if (newTask !== null && newTask.trim() !== "") {
            taskText.textContent = newTask.trim();
            saveTasks();
        }
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
        updateStats();
    });
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        const taskText = li.querySelector("span");

        tasks.push({
            text: taskText.textContent,
            completed: taskText.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });

    updateStats();
}

function updateStats() {
    const tasks = document.querySelectorAll("#taskList li");

    const total = tasks.length;

    const completed = document.querySelectorAll(
        "#taskList span.completed"
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}