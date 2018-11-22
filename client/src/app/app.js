import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import DynamicRouter from '../components/DynamicRouter'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path='/' component={DynamicRouter} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
