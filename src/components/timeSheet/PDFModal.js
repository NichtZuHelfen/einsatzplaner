import ReactModal from "react-modal";
import { generatePDF } from "../../logic/Utils";

export default function PDFModal({isOpen, data, onCancel }) {

    const onExportClicked = () => {
        generatePDF(document.getElementById("pdfContent"), `Stundenzettel_${new Date(Date.now()).getMonth()}`);
    }
    
    return (
        <ReactModal
            className={"Modal"}
            overlayClassName={"ModalOverlay"}
            isOpen={isOpen}
            ariaHideApp={false}
      >
            <div className='ModalContainer'>
                <div className="ModalTitle">
                    <h1>Als PDF exportieren</h1>
                </div>
                <div id="pdfContent">
                    <h2>Stundenzettel für {new Date(Date.now()).getMonth()}</h2>
                </div>
                
                <div style={{ "height": "100%" }}/>
                    <button onClick={onExportClicked}>{"Exportieren"}</button>
            </div>
        
        <button className="CancelButton" onClick={onCancel}>Abbrechen</button>
        
        </ReactModal>
        
    )
}