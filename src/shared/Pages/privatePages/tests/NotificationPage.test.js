import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import { act } from 'react-dom/test-utils'
import waitForExpect from 'wait-for-expect'
import { MockedProvider } from '@apollo/react-testing'
import { HelmetProvider } from 'react-helmet-async'

import { NotificationsPage } from '../NotificationsPage'
import { findByTestAttr, findByTestAttrElement } from '../../../../tests/utils'
import { GET_NOTIFICATIONS_MOCK } from '../../../../tests/mocks/Queries/getNotifications'
import { initialStateFeedPage as initialState } from '../../../../tests/mocks/initialState'

const mockStore = configureStore()
let component, i, store, wrapper, container

const setupShallowRender = (props = {}) => {
  return shallow(<NotificationsPage {...props} />)
}

const setupMountAndMockBootstrap = (initialState = {}) => {
  return mount(
    <MockedProvider addTypename={false} mocks={GET_NOTIFICATIONS_MOCK}>
      <HelmetProvider>
        <BrowserRouter>
          <NotificationsPage {...initialState} />
        </BrowserRouter>
      </HelmetProvider>
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

describe('<NotificationsPage />', () => {
  beforeEach(() => {
    store = mockStore(initialState)
    component = setupShallowRender(initialState)
    // console.log(component.debug())
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

  it('Should render helmet component with proper props', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })

  it('should render the 10 notifications in initial state', async () => {
    const fetchMyNotifications = jest.fn()
    const fetchFirstNotifications = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      // myNotifications: [],
      fetchMyNotifications,
      fetchFirstNotifications
    }
    wrapper = setupMountAndMockBootstrap(initialStateWithMocks)
    
    container = findByTestAttr(wrapper, 'liveNotificationContainer')
    // console.log(container.debug())
    

    await act( async () => {
      await waitForExpect(() => {
        const updated = wrapper.update()
        
        updated.instance().handleAction = jest.fn()
        const updatedContainer = findByTestAttrElement(
          updated,
          'notificationContainer'
        ).update()
        const notifications = findByTestAttrElement(updatedContainer, 'notifications').first()
        const notification = findByTestAttrElement(notifications, 'notification')  
        expect(notification.length).toBe(10)
        const loadingMore = findByTestAttrElement(updated, 'loading', 'Spinner')
        expect(loadingMore.length).toBe(1)  
      })
    })
  })
})
