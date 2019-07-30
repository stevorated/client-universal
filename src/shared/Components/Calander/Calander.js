import React, { Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import CalanderDayEvents from './CalanderDayEvents'
import { FlatCardStatic, Line } from '../../Elements'
import CalanderRow from './CalanderRow'
import CalanderHeaders from './CalanderHeaders'
import moment from 'moment'
import { mediaQueries, elevation } from '../../Utils'
import Loading from '../Fragment/Loading';
const daysArray = (max, start) => {
  let arr = []
  let i = 1
  const modSeven = (max) % 7
  const maxEffective = (modSeven + 2) * 7

  for (i = 1; i < maxEffective + 1 + 7; i++) {
    const count = i - start + 1
    if (count >= 1 && count <= max) {
      arr.push(count)
    } else {
      arr.push(null)
    }
  }
  return removeExtraArray(sliceArray(arr, 7))
}

const sliceArray = (arr, chunk) => {
  let finalArr = []
  let i, j, tempArray
  for (i = 0, j = arr.length; i < j; i += chunk) {
    tempArray = arr.slice(i, i + chunk)
    finalArr.push(tempArray)
  }
  return finalArr
}

const removeExtraArray = (arr) => {

  return arr.map(week => {
    if (week.filter(day => day !== null).length === 0) {
      return []
    } else {
      return week
    }
  })
}

export default function Calander(props) {

  const { targetMonth, eventsInFocus } = props

  const dayOfWeek = (date) => {
    const rawDay = moment(date).day()
    if (rawDay === 7) return 1
    else return rawDay + 1
  }

  const makeMonthsArray = (start, months) => {
    let i
    let arr = []
    for (i = 0; i < months + 1; i++) {
      const monthToAddDate = moment(start).add(i, 'M').format('YYYY-MM-DD')
      const monthToAddText = moment(start).add(i, 'M').format('MMMM YY')
      arr.push({ monthToAddDate, monthToAddText })
    }
    return arr
  }
  const monthsOptions = makeMonthsArray('2019-07-01', 10)
  const targetMonthName = moment(targetMonth).format('MMMM YYYY')
  const targetMonthNum = moment(targetMonth).format('M')
  const startDay = dayOfWeek(targetMonth)
  const days = moment(targetMonth).daysInMonth()
  const currentDate = parseInt(moment().format('D'))
  const currentMonth = parseInt(moment().format('M'))
  const weeksArray = daysArray(days, startDay)

  const renderRows = (weeks) => {
    let count = 0
    return weeks.map((week) => {
      if(week.length === 0) return '' 
      const key = `week-${count}-calander`
      count++
      return <CalanderRow {...props} key={key} days={week} date={currentDate} month={targetMonthNum} />
    })
  }

  return (
    <FlatCardStatic {...props} className="">
      <div className="d-flex my-3">
        <Select style={{fontSize: '1.5rem'}} className="m-auto" value={targetMonth} onChange={props.handleChangeMonth} name="" id="">
          {monthsOptions.map(optionItem => {
            return <option key={`month-options-${optionItem.monthToAddDate}`} value={optionItem.monthToAddDate}>{optionItem.monthToAddText}</option>
          })}
        </Select>
      </div>
      <Line className="mb-2" />
      <CalanderDiv className="mx-lg-5 my-0"  >
        <CalanderHeaders />
        {renderRows(weeksArray)}
      </CalanderDiv>
      {eventsInFocus.length > 0 && (
        <div className="">
          <h3>{moment(eventsInFocus[0].startDate).format('MMMM DD')}'s events</h3>
          <Line />
          {props.loading ? <Loading margin={0} /> : <CalanderDayEvents events={eventsInFocus} />}
        </div>
      )}
    </FlatCardStatic>
  )
}

const CalanderDiv = styled.div`
  grid-gap: 0!important;
  grid-row-gap: 0!important;

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


