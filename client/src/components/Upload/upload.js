import React, { Component } from 'react';

import '../css/upload.css';
import '../css/main.css';

import InputForm from './inputForm';



class Upload extends Component{

  render(){
    return(
      <div className="containerBox">
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
