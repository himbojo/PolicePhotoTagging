import React, { Component } from 'react';

import './upload.css';

import NavBar from '../objects/navBar';


import InputForm from './inputForm';


class Upload extends Component{

  render(){
    return(
      <div>
       <NavBar/>
       <InputForm/>
      </div>
    );
  }

}

export default Upload;
