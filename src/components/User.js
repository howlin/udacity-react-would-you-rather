import React from 'react'
import { connect } from 'react-redux'
import { 
  Box, Grid, Card, 
  AppBar, Toolbar, Typography, Avatar, Divider,
  Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    top: 20
  },
  avatarPanel: {
    flex: 1
  },
  mainPanel: {
    flex: 3
  },
  scorePanel: {
    flex: 1
  },
  scoreTitle: {
    marginTop: 10,
    fontWeight: 500
  },
  scoreCircle: {
    marginBottom: 30
  }
}))


const User = ( props ) => {
  const { users, uid } = props
  const u = users[uid]
  const classes = useStyles()

  const createdQuestions = Object.keys(u.questions).length
  const answeredQuestions = Object.keys(u.answers).length

  return (
    <Box 
      display="flex" 
      justifyContent="center">
      <Card variant="outlined" style={{width: 500}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {u.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          <Grid item className={classes.avatarPanel} align="center">
            <Avatar 
              className={classes.largeAvatar}
              src={u.avatarURL}></Avatar>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.mainPanel}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Answered Questions:</TableCell>
                    <TableCell>{answeredQuestions}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Created Questions:</TableCell>
                    <TableCell>{createdQuestions}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item className={classes.scorePanel} align="center">
            <Typography 
              variant="subtitle1"
              fontWeight="fontWeightBold"
              className={classes.scoreTitle}>
                Score
            </Typography>

            <svg width="70" height="70" className={classes.scoreCircle}>
              <circle cx="35" cy="35" r="30" fill="#aeaeae" />
              <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="30px" fontFamily="Arial" dy=".3em">
                {createdQuestions + answeredQuestions}
              </text>
            </svg>

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

export default connect(mapStateToProps)(User)