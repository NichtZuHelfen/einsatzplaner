import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-big-calendar'
import { getShiftData } from '../../logic/Utils';

export default function CustomAgendaView({
    events,
  date,
  localizer
}) {
  const currRange = useMemo(
    () => CustomAgendaView.range(date, { localizer }),
    [date, localizer]
  )
    

  return (

      <>
        <table>
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
                      
                      event = { ...event, ...getShiftData(event.shiftID) }
                      
                      const workingTime = (event.end.seconds - event.start.seconds - event.break * 60 ) / 60 / 60;

                      console.log(new Date(event.start.toDate()))
                      return (<tr>
                        <td>{event.date.toDate().toLocaleDateString()}</td>
                        <td>{event.name}</td>
                        <td>{event.start.toDate().toLocaleTimeString()}</td>
                        <td>{event.end.toDate().toLocaleTimeString()}</td>
                        <td>{event.break} min </td> 
                        <td>{workingTime} h</td>
                  </tr>)})}
        </tbody>
        </table>
      </>
  )
}

CustomAgendaView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

CustomAgendaView.range = (date, { localizer }) => {
  const start = localizer.add(date, - new Date(date).getDay(), 'day')
    const end = localizer.add(start, 6, 'day')
    

  let current = start
  const range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }
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
  return `${startDate.getDate()}.${startDate.getMonth()}.  - ${endDate.getDate()}.${endDate.getMonth()}.`
}