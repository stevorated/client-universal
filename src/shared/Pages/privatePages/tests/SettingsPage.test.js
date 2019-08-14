import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'

import { SettingsPage } from '../SettingsPage'
import { findByTestAttr } from '../../../../tests/utils'

const initialState = {}
const mockStore = configureStore()
let component, store, tree

const setupShallowRender = (props = {}) => {
  return shallow(<SettingsPage />)
}

describe('<SettingsPage />', () => {
  beforeEach(() => {
    //creates the store with any initial state or middleware needed
    store = mockStore(initialState)
    component = setupShallowRender()
    tree = renderer.create(
      <BrowserRouter>
        <SettingsPage store={store} />
      </BrowserRouter>
    )
  })
  it('matches Snapshot', () => {
    expect(tree).toMatchSnapshot()
  })
  it('Should render witout errors', () => {
    const mainDiv = findByTestAttr(component, 'mainDiv')
    expect(mainDiv.length).toBe(1)
  })
  it('Should render Cols components witout errors', () => {
    const mainCol = findByTestAttr(component, 'mainCol')
    const leftCol = findByTestAttr(component, 'leftCol')

    expect(mainCol.length).toBe(1)
    expect(leftCol.length).toBe(1)
  })
  it('Should render helmet component witout errors', () => {
    const helmet = findByTestAttr(component, 'helmet')

    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })
})
