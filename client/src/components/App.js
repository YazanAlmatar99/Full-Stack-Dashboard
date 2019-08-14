import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import QRCodeGenerator from "./QRCodeGenerator";
import Menu from "./Menu";
import Products from './Products'
import Inventory from './Inventory'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

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
            <Route exact path="/a/dashboard" component={Dashboard} />
            <Route
              exact
              path="/a/dashboard/qrgenerator"
              component={QRCodeGenerator}
            />
            <Route exact path="/a/dashboard/products" component={Products} />
            <Route exact path="/a/dashboard/products/inventory/:id" component={Inventory} />
          </div>
        </Router>
      </div>
      // </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
