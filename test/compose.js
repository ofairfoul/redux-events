import compose from '../src/compose'

const ACTION_TYPE = 'ACTION_TYPE'
const NEXT_ACTION_TYPE = 'NEXT_ACTION_TYPE'

const LISTENERS = [
  {
    [ACTION_TYPE]: ({id}) => ({type: NEXT_ACTION_TYPE, id})
  }
]

const action = {
  type: ACTION_TYPE,
  id: 123
}

const moduleHandler = (action) => LISTENERS.filter(h => h[action.type]).map(h => h[action.type](action))

const rootHandler = compose([handler])

console.dir(rootHandler(action))
