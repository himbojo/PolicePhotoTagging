import React, { Component } from "react";

import "./upload.css";
import "../css/main.css";

import NavBar from "../objects/navBar";

import ResultForm from "./resultForm";

class Results extends Component {
  render() {
    return (
      <div className="containerBox">
        <NavBar />
        <div className="backgroundImage">
          <div className="mainPage">
            <ResultForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
