import { Calendar, Views } from "react-big-calendar";

import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment); 

export default function CustomCalendar({ events, handleSelectEvent, handleSelectTimeSlot, customEvent, views, defaultView }) {

    return ( 
        <Calendar
          id="calendar"
          defaultDate={Date.now()}
          defaultView={defaultView || Views.MONTH}
          events={events}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectTimeSlot}
          selectable
          messages={{
            next: ">",
            previous: "<",
            today: "Heute",
            month: "Monat",
            week: "Woche",
            day: "Tag",
            agenda:  "Liste"
          }}
          components={{
           month: { event: customEvent },
          }}
          views={views}
      />
    );
}