import React, { Component } from "react";
import { Button, FormControl, FormGroup, ControlLabel, InputGroup, Label } from "react-bootstrap";
import NavBar from "../objects/navBar";
import '../css/main.css';

class Search extends Component {
  render() {
    return (
      <div className="containerBox">
        <NavBar/>
        <div className="backgroundImage">
          <div className="mainPage">
            <div className="input-group">
            <span className="input-group-addon" id="basic-addon1">@</span>
                <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1"/>
              </div>

              <div className="input-group">
                <input type="text" className="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2"/>
                <span className="input-group-addon" id="basic-addon2">@example.com</span>
              </div>

              <div className="input-group">
                <span className="input-group-addon">$</span>
                <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                <span className="input-group-addon">.00</span>
              </div>

              <label for="basic-url">Your vanity URL</label>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">https://example.com/users/</span>
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
