
import { useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { breakDurationStringToMinutes, formatDate, formatTime, getShiftData, minutesToDurationString } from '../../logic/Utils';

export default function WorkingHoursModal({ isOpen, event, onSubmitWorkingHours, onDeleteEvent, onCancel }) {

    const SHIFTS = require('../../constants/Shifts.json');

    const [workspaceChoice, setWorkspaceChoice] = useState(Object.values(SHIFTS)[0].shiftID);

    console.log(workspaceChoice)
    const date = event ? formatDate(event.date): undefined;
    const workspace = event ? event.workspace : undefined;
    const start = event ? formatTime(event.start) : Object.values(SHIFTS)[0].start;
    const end = event ? formatTime(event.end) : Object.values(SHIFTS)[0].end;
    const breakDuration = event ? minutesToDurationString(event.breakDuration) : Object.values(SHIFTS)[0].breakDuration;

    console.log(start, end, breakDuration)
    const options = useMemo(() => Object.values(SHIFTS).map(value => 
        <option value={ value.shiftID}>{value.name}</option>
    ));

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        formJson.start = new Date(formJson.date + "T" + formJson.start);
        formJson.end = new Date(formJson.date + "T" + formJson.end);
        formJson.date = new Date(formJson.date);
        formJson.breakDuration = breakDurationStringToMinutes(formJson.breakDuration);

        console.log(formJson);

        onSubmitWorkingHours(formJson);
    } 
    
    const handleWorkspaceChange = (e) => {
        setWorkspaceChoice(getShiftData(e.target.value));
        //TODO
    }

    return (
        <ReactModal 
        className={"Modal"}
        overlayClassName={"ModalOverlay"}
            isOpen={isOpen}
            ariaHideApp={false}
      >
            <div className='ModalContainer WorkingHoursModal'>
                <h1>Stunden erfassen</h1>
                <form id="workingHoursForm" method="post" onSubmit={handleSubmit}>
                    <div>
                        <p>Datum</p>
                        <input input="datum" type="date" name="date" defaultValue={ date }  />
                    </div>
                    <div>
                        <p>Bereich</p>
                        <select name="workspace" onChange={handleWorkspaceChange} defaultValue={workspace }>
                            { options }
                        </select>
                    </div>
                    <div>
                        <p>Start</p>
                        <input className='HourInput' type="time" name="start" defaultValue={ start}/>
                        <p>Ende</p>
                        <input className='HourInput' type="time" name="end" defaultValue={ end }/>
                    </div>
                    <div>
                        <p>Pause</p>
                        <input className="MinutesInput" type="time" name="breakDuration" defaultValue={ breakDuration }/>
                    </div>
                    <div>
                        <p>Aufgabe</p>
                        <input className="TaskInput" type="text" name="task" />
                    </div>
                </form>
                <div style={{ "height": "100%" }}/>
                    <button type="submit" form="workingHoursForm">{event? "Speichern" : "Hinzufügen"}</button>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </ReactModal>
        
    )
}