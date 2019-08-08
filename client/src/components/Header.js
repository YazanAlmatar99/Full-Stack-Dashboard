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
          <li>
            <a href="/auth/google">
              Sign In With Google
            </a>
          </li>
        );
          default:
        return [
          <li key="2">
            <a href="/auth/logout">Logout</a>
          </li>
        ];
    }
  }

  fetchUserFromGoogle = () => {
    fetch("/auth/google", { method: "GET" });
    console.log("pressed");
  };
  render() {
    return (
      <nav>
        <div>
          <Link to={this.props.auth ? "/api/dashboard" : "/"}>Ana Luisa</Link>
          <ul>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
