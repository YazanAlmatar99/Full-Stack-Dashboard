import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import ProductCard from "./ProductsCard";
import QRCodeGenerator from "./QRCodeGenerator";
import InventoryCard from "./InventoryCard";
import OrdersCard from "./OrdersCard";
import HoroscopeCard from "./HoroscopeCard";
import InfluencerCard from "./InfluencerCard";
import Menu from "./Menu";
import AvatarCard from "./AvatarCard";
import QRCodeGeneratorCard from "./QRCodeGeneratorCard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGoogleIdFromRes: null
    };
  }
  componentDidMount() {
    axios
      .post("/auth/google/userAuth", { data: this.props.auth })
      .then(res => {
        console.log("the user auth function is done");
        console.log(res.data.googleId);
        this.setState({ userGoogleIdFromRes: res.data });
        // console.log(this.state.userGoogleIdFromRes.role)
      })
      .then(() => {
        this.componentsShowHandler();
      });
  }

  componentsShowHandler = props => {
    if (this.state.userGoogleIdFromRes != null) {
      console.log(this.state.userGoogleIdFromRes.role);
      if (this.state.userGoogleIdFromRes.role == "admin") {
        return (
      
                <div className="main_header">
                  <div className="avatar_wrapper">
                    <AvatarCard user={this.state.userGoogleIdFromRes} />
                  </div>
                  <div className="components_wrapper">
                    {/* <InventoryCard /> */}
                    <OrdersCard />
                    <ProductCard />
                    <HoroscopeCard />
                    <QRCodeGeneratorCard />
                  </div>
                  {/* <QRCodeGenerator/> */}
                </div>
              
        );
      } else if (this.state.userGoogleIdFromRes.role == "influencer") {
        return (
          <div className="components_wrapper">
            <InfluencerCard />
          </div>
        );
      }
    }
  };
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        window.location.replace("/auth/google");
        return;
      default:
        return (
          <div>
            {this.componentsShowHandler()}
            <a href="/">Dashboard - Ana Luisa</a>
            {/* <button onClick={this.fetchAPI}>Delete</button>
            <input id="inputId" /> */}
          </div>
        );
    }
  }
  fetchAPI = () => {
    var inputValue = document.getElementById("inputId").value;
    axios
      .delete(`/a/v1/horoscope/${inputValue}`, {
        params: this.state.userGoogleIdFromRes
      })
      .then(response => {
        console.log("its deleted");
        console.log(response);
      });
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>{this.renderContent()}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Dashboard);
