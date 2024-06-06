
export default function EventDetailModal({ event, onDeleteEvent, onCancel }) {

    return (
        <>
            <div className='ModalContainer'>
                <div><button onClick={onDeleteEvent}>Löschen</button></div>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </>
        
    )
}