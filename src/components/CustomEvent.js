
export default function CustomEvent({ event }) {
        
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