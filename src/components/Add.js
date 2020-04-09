import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Box, 
  Card, 
  AppBar, 
  Toolbar, 
  Typography,
  Grid,
  TextField,
  Button } from '@material-ui/core'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'


class Add extends Component {
  state = {
    option1: '',
    option2: '',
    toHome: false
  }
  handleChange = (e) => {
    const text = e.target.value
    const option = e.target.id

    this.setState(() => ({
      [option]: text
    }))
  }
  handleSubmit = (e) => {
    const { option1, option2 } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion( option1, option2 ))

    this.setState(() => ({
      option1: '',
      option2: '',
      toHome: true
    }))
  }
  render() {
    const { option1, option2, toHome } = this.state

    if (toHome === true){
      return <Redirect to='/home' />
    }

    return (
      <Box 
        display="flex" 
        justifyContent="center">
        <Card variant="outlined" style={{width: 500}}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Create a New Question
              </Typography>
            </Toolbar>
          </AppBar>
          <form autoComplete="off">
            <Grid container spacing={3} direction="column" style={{padding: 20}}>
              <Grid item>
                <Typography variant="body1">
                  Complete the questions:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Would you rather ...
                </Typography>
              </Grid>
              <Grid item>
                <TextField 
                  id="option1"
                  required
                  label="Enter option 1 text here" 
                  style={{width: '100%'}}
                  onChange={this.handleChange}
                  value={option1}
                  variant="outlined"/>
              </Grid>
              <Grid item align='center'>
                - or -
              </Grid>
              <Grid item>
                <TextField 
                  id="option2"
                  required
                  style={{width: '100%'}}
                  label="Enter option 2 text here"
                  onChange={this.handleChange}
                  value={option2}
                  variant="outlined" />
              </Grid>
              <Grid item>
                <Button 
                  variant="contained"
                  onClick={this.handleSubmit}
                  disabled={option1 !== '' && option2 !== '' 
                    ? false
                    : true}>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Box>  
    )
  }

}

export default connect()(Add)