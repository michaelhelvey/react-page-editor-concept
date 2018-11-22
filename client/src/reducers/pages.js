const initialState = {
  1: {
    title: 'Home page',
    slug: '/',
    page_data: '{}'
  },
  2: {
    title: 'About',
    slug: '/about',
    page_data: '{}'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
