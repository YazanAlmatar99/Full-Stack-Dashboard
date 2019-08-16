import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import QRCodeGenerator from "./QRCodeGenerator";
import Menu from "./Menu";
import Products from "./Products";
import Inventory from "./Inventory";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout">
        <header
          className="mdl-layout__header mdl-layout__header--scroll"
          style={{ position: "fixed", top: "0" }}
        >
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title"><a href="/a/dashboard">Ana Luisa Dashboard</a></span>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-navigation">
              <a
                className="mdl-navigation__link"
                href="http://www.analuisa.com"
                target="_blank"
              >
                Ana Luisa
              </a>
              <a
                className="mdl-navigation__link"
                href="https://analuisaparis.myshopify.com/admin/themes"
                target="_blank"
              >
                AL Shopify
              </a>
              <a className="mdl-navigation__link" href="">
                Link
              </a>
              <a className="mdl-navigation__link" href="">
                Link
              </a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Menu</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="/a/dashboard">
              Home
            </a>
            <a className="mdl-navigation__link" href="/a/dashboard/qrgenerator">
              Generate QR Codes
            </a>
            <a className="mdl-navigation__link" href="/a/dashboard/products">
              Products
            </a>
            <a className="mdl-navigation__link" href="">
              Link
            </a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="container" style={{marginTop:"100px"}}>
              <Router>
                <div>
                  <Route exact path="/" component={Header} />
                  <Route exact path="/a/dashboard" component={Dashboard} />
                  <Route
                    exact
                    path="/a/dashboard/qrgenerator"
                    component={QRCodeGenerator}
                  />
                  <Route
                    exact
                    path="/a/dashboard/products"
                    component={Products}
                  />
                  <Route
                    exact
                    path="/a/dashboard/products/inventory/:id"
                    component={Inventory}
                  />
                </div>
              </Router>
            </div>
          </div>
        </main>        
      </div>
     
    );
  }
}

export default connect(
  null,
  actions
)(App);
