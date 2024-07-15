
import React, {  Component } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";

import CustomCalendar from '../components/CustomCalendar';
import {getWorkingHours } from '../database/DatabaseConnection';
import { useState, useEffect } from 'react';
import CustomAgendaView from '../components/timeSheet/CustomAgendaView';
import CustomWorkingHoursEvent from '../components/timeSheet/CustomWorkingHoursEvent';
import { Views } from 'react-big-calendar';
import WorkingHoursModal from '../components/timeSheet/WorkingHoursModal.js';


export default function TimeSheet() {

    const [workingHours, setWorkingHours] = useState([]);
    const [isWorkingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);

    useEffect(() => {
        getWorkingHours().then((result) => {setWorkingHours(result)});
    }, []);

    const openWorkingHoursModal = () => {
        setWorkingHoursModalOpen(true);
        console.log(workingHours);
    }

    return (
        <div className='TimeSheetContent'>
            <>
                <h1>Stundenzettel</h1>
                <button onClick={ openWorkingHoursModal}>Stunden eintragen</button>
                <CustomCalendar
                    key={workingHours.length}
                    events={workingHours}
                    customEvent={CustomWorkingHoursEvent}
                    views={{ month: true, agenda: CustomAgendaView }}
                    defaultView={Views.AGENDA}
                />
            </>
            <WorkingHoursModal
                isOpen={isWorkingHoursModalOpen}
                onCancel={ () => setWorkingHoursModalOpen(false)}
            />
        </div>
    );
}
    
