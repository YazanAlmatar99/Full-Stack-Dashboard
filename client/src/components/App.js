import React from 'react';
import Header from "./Header";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions'

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
        <div className="container">
        <Router>
          <div>
          <Route exact path="/" component={Header} />          
          <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </div>
      // </div>
    );
  }
}


export default connect(null,actions)(App);
