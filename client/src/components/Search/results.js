import React, { Component } from "react";

import "./upload.css";
import "../css/main.css";

import ResultForm from "./resultForm";

class Results extends Component {
  render() {
    return (
      <div className="containerBox">
        <ResultForm />
      </div>
    );
  }
}

export default Results;
