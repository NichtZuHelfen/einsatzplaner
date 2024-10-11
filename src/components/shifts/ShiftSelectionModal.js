
import ReactModal from 'react-modal';
import ReactScrollableList from 'react-scrollable-list';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, List } from '@mui/material';


export default function ShiftSelectionModal({ isOpen, onChooseSelection, onCancel }) {

    const SHIFTS = require('../../constants/Shifts.json');

    const mvaListItems = Object.keys(SHIFTS).filter((key) => SHIFTS[key].shiftID.startsWith("mva")).map((key) => {
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

    const listItems = Object.keys(SHIFTS).filter((key) => !SHIFTS[key].shiftID.startsWith("mva")).map((key) => {
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


    const accordionStyle = {
        margin: "4px 0px",
        bordererRadius: "5px!important",
        backgroundColor: "#0a98ff",
        color: "white",

    }

    return (
            <ReactModal 
          className={"Modal"}
          overlayClassName={"ModalOverlay"}
           isOpen={isOpen}
        >
            <div className='ModalContainer'>
                <Accordion
                    sx={accordionStyle}>
                    <AccordionSummary
                        sx={{justifyContent: "center"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          MVA
        </AccordionSummary>
                    <AccordionDetails>
                        <ReactScrollableList
                    className='ScrollList'
                    listItems = {mvaListItems}
                    heightOfItem={30}
                    style={{ color: '#333' }}
                />
        </AccordionDetails>
      </Accordion>
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