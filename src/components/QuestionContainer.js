import React from 'react'
import { connect } from 'react-redux'
import { 
  Box, 
  Card, 
  AppBar, 
  Toolbar, 
  Typography, 
  Grid, 
  Avatar,
  Divider } from '@material-ui/core'
import QuestionSummary from './QuestionSummary'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    top: 20
  },
  avatarGridItem: {
    flex: 1
  },
  questionGridItem: {
    flex: 3
  }
}))

const QuestionContainer = ( props ) => {
  const { users, questions, qid } = props
  const q = questions[qid]
  const u = users[q.author]

  const classes = useStyles()

  return (
    <Box 
        display="flex" 
        justifyContent="center">
        <Card variant="outlined" style={{width: 500}}>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {`${u.name} asked:`}
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          <Grid item className={classes.avatarGridItem} align="center">
            <Avatar 
              className={classes.largeAvatar}
              src={u.avatarURL}>H</Avatar>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.questionGridItem}>
            <QuestionSummary qid={qid}/>
          </Grid>
        </Grid>

        </Card>
    </Box>
  )
}

function mapStateToProps({ users,  questions}){
  return {
    users, 
    questions    
  }
}

export default connect(mapStateToProps)(QuestionContainer)