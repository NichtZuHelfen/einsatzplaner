
import ReactModal from 'react-modal';
import ReactScrollableList from 'react-scrollable-list';

export default function ShiftSelectionModal({ isOpen, onChooseSelection, onCancel }) {

    const SHIFTS = require('../../constants/Shifts.json');


    const listItems = Object.keys(SHIFTS).map((key) => {
        const style = {
            backgroundColor: SHIFTS[key].bg,
            color: SHIFTS[key].textColor
        };
        const button = <button
            onClick={() => onChooseSelection(SHIFTS[key])}
            className='SelectionButton'
            style={style}
        >{SHIFTS[key].name}</button>

        return {
            id: SHIFTS[key].shiftID, content: button,
        }
    });

    return (
            <ReactModal 
          className={"Modal"}
          overlayClassName={"ModalOverlay"}
           isOpen={isOpen}
        >
            <div className='ModalContainer'>
                <ReactScrollableList
                    className='ScrollList'
                    listItems = {listItems}
                    heightOfItem={30}
                    style={{ color: '#333' }}
                />
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        </ReactModal>
        
    )
}