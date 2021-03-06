import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Box, 
  Card,
  CardHeader,
  Grid,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  CircularProgress } from '@material-ui/core'
import { setAuthUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'


class Login extends Component {
  state = {
    selectedUser: ''
  }
  handleChange = (e) => {
    const selectedUser = e.target.value
    this.setState(() => ({
      selectedUser
    }))
  }
  handleSubmit = () => {
    const { selectedUser } = this.state
    const { dispatch } = this.props

    if (selectedUser === '') {
      return
      /* TODO: put in some form validation here*/
    }

    dispatch( setAuthUser(selectedUser) )
  }
  render() {
    const { users, loading, authedUser } = this.props
    const params = this.props.location.search
    const { selectedUser }  = this.state
  

    if (authedUser !== null) {
      // checks if a returnTo exists in the URL.  If it does, go to there.  If not go /home. 
      const paramBits = params.substr(1).split("=")
      const redirectTo = paramBits[0] === 'returnTo' ? `/${paramBits[1]}` : '/home'
      return <Redirect to={redirectTo} />
    }

    return (
      <Box 
        style={{marginTop: 100}}
        display="flex" 
        justifyContent="center">
        <Card variant="outlined" style={{width: 300, padding: 30}}>
          <CardHeader title="Login"/>
          {loading 
            ? <Grid container alignItems="center" justify="center">
                <CircularProgress />
              </Grid>
            : <Grid container alignItems="flex-end" justify="flex-end" spacing={2} direction="column">
                <Grid item>
                  <FormControl variant="outlined" style={{minWidth: 280}}>
                    <InputLabel id="select-user-label">Pick a user</InputLabel>
                    <Select 
                      labelId="select-user-label" 
                      label="Pick a user"
                      onChange={this.handleChange}
                      value={selectedUser}>
                        {Object.keys(users).map((id) => (
                          <MenuItem key={id} value={id}>{users[id].name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleSubmit}>
                      Login
                  </Button>
                </Grid>
              </Grid>
          }
        </Card>
      </Box>
    )
  }
}

function mapStateToProps({ users, authedUser }){
  return {
    users,
    authedUser,
    loading: Object.keys(users).length === 0
  }
}

export default connect(mapStateToProps)(Login)