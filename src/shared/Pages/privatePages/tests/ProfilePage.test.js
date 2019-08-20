import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import waitForExpect from 'wait-for-expect'
import { MockedProvider } from '@apollo/react-testing'
import { HelmetProvider } from 'react-helmet-async'
import { act } from 'react-dom/test-utils'

import { ProfilePage } from '../ProfilePage'
import { findByTestAttr } from '../../../../tests/utils'
import {
  FETCH_MY_POSTS_MOCK,
  getMyPosts
} from '../../../../tests/mocks/Queries/getMyPosts'
import { initialStateFeedPage as initialState } from '../../../../tests/mocks/initialState'

const mockStore = configureStore()
let component, wrapper, store, wrap, div, i

const setupShallowRender = (props = {}) => {
  return shallow(<ProfilePage {...props} />)
}

const setupMountAndMockBootstrap = (initialState = {}, what) => {
  appendElements(initialState[what])
  return mount(
    <MockedProvider addTypename={false} mocks={FETCH_MY_POSTS_MOCK}>
      <HelmetProvider>
        <BrowserRouter>
          <ProfilePage {...initialState} />
        </BrowserRouter>
      </HelmetProvider>
    </MockedProvider>
  )
}

const appendElements = arr => {
  for (i = 0; i < arr.length; i++) {
    const div = document.createElement('div')
    // console.log('ya alla')
    div.setAttribute('id', `PopoverDeletePost_${arr[i].id}`)
    document.body.appendChild(div)
  }
}

describe('<ProfilePage />', () => {
  beforeEach(() => {
    store = mockStore(initialState)
    component = setupShallowRender(initialState)
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
  it('should render scroll with proper props', () => {
    const scroll = findByTestAttr(component, 'scroll')

    expect(scroll.length).toBe(1)
    expect(scroll.props().posts).toBe(initialState.posts)
    expect(scroll.props().loadMore).toBe(component.state().loadMore)
    expect(scroll.props().handleAction).toBe(component.instance().handleAction)
    expect(scroll.props().setLoadMore).toBe(component.instance().setLoadMore)
    expect(scroll.props().myId).toBe(initialState.auth.id)
  })
  it('Should render helmet component with proper props', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })

  describe('testing with mounted compnent', () => {
    it('should be five posts rendered (props from server)', async () => {
      // const fetchMoreMyPosts = jest.fn()
      await act( async () => {
        wrapper = setupMountAndMockBootstrap(initialState, 'posts')
        await waitForExpect(() => {
          const updated = wrapper.update()
          const scroll = findByTestAttr(updated, 'scroll')
          const posts = findByTestAttr(scroll, 'post')
          expect(posts.length).toBe(initialState.posts.length)
        })
      })
    })

    it('should be zero posts rendered(no props from server fetchFeed action in called)', async () => {
      const fetchMyPosts = jest.fn()
      const noFeedInitialState = {
        auth: initialState.auth,
        fetchMoreMyPosts: initialState.fetchMoreMyPosts,
        feed: [],
        posts: [],
        fetchMyPosts
      }
      await act( async () => {
        wrapper = setupMountAndMockBootstrap(noFeedInitialState, 'posts')
        await waitForExpect(() => {
          const updated = wrapper.update()
          const feed = findByTestAttr(updated, 'scroll')
          const posts = findByTestAttr(feed, 'post')
          expect(posts.length).toBe(0)
          expect(initialState.fetchMoreMyPosts).toHaveBeenCalledWith(getMyPosts)
        })
      })
    })
  })
})
