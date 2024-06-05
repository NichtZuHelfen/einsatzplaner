import { getShiftData } from "../logic/Utils";

export default function CustomEvent({ event }) {
    event = {...event, ...getShiftData(event.id)}

    const componentStyle = {
        backgroundColor: event.bg,
        color: event.textColor
    };


    return ( 
        <div className="CustomEvent" style={componentStyle}>
            {event.name}
        </div>
    );
}