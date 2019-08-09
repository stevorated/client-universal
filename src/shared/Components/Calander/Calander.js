import React, { Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import CalanderDayEvents from './CalanderDayEvents'
import { FlatCardStatic, Line } from '../../Elements'
import CalanderRow from './CalanderRow'
import CalanderHeaders from './CalanderHeaders'
import moment from 'moment'
import {
  dayOfWeek,
  makeMonthsArray,
  daysArray,
  mediaQueries,
  elevation
} from '../../Utils'
import Loading from '../Fragment/Loading'

export default function Calander(props) {
  // console.log(props)
  const { targetMonth, eventsInFocus } = props
  const monthsOptions = makeMonthsArray('2019-07-01', 10)
  const targetMonthNum = moment(targetMonth).format('M')
  const startDay = dayOfWeek(targetMonth)
  const days = moment(targetMonth).daysInMonth()
  const currentDate = parseInt(moment().format('D'))
  const weeksArray = daysArray(days, startDay)

  const renderRows = weeks => {
    let count = 0
    return weeks.map(week => {
      if (week.length === 0) return ''
      const key = `week-${count}-calander`
      count++
      return (
        <CalanderRow
          {...props}
          key={key}
          days={week}
          date={currentDate}
          month={targetMonthNum}
        />
      )
    })
  }

  return (
    <FlatCardStatic data-test="calander" className={props.className}>
      <div className="d-flex my-3">
        <Select
          style={{ fontSize: '1.5rem' }}
          className="m-auto"
          value={targetMonth}
          onChange={props.handleChangeMonth}
          name=""
          id=""
        >
          {monthsOptions.map(optionItem => {
            return (
              <option
                key={`month-options-${optionItem.monthToAddDate}`}
                value={optionItem.monthToAddDate}
              >
                {optionItem.monthToAddText}
              </option>
            )
          })}
        </Select>
      </div>
      <Line className="mb-2" />
      <CalanderDiv className="mx-lg-2 my-0">
        <CalanderHeaders />
        {renderRows(weeksArray)}
      </CalanderDiv>
      {eventsInFocus.length > 0 && (
        <div className="animated slideInDown mt-4">
          <h3 className="text-center">
            {moment(eventsInFocus[0].startDate).format('MMMM DD')}'s events
          </h3>
          <Line />
          {props.loading ? (
            <Loading className="animated fadeIn" margin={0} />
          ) : (
            <CalanderDayEvents
              events={eventsInFocus}
              handleAction={props.handleAction}
            />
          )}
        </div>
      )}
    </FlatCardStatic>
  )
}

const CalanderDiv = styled.div`
  grid-gap: 0 !important;
  grid-row-gap: 0 !important;
`

const CalanderTitle = styled.h3`
  margin-top: 1rem;
  font-size: 2rem;
  ${mediaQueries.md`
  font-size: 3rem;
  `}
`

const Select = styled.select`
  font: 3rem;
`
