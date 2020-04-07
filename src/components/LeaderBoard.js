import React from 'react'
import { connect } from 'react-redux'
import { Grid, Card } from '@material-ui/core'
import User from './User'

const LeaderBoard = ( props ) => {
  const { users } = props

  const sortedUsers = Object.keys(users)
    .map(uid => (
      users[uid]
    ))
    .sort((a, b) => {
      const aScore = Object.keys(a.answers).length + Object.keys(a.questions).length
      const bScore = Object.keys(b.answers).length + Object.keys(b.questions).length
      return bScore - aScore
    })

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

function mapStateToProps({ users }){
  return { 
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard)