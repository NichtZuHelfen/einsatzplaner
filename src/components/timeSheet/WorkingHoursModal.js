
import ReactModal from 'react-modal';

export default function WorkingHoursModal({ isOpen, onDeleteEvent, onCancel }) {
    return (
        <ReactModal 
        className={"Modal"}
        overlayClassName={"ModalOverlay"}
        isOpen={isOpen}
      >
            <div className='ModalContainer'>
                <p>Datum</p>
                <p>Bereich</p>
                <input/>
                <p>Ende</p>
                <p>Pause</p>
                <input placeholder='Aufgabe'/>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </ReactModal>
        
    )
}