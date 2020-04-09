import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import 'typeface-roboto'
import { Box } from '@material-ui/core'
import LoadingBar from 'react-redux-loading-bar'
import NavBar from './NavBar'
import Login from './Login'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import QuestionPage from './QuestionPage'
import Add from './Add'

/*
  TODO: implement the react-router auth workflow instead 
        of custom redirect code on each top level component 
        https://reacttraining.com/react-router/web/example/auth-workflow
  
*/

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
          <Box 
            style={{marginTop: 20, marginBottom: 50}}
            display="flex" 
            justifyContent="center">
              <Route path='/' exact component={Login} />
              <Route path='/home' exact component={Home} />
              <Route path='/questions/:qid' component={QuestionPage} />
              <Route path='/add' exact component={Add} />
              <Route path='/leaderboard' exact component={LeaderBoard} />
          </Box>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)