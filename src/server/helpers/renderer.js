import React from 'react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import Layout from '../../shared/Routes/Layout'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

const { API_BASE } = process.env
const linkToFavicon = `${API_BASE}/public_images/favicon.png`
export default function renderer(req, store, client, context) {

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
      <meta name="840430c5e70010722d679edee63ea147c19430e1" content="e73a6ac6dc339154d6038998ef2574d65b12bf5e" />
      <script type="text/javascript">
        WebFontConfig = {
          google: { families: [ 'Sigmar One::latin' ] }
        };
        (function() {
          var wf = document.createElement('script');
          wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
          wf.type = 'text/javascript';
          wf.async = 'true';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(wf, s);
        })(); </script>
      <link href="https://fonts.googleapis.com/css?family=Sigmar+One&display=swap" rel="stylesheet" />
      <link href="https://use.fontawesome.com/releases/v5.9.0/css/svg-with-js.css" rel="stylesheet" />
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="icon" href="${linkToFavicon}" type="image/png"/>
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
