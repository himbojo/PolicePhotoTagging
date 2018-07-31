import React, { Component } from 'react';

import './upload.css';

import NavBar from '../objects/navBar';

import axios from 'axios';

import ImageUpload from '../objects/imageUpload';

import TimePicker from 'react-dropdown-timepicker';


class Upload extends Component{

  render(){
    return(
      <div>
       <NavBar/>
      
      </div>
    );
  }

}

export default Upload;
