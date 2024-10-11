// Filename - pages/about.js


import 'moment/locale/de';

import React, {  useState, useEffect } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomShiftEvent from "../components/shifts/CustomShiftEvent.js";
import ShiftSelectionModal from '../components/shifts/ShiftSelectionModal.js';
import { addEvent, deleteEvent, getEvents } from "../database/DatabaseConnection.js";
import EventDetailModal from '../components/shifts/EventDetailModal.js';
import CustomCalendar from '../components/CustomCalendar.js';
import { Oval } from 'react-loader-spinner';



const Shifts = () => {


  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState();
  const [isShiftSelectionModalVisible, setShiftSelectionModalVisble] = useState(false);
  const [isEventDetailModalVisible, setEventDetailModalVisble] = useState(false);
  
    useEffect(() => { 
      getEvents().then((result) => {
        setEvents(result);
        setIsLoading(false);
      });
    }, []);
  
  
  const handleSelectTimeSlot = (event) => { 
    setShiftSelectionModalVisble(true);
    setNewEvent(event);
  }
  
  const handleSelection = async (selection) => { 
    const start = newEvent.start;
    const end = newEvent.end;
    const shiftID = selection.shiftID;
    
    const addedEvent = await addEvent({ start, end, shiftID });

    setEvents([...events, addedEvent]);
    setShiftSelectionModalVisble(false);
  } 


  const handleSelectEvent = (event) => {
    setNewEvent(event);
    setEventDetailModalVisble(true);
  }

  const handleDeleteEvent = async () => {
    await deleteEvent(newEvent);

    setEvents(events.filter((event) => event.docID !== newEvent.docID));
    setNewEvent(undefined);
    setEventDetailModalVisble(false);
  }
    
  
      
	return (
        <div className="ShiftContent">
            <Oval
        visible={isLoading}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass="LoadingIndicator"
      />
      <CustomCalendar
        key={events.length}
        events={events}
        handleSelectEvent={handleSelectEvent}
        handleSelectTimeSlot={handleSelectTimeSlot}
        customEvent={CustomShiftEvent}
        views={{
          month: true,
        }}
      />
      <ShiftSelectionModal
      isOpen={isShiftSelectionModalVisible}
      onCancel={() => setShiftSelectionModalVisble(false)}
      onChooseSelection={handleSelection}
      ></ShiftSelectionModal>
      <EventDetailModal
      isOpen={isEventDetailModalVisible}
      onDeleteEvent={handleDeleteEvent}
      onCancel={() => setEventDetailModalVisble(false)}
      ></EventDetailModal>

      </div>
	);
};

export default Shifts;

