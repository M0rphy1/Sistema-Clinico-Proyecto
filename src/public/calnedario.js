// Importar FullCalendar y sus plugins
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // opcional

// Estilos (importa los estilos necesarios)
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

// Aquí puedes seguir con el código de configuración del calendario, como se mostró anteriormente
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ], // opcional
        initialView: 'dayGridMonth',
        locale: 'es',
        events: '/api/citas', // ejemplo de fuente de eventos
        editable: false,
        droppable: false,
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
        },
        eventClick: function(info) {
            // Acciones al hacer clic en un evento (opcional)
        }
    });

    calendar.render(); // Renderizar el calendario
});
