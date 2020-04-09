import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid, Card } from '@material-ui/core'
import User from './User'

const LeaderBoard = ( props ) => {
  const { users, authedUser } = props

  const sortedUsers = Object.keys(users)
    .map(uid => (
      users[uid]
    ))
    .sort((a, b) => {
      const aScore = Object.keys(a.answers).length + Object.keys(a.questions).length
      const bScore = Object.keys(b.answers).length + Object.keys(b.questions).length
      return bScore - aScore
    })


  if (authedUser === null) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <Card variant="outlined" style={{width: 600, padding: 10}}>
      <Grid container justify="center" direction="column" spacing={2}>
        {sortedUsers.map( user => {
          return (
            <Grid item key={user.id}>
              <User uid={user.id} />
            </Grid>
          )
        })}
      </Grid>
    </Card>
  )
}

function mapStateToProps({ users, authedUser }){
  return { 
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)