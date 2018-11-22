import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const logger = createLogger({
  collapsed: true
})

export default createStore(reducers, applyMiddleware(thunk, logger))
