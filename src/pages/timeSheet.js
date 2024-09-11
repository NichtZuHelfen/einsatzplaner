
import React, {  Component, useMemo } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";

import CustomCalendar from '../components/CustomCalendar';
import {addWorkingHours, getWorkingHours } from '../database/DatabaseConnection';
import { useState, useEffect } from 'react';
import CustomAgendaView from '../components/timeSheet/CustomAgendaView';
import CustomWorkingHoursEvent from '../components/timeSheet/CustomWorkingHoursEvent';
import { Views } from 'react-big-calendar';
import WorkingHoursModal from '../components/timeSheet/WorkingHoursModal.js';


export default function TimeSheet() {

    const [workingHours, setWorkingHours] = useState([]);
    const [isWorkingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
    const [event, setEvent] = useState(undefined);

    useEffect(() => {
        getWorkingHours().then((result) => setWorkingHours(result));
    }, []);

    const openWorkingHoursModal = () => {
        setWorkingHoursModalOpen(true);
    }

    const onSubmitWorkingHours = (dataObject) => { 
        addWorkingHours(dataObject);
        onCancel();
    }

    const onCancel = () => {
        setEvent(undefined);
        setWorkingHoursModalOpen(false);
    }


    const onSelectEntry = (entryID) => {
        setEvent(workingHours.find((wh) => wh.docID === entryID));
        setWorkingHoursModalOpen(true);
    }

    const ProxyAgendaView = ({ ...props}) => { 
        return (<CustomAgendaView {...props} onSelectEntry={onSelectEntry}/>);
    }

    ProxyAgendaView.title = CustomAgendaView.title;
    ProxyAgendaView.navigate = CustomAgendaView.navigate;
    ProxyAgendaView.range = CustomAgendaView.range;


    return (
        <div className='TimeSheetContent'>
            <>
                <h1>Stundenzettel</h1>
                <button onClick={ openWorkingHoursModal}>Stunden eintragen</button>
                <CustomCalendar
                    key={workingHours.length}
                    events={workingHours}
                    customEvent={CustomWorkingHoursEvent}
                    views={{
                        agenda: ProxyAgendaView
                    }}
                    defaultView={Views.AGENDA}
                />
            </>
            <WorkingHoursModal
                isOpen={isWorkingHoursModalOpen}
                event={event}
                onSubmitWorkingHours={onSubmitWorkingHours}
                onCancel={onCancel}
            />
        </div>
    );
}
    
