import React from "react";
import { connect } from "react-redux";
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGoogleIdFromRes: null
    };
  }

  renderContent() {
    
  }
 
  fetchProducts = () => {
    console.log('the button is being pressed on the client side')

  };
  render() {
    return (
      <div>
        <button onClick={this.fetchProducts}>
          Fetch Products
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Products);
