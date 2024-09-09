
import { useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { addWorkingHours } from '../../database/DatabaseConnection';
import { breakDurationStringToMinutes, getShiftData } from '../../logic/Utils';

export default function WorkingHoursModal({ isOpen, onSubmitWorkingHours, onDeleteEvent, onCancel }) {

    const SHIFTS = require('../../constants/Shifts.json');

    const [defaultStart, setDefaultStart] = useState(Object.values(SHIFTS)[0].start);
    const [defaultEnd, setDefaultEnd] = useState(Object.values(SHIFTS)[0].end);
    const [defaultBreak, setDefaultBreak] = useState(Object.values(SHIFTS)[0].breakDuration);

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
        const shift = getShiftData(e.target.value);
        setDefaultStart(shift.start);
        setDefaultEnd(shift.end);
        setDefaultBreak(shift.breakDuration);
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
                        <input input="datum" type="date" name="date" />
                    </div>
                    <div>
                        <p>Bereich</p>
                        <select name="workspace" onChange={handleWorkspaceChange}>
                            { options }
                        </select>
                    </div>
                    <div>
                        <p>Start</p>
                        <input className='HourInput' type="time" name="start" value={ defaultStart} />
                        <p>Ende</p>
                        <input className='HourInput' type="time" name="end" value={ defaultEnd}/>
                    </div>
                    <div>
                        <p>Pause</p>
                        <input className="MinutesInput" type="time" name="breakDuration" value={ defaultBreak} />
                    </div>
                    <div>
                        <p>Aufgabe</p>
                        <input className="TaskInput" type="text" name="task" />
                    </div>
                </form>
                <div style={{ "height": "100%" }}/>
                    <button type="submit" form="workingHoursForm">Hinzufügen</button>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </ReactModal>
        
    )
}