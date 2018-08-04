import React, { Component } from 'react';

import './upload.css';

import NavBar from '../objects/navBar';

import InputForm from './inputForm';



class Upload extends Component{

  render(){
    return(
      <div className="containerBox">
        <NavBar/>
        <div className="backgroundImage">
          <div className="mainPage">
            <InputForm/>
          </div>
        </div>
      </div>
    );
  }

}

export default Upload;
