import React, { Component } from "react";

import "./upload.css";
import "../css/main.css";

import NavBar from "../objects/navBar";

import SearchForm from "./searchForm";

class Search extends Component {
  render() {
    return (
      <div className="containerBox">
        <NavBar />
        <div className="backgroundImage">
          <div className="mainPage">
            <SearchForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
