import React, { Component } from "react";

import "../css/upload.css";
import "../css/main.css";

import ResultForm from "./resultForm";
import GMap from "../objects/GMap";

class Results extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      ShowMap: 0

    };
        this.onShowMap = this.onShowMap.bind(this);

  }
  onShowMap(val) {
    console.log(val);
    this.setState({ ShowMap: val});
  }
  onDisplayMap(){
    if(this.state.ShowMap === 1)
    return <GMap onShowMap={this.onShowMap}/>;
    return <ResultForm onShowMap={this.onShowMap}/>;
  }
  render() {
    return (
      <div className="containerBox">

        {this.onDisplayMap()}
      </div>
    );
  }
}

export default Results;
