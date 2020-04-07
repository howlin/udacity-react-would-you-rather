import React from 'react'
import { connect } from 'react-redux'
import { setAuthUser } from '../actions/authedUser'
import { makeStyles } from '@material-ui/core/styles';
import { AccountBox } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  accountBox: {
    marginBottom: -8
  },
  welcome: {
    marginLeft: 50,
    marginRight: 10,
    fontStyle: 'italic'
  }
}));

const NavBar = (props) => {
  const classes = useStyles()
  const { authedUser, users } =  props
  const authUserWelcome = users[authedUser] ? `Hello ${users[authedUser].name}` : ''

  const handleLogout = () => {
    const { dispatch } = props
    dispatch( setAuthUser(null) )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Would You Rather?
          </Typography>
          {authedUser &&
            <div>
                <Button color="inherit">Home</Button>
                <Button color="inherit">New Question</Button>
                <Button color="inherit">Leader Board</Button>

                <Typography variant="body1" component="span" className={classes.welcome}> {authUserWelcome} </Typography>
                <AccountBox color="inherit" className={classes.accountBox} />
                <Button color="inherit" onClick={handleLogout}>Log Out</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

function mapStateToProps({ authedUser, users }){
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(NavBar)