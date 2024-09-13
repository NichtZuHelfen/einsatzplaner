
import { useMemo, useReducer, useState } from 'react';
import ReactModal from 'react-modal';
import { breakDurationStringToMinutes, formatDate, formatTime, getShiftData, minutesToDurationString } from '../../logic/Utils';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


export default function WorkingHoursModal({isOpen, event, onSubmitWorkingHours, onDeleteEvent, onCancel }) {

    const SHIFTS = require('../../constants/Shifts.json');

    var date = event ? formatDate(event.date) : undefined;
    const [dateError, setDateError] = useState('');

    const [workspace, setWorkspace] = useState(event ? event.workspace : undefined);
    const [start, setStart] = useState(event ? formatTime(event.start) : Object.values(SHIFTS)[0].start);
    const [end, setEnd] = useState(event ? formatTime(event.end) : Object.values(SHIFTS)[0].end);
    const [breakDuration, setBreakDuration] = useState(event ? minutesToDurationString(event.breakDuration) : Object.values(SHIFTS)[0].breakDuration);
    const [task, setTask] = useState(event ? event.task : Object.values(SHIFTS)[0].task);


    const options = useMemo(() => Object.values(SHIFTS).map(value => 
        <option value={ value.shiftID}>{value.name}</option>
    ));

    const validateForm = (date) => {
        console.log(date);
        var error = "";
        var isValid = true;

        if (date === '') {
            error = 'Bitte ein Datum angeben!';
            isValid = false;
        }

        setDateError(error);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson);
        if (validateForm(formJson.date)) {
            formJson.start = new Date(formJson.date + "T" + formJson.start);
            formJson.end = new Date(formJson.date + "T" + formJson.end);
            formJson.date = new Date(formJson.date);
            formJson.breakDuration = breakDurationStringToMinutes(formJson.breakDuration);

            onSubmitWorkingHours(formJson);
        }
    } 

    const onWorkspaceChange = (e) => {
        const shiftData = getShiftData(e.target.value);

        setWorkspace(shiftData.name);
        setStart(shiftData.start);
        setEnd(shiftData.end);
        setBreakDuration(shiftData.breakDuration);
        setTask(shiftData.task);
    }
    
    return (
        <ReactModal 
            className={"Modal"}
            overlayClassName={"ModalOverlay"}
            isOpen={isOpen}
            ariaHideApp={false}
      >
            <div className='ModalContainer WorkingHoursModal'>
                <div class="ModalTitle">
                    <h1>Stunden erfassen</h1>
                    { event? <IconButton title="Löschen" onClick={onDeleteEvent}>
                        <DeleteIcon/>
                    </IconButton> : <div/>}
                    
                </div>
                <form id="workingHoursForm" method="post" onSubmit={handleSubmit}>
                    <div>
                        <p>Datum</p>
                        <input input="datum" type="date" name="date" defaultValue={date} />
                    </div>
                    {dateError && <div class="Error">{dateError}</div>}
                    <div>
                        <p>Bereich</p>
                        <select name="workspace" onChange={onWorkspaceChange} defaultValue={workspace }>
                            { options }
                        </select>
                    </div>
                    <div>
                        <p>Start</p>
                        <input className='HourInput' type="time" name="start" value={ start} onChange={(e)=>setStart(e.target.value)}/>
                        <p>Ende</p>
                        <input className='HourInput' type="time" name="end" value={ end } onChange={(e)=>setEnd(e.target.value)}/>
                    </div>
                    <div>
                        <p>Pause</p>
                        <input className="MinutesInput" type="time" name="breakDuration" value={ breakDuration }  onChange={(e)=>setBreakDuration(e.target.value)}/>
                    </div>
                    <div>
                        <p>Aufgabe</p>
                        <input className="TaskInput" type="text" name="task" value={ task } onChange={(e)=>setTask(e.target.value)}/>
                    </div>
                </form>
                <div style={{ "height": "100%" }}/>
                    <button type="submit" form="workingHoursForm">{event? "Speichern" : "Hinzufügen"}</button>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </ReactModal>
        
    )
}