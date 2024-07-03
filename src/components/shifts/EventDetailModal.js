
import ReactModal from 'react-modal';

export default function EventDetailModal({ isOpen, onDeleteEvent, onCancel }) {

    console.log(isOpen);
    return (
        <ReactModal 
        className={"Modal"}
        overlayClassName={"ModalOverlay"}
        isOpen={isOpen}
      >
            <div className='ModalContainer'>
                <div><button onClick={onDeleteEvent}>Löschen</button></div>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </ReactModal>
        
    )
}