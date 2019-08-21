import express from 'express'
import cors from 'cors'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy' //TODO: return the proxy
import cookieParser from 'cookie-parser'
import routes from '../shared/Routes/mainRoutes'
import helmet from 'helmet'
import { renderer, createStore } from './helpers'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import fetch from 'node-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import xssFilter from 'x-xss-protection'
// import '../assets/css/ReactCrop.css'
import '../assets/css/react-datepicker.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

const PORT = process.env.PORT || 8080
const { API_BASE, SITE_URL } = process.env
const app = express()
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        `${API_BASE}/graphql`,
        `blob: ${SITE_URL}/*`,
        'data:*'
      ],
      styleSrc: [
        "'self'",
        'https://use.fontawesome.com/',
        "'unsafe-inline'",
        'https://fonts.googleapis.com/'
      ],
      fontSrc: [
        'fonts.gstatic.com',
        'https://fonts.googleapis.com/'
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
      ],
      imgSrc: [
        "'self'",
        `data: ${SITE_URL}/*`,
        `blob: ${SITE_URL}/*`,
        'https://www.w3.org',
        `${API_BASE}/`,
        
      ],
      upgradeInsecureRequests: true,
    }
  })
)
const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({ maxAge: sixtyDaysInSeconds }))
app.use(helmet.noSniff())
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(helmet.hidePoweredBy())
app.disable('x-powered-by')
app.use(function(req, res, next) {
  res.removeHeader('X-Powered-By')
  next()
})
app.use(xssFilter({ setOnOldIE: true }))

app.use(cookieParser())

app.use(cors())
app.use(express.static('build/public'))

app.get('*', async (req, res) => {
  const linkHttp = createUploadLink({
    uri: process.env.GRAPH_URL,
    credentials: 'include',
    headers: {
      cookie: req.header('Cookie')
    },
    fetch
  })

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward, response }) => {
      if (graphQLErrors) {
        // console.log(graphQLErrors)
        for (let err of graphQLErrors) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED':
          }
        }
      }
    }
  )

  const links = [errorLink, linkHttp]
  const link = ApolloLink.from(links)

  const client = await new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false
    }),
    link
  })
  const store = await createStore(client)

  const promises = await matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, rej) => {
          promise.then(resolve).catch(resolve)
        })
      }
    })

  await Promise.all(promises).then(() => {
    // console.log(promises)
    const context = {}

    if (context.url) {
      return res.redirect(301, context.url)
    }
    if (context.notFound) {
      return res.status(404)
    }

    const html = renderer(req, store, client, context)
    res.status(200).send(html)
  })
})

app.listen(PORT, (req, res) => {
  console.log(`APP IS RUNNING ON PORT ${PORT}`)
})
