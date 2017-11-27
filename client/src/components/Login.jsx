import React from 'react'
import $Post from '../services/Post.jsx'

export default class Signin extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      confirmedUsername: '', //username that is used if server says user is signed in
      signup: false,
      username: '',
      password: '',
      passwordConfirm: '',
      passwordMissmatch: false,  //displays error if user has password and confirmed password that don't match
      submitError: false, //displays an error if the server returns a user/password error
      // loginError: false
    }
    if (this.props.signup === true) {
      this.state.signup = true;
    }
    this.clickLogoutbutton = this.clickLogoutbutton.bind(this)
  }

  // componentDidMount () {
  //   ///scroll to the top of the screen so the view will not be off the screen
  //   window.scrollTo(0, 0)
  // }

  syncUserInput (e) {
    //saves the input from the user into the state
    //needs to  save in the state so it can by in sync with the values in the inputs
    var newState = {};
    var passwordMissmatch;
    var oldPasswordMissmatch = this.state.passwordMissmatch;

    this.state[e.target.id] = e.target.value;

    if (this.props.view === 'signup' && (e.target.id === 'password' || e.target.id === 'passwordConfirm')) {
      if (this.state.password === this.state.passwordConfirm) {
        this.state.passwordMissmatch = false;
      } else {
        this.state.passwordMissmatch = true;
      }
    }
    this.forceUpdate(); //was forced to do this so react would stay in sync with the inputed variables
    //checks if the password and password confirmation are the same
  }


  submitInformation (e, route) {
    //WIP
    //will be what triggers a submit
    //takes info from state, then posts it to the server
    // console.log('submitInformation')
    if (!route) {return}
    if (route === 'signup' && this.state.password !== this.state.passwordConfirm) {
      this.setState({passwordMissmatch: true})
      return;
    }
    var userObj = {
      username: this.state.username,
      password: this.state.password,
    }
    $Post(`/users/${route}/`, userObj)
    .then (response => {
      console.log ('post request worked')
      this.props.saveUserName(this.state.username)
      this.setState({
        password: '',
        passwordConfirm: '',
        submitError: false,
        duplicateUserError: false
      })
      this.props.switchViews('logout')
    })
    .catch(err => {
      this.setState({submitError: true})
      console.log ('post request failed', err)
    })
  }

  clickLogoutbutton () {
    this.setState({
      password: '',
      passwordConfirm: '',
      submitError: false,
      duplicateUserError: false
    })
    document.cookie = "impulse_cookie_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.props.switchViews('home')
  }

  render () {
    if (this.props.view === 'login') {
      return (
        <div>
          <div className="table">
            <div className='title'>Login </div>
            <div className="table-row">
              <div className="table-cell"></div>
              {this.state.submitError === true
                ? <div className="passwordError float-right table-cell">Incorrect Username/Password</div>
                : <div className="table-cell passwordError"> &nbsp; </div>}
            </div>
            <div className="table-row">
              <span className="table-cell">Username: </span>
              <input id='username' className="table-cell" type='text' value={this.state.username} onChange={(e) => this.syncUserInput(e)} />
            </div>
            <div className="table-row">
              <span className="table-cell">Password: </span>
              <input id='password' className="table-cell"  type='password' value={this.state.password} onChange={(e) => this.syncUserInput(e)} />
          </div>
        </div>
            <button id="button-signup" onClick={(e) => this.props.switchViews(e)} > Sign Up  </button>
            <button id="button-submit" className="float-right btn-sideSpacing" onClick={(e) => this.submitInformation(e,'login')} > Submit </button>
            <button id="button-home" className="btn-cancel btn-sideSpacing" onClick={(e) => this.props.switchViews(e)} > Cancel </button>
        </div>
      )
    } else if (this.props.view === 'signup') {
      return (
        <div>
          <div className='title'> Sign Up </div>
          <div className="table">
            <div className="table-row">
              <div className="table-cell"></div>
              {this.state.passwordMissmatch === true
                ? <div className="passwordError float-right table-cell">Passwords Do Not Match</div>
                : null}
              {this.state.submitError === true
                ? <div className="passwordError float-right table-cell">User already taken</div>
                : null}
            </div>
            <div className="table-row">
              <span className="table-cell">Username: </span>
              <input id='username' className="table-cell" type='text' value={this.state.username} onChange={(e) => this.syncUserInput(e)} />
            </div>
            <div className="table-row">
              <span className="table-cell">Password: </span>
              <input id='password' className="table-cell"  type='password' value={this.state.password} onChange={(e) => this.syncUserInput(e)} />
            </div>
            <div className="table-row">
              <span  className="table-cell">Confirm Password: </span>
              <input id='passwordConfirm' className="table-cell" type='password'value={this.state.passwordConfirm} onChange={(e) => this.syncUserInput(e)} />
            </div>
          </div>
          <button id="button-login" onClick={(e) => this.props.switchViews(e)}> Login </button>
          <button id="button-submit" className="float-right btn-sideSpacing"  onClick={(e) => this.submitInformation(e, 'signup')}> Submit </button>
          <button id="button-home" className="btn-cancel btn-sideSpacing" onClick={(e) => this.props.switchViews(e)} > Cancel </button>
        </div>
      )
    } else if (this.props.view === 'logout') {
      return (
        <div className="header-right float-right" >
        <span id='btn-logout' className="float-right" onClick={this.clickLogoutbutton}>Log Out</span>
        <span id='loggedIn' className="float-right">Welcome {this.props.confirmedUsername} | </span>
        </div>
      )
    } else {
      return (
        <div className="header-right">
          <button id='login-link' className="float-right" onClick={(e) =>  this.props.click(e)}>Login |</button>
          <button id='signup-link' className="float-right" onClick={(e) => this.props.click(e)}>&nbsp;Sign Up</button>
        </div>
      )
    }
  }
}
