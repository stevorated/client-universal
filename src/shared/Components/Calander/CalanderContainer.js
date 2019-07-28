import React, { Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { FlatCardStatic, Line } from '../../Elements'
import CalanderRow from './CalanderRow'
import CalanderHeaders from './CalanderHeaders'
import { array } from 'prop-types';
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
  let i, j, tempArray;
  for (i = 0, j = arr.length; i < j; i += chunk) {
    tempArray = arr.slice(i, i + chunk);
    finalArr.push(tempArray)
  }
  return finalArr
}

const removeExtraArray = (arr) => {

  return arr.map(week => {
    if( week.filter(day=> day !== null).length === 0) {
      return []
    } else {
      return week
    }
  })
}



export default function CalanderContainer(props) {
  const weeksArray = daysArray(props.days, props.startDay)
  const renderDays = (weeks) => {
    let count = 0
    return weeks.map((week) => {
      const key = `week-${count}-calander`
      count ++
      return <CalanderRow key={key} days={week} />
    })
  }
  return (
    <FlatCardStatic {...props} className="">
      <h1 className="text-capitalize mb-0">{props.name}'s Calander</h1>
      <Line />
      <CalanderDiv className="mt-5 mr-lg-4">
        <CalanderHeaders />
        { renderDays(weeksArray) }
      </CalanderDiv>
    </FlatCardStatic>
  )
}

const CalanderDiv = styled(Container)`

`

