import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Would You Rather?
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar