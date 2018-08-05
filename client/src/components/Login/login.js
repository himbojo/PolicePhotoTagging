import React, { Component } from 'react';

import Background from '../assets/new-zealand-police-background.jpg';
import LoginForm from './loginForm';
import '../css/login.css';

class Login extends Component{
  render(){
return(<div className="loginMain">
      <LoginForm />

    </div>);
  }

}

export default Login;
