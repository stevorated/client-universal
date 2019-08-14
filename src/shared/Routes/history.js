import { createBrowserHistory } from 'history'
console.log()
export const history = () => {
  if(__isBrowser__) {
    return createBrowserHistory()
  }
}
// Get the current location.

 
// // Listen for changes to the current location.
// const unlisten = history.listen((location, action) => {
//   // location is an object like window.location
//   console.log(action, location.pathname, location.state);
// });
 
// Use push, replace, and go to navigate around.
// history.push('/home', { some: 'state' });
 
// To stop listening, call the function returned from listen().
// unlisten();