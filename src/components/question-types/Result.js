import React from 'react'
import { connect } from 'react-redux'
import { 
  Grid,
  Box,
  Typography,
  LinearProgress,
  Divider } from '@material-ui/core'
  import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress)

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin:20
    },
    margin: {
      margin: theme.spacing(2),
    },
    question: {
      marginTop: 20
    }
  }))

const Result = (props) => {
  const { question } = props
  const classes = useStyles()
  const votesOne = question.optionOne.votes.length
  const votesTwo = question.optionTwo.votes.length

  return (
    <Grid containerdirection="column">
      <Box className={classes.root}>
        <Grid item>
          <Typography variant="h6">Result:</Typography>
        </Grid>
        <Grid item className={classes.question} align="center">
            <Typography variant="body1">Would you rather {question.optionOne.text}</Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(votesOne / (votesOne + votesTwo)) * 100}
            />
            <Typography variant="body1">
              {votesOne} out of {votesOne + votesTwo} votes
            </Typography>
        </Grid>
        <Grid item className={classes.question} >
          <Divider />
        </Grid>
        <Grid item className={classes.question} align="center">
            <Typography variant="body1">Would you rather {question.optionTwo.text}</Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={(votesTwo / (votesOne + votesTwo)) * 100}
            />
            <Typography variant="body1">
              {votesTwo} out of {votesOne + votesTwo} votes
            </Typography>
        </Grid>
      </Box>
    </Grid>
  )
}

function mapStateToProps({ questions }, { qid }){
  return {
    question: questions[qid]
  }
}

export default connect(mapStateToProps)(Result)