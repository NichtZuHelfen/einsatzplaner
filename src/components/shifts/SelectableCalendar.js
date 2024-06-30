import React, {  Component } from 'react'
import { Calendar, Views } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomShiftEvent from "./CustomShiftEvent.js";
import ReactModal from 'react-modal';
import ShiftSelectionModal from './ShiftSelectionModal.js';
import { addEvent, deleteEvent, getEvents } from "../../database/DatabaseConnection.js";
import EventDetailModal from './EventDetailModal.js';

import { momentLocalizer } from "react-big-calendar";
import moment from "moment";

export default class SelectableCalendar extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      isShiftSelectionModalVisible: false,
        isEventDetailModalVisible: false,
        chosenEvent: undefined
  };
    //ReactModal.setAppElement("#calendar");


	  this.localizer = momentLocalizer(moment);
  }

  async componentDidMount() {
    const events = await getEvents();
      this.setState({
        events: this.state.events.concat(...events),
      });
  }

  setShowShiftSelectionModal = (visible) => {
    this.setState({
      isShiftSelectionModalVisible: visible
    })
  }

  setShowEventDetailModal = (visible) => {
    this.setState({
      isEventDetailModalVisible: visible
    })
  }


  handleSelectTimeSlot(event) { 
    this.setState({
      isShiftSelectionModalVisible: true,
      event: event
    })
  }
  
  async handleSelection(selection) { 
  
    const start = this.state.event.start;
    const end = this.state.event.end;
    const shiftID = selection.shiftID;
    
    const addedEvent = await addEvent({ start, end, shiftID });
      this.setState({
        events: [...this.state.events, addedEvent],
        isShiftSelectionModalVisible: false
      });
  } 


  handleSelectEvent(event) {
    this.setState({
      event: event,
      isEventDetailModalVisible: true
    })
  }

  async handleDeleteEvent() {
    await deleteEvent(this.state.event);
    
    this.setState({
      events: this.state.events.filter((event) => event.docID !== this.state.event.docID),
      event: undefined,
      isEventDetailModalVisible: false
    })
  }


  render() {
    return (
      <>
        <Calendar
          id="calendar"
          defaultDate={Date.now()}
          defaultView={Views.MONTH}
          events={this.state.events}
          localizer={this.localizer}
          onSelectEvent={this.handleSelectEvent.bind(this)}
          onSelectSlot={this.handleSelectTimeSlot.bind(this)}
          selectable
          scrollToTime={new Date(1970, 1, 1, 6)}
          messages={{
                  next: ">",
                  previous: "<",
                  today: "Heute",
                  month: "Monat",
                  week: "Woche",
                  day: "Tag"
          }}
          components={{
           month: { event: CustomShiftEvent },
          }}
          views={{
        month: true,
      }}
      />
        <ReactModal 
          className={"Modal"}
          overlayClassName={"ShiftSelectionModalOverlay"}
           isOpen={this.state.isShiftSelectionModalVisible}
        >
          <ShiftSelectionModal
            onCancel={() => this.setShowShiftSelectionModal(false)}
            onChooseSelection={this.handleSelection.bind(this)}
          ></ShiftSelectionModal>
        </ReactModal>
        <ReactModal 
          className={"Modal"}
          overlayClassName={"ShiftSelectionModalOverlay"}
           isOpen={this.state.isEventDetailModalVisible}
        >
          <EventDetailModal
            event={this.state.event}
            onDeleteEvent={this.handleDeleteEvent.bind(this)}
            onCancel={() => this.setShowEventDetailModal(false)}
          ></EventDetailModal>
        </ReactModal>
    </>
    )
  }
  
}
