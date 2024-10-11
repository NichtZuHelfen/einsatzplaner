
import React, {  Component, useMemo } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";

import CustomCalendar from '../components/CustomCalendar';
import {addWorkingHours, convertDataFormats, deleteWorkingHours, getWorkingHours, updateWorkingHours } from '../database/DatabaseConnection';
import { useState, useEffect } from 'react';
import CustomAgendaView from '../components/timeSheet/CustomAgendaView';
import CustomWorkingHoursEvent from '../components/timeSheet/CustomWorkingHoursEvent';
import { Views } from 'react-big-calendar';
import WorkingHoursModal from '../components/timeSheet/WorkingHoursModal.js';
import { generatePDF, getShiftData } from '../logic/Utils.js';
import PDFModal from '../components/timeSheet/PDFModal.js';
import { Button, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function TimeSheet() {
    const [workingHours, setWorkingHours] = useState([]);
    const [isWorkingHoursModalOpen, setWorkingHoursModalOpen] = useState(false);
    const [isPDFModalOpen, setPDFModalOpen] = useState(false);
    const [event, setEvent] = useState(undefined);

    useEffect(() => {
        getWorkingHours().then((result) => setWorkingHours(result));
    }, []);

    const onSubmitWorkingHours = async (dataObject) => { 
        if (event) {
            updateWorkingHours(event.docID, dataObject);
            const i = workingHours.findIndex((e) => {
                console.log(event.docID + " " + e.docID)
                return event.docID === e.docID
            });
            console.log("found:")
            console.log(i)
            dataObject.docID = event.docID;
            workingHours[i] = dataObject;
            setWorkingHours(workingHours);
        }
        else {
            dataObject = await addWorkingHours(dataObject);
            console.log(dataObject.docID);
            workingHours.push(convertDataFormats(dataObject));
            console.log(workingHours);
            setWorkingHours(workingHours);
        }
        onCloseWHModal();
    }

    const onDeleteEvent = () => {
        console.log(workingHours.map(r => r.docID));
        getWorkingHours().then((result) => console.log(result.map(r => r.docID)));
        console.log(event.docID)

        deleteWorkingHours(event.docID);

        const i = workingHours.findIndex((e) => event.docID === e.docID);
        workingHours.splice(i, 1);
        setWorkingHours(workingHours);
        onCloseWHModal();
    }

    const onCloseWHModal = () => {
        setEvent(undefined);
        setWorkingHoursModalOpen(false);
    }

    const onClosePDFModal = () => {
        setPDFModalOpen(false);
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
                <div id="WorkingHoursTitle">
                    <h1>Stundenzettel</h1>
                </div>
                <Button onClick={ () => setWorkingHoursModalOpen(true)}>Stunden eintragen</Button>
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
                key={ Date.now()}
                isOpen={isWorkingHoursModalOpen}
                event={event}
                onSubmitWorkingHours={onSubmitWorkingHours}
                onDeleteEvent={ onDeleteEvent }
                onCancel={onCloseWHModal}
            />
            <PDFModal
                isOpen={isPDFModalOpen}
                data={workingHours}
                onCancel={onClosePDFModal}
            />
            <Fab color="primary" aria-label="export">
                <SendIcon onClick={ () => setPDFModalOpen(true) } />
            </Fab>
        </div>
    );
}
    
