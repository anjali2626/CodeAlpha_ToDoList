const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.onclick = () => editTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}



function addTask(text) {
    tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  addTask(taskInput.value.trim());
  taskInput.value = "";
};

renderTasks();
