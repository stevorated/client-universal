import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import Helmet from 'react-helmet'
import client from './apolloClient'
import reducers from '../shared/Store/reducers'
import Layout from '../shared/Routes/Layout'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

const store = createStore(
  reducers,
  window.__INITIAL_STATE__,
  composeWithDevTools (applyMiddleware(thunk.withExtraArgument(client)))
)

hydrate(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>
  , document.getElementById('root')
)
