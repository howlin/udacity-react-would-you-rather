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
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Summary from './Summary'
import Ask from './Ask'
import Result from './Result'

export const QTYPE = {
  summary: 'SUMMARY',
  ask: 'ASK',
  result: 'RESULT'
}

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

const Question = ( props ) => {
  const { users, questions, qid, type } = props
  const classes = useStyles()
  const q = questions[qid]
  const u = users[q.author]

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
              src={u.avatarURL}></Avatar>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.questionGridItem}>
            {function(){
              switch(type) {
                case QTYPE.ask:
                  return <Ask qid={qid} />
                case QTYPE.result:
                  return <Result qid={qid} />
                case QTYPE.summary:
                default:
                  return <Summary qid={qid} />
              }
            }()}
            
          </Grid>
        </Grid>

        </Card>
    </Box>
  )
}

Question.propTypes = {
  qid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

function mapStateToProps({ users,  questions }){
  return {
    users, 
    questions    
  }
}

export default connect(mapStateToProps)(Question)