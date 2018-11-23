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
  const result = {
    ...json,
    page_data: JSON.parse(atob(json.page_data))
  }
  return result
}

export const updateLocalPage = page => dispatch => {
  dispatch(receiveSinglePageWithoutTransform(page))
}

export const savePage = pageData => async dispatch => {
  const body = JSON.stringify({
    ...pageData,
    page_data: btoa(JSON.stringify(pageData.page_data))
  })
  const response = await fetch(
    'http://localhost:5000/api/pages/' + pageData.id,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body
    }
  )
  const json = await response.json()
  dispatch(receiveSinglePage(json))
  return json
}

const receiveSinglePageWithoutTransform = rawPage => ({
  type: 'RECEIVE_SINGLE_PAGE',
  payload: rawPage
})

const receiveSinglePage = page => ({
  type: 'RECEIVE_SINGLE_PAGE',
  payload: {
    ...page,
    page_data: JSON.parse(atob(page.page_data))
  }
})

const receivePages = pages => ({
  type: 'RECEIVE_PAGES',
  payload: pages.map(page => ({
    ...page,
    page_data: JSON.parse(atob(page.page_data))
  }))
})
