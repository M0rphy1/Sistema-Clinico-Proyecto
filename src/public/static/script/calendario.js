// Función que se llama al cargar la página
window.onload = function () {
    generateCalendar();
    loadTasks(); // Cargar tareas desde localStorage
};

// Función para generar el calendario
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // Limpiar el calendario anterior
    calendar.innerHTML = '';

    // Agregar elementos en blanco para los días antes del primer día del mes
    for (let i = 0; i < firstDayOfWeek; i++) {
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    // Agregar elementos para cada día del mes
    for (let day = 1; day <= totalDays; day++) {
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day; // Mostrar el número del día
        daySquare.id = `day-${day}`;
        calendar.appendChild(daySquare);
    }
}

// Función para cargar tareas desde localStorage
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

                // Agregar evento para clic derecho para eliminar tarea
                taskElement.addEventListener("contextmenu", function (event) {
                    event.preventDefault();
                    deleteTask(taskElement, taskDate);
                });

                // Agregar evento para clic normal para editar tarea
                taskElement.addEventListener('click', function () {
                    editTask(taskElement, taskDate);
                });

                dayElement.appendChild(taskElement);
            });
        }
    }
}

// Función para mostrar la modal de agregar tarea
function showAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'block';
}

// Función para cerrar la modal de agregar tarea
function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

// Función para eliminar una tarea
function deleteTask(taskElement, taskDate) {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
        const dateKey = taskDate.toISOString().split('T')[0]; // Formato de fecha como YYYY-MM-DD
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        if (tasks[dateKey]) {
            tasks[dateKey] = tasks[dateKey].filter(task => task !== taskElement.textContent);
            if (tasks[dateKey].length === 0) {
                delete tasks[dateKey]; // Eliminar la entrada de fecha si no quedan tareas
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        taskElement.parentNode.removeChild(taskElement);
    }
}

// Función para editar una tarea
function editTask(taskElement, taskDate) {
    const newTaskDesc = prompt("Edita tu tarea:", taskElement.textContent);
    if (newTaskDesc !== null && newTaskDesc.trim() !== "") {
        const dateKey = taskDate.toISOString().split('T')[0];
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
        
        // Actualizar la tarea en el objeto de tareas
        if (tasks[dateKey]) {
            const taskIndex = tasks[dateKey].indexOf(taskElement.textContent);
            if (taskIndex !== -1) {
                tasks[dateKey][taskIndex] = newTaskDesc; // Actualizar la descripción de la tarea
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
        taskElement.textContent = newTaskDesc; // Actualizar el elemento visualmente
    }
}

// Función para agregar una tarea
function addTask() {
    const taskDate = new Date(document.getElementById('task-date').value);
    const taskDesc = document.getElementById('task-desc').value.trim();

    if (taskDesc && !isNaN(taskDate.getDate())) {
        const dateKey = taskDate.toISOString().split('T')[0]; // Formato de fecha como YYYY-MM-DD
        const tasks = JSON.parse(localStorage.getItem('tasks')) || {};

        // Agregar la tarea al objeto de tareas
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
                editTask(taskElement, taskDate);
            });

            dayElement.appendChild(taskElement);
        }
        closeAddTaskModal();
    } else {
        alert("¡Por favor ingresa una fecha y una descripción de tarea válidas!");
    }
}

