import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { DateSquare } from '../DateSquare'

import 'jest-styled-components'

describe('<DateSquare />', () => {
  it('matches Snapshot', ()=> {
    const tree = renderer.create(<DateSquare />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders with correct defaults', ()=> {
    const wrapper = shallow(<DateSquare />)
    const day = wrapper.find(`[data-test="day"]`)
    const month = wrapper.find(`[data-test="month"]`)
    expect(month.text()).toEqual('Jan')
    expect(month.length).toBe(1)
    expect(day.text()).toEqual('2')
    expect(day.length).toBe(1)
  })
})
