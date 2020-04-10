import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const FourZeroFour = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h6">
          Oops!  We can't seem to find the page you were looking for
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h1">
          404
        </Typography>
      </Grid>
      <Grid item>
        <Link to="/">Start Again</Link>
      </Grid>
    </Grid>
  )
}

export default FourZeroFour