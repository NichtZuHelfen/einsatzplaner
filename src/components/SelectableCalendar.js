import React, {  Component } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";
import ReactModal from 'react-modal';
import SelectionModal from './SelectionModal';
import { addEvent, deleteEvent, getEvents } from "../database/DatabaseConnection.js";
import EventDetailModal from './EventDetailModal.js';


export default class SelectableCalendar extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      isSelectionModalVisible: false,
        isEventDetailModalVisible: false,
        chosenEvent: undefined
  };
    //ReactModal.setAppElement("#calendar");
  }

  async componentDidMount() {
    console.log("CDM");
    const events = await getEvents();
    console.log("loaded:");
    console.log(events);
      this.setState({
        events: this.state.events.concat(...events),
      });
  }

  setShowSelectionModal = (visible) => {
    this.setState({
      isSelectionModalVisible: visible
    })
  }

  setShowEventDetailModal = (visible) => {
    this.setState({
      isEventDetailModalVisible: visible
    })
  }


  handleSelectTimeSlot(event) { 
    this.setState({
      isSelectionModalVisible: true,
      event: event
    })
  }
  
  async handleSelection(selection) { 
  
    const start = this.state.event.start;
    const end = this.state.event.end;
    const shiftID = selection.shiftID;
    
    console.log("addEvent: ");
    console.log({ start, end, shiftID });
    const addedEvent = await addEvent({ start, end, shiftID });
    console.log("added:");
    console.log(addedEvent);
      this.setState({
        events: [...this.state.events, addedEvent],
        isSelectionModalVisible: false
      });
  } 


  handleSelectEvent(event) {
    console.log(event);
    this.setState({
      event: event,
      isEventDetailModalVisible: true
    })
  }

  async handleDeleteEvent() {
    console.log("handle");
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
          localizer={this.props.localizer}
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
           month: { event: CustomEvent },
          }}
      />
        <ReactModal 
          className={"Modal"}
          overlayClassName={"SelectionModalOverlay"}
           isOpen={this.state.isSelectionModalVisible}
        >
          <SelectionModal
            onCancel={() => this.setShowSelectionModal(false)}
            onChooseSelection={this.handleSelection.bind(this)}
          ></SelectionModal>
        </ReactModal>
        <ReactModal 
          className={"Modal"}
          overlayClassName={"SelectionModalOverlay"}
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

SelectableCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer)
}