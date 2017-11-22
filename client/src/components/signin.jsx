import React from 'react'
import $Post from '../services/Post.jsx'

export default class Signin extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      signup: false,
      username: '', 
      password: '', 
      passwordConfirm: ''
    }
    if (this.props.signup === true) {
      this.state.signup = true;
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  syncUserInput (e) {
    console.log (e.target)
    var obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj)
  }

  submitInformation (e) {
    console.log('submitInformation')
    var userObj = {
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    }
    $Post('/users/login/', userObj)
    .then (response => {
      console.log ('post request worked')
    })
    .catch(err => {
      console.log ('post request failed')
    })
  }

  render () {
    if (this.props.view === 'login') {
      return (
        <div>   
          <h1> Login </h1>
          Username: <input id='username' type='text' value={this.state.username} onChange={(e) => this.syncUserInput(e)} /> 
          <br></br>
          Password: <input id='password' type='password' value={this.state.password} onChange={(e) => this.syncUserInput(e)} />
          <br></br>
          <button id="button-signup" onClick={(e) => this.props.switchViews(e)} > Sign Up  </button>
          <button id="button-submit" onClick={(e) => this.submitInformation(e)} > Submit </button>
          <button id="button-home" onClick={(e) => this.props.switchViews(e)} > Return Home </button>
        </div>
      )
    } else {
      return (
        <div> 
          <h1> Sign Up </h1>
          Username: <input type='text' id='username' value={this.state.username} onChange={(e) => this.syncUserInput(e)} /> 
          <br></br>
          Password: <input type='password' id='password' value={this.state.password} onChange={(e) => this.syncUserInput(e)} />
          <br></br>
          Confirm Password: <input type='password' id='passwordConfirm' value={this.state.passwordConfirm} onChange={(e) => this.syncUserInput(e)} />
          <br></br>
          <button id="button-login" onClick={(e) => this.props.switchViews(e)}> Login </button>
          <button id="button-submit" onClick={(e) => this.submitInformation(e)}> Submit </button>
          <button id="button-home" onClick={(e) => this.props.switchViews(e)} > Return Home </button>
        </div>
      )
    }
  }
}