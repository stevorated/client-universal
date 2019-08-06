import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { DateSquare } from '../DateSquare'
import { findByTestAttr } from '../../../tests/utils'

describe('<DateSquare />', () => {
  it('matches Snapshot', ()=> {
    const tree = renderer.create(<DateSquare />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders with correct defaults', ()=> {
    const wrapper = shallow(<DateSquare />)
    const day = findByTestAttr(wrapper, 'day')
    const month = findByTestAttr(wrapper, 'month')

    expect(month.text()).toEqual('Jan')
    expect(month.length).toBe(1)
    expect(day.text()).toEqual('2')
    expect(day.length).toBe(1)
  })
})
