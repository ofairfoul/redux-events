# Reudux Events Middleware

Redux middleware to enable you to easily dispatch actions in response to other actions in a decoupled manner

## Usage
```bash
npm install --save redux-events
```
Expects a Promise polyfill
```js
import events, { composeListeners } from 'redux-events';
```

```js
const listeners = (action) => []
// Function to return array of next actions to dispatch

const rootListener = composeListeners([listeners])
// Optional utility class to compose listener functions from different modules

let middleware = applyMiddleware(events(rootListener), thunk)
const store = createStore(rootReducer, initialState, middleware)
```

```js
store.dispatch({type: ACTION})
  .then(() => {}) // store.dispatch() Always Returns a promise now
```

### Example Module Listener function
```js
import {ACTION_TYPE, NEXT_ACTION_TYPE} from './duckModule'

const LISTENERS = [
  {
    [ACTION_TYPE]: ({id}) => ({type: NEXT_ACTION_TYPE, id})
  },
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
