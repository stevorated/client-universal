import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import "jest-styled-components"

import { findByTestAttr } from "../../../tests/utils"
import { FbLogin } from "./../Buttons"

let component, store

const setupShallowRender = (props = {}) => {
  return shallow(<FbLogin {...props} />)
}

describe("<FbLogin />", () => {
  it("renders with login text correctly", () => {
    component = setupShallowRender()
    const button = findByTestAttr(component, "fb-login")
    expect(button.text()).toBe("<FontAwesomeIcon />login with Facebook")
  })
  it("renders with register text correctly", () => {
    component = setupShallowRender({ register: true })
    const button = findByTestAttr(component, "fb-login")
    expect(button.text()).toBe("<FontAwesomeIcon />register with facebook")
  })
})
