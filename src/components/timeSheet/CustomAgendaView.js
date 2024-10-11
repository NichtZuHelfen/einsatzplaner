import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-big-calendar'
import { breakDurationStringToMinutes, calculateWorkingDuration, getShiftData } from '../../logic/Utils';

export default function CustomAgendaView({
    events,
    date,
    localizer,
    onSelectEntry
}) {
  const currRange = useMemo(
    () => CustomAgendaView.range(date, { localizer }),
    [date, localizer]
  )
  events = events.filter((event) => event.date >= currRange[0] && event.date <= currRange[6]).sort((a, b) => a.date - b.date);
  

  return (

      <>
        <table id="timeSheetTable">
        <thead>
            <tr>
                <th>Datum</th>
                <th>Bereich</th>
                <th>Start</th>
                <th>Ende</th>
                <th>Pause</th>
                <th>Stunden</th>
            </tr>
        </thead>
              <tbody>
                  {events.map((event) => {
                    event = { 
                      ...event, ...getShiftData(event.shiftID),
                      workspace: getShiftData(event.workspace).name,
                      date: event.date.toLocaleDateString(),
                      start: event.start? event.start.toLocaleTimeString().slice(0,5) : "-",
                      end: event.end? event.end.toLocaleTimeString().slice(0,5) : "-",
                      breakDuration: event.breakDuration? event.breakDuration + " min" : "-",
                      workingTime: calculateWorkingDuration(event.end, event.start, event.breakDuration) + " h"
                    }
                      
                    return (
                      <tr key={ event.docID } onClick={() => onSelectEntry(event.docID)}>
                        <td>{event.date}</td>
                        <td>{event.workspace}</td>
                        <td>{event.start}</td>
                        <td>{event.end}</td>
                        <td>{event.breakDuration}</td> 
                        <td>{event.workingTime}</td>
                  </tr>)})}
        </tbody>
        </table>
      </>
  )
}

CustomAgendaView.range = (date, { localizer }) => {
  const start = localizer.add(date, - new Date(date).getDay() + 1, 'day')
    const end = localizer.add(start, 6, 'day')
    
  let current = new Date(start).setHours(0,0,0)
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }
  range[range.length - 1].setHours(23,59,59)
  return range
}

CustomAgendaView.navigate = (date, action, { localizer }) => {

    console.log("Navigate: " + action);
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -7, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 7, 'day')

    default:
      return date
  }
}

CustomAgendaView.title = (date, { localizer }) => {
    const [start, ...rest] = CustomAgendaView.range(date, { localizer })

    const startDate = new Date(start);
    const endDate = new Date(rest.pop());
  return `${startDate.getDate()}.${startDate.getMonth() + 1}.  - ${endDate.getDate()}.${endDate.getMonth() + 1}.`
}