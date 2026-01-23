import { useState, useEffect } from 'react';

import axios from 'axios';

interface EventBase {
  summary: string,
  id: string
}

interface AllDayTime {
  date: string,
  dateTime?: never,
  timeZone?: never
}

interface PartDayTime {
  date?: never,
  dateTime: string,
  timeZone: string
}

interface EventAllDay extends EventBase {
  start: AllDayTime
  end: AllDayTime
}

interface EventPartDay extends EventBase {
  start: PartDayTime
  end: PartDayTime
}

type Event = EventAllDay | EventPartDay;

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
