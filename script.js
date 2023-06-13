const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value;

  if (taskText.trim() !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerText = taskText;

    taskItem.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
    });

    taskItem.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      taskItem.remove();
    });

    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
});
