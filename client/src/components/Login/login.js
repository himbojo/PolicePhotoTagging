import React, { Component } from 'react';

import Background from '../../pictures/loginBG.jpg';
import LoginForm from './loginForm';

class Login extends Component{
  render(){
return(<div className="loginMain" style={{ backgroundImage: `url(${Background})`, height: "100vh" }}>
      <LoginForm />

    </div>);
  }

}

export default Login;
