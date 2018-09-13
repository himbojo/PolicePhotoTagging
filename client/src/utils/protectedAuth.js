import React, { Component } from "react";
import { connect } from "react-redux";

export default function(Component) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!localStorage.getItem("token")) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
