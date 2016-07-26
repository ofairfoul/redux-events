export default function composeListeners(handlers){
  return (action) => {
    const actions = handlers.map((h) => h(action))
    return [].concat.apply([], actions)
  }
}
