const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addTaskBtn = document.getElementById('add-task-btn');
const highPriorityTasks = document.getElementById('high-priority-tasks');
const mediumPriorityTasks = document.getElementById('medium-priority-tasks');
const lowPriorityTasks = document.getElementById('low-priority-tasks');
const completedTasks = document.getElementById('completed-tasks');
const searchInput = document.getElementById('search');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const incompleteTaskCount = document.getElementById('incomplete-task-count');

let tasks = [];

addTaskBtn.addEventListener('click', addTask);
searchInput.addEventListener('input', filterTasks);
darkModeToggle.addEventListener('click', toggleDarkMode);
document.addEventListener('click', handleTaskActions);

function addTask() {
  const taskName = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskName === '') {
    alert('Please enter a task name.');
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    priority: priority,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = '';
}

function renderTasks() {
  highPriorityTasks.innerHTML = '';
  mediumPriorityTasks.innerHTML = '';
  lowPriorityTasks.innerHTML = '';
  completedTasks.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    if (task.completed) {
      completedTasks.appendChild(li);
    } else {
      if (task.priority === 'High') {
        highPriorityTasks.appendChild(li);
      } else if (task.priority === 'Medium') {
        mediumPriorityTasks.appendChild(li);
      } else {
        lowPriorityTasks.appendChild(li);
      }
    }
  });

  updateIncompleteTaskCount();
}

function handleTaskActions(e) {
  if (e.target.classList.contains('complete-btn')) {
    const taskId = parseInt(e.target.closest('li').dataset.id);
    toggleTaskCompletion(taskId);
  } else if (e.target.classList.contains('delete-btn')) {
    const taskId = parseInt(e.target.closest('li').dataset.id);
    deleteTask(taskId);
  }
}

function toggleTaskCompletion(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

function filterTasks() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm)
  );
  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
  highPriorityTasks.innerHTML = '';
  mediumPriorityTasks.innerHTML = '';
  lowPriorityTasks.innerHTML = '';
  completedTasks.innerHTML = '';

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
      <span>${task.name}</span>
      <div>
        <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    if (task.completed) {
      completedTasks.appendChild(li);
    } else {
      if (task.priority === 'High') {
        highPriorityTasks.appendChild(li);
      } else if (task.priority === 'Medium') {
        mediumPriorityTasks.appendChild(li);
      } else {
        lowPriorityTasks.appendChild(li);
      }
    }
  });
}

function updateIncompleteTaskCount() {
  const count = tasks.reduce((acc, task) => (!task.completed ? acc + 1 : acc), 0);
  incompleteTaskCount.textContent = count;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

renderTasks();