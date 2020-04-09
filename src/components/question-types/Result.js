import React from 'react'
import { connect } from 'react-redux'
import { 
  Grid,
  Box,
  Typography,
  LinearProgress,
  Divider,
  Chip } from '@material-ui/core'
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
  const { question, authedUser } = props
  const classes = useStyles()
  const countVoteOne = question.optionOne.votes.length
  const countVoteTwo = question.optionTwo.votes.length
  const percVoteOne = Math.round((countVoteOne / (countVoteOne + countVoteTwo)) * 100)
  const percVoteTwo = Math.round((countVoteTwo / (countVoteOne + countVoteTwo)) * 100)
  const authedUsersVote = question.optionOne.votes.includes(authedUser) ? 1 : 2

  return (
    <Grid containerdirection="column">
      <Box className={classes.root}>
        <Grid item>
          <Typography variant="h6">Result:</Typography>
        </Grid>
        <Grid item className={classes.question} align="center">
            {authedUsersVote === 1 && 
              <Chip variant="outlined" size="small" label="Your Answer" />}

            <Typography variant="body1">Would you rather {question.optionOne.text}</Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={percVoteOne}
            />
            <Typography variant="body1">{percVoteOne}%</Typography>
            <Typography variant="body1">
              {countVoteOne} out of {countVoteOne + countVoteTwo} votes
            </Typography>
        </Grid>
        <Grid item className={classes.question} >
          <Divider />
        </Grid>
        <Grid item className={classes.question} align="center">
            {authedUsersVote === 2 && 
                  <Chip variant="outlined" size="small" label="Your Answer" />}
                  
            <Typography variant="body1">Would you rather {question.optionTwo.text}</Typography>
            <BorderLinearProgress
              className={classes.margin}
              variant="determinate"
              color="secondary"
              value={percVoteTwo}
            />
            <Typography variant="body1">{percVoteTwo}%</Typography>
            <Typography variant="body1">
              {countVoteTwo} out of {countVoteOne + countVoteTwo} votes
            </Typography>
        </Grid>
      </Box>
    </Grid>
  )
}

function mapStateToProps({ questions, authedUser }, { qid }){
  return {
    question: questions[qid],
    authedUser
  }
}

export default connect(mapStateToProps)(Result)