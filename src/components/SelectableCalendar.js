import React, { Fragment, useState, useCallback, useMemo, Component } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";
import ReactModal from 'react-modal';
import SelectionModal from './SelectionModal';
import { addEvent, getEvents } from "../database/DatabaseConnection.js";


export default class SelectableCalendar extends Component {

  constructor() {
    super();
    this.state = {
      events: [{id: "fb", end: {seconds: 1717711200, nanoseconds: 0}, start: {seconds: 1717711200, nanoseconds: 0}}],
        isSelectionModalVisible: false,
        chosenEvent: undefined
  };
    this.setShowSelectionModal.bind(this);
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
  
  handleSelection(selection) { 
  
    const start = this.state.event.start;
    const end = this.state.event.end;
    const id = selection.id;
    
    console.log("addEvent: ");
    console.log({ start, end, id });
      addEvent({ start, end, id });
      this.setState({
        events: [...this.state.events, { start, end, id }]
      });
    this.setShowSelectionModal(false);
  } 

  handleSelectTimeSlot(event) { 
    this.setState({
      isSelectionModalVisible: true,
      event: event
    })
  }

  render() {
    console.log(this.state.events);

    return (
      <>
        <Calendar
          id="calendar"
          defaultDate={Date.now()}
          defaultView={Views.MONTH}
          events={this.state.events}
          localizer={this.props.localizer}
          onSelectEvent={this.handleSelection}
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
          className={"SelectionModal"}
          overlayClassName={"SelectionModalOverlay"}
           isOpen={this.state.isSelectionModalVisible}
        >
          <SelectionModal
            onCancel={() => this.setShowSelectionModal(false)}
            onChooseSelection={this.handleSelection.bind(this)}
          ></SelectionModal>
        </ReactModal>
    </>
    )
  }
  
}

SelectableCalendar.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer)
}