import React from 'react';
import Header from "./Header";
import Dashboard from "./Dashboard";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions'
import { withRouter } from "react-router";
class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Switch>
          <Route exact path="/" component={Header} />
          </Switch>
      // <div className="container">
      //   <Router>
      //     <div>
      //     <Route exact path="/" component={Header} />          
      //     <Route exact path="/dashboard" component={Dashboard} />
      //     </div>
      //   </Router>
      // </div>
      // </div>
    );
  }
}


export default withRouter(connect(null,actions)(App));
