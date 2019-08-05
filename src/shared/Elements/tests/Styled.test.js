// import 'jsdom-global/register'
import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { Line, DateSquareStyle } from '..'
import 'jest-styled-components'

describe('<Line />', () => {
  it('matches snapshot',  () => {
    const tree = renderer.create(<Line />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('<DateSquareStyle />', () => {
  it('matches snapshot and has proper style',  () => {
    const tree = renderer.create(<DateSquareStyle />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('width', '75px')
    expect(tree).toHaveStyleRule('height', '75px')
    expect(tree).toHaveStyleRule('background', 'red')
  })
})