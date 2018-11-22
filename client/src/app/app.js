import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DynamicRouter from '../components/DynamicRouter'
import AdminHome from '../components/AdminHome'
import AdminEditPage from '../components/AdminEditPage'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/admin' exact component={AdminHome} />
            <Route path='/admin/pages/:id/edit' component={AdminEditPage} />
            <Route path='/' component={DynamicRouter} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
