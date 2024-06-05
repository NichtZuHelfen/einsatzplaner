import React, { Fragment, useState, useCallback, useMemo, Component } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";
import ReactModal from 'react-modal';
import SelectionModal from './SelectionModal';


export default class SelectableCalendar extends Component {

  constructor() {
    super();
    this.state = {
      isSelectionModalVisible: false,
      chosenEvent: undefined
    };
    
    this.setShowSelectionModal.bind(this);
    //ReactModal.setAppElement("#calendar");
  }

  setShowSelectionModal = (visible) => {
    this.setState({
      isSelectionModalVisible: visible
    })
  }
  
  handleSelection(selection) { 
    console.log("selection:" + selection);
    this.props.onSelectEvent(this.state.event.start, this.state.event.end, selection);
    this.setShowSelectionModal(false);
  } 

  handleSelectTimeSlot(event) { 
    console.log(event);
    this.setState({
      isSelectionModalVisible: true,
      event: event
    })
  }

  render() {
    return (
      <>
        <Calendar
          id="calendar"
          defaultDate={Date.now()}
          defaultView={Views.MONTH}
          events={this.props.events}
          localizer={this.props.localizer}
          onSelectEvent={this.props.onSelectEvent}
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
           month: { event: CustomEvent},
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
    localizer: PropTypes.instanceOf(DateLocalizer),
  events: PropTypes.instanceOf(Array),
  selectionModalVisible: PropTypes.instanceOf(Boolean)
}