export const loadPages = () => async dispatch => {
  const response = await fetch('http://localhost:5000/api/pages')
  const json = await response.json()
  dispatch(receivePages(json))
  return json
}

const receivePages = pages => ({
  type: 'RECEIVE_PAGES',
  payload: pages
})
