import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Products from './Products'
import QRCodeGenerator from './QRCodeGenerator';
import Inventory from './Inventory'
import Orders from './Orders'
import Horoscope from './Horoscope'
import Influencer from './Influencer'
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
     // console.log(this.state.userGoogleIdFromRes.role)
    }).then(()=>{
      this.componentsShowHandler()
    });
  }

  componentsShowHandler  = props =>{
  console.log(this.state.userGoogleIdFromRes.role)
  if (this.state.userGoogleIdFromRes.role == 'admin') {
    return (
      <div className = "components_wrapper">
      <Inventory/>
      <Orders/>
      <Products/>
      <Horoscope/>
    </div>
    )
  } else if (this.state.userGoogleIdFromRes.role == 'influencer') {
    return (
      <div className = "components_wrapper">
        <Influencer/>
      </div>
    )
  }

  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
       window.location.replace('/auth/google')
          return;
      default:
        return (
          <div>
            <a href="/">Dashboard - Ana Luisa</a>
            <button onClick={this.fetchAPI}>Delete</button>
            <input id = "inputId"></input>
            {this.componentsShowHandler()}

          </div>
        )
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
        <QRCodeGenerator/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Dashboard);
