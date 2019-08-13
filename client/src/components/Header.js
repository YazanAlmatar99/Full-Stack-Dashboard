import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="login_container">
            <a href="/auth/google">
              <button class="loginBtn loginBtn--google">
                Login with Google
              </button>
            </a>
          </div>
        );
      default:
        return (
          <div className="login_container">
            <a href="/auth/logout">
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                Log out
              </button>
            </a>
          </div>
        );
    }
  }

  fetchUserFromGoogle = () => {
    fetch("/auth/google", { method: "GET" });
    console.log("pressed");
  };
  render() {
    return (
      <div className="login_main_container">
        <Link
          to={this.props.auth ? "/a/dashboard" : "/"}
          style={{ textDecoration: "none" }}
        >
          <h1 style={{ color: "black", textDecoration: "none" }}>
            Welcome to Ana Luisa!
          </h1>
        </Link>
        <a style={{ color: "black" }} href="/a/dashboard">
          <h6 className="signedin-text">
            {this.props.auth
              ? `Signed in as: ${this.props.auth.firstName}`
              : "Please Sign in with Google using your Ana Luisa account. (Otherwise you can't sign in)"}
          </h6>
        </a>

        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
