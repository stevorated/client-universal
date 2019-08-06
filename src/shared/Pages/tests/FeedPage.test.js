import React from "react"
import { BrowserRouter } from "react-router-dom"
import { shallow, mount } from "enzyme"
import renderer from "react-test-renderer"
import "jest-styled-components"
import configureStore from "redux-mock-store"
import wait from "waait"
import waitForExpect from "wait-for-expect"
import { MockedProvider } from "react-apollo/test-utils"
import { FeedPage } from "../FeedPage"
import { findByTestAttr } from "../../../tests/utils"
import { FETCH_FEED_MOCK } from "../../../tests/mocks/Queries"
import { initialStateFeedPage as initialState } from "./../../../tests/mocks/initialState"
import { fetchPost } from "./../../Store/actions/postActions"
const mockStore = configureStore()
let component, wrapper, store

const setupShallowRender = (props = {}) => {
  return shallow(<FeedPage {...props} />)
}

describe("<FeedPage />", () => {
  beforeEach(() => {
    store = mockStore(initialState)
    component = setupShallowRender(initialState)
  })

  it("should render component", () => {
    const mainDiv = findByTestAttr(component, "main-div")
    expect(mainDiv.length).toBe(1)
  })
  it("should render cols", () => {
    const mainCol = findByTestAttr(component, "mainCol")
    const leftCol = findByTestAttr(component, "leftCol")
    const rightCol = findByTestAttr(component, "rightCol")

    expect(mainCol.length).toBe(1)
    expect(leftCol.length).toBe(1)
    expect(rightCol.length).toBe(1)
  })
  it("should render ScrollFeedQuery with proper props", () => {
    const feed = findByTestAttr(component, "feedScrollQuery")

    expect(feed.length).toBe(1)
    expect(feed.props().posts).toBe(initialState.feed)
    expect(feed.props().fetchPosts).toBe(initialState.fetchFeed)
    expect(feed.props().myId).toBe(initialState.auth.id)
  })
  it('Should render helmet component with proper props', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })
})
