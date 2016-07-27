# Reudux Events Middleware

Redux middleware to enable you to easily dispatch actions in response to other actions in a decoupled manner

## Usage
Expects a Promise polyfill to be present
```bash
npm install --save redux-events
```
```js
import events, { composeListeners } from 'redux-events';
```

```js
const listeners = (action) => []
// Function to return array of next actions to dispatch

const rootListener = composeListeners([listeners])
// Optional utility class to compose listener functions from different modules

let middleware = applyMiddleware(events(rootListener), thunk)
// apply middleware before others such as redux-thunk or router

const store = createStore(rootReducer, initialState, middleware)

store.dispatch({type: ACTION})
  .then(() => {}) // store.dispatch() Always Returns a promise now. The Promise will only be resolved once all other actions provided by the listener function have also resolved
```

### Example Module Listener function
```js
import {ACTION_TYPE, NEXT_ACTION_TYPE} from './duckModule'

const LISTENERS = [
  // Simply return the next action to dispatch
  {
    [ACTION_TYPE]: ({id}) => ({type: NEXT_ACTION_TYPE, id})
  },
  // Or return a redux-thunk to dispatch async requests
  // Requires redux-thunk middleware
  {
    [ACTION_TYPE]: ({id}) => (dispatch, getState) => {
      return Promise.resolve(123)
        .then(() => dispatch(type: NEXT_ACTION_TYPE, id))
    }
  }
]

export default function(action){
  return LISTENERS.filter(h => h[action.type])
    .map(h => h[action.type](action))
}
```
