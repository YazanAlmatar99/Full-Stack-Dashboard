import React from "react";
import InventoryChart from "./InventoryChart";
import Loading from "./Loading";
class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedId: this.props.match.params.id,
      response: null
    };
  }
  componentDidMount() {
    this.fetchRequestedId();
  }

  fetchRequestedId = async props => {
    const response = await fetch(
      `/api/v1/inventory/${this.state.requestedId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ response: data });
        console.log("this is after the fetch function");
       // console.log(this.state.response[0]);
      });
  };
  renderContent() {
    if (this.state.response) {
      return <InventoryChart data= {this.state.response} />;
    }
    return <Loading />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
export default Inventory;
