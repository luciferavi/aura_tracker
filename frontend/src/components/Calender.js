import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const Calendar = () => {
    const [events, setEvents] = useState([]);

    const handleEventAdd = async (eventInfo) => {
        const newEvent = {
            title: eventInfo.event.title,
            start: eventInfo.event.start,
            end: eventInfo.event.end,
        };
        try {
            const response = await axios.post('http://localhost:8000/api/timetable', newEvent);
            setEvents([...events, { ...newEvent, id: response.data.id }]); // Assuming your API returns the event ID
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleEventClick = async (eventInfo) => {
        const title = prompt("Enter new title for the event", eventInfo.event.title);
        if (title) {
            const updatedEvent = {
                id: eventInfo.event.id, // Assuming your event has an ID
                title,
                start: eventInfo.event.start,
                end: eventInfo.event.end,
            };
            try {
                await axios.put(`http://localhost:8000/api/timetable/${updatedEvent.id}`, updatedEvent);
                // Update the events state to reflect the changes
                setEvents((prevEvents) =>
                    prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
                );
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/timetable');
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            eventAdd={handleEventAdd}
            eventClick={handleEventClick} // Add eventClick handler
        />
    );
};

export default Calendar;
