import React, { Component } from 'react';

import LoginForm from './loginForm';
import '../css/login.css';
import '../css/main.css';

class Login extends Component{
  render(){
return(
  <div className="backgroundImageLogin">
  <div className="loginMain">
      <LoginForm />
    </div>
  </div>);
  }

}

export default Login;
