import React from 'react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import Layout from '../../shared/Routes/Layout'

export default function renderer(req, store, client, context) {
  
  // console.log(req.originalUrl)

  const App = (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Layout />
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  )

  const sheet = new ServerStyleSheet()
  const content = renderToString(sheet.collectStyles(App))
  const styles = sheet.getStyleTags()
  
  const helmet = Helmet.renderStatic()

  return `
  <!DOCTYPE html>
    <html>
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css?family=Sigmar+One&display=swap" rel="stylesheet">
      <link rel="icon" href="/f575a04ebbb31b5798a4c54783e745a2.png" type="image/png"/>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link href="https://use.fontawesome.com/releases/v5.9.0/css/svg-with-js.css" rel="stylesheet"></link>
      <link rel="stylesheet" href="/styles/main.css"/>
      ${styles}
      </head>
      <body>
        <div id="root">${content}</div>
        <div id="portal"></div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(store.getState())}
        </script>
        <script>
          window.__APOLLO_STATE__ = ${serialize(client.extract())}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  
  `
}

