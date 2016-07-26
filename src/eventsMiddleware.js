export default function eventsMiddleware(eventsHandler){
  return store => next => action => {
    if (!action) {
      return
    }

    let result = next(action)
    let actions = []

    if (typeof action !== 'function') {
      actions = actions.concat(eventsHandler(action))
    }

    if (!result || !result.then) {
      result = Promise.resolve(result)
    }

    actions.forEach((a) => {
      result = result.then(() => store.dispatch(a))
    })

    return result
  }
}
