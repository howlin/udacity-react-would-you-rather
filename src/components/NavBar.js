import React from 'react'
import { connect } from 'react-redux'
import { setAuthUser } from '../actions/authedUser'
import { makeStyles } from '@material-ui/core/styles';
import { AccountBox } from '@material-ui/icons';
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBarItem: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none',
    color: 'white'
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
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {!authedUser 
          ? <Typography variant="h5" className={classes.title}>
              Would You Rather?
            </Typography>
          : <Grid container>
              <Grid item align="left" className={classes.appBarItem}>
                <Button color="inherit">
                  <Link to="/" className={classes.link}>Home</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/add" className={classes.link}>New Question</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/leaderboard" className={classes.link}>Leader Board</Link>
                </Button>
              </Grid>
              <Grid item align="right" className={classes.appBarItem}>
                <Typography variant="body1" component="span" className={classes.welcome}> {authUserWelcome} </Typography>
                <AccountBox color="inherit" className={classes.accountBox} />
                <Button color="inherit" onClick={handleLogout}>Log Out</Button>
              </Grid>
            </Grid>
        }
      </Toolbar>
    </AppBar>
  )
}

function mapStateToProps({ authedUser, users }){
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(NavBar)