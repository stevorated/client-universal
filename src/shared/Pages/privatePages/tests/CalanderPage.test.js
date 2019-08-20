import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import wait from 'waait'
import waitForExpect from 'wait-for-expect'
import { MockedProvider } from '@apollo/react-testing'
import TestRenderer from 'react-test-renderer'
import moment from 'moment'

import { CalanderPage } from '../CalanderPage'
import { findByTestAttr, findByTestAttrElement } from '../../../../tests/utils'
import { FETCH_CALANDER_EVENTS_MOCK } from '../../../../tests/mocks/Queries/getMonthsEvents'
import { initialStateFeedPage as initialState } from '../../../../tests/mocks/initialState'

const mockStore = configureStore()
let component, wrapper, store, tree, wrap, div, i

const setupShallowRender = (props = {}) => {
  return shallow(<CalanderPage {...props} />)
}

const setupMountAndMockBootstrap = (initialState = {}, what) => {
  appendElements(initialState[what])
  return mount(
    <MockedProvider addTypename={false} mocks={FETCH_CALANDER_EVENTS_MOCK}>
      <BrowserRouter>
        <CalanderPage {...initialState} />
      </BrowserRouter>
    </MockedProvider>
  )
}

const appendElements = arr => {
  for (i = 0; i < arr.length; i++) {
    const div = document.createElement('div')
    // console.log('ya alla')
    div.setAttribute('id', `event-day-div-${arr[i].id}`)
    document.body.appendChild(div)
  }
}

describe('<CalanderPage />', () => {
  beforeEach(() => {
    store = mockStore(initialState)
    component = setupShallowRender(initialState)
    appendElements(initialState['calander'])
    tree = TestRenderer.create(
      <MockedProvider addTypename={false} mocks={FETCH_CALANDER_EVENTS_MOCK}>
        <BrowserRouter>
          <CalanderPage {...initialState} />
        </BrowserRouter>
      </MockedProvider>
    )
  })

  it('should render component', () => {
    const mainDiv = findByTestAttr(component, 'mainDiv')
    expect(mainDiv.length).toBe(1)
  })
  it('should render cols', () => {
    const mainCol = findByTestAttr(component, 'mainCol')
    const leftCol = findByTestAttr(component, 'leftCol')

    expect(mainCol.length).toBe(1)
    expect(leftCol.length).toBe(1)
  })
  it('should render calander with proper props', () => {
    const calander = findByTestAttr(component, 'calanderContainer')

    expect(calander.length).toBe(1)
    const componentInstance = component.instance()
    expect(calander.prop('calander')).toBe(initialState.calander)
    expect(calander.prop('handleAction')).toBe(componentInstance.handleAction)
    expect(calander.prop('handleChangeMonth')).toBe(
      componentInstance.handleChangeMonth
    )
    expect(calander.prop('handleChangeDayFocus')).toBe(
      componentInstance.handleChangeDayFocus
    )
    expect(calander.prop('targetMonth')).toBe(component.state().targetMonth)
    expect(calander.prop('eventsInFocus')).toBe(component.state().eventsInFocus)
    expect(calander.prop('loading')).toBe(component.state().loading)
    expect(calander.prop('name')).toBe(initialState.auth.fname)
  })

  it('Should render helmet component with proper props', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })

  it('should render calander with correct days and calls redux action', async () => {
    const fetchCalanderEvents = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      calander: [],
      fetchCalanderEvents
    }
    wrapper = setupMountAndMockBootstrap(initialStateWithMocks, 'calander')

    await wait(0)
    await waitForExpect(() => {
      const updated = wrapper.update()
      const calander = findByTestAttr(updated, 'calander')
      const dayNumber = findByTestAttrElement(calander, 'dayNumber')
      const dayNumbersNotEmpty = dayNumber.filterWhere(day => {
        return day.text().length
      })
      expect(dayNumbersNotEmpty.length).toBe(moment().daysInMonth())
      expect(fetchCalanderEvents).toHaveBeenCalled()
    })
  })
})
