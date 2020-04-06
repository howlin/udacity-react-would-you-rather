import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'typeface-roboto'
import LoadingBar from 'react-redux-loading-bar'
import NavBar from './NavBar'
import Login from './Login'
import Home from './Home'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <LoadingBar />
          <Route path='/' exact component={Login} />
          <Route path='/home' exact component={Home} />
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)