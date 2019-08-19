import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import wait from 'waait'
import waitForExpect from 'wait-for-expect'
import { MockedProvider } from 'react-apollo/test-utils'
import { FeedPage } from '../FeedPage'

import { findByTestAttr } from '../../../../tests/utils'
import { FETCH_FEED_MOCK, getPosts } from '../../../../tests/mocks/Queries/getPosts'
import { initialStateFeedPage as initialState } from '../../../../tests/mocks/initialState'

const mockStore = configureStore()
let component, wrapper, store, tree, wrap, div, i

const setupShallowRender = (props = {}) => {
  return shallow(<FeedPage {...props} />)
}

const setupMountAndMockBootstrap = (initialState = {}, what) => {
  appendElements(initialState[what])
  return mount(
    <MockedProvider addTypename={false} mocks={FETCH_FEED_MOCK}>
      <BrowserRouter>
        <FeedPage {...initialState} />
      </BrowserRouter>
    </MockedProvider>
  )
}

const appendElements = (arr) => {
  for (i=0; i<arr.length; i++) {
    const div = document.createElement('div')
    // console.log('ya alla')
    div.setAttribute('id', `PopoverDeletePost_${arr[i].id}`)
    document.body.appendChild(div)
  }
}

describe('<FeedPage />', () => {
  beforeEach(() => {
    store = mockStore(initialState)
    component = setupShallowRender(initialState)
    
  })

  it('should render component', () => {
    const mainDiv = findByTestAttr(component, 'main-div')
    expect(mainDiv.length).toBe(1)
  })
  it('should render cols', () => {
    const mainCol = findByTestAttr(component, 'mainCol')
    const leftCol = findByTestAttr(component, 'leftCol')

    expect(mainCol.length).toBe(1)
    expect(leftCol.length).toBe(1)
  })
  it('should render ScrollFeedQuery with proper props', () => {
    const feed = findByTestAttr(component, 'feedScrollQuery')

    expect(feed.length).toBe(1)
    expect(feed.props().posts).toBe(initialState.feed)
    expect(feed.props().myId).toBe(initialState.auth.id)
  })
  it('Should render helmet component with proper props', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })

  describe('testing with mounted compnent', () => {
    it('should be five posts rendered (props from server)', async () => {
      wrapper = setupMountAndMockBootstrap(initialState, 'feed')
      await waitForExpect(() => {
        const updated = wrapper.update()
        const feed = findByTestAttr(updated, 'feedScrollQuery')
        const posts = findByTestAttr(feed, 'post')
        expect(posts.length).toBe(initialState.feed.length)
      })
    })

    it('should be zero posts rendered(no props from server fetchFeed action in called)', async () => {
      const fetchFeed = jest.fn()
      const noFeedInitialState = { auth: initialState.auth, feed: [], fetchFeed }
      wrapper = setupMountAndMockBootstrap(noFeedInitialState, 'feed')
      await waitForExpect(() => {
        const updated = wrapper.update()
        const feed = findByTestAttr(updated, 'feedScrollQuery')
        const posts = findByTestAttr(feed, 'post')
        expect(posts.length).toBe(0)
        expect(fetchFeed).toHaveBeenCalled()
  
      })
    })
  })
})
