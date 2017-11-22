import React from 'react';
import ReactDOM from 'react-dom';

var Login = function (props) {
  return (
    <div className="header-right">
      <span id='signup-link' onClick={(e) => props.click(e)}>Sign Up</span> | <span id='login-link' onClick={(e) => props.click(e)}>Login</span>
    </div>
  )
}

export default Login;