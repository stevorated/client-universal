import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import { act } from 'react-dom/test-utils'

import { PublicPage } from '../PublicPage'
import { findByTestAttr } from '../../../../tests/utils'

const initialState = {}
const mockStore = configureStore()
let component, store

const setupShallowRender = (props = {}) => {
  return shallow(<PublicPage />)
}

describe('<PublicPage />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    //creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    component = setupShallowRender()
  })

  it('should render', () => {
    const mainDiv = findByTestAttr(component, 'main-div')
    expect(mainDiv.length).toBe(1)
  })
  it('Should render helmet component witout errors and have the right attr', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })
  it('should have proper initial state', () => {
    // expect(component.state('redirect')).toBeFalsy()
    expect(component.state('fadeOut')).toBe('')
    expect(component.state('where')).toBe('')
  })
  it('should redirect to login when logo is clicked', () => {
    const regButton = findByTestAttr(component, 'logo')
    expect(component.state('redirect')).toBeFalsy()
    regButton.simulate('click')
    // expect(component.state('fadeOut')).toBe('animated hinge')
    expect(component.state('where')).toBe('/login')
    jest.runAllTimers()
    expect(component.state('redirect')).toBeTruthy()
    // expect(component.state('fadeOut')).toBe('animated hinge')
    expect(component.state('where')).toBe('/login')
    const redirect = findByTestAttr(component, 'redirect')
    expect(redirect.length).toBe(1)
  })
  it('should redirect to login when loginBtn is clicked', () => {
    const regButton = findByTestAttr(component, 'loginBtn')
    expect(component.state('redirect')).toBeFalsy()
    regButton.simulate('click')
    // expect(component.state('fadeOut')).toBe('animated hinge')
    expect(component.state('where')).toBe('/login')
    jest.runAllTimers()
    expect(component.state('redirect')).toBeTruthy()
    // expect(component.state('fadeOut')).toBe('animated hinge')
    expect(component.state('where')).toBe('/login')
    const redirect = findByTestAttr(component, 'redirect')
    expect(redirect.length).toBe(1)
  })
  it('should redirect to login when registerBtn is clicked', () => {
    const regButton = findByTestAttr(component, 'registerBtn')
    expect(component.state('redirect')).toBeFalsy()
    regButton.simulate('click')
    // expect(component.state('fadeOut')).toBe('animated rollOut')
    expect(component.state('where')).toBe('/register')
    jest.runAllTimers()
    expect(component.state('redirect')).toBeTruthy()
    // expect(component.state('fadeOut')).toBe('animated rollOut')
    expect(component.state('where')).toBe('/register')
    const redirect = findByTestAttr(component, 'redirect')
    expect(redirect.length).toBe(1)
  })

})
