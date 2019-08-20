import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import configureStore from 'redux-mock-store'
import wait from 'waait'
import waitForExpect from 'wait-for-expect'
import { MockedProvider } from '@apollo/react-testing'

import { SinglePostPage } from '../SinglePostPage'
import { findByTestAttr, findByTestAttrElement } from '../../../../tests/utils'
import { FETCH_FEED_SINGLE_POST_MOCK, getPosts } from '../../../../tests/mocks/Queries/getOnePost'
import { initialStateFeedPage as initialState } from '../../../../tests/mocks/initialState'

let component, wrapper, i, store

const match = {
  params: {
    id: '5d4a877d9540cf12bc8156e7'
  }
}
const mockStore = configureStore()
const setupShallowRender = (props = {}) => {
  return shallow(<SinglePostPage {...props} match={match} />)
}

const setupMountAndMockBootstrap = (initialState = {}, what) => {
  appendElementsPosts(initialState[what])
  appendElementsComments(createCommentArray(initialState.singlePost))
  return mount(
    <MockedProvider addTypename={false} mocks={FETCH_FEED_SINGLE_POST_MOCK}>
      <BrowserRouter>
        <SinglePostPage {...initialState} match={match} />
      </BrowserRouter>
    </MockedProvider>
  )
}

const appendElementsPosts = arr => {
  for (i = 0; i < arr.length; i++) {
    const div = document.createElement('div')
    div.setAttribute('id', `PopoverDeletePost_${arr[i].id}`)
    document.body.appendChild(div)
  }
}
const appendElementsComments = arr => {
  for (i = 0; i < arr.length; i++) {
    const div = document.createElement('div')
    div.setAttribute('id', `PopoverDeleteComment_${arr[i]}`)
    document.body.appendChild(div)
  }
}

const createCommentArray = data => {
  let x, z
  let arr = []
  for (x = 0; x < data.length; x++) {
    for (z = 0; z < data[x].comments.length; z++) {
      if (data[x].comments[z].id) {
        arr.push(data[x].comments[z].id)
      }
    }
  }
  return arr
}

describe('<SinglePostPage />', () => {
  beforeEach(() => {
    store = mockStore(initialState)
    component = setupShallowRender(initialState)
    appendElementsPosts(initialState['singlePost'])
    appendElementsComments(createCommentArray(initialState.singlePost))
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
  it('should render children with proper props', () => {
    const container = findByTestAttr(component, 'singlePostContainer')

    const backBtn = findByTestAttr(component, 'backBtn')
    expect(container.length).toBe(1)

    const componentInstance = component.instance()
    expect(container.prop('id')).toBe(componentInstance.id)
    expect(container.prop('myAvatar')).toBe(
      initialState.auth.avatar && initialState.auth.avatar.url
    )
    expect(container.prop('myId')).toBe(initialState.auth.id)
    expect(container.prop('singlePost')).toBe(initialState.singlePost)
    expect(container.prop('handleAction')).toBe(componentInstance.handleAction)
    expect(backBtn.prop('onClick')).toBe(componentInstance.redirectBack)
  })

  it('Should render helmet component with proper props', () => {
    const helmet = findByTestAttr(component, 'helmet')
    expect(helmet.length).toBe(1)
    expect(helmet.props().pageTitle).toBe(component.instance().title)
    expect(helmet.props().ogTitle).toBe(component.instance().title)
  })

  it('should call fetchPost action if there are no post in props', async () => {
    const fetchPost = jest.fn()
    const likePostAction = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      singlePost: [],
      fetchPost,
      likePostAction
    }
    wrapper = setupMountAndMockBootstrap(initialStateWithMocks, 'singlePost')
    await waitForExpect(() => {
      expect(fetchPost).toHaveBeenCalledWith(getPosts)
    })
  })

  it('should render children first in loading state and then show post', async () => {
    const fetchPost = jest.fn()
    const likePostAction = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      fetchPost,
      likePostAction
    }
    
    wrapper = setupMountAndMockBootstrap(initialStateWithMocks, 'singlePost')
    const loading = findByTestAttrElement(wrapper, 'loading')
    expect(loading.length).toBe(1)

    await wait(0)
    await waitForExpect(() => {
      const updated = wrapper.update()
      const container = findByTestAttrElement(
        updated,
        'singlePostContainer'
      ).update()
      const post = findByTestAttrElement(container.update(), 'post').update()
      const likedIcon = findByTestAttrElement(post, 'likedIcon', 'FontAwesomeIcon')
      const loadingAfter = findByTestAttrElement(updated, 'loading')
      expect(likedIcon.length).toBe(1)
      expect(loadingAfter.length).toBe(0)
      expect(post.length).toBe(1)
    })
  })
  
  it('should render like btn without icon when not liked and no delete mutation (not my post)', async () => {
    const fetchPost = jest.fn()
    const likePostAction = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      singlePost: [
        {
          id: '5d4a877d9540cf12bc8156e7',
          body: 'dsfsdfsdfds',
          createdAt: '1565165437828',
          likes: [],
          createdBy: {
            id: '5d4a86229540cf12bc8156d9',
            fname: 'chandler',
            lname: 'gadol',
            username: 'mishue',
            avatar: {
              url: '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
            },
            posts: [
              {
                id: '5d4a877d9540cf12bc8156e7'
              },
              {
                id: '5d4a876f9540cf12bc8156e2'
              }
            ],
            following: [
              {
                id: '5d46832e6074102470f01f62'
              }
            ],
            followers: [
              {
                id: '5d456a7de559a623484395d7'
              }
            ]
          },
          comments: [
            {
              id: '5d4a99339540cf12bc81571e',
              body: 'dfgdfgdfgfd',
              createdAt: '1565169971194',
              createdBy: {
                id: '5d4a86229540cf12bc8156d9',
                fname: 'chandler',
                lname: 'gadol',
                avatar: {
                  url: '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
                }
              }
            },
            {
              id: '5d4a99f99540cf12bc815725',
              body: 'sdfsdfsdsd',
              createdAt: '1565170169797',
              createdBy: {
                id: '5d456a7de559a623484395d7',
                fname: 'chandler',
                lname: 'bing',
                avatar: {
                  url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
                }
              }
            },
            {
              id: '5d4a9cae9540cf12bc815729',
              body: 'cvbcvbcv',
              createdAt: '1565170862100',
              createdBy: {
                id: '5d456a7de559a623484395d7',
                fname: 'chandler',
                lname: 'bing',
                avatar: {
                  url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
                }
              }
            }
          ]
        }
      ],
      fetchPost,
      likePostAction
    }

    wrapper = setupMountAndMockBootstrap(initialStateWithMocks, 'singlePost')

    await waitForExpect(() => {
      const updated = wrapper.update()
      const container = findByTestAttrElement(
        updated,
        'singlePostContainer'
      )
      const post = findByTestAttrElement(container.update(), 'post').update()
      const likedIcon = findByTestAttrElement(post, 'likedIcon', 'FontAwesomeIcon')
      const deleteIcon = findByTestAttrElement(post, 'deletePostBtn', 'DeletePostMutation')
      expect(deleteIcon.length).toBe(0)
      expect(likedIcon.length).toBe(0)
    })
  })
  it('should render deleteBtn when my post', async () => {
    const fetchPost = jest.fn()
    const likePostAction = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      singlePost: [
        {
          id: '5d4a877d9540cf12bc8156e7',
          body: 'dsfsdfsdfds',
          createdAt: '1565165437828',
          likes: [],
          createdBy: {
            id: '5d456a7de559a623484395d7',
            fname: 'chandler',
            lname: 'gadol',
            username: 'mishue',
            avatar: {
              url: '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
            },
            posts: [
              {
                id: '5d4a877d9540cf12bc8156e7'
              },
              {
                id: '5d4a876f9540cf12bc8156e2'
              }
            ],
            following: [
              {
                id: '5d46832e6074102470f01f62'
              }
            ],
            followers: [
              {
                id: '5d456a7de559a623484395d7'
              }
            ]
          },
          comments: [
            {
              id: '5d4a99339540cf12bc81571e',
              body: 'dfgdfgdfgfd',
              createdAt: '1565169971194',
              createdBy: {
                id: '5d4a86229540cf12bc8156d9',
                fname: 'chandler',
                lname: 'gadol',
                avatar: {
                  url: '/images/avatars/avatar_1565167540853_5d4a86229540cf12bc8156d9.jpg'
                }
              }
            },
            {
              id: '5d4a99f99540cf12bc815725',
              body: 'sdfsdfsdsd',
              createdAt: '1565170169797',
              createdBy: {
                id: '5d456a7de559a623484395d7',
                fname: 'chandler',
                lname: 'bing',
                avatar: {
                  url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
                }
              }
            },
            {
              id: '5d4a9cae9540cf12bc815729',
              body: 'cvbcvbcv',
              createdAt: '1565170862100',
              createdBy: {
                id: '5d456a7de559a623484395d7',
                fname: 'chandler',
                lname: 'bing',
                avatar: {
                  url: '/images/avatars/avatar_1564830879626_5d456a7de559a623484395d7.jpg'
                }
              }
            }
          ]
        }
      ],
      fetchPost,
      likePostAction
    }

    wrapper = setupMountAndMockBootstrap(initialStateWithMocks, 'singlePost')

    await wait(0)
    await waitForExpect(() => {
      const updated = wrapper.update()
      const container = findByTestAttrElement(
        updated,
        'singlePostContainer'
      )
      const post = findByTestAttrElement(container.update(), 'post').update()
      const deleteIcon = findByTestAttrElement(post, 'deletePostBtn', 'DeletePostMutation')
      expect(deleteIcon.length).toBe(1)
    })
  })
  it('should render 3 comments like in the initialState', async () => {
    const fetchPost = jest.fn()
    const likePostAction = jest.fn()
    const initialStateWithMocks = {
      ...initialState,
      fetchPost,
      likePostAction
    }

    wrapper = setupMountAndMockBootstrap(initialStateWithMocks, 'singlePost')

    await wait(0)
    await waitForExpect(() => {
      const updated = wrapper.update()
      const container = findByTestAttrElement(
        updated,
        'singlePostContainer'
      )
      const post = findByTestAttrElement(container.update(), 'post').update()
      const comment = findByTestAttr(post, 'comment')
      
      expect(comment.length).toBe(initialState.singlePost[0].comments.length)
    })
  })
})
