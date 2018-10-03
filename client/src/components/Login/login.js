import React, { Component } from 'react';

import LoginForm from './loginForm';
import '../css/login.css';

class Login extends Component{
  render(){
return(
  <div className="backgroundImageLogin">
      <LoginForm />
  </div>);
  }

}

export default Login;
