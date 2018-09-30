import React, { Component } from "react";

import "./upload.css";
import "../css/main.css";
import SearchForm from "./searchForm";
import SearchMap from "./searchMap";

class Search extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      ShowMap: 0

    };
        this.onShowMap = this.onShowMap.bind(this);

  }

  onShowMap() {
    this.setState({ ShowMap: 1});
  }
  onDisplayMap(){
    if(this.state.ShowMap === 1)
    return <SearchMap />;

    return null;
  }
  render() {
    return (
      <div className="containerBox">
        <div className="backgroundImage">
          <div className="mainPage">
            <SearchForm onShowMap={this.onShowMap}/>
            {this.onDisplayMap()}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
