import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Products from './Products'
import QRCodeGenerator from './QRCodeGenerator';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGoogleIdFromRes: null
    }
  
  }
  componentDidMount(){
    axios.post("/auth/google/userAuth", { data: this.props.auth }).then(res => {
      console.log("the user auth function is done");
      console.log(res.data.googleId)
      this.setState({userGoogleIdFromRes: res.data})
      console.log(this.state.userGoogleIdFromRes.role)
    });
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
       window.location.replace('/auth/google')
          return;
      default:
        return [
          <li key="2">
            <a href="/">Dashboard - Ana Luisa</a>
            <button onClick={this.fetchAPI}>Delete</button>
            <input id = "inputId"></input>
          </li>
        ];
    }
    
  }
  fetchAPI = ()=> {
    var inputValue = document.getElementById("inputId").value
    axios.delete(`/a/v1/horoscope/${inputValue}`,{params:this.state.userGoogleIdFromRes}).then(response => {
        console.log("its deleted");
        console.log(response);
      });
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>{this.renderContent()}</h1>
        <Products/>
        <QRCodeGenerator/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Dashboard);
