import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import history from './history'
import config from '../../webConfig.json'
import configProd from '../../webConfigProd.json'

const isServer = process.env.SERVER === 'true'

if(process.env.NODE_ENV !== 'production') {
  console.log('url: ', isServer ? configProd.url : config.url)
  console.log('isServer: ', isServer)
  console.log(process.env.NODE_ENV)
} else {
  console.log('prod')
}

const cache = new InMemoryCache({
  addTypename: false
}).restore(window.__APOLLO_STATE__)

const linkHttp = createUploadLink ({
  uri: isServer ? configProd.url : config.url,  
  // uri: config.url,  
  credentials: 'include',
  ssrMode: true,
  ssrForceFetchDelay: 100,
})

const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response, error }) => {
  if (graphQLErrors){
    {!isProd && graphQLErrors.forEach((err)=> console.log(err.extensions.code))}
    if(graphQLErrors.find((err)=>err.extensions.code === 'UNAUTHENTICATED')) {
      history.push('/')
    }
    graphQLErrors.map(({message, path, extensions, locations}) =>
    !isProd ? console.log(
        `Error: Message: ${message}`, 
      ) : false,
      // TODO: put session check every interval
    )}
  // if(extensions.code === 'UNAUTHENTICATED') {
  //   console.log('logout!!!!!!!!!!!!!!!')
  // }
  if(networkError) {
    !isProd ? console.log(networkError) : null
  }})

const links = [ errorLink, linkHttp ]
const link = ApolloLink.from(links)

export default new ApolloClient({
  cache,
  link
})