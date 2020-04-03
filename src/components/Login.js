import React, { Component } from 'react'
import { 
  Box, 
  Card,
  CardHeader,
  Grid,
  Button,
  Select,
  FormControl,
  MenuItem,
  withStyles,
  InputLabel} from '@material-ui/core'
import 'typeface-roboto'

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: 100
  },
  card: {
    width: 300,
    padding: 30
  },
  formControl: {
    minWidth: 280
  }
})

/* 
  TODO:
    - List of users needs to be dynamic
*/

class Login extends Component {
  render() {
    const { classes } = this.props
    return (
      <Box 
        className={classes.root} 
        display="flex" 
        justifyContent="center">
        <Card variant="outlined" className={classes.card}>
          <CardHeader title="Login"/>
          <Grid container alignItems="flex-end" justify="flex-end" spacing={2} direction="column">
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-user-label">Pick a user</InputLabel>
                <Select 
                  labelId="select-user-label" 
                  label="Pick a user"
                  value="">
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="sarahedo">Sarah Edo</MenuItem>
                    <MenuItem value="tylermcginnis">Tyler McGinnis</MenuItem>
                    <MenuItem value="johndoe">John Doe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    )
  }
}

export default withStyles(styles)(Login)