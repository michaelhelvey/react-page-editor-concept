const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_PAGES':
      let result = {}
      action.payload.forEach(page => (result[page.id] = page))
      return result
    case 'RECEIVE_SINGLE_PAGE':
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      return state
  }
}
