const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let tasks = [];

// Retrieve tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
  }
});

addButton.addEventListener('click', () => {
  const taskText = taskInput.value;

  if (taskText.trim() !== '') {
    const taskItem = {
      text: taskText,
      completed: false
    };

    tasks.push(taskItem);
    saveTasksToLocalStorage();
    renderTasks();

    taskInput.value = '';
  }
});

taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const selectedTaskIndex = Array.from(taskList.children).indexOf(event.target);
    tasks[selectedTaskIndex].completed = !tasks[selectedTaskIndex].completed;

    saveTasksToLocalStorage();
    renderTasks();
  }
});

taskList.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (event.target.tagName === 'LI') {
    const selectedTaskIndex = Array.from(taskList.children).indexOf(event.target);
    tasks.splice(selectedTaskIndex, 1);

    saveTasksToLocalStorage();
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((taskItem) => {
    const taskElement = document.createElement('li');
    taskElement.innerText = taskItem.text;

    if (taskItem.completed) {
      taskElement.classList.add('completed');
    }

    taskList.appendChild(taskElement);
  });
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}