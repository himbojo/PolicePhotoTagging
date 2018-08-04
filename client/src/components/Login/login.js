import React, { Component } from 'react';

import Background from '../assets/loginBG.jpg';
import LoginForm from './loginForm';
import '../css/loginCss.css';


import '../css/main.css';

class Login extends Component{
  render(){
return(<div className="loginMain" style={{ backgroundImage: `url(${Background})`, height: "100vh" }}>
      <LoginForm />

    </div>);
  }

}

export default Login;
