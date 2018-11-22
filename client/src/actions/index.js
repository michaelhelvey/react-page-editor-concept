export const loadPages = () => async dispatch => {
  const response = await fetch('http://localhost:5000/api/pages')
  const json = await response.json()
  dispatch(receivePages(json))
  return json
}

export const loadPageWithId = id => async dispatch => {
  const response = await fetch('http://localhost:5000/api/pages/' + id)
  const json = await response.json()
  dispatch(receiveSinglePage(json))
  return json
}

const receiveSinglePage = page => ({
  type: 'RECEIVE_SINGLE_PAGE',
  payload: page
})

const receivePages = pages => ({
  type: 'RECEIVE_PAGES',
  payload: pages.map(page => ({
    ...page,
    page_data: JSON.parse(page.page_data)
  }))
})
