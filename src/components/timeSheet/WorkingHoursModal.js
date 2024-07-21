
import { useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { addWorkingHours } from '../../database/DatabaseConnection';

export default function WorkingHoursModal({ isOpen, onDeleteEvent, onCancel }) {

    const SHIFTS = require('../../constants/Shifts.json');

    const options = useMemo(() => Object.values(SHIFTS).map(value => 
        <option value={ value.shiftID}>{value.name}</option>
    ));

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        //fetch('/some-api', { method: form.method, body: formData });
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        addWorkingHours(formJson);
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
                        <select name="workspace">
                            { options }
                        </select>
                    </div>
                    <div>
                        <p>Start</p>
                        <input className='HourInput' type="time" name="start" />
                        <p>Ende</p>
                        <input className='HourInput' type="time" name="end" />
                    </div>
                    <div>
                        <p>Pause</p>
                        <input className="MinutesInput" type="time" name="breakDuration" />
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