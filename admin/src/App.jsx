import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Main from './pages/Main'

const App = () => {
  return (
    <Router>
      <Route path='/' render={() => <Redirect to='/main/article_add' />} />
      <Route exact path='/login' component={Login} />
      <Route path='/main' component={Main} />
    </Router>
  )
}

export default App
