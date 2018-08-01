import React, {Component} from 'react';
    import {render} from 'react-dom';

    class InputForm extends Component {
      constructor() {
        super();
        this.state = {
          QID: '',
          FileNumber: '',
          Location: '',
          Tags: '',
          Description: '',
          Offence: ''
        };
      }

      onChange = (e) => {
        var state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();

        //handle form processing here....
      }

      render() {
        var {QID, FileNumber, Location, Tags, Description, Offence} = this.state;

        return (
          <div className="container">
            <form className="form-signin" onSubmit={this.onSubmit}>
              <h2 className="form-signin-heading">Create Account</h2>

              <div className="form-group">
                <input type="text" name="QID" className="form-control"
                  placeholder="Email address" value={QID} onChange={this.onChange} autoFocus />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input type="password" name="FileNumber" className="form-control"
                  placeholder="Password" value={FileNumber} onChange={this.onChange} />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input type="password" name="Location" className="form-control"
                  placeholder="Confirm Password" value={Location} onChange={this.onChange} />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input type="password" name="Tags" className="form-control"
                  placeholder="Confirm Password" value={Tags} onChange={this.onChange} />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input type="password" name="Description" className="form-control"
                  placeholder="Confirm Password" value={Description} onChange={this.onChange} />
                <span className="help-block"></span>
              </div>

              <div className="form-group">
                <input type="password" name="Offence" className="form-control"
                  placeholder="Confirm Password" value={Offence} onChange={this.onChange} />
                <span className="help-block"></span>
              </div>
            </form>
          </div>
        );
      }
    };

export default InputForm;
