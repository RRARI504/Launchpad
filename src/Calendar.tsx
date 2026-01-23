import { useState, useEffect } from 'react';

import axios from 'axios';

import type { Event } from '../types/Event.ts';

function Calendar() {
  const [events, setEvents] = useState([] as Event[]);

  const getEvents = async () => {
    try {
      const response = await axios.get('/calendar');
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to get calendar events:', error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <h6>Calendar</h6>
      {events.map((event) => {
        return (
          <div>
            <p>{event.summary}</p>
          </div>
        )
      })}
    </div>
  );
}

export default Calendar;
