
import express from 'express'
import cors from 'cors'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy' //TODO: return the proxy
import cookieParser from 'cookie-parser'
import routes from '../shared/Routes/mainRoutes'
import { renderer, createStore } from './helpers'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client' 
import fetch from 'node-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import config from '../../webConfig.json'
import configProd from '../../webConfigProd.json'
// import '../assets/css/ReactCrop.css'
import '../assets/css/react-datepicker.css'
import '../assets/css/animate.css'
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

const PORT = process.env.PORT || 8080
const isServer = process.env.SERVER === 'true'

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.static('build/public'))

app.get('*', async (req, res) => {
  const linkHttp = createUploadLink({
    uri: isServer ? configProd.url : config.url, 
    credentials: 'include',
    headers: {
      cookie: req.header('Cookie')
    },
    fetch
  })

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
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
  
  const links = [ errorLink, linkHttp ]
  const link = ApolloLink.from(links)

  const client = await new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false
    }),
    link,
  })
  const store = await createStore(client)

  const promises = await matchRoutes(routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null
    }).map(promise => {
      if (promise) {
        return new Promise((resolve, rej) => {
          promise.then(resolve).catch(resolve)
        })
      }
    })

  await Promise.all(promises).then(() => {
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
