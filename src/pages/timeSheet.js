
import React, {  Component } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";

import CustomCalendar from '../components/CustomCalendar';
import { getEvents } from '../database/DatabaseConnection';
import { useState, useEffect } from 'react';
import CustomAgendaView from '../components/timeSheet/CustomAgendaView';
import CustomWorkingHoursEvent from '../components/timeSheet/CustomWorkingHoursEvent';
import { Views } from 'react-big-calendar';

const TimeSheet =  () => {

    const [events, setEvents] = useState([]);

    useEffect(() => { 
        getEvents().then((result) => setEvents(result));
    }, []);

    return <div>
        <h1>Stundenzettel</h1>
        <button>Stunden eintragen</button>
        <CustomCalendar
            key={events.length}
            events={events}
            customEvent={CustomWorkingHoursEvent}
            views={{ month: true, agenda: CustomAgendaView }}
            defaultView={Views.AGENDA}
        />
    </div>; 

};
 
export default TimeSheet;