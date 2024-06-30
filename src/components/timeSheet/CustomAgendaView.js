import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-big-calendar'

export default function CustomAgendaView({
  date,
  localizer,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => CustomAgendaView.range(date, { localizer }),
    [date, localizer]
  )

  return (

      <div>
        <table>
        <thead>
            <tr>
                <th>Datum</th>
                <th>Bereich</th>
                <th>Start</th>
                <th>Ende</th>
                <th>Pause</th>
                <th>Stunden</th>
                <th>Aufgaben</th>
            </tr>
        </thead>
      </table>
          <div>
              <table>
                  <tbody>
                      <tr>
                          <td rowSpan="1">30.07.</td>
                          <td>Feldbau</td>
                          <td>07:00</td>
                          <td>16:00</td>
                          <td>01:00</td>
                          <td>08:00</td>
                          <td>Gras abfahren</td>

                      </tr>
                   </tbody>
              </table>
          </div>
      </div>
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
  const start = date
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