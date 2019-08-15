import React from "react";
import InventoryChart from "./InventoryChart";
import Loading from "./Loading";
import moment from "moment";
class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestedId: this.props.match.params.id,
      response: null,
      daysDiff: 0,
      stockArr: [],
      velocityObject: {}
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
        this.daysDiffFinder();
      });
  };
  getInStock() {
    const mostUpdatedInv = this.state.response[0].inventory[
      this.state.response[0].inventory.length - 1
    ];
    var tempArr = [];
    var inStock = mostUpdatedInv.variants.map(item => {
      console.log(item);
      tempArr.push(item.inventory_quantity);
      var style = {};
      var stockText = "In Stock:";
      if (item.inventory_quantity == 0) {
        style = { color: "red" };
        stockText = "Out of stock";
      }
      return (
        <h6 style={style}>
          {item.title == "Default Title" ? " " : "Size: " + item.title}{" "}
          {stockText}{" "}
          {item.inventory_quantity == 0 ? " " : item.inventory_quantity}
        </h6>
      );
    });
    //this.setState({stockArr:tempArr})
    return inStock;
  }

  daysDiffFinder = () => {
    const oldestDate = this.state.response[0].inventory[0].date;
    const newestDate = this.state.response[0].inventory[
      this.state.response[0].inventory.length - 1
    ].date;
    var oDate = moment(oldestDate);
    var nDate = moment(newestDate);
    console.log(oldestDate);
    console.log(newestDate);
    var diff = nDate.diff(oDate, "days");
    console.log(diff);
    this.setState({ daysDiff: diff });
    console.log(diff);
  };
  velocityFinder = () => {
    const oldestInv = this.state.response[0].inventory[0];
    const newestInv = this.state.response[0].inventory[
      this.state.response[0].inventory.length - 1
    ];
    var velocityObject = {}
    console.log(oldestInv, newestInv);
    const velocityData = oldestInv.variants.map((inv, i) => {
      const velocity =
        (inv.inventory_quantity - newestInv.variants[i].inventory_quantity) /
        this.state.daysDiff;
      console.log("--------------------------------");
      const title = this.state.response[0].variants[i].title;
      console.log(this.state.response);
      console.log(title);
      console.log("--------------------------------");
      // velocityObject[inv.id] = {}
      this.setState({velocityArr:velocity})

    //   return (
    //     <div>
    //       <h6>
    //         {title == "Default Title" ? " " : "Size: " + title} Velocity:{" "}
    //         {velocity.toFixed(2)} Out of stock in:
    //       </h6>
    //     </div>
    //   );
    // });
    // return velocityData;
  })

}

  renderContent() {
    if (this.state.response) {
      /************html*************/
      const imageURL = this.state.response[0].image;
   //   let stock = '';
      // if (this.state.stock) {
      //   oerijgeoirjg.map((vv) =>{
      //     stock+=(<p>feokroke</p>)
      //   })
      // }
      return (
        <div>
          <div className="product_info_container">
            <div className="product_info_card">
              <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div
                  className="mdl-card__title"
                  style={{ backgroundImage: `url(${imageURL})` }}
                >
                  <h2 className="mdl-card__title-text">
                    {this.state.response[0].title} -{" "}
                    {this.state.response[0].product_type}
                  </h2>
                </div>
                <div className="mdl-card__supporting-text">
                  {this.getInStock()}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    Get Started
                  </a>
                </div>
                <div className="mdl-card__menu">
                  <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i className="material-icons">share</i>
                  </button>
                </div>
              </div>
            </div>
            <div className="stat_container">
              <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                  <h2 className="mdl-card__title-text">Welcome</h2>
                </div>
                <div className="mdl-card__supporting-text">
                  {/* {this.velocityFinder()} */}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                  <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    Get Started
                  </a>
                </div>
                <div className="mdl-card__menu">
                  <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i className="material-icons">share</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <InventoryChart data={this.state.response} />
        </div>
      );
    }
    return <Loading />;
  }

  render() {
    return <div className="page_container">{this.renderContent()}</div>;
  }
}
export default Inventory;
