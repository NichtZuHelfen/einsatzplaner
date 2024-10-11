import { getShiftData } from "../../logic/Utils";

export default function CustomWorkingHoursEvent({ event }) {
    event = {...event, ...getShiftData(event.shiftID)}

    const componentStyle = {
        backgroundColor: event.bg,
        color: event.textColor
    };


    return ( 
        <div className="CustomShiftEvent" style={componentStyle}>
            {event.name}
        </div>
    );
}