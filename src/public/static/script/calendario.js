// Function to call generate calendar on load
window.onload = function () {
    generateCalendar();
    loadTasks(); // Load tasks from localStorage
};

// Function to generate the calendar
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // Clear previous calendar
    calendar.innerHTML = '';

    // Add blank div elements for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    // Add div elements for each day of the month
    for (let day = 1; day <= totalDays; day++) {
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        daySquare.id = `day-${day}`;
        calendar.appendChild(daySquare);
    }
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    for (const [date, taskList] of Object.entries(tasks)) {
        const taskDate = new Date(date);
        const dayId = `day-${taskDate.getDate()}`;
        const dayElement = document.getElementById(dayId);
        if (dayElement) {
            taskList.forEach(taskDesc => {
                const taskElement = document.createElement("div");
                taskElement.className = "task";
                taskElement.textContent = taskDesc;

                // Add event listener for right-click to delete task
                taskElement.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    deleteTask(taskElement, taskDate);
                });

                // Add event listener for regular click to edit task
                taskElement.addEventListener('click', function () {
                    editTask(taskElement);
                });

                dayElement.appendChild(taskElement);
            });
        }
    }
}

// Function to show the add task modal
function showAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'block';
}

// Function to close the add task modal
function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

// Function to delete a task
function deleteTask(taskElement, taskDate) {
    if (confirm("Are you sure you want to delete this task?")) {
        const dateKey = taskDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        if (tasks[dateKey]) {
            tasks[dateKey] = tasks[dateKey].filter(task => task !== taskElement.textContent);
            if (tasks[dateKey].length === 0) {
                delete tasks[dateKey]; // Remove the date entry if no tasks left
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        taskElement.parentNode.removeChild(taskElement);
    }
}

// Function to edit a task
function editTask(taskElement) {
    const newTaskDesc = prompt("Edit your task:", taskElement.textContent);
    if (newTaskDesc !== null && newTaskDesc.trim() !== "") {
        const dateKey = taskElement.parentNode.id.split('-')[1];
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        const taskDate = new Date(new Date().getFullYear(), new Date().getMonth(), dateKey);
        const formattedDate = taskDate.toISOString().split('T')[0];

        if (tasks[formattedDate]) {
            const taskIndex = tasks[formattedDate].indexOf(taskElement.textContent);
            if (taskIndex !== -1) {
                tasks[formattedDate][taskIndex] = newTaskDesc; // Update the task description
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
        taskElement.textContent = newTaskDesc;
    }
}

// Function to add a task
function addTask() {
    const taskDate = new Date(document.getElementById('task-date').value);
    const taskDesc = document.getElementById('task-desc').value.trim();

    if (taskDesc && !isNaN(taskDate.getDate())) {
        const dateKey = taskDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

        // Add the task to the tasks object
        if (!tasks[dateKey]) {
            tasks[dateKey] = [];
        }
        tasks[dateKey].push(taskDesc);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const dayId = `day-${taskDate.getDate()}`;
        const dayElement = document.getElementById(dayId);
        if (dayElement) {
            const taskElement = document.createElement("div");
            taskElement.className = "task";
            taskElement.textContent = taskDesc;

            taskElement.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                deleteTask(taskElement, taskDate);
            });

            taskElement.addEventListener('click', function () {
                editTask(taskElement);
            });

            dayElement.appendChild(taskElement);
        }
        closeAddTaskModal();
    } else {
        alert("Please enter a valid date and task description!");
    }
}
