import React, { Component } from 'react';

import LoginForm from './loginForm';

import '../css/main.css';

class Login extends Component{
  render(){
return(
  <div className="containerBox">
    <div className="backgroundImage">
      <div className="mainPage">
        <LoginForm />
      </div>
    </div>
  </div>);
  }

}

export default Login;
