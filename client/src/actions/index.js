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

export const savePage = pageData => async dispatch => {
  console.log(JSON.stringify(pageData))
  const response = await fetch(
    'http://localhost:5000/api/pages/' + pageData.id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(pageData)
    }
  )
  console.log(response)
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
  payload: pages
})
