import React from 'react'
import { connect } from 'react-redux'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20
  }
}))

const Summary = ( props ) => {
  const { questions, qid } = props
  const q = questions[qid]
  const classes = useStyles()

  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid item>
       <Typography variant="h6">Would you rather:</Typography>
      </Grid>
      <Grid item>
       <Typography>{q.optionOne.text} ...</Typography>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          color="secondary"
          onClick={(() => props.history.push(`/question/${qid}`))}>View Poll</Button>
      </Grid>
    </Grid>
  )
}

function mapStateToProps({ questions }){
  return {
    questions
  }
}

export default withRouter(connect(mapStateToProps)(Summary))