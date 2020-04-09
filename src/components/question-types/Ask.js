import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Grid, 
  Typography, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Button } from '@material-ui/core'
import { handleAnswerQuestion } from '../../actions/questions'

const OPTION_ONE = 'optionOne'
const OPTION_TWO = 'optionTwo'

class Ask extends Component {
  state = {
    answer: ''
  }
  handleChange = (e) => {
    const answer = e.target.value

    this.setState(() => ({
      answer
    }))
  }
  handleSubmit = () => {
    const { qid, dispatch } = this.props
    const answer = this.state.answer

    dispatch(handleAnswerQuestion(answer, qid))
  }

  render(){
    const { questions, qid } = this.props
    const q = questions[qid]

    return (
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Typography variant="h6">Would you rather:</Typography>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <RadioGroup aria-label="askQuestion" name="askQuestion" value={this.state.answer} onChange={this.handleChange}>
              <FormControlLabel value={OPTION_ONE} control={<Radio />} label={q.optionOne.text} />
              <FormControlLabel value={OPTION_TWO} control={<Radio />} label={q.optionTwo.text} />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Button 
            onClick={this.handleSubmit}
            disabled={[OPTION_ONE, OPTION_TWO].includes(this.state.answer) 
              ? false 
              : true}>Submit</Button>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps({ authedUser, questions }, qid){
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Ask)