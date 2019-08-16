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
      stockObject: {},
      velocityObject: {},
      globalStock: 0,
      globalStockDays: 0
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
        this.getInStock();
        this.velocityFinder();
        console.log(this.state.velocityObject, "after then function");
      });
  };
  getInStock() {
    if (this.state.response) {
      var inStockGlobal = {};
      const mostUpdatedInv = this.state.response[0].inventory[
        this.state.response[0].inventory.length - 1
      ];
      var globalStock = 0;
      mostUpdatedInv.variants.map(item => {
        console.log(item, "item");
        globalStock = globalStock + item.inventory_quantity;
        inStockGlobal[item.id] = {
          title: item.title,
          inventory_quantity: item.inventory_quantity
        };
        // tempArr.push(item.inventory_quantity);
        // var style = {};
        // var stockText = "In Stock:";
        // if (item.inventory_quantity == 0) {
        //   style = { color: "red" };
        //   stockText = "Out of stock";
        // }
        // return (
        //   <h6 style={style}>
        //     {item.title == "Default Title" ? " " : "Size: " + item.title}{" "}
        //     {stockText}{" "}
        //     {item.inventory_quantity == 0 ? " " : item.inventory_quantity}
        //   </h6>
        // );
      });
      this.setState({ stockObject: inStockGlobal });
      this.setState({ globalStock: globalStock });
      console.log(this.state.stockObject, "state");
    }
  }
  inStockRender = () => {
    if (Object.keys(this.state.stockObject).length) {
      var objectOfInv = this.state.stockObject;
      const toBeReturned = this.state.response[0].variants.map((variant, i) => {
        var oneItemStock = objectOfInv[variant.id].inventory_quantity;
        console.log(
          objectOfInv[variant.id].inventory_quantity == 0,
          "inventory quantity"
        );
        if (objectOfInv[variant.id].inventory_quantity == 0) {
          var style = {
            color: "red"
          };
        }
        return (
          <div>
            <h4 />
            <h6 style={{ style }}>
              {objectOfInv[variant.id].title == "Default Title"
                ? " "
                : `Size: ${objectOfInv[variant.id].title}`}{" "}
              -
              {objectOfInv[variant.id].inventory_quantity == 0
                ? "Out of stock"
                : `In stock: ${objectOfInv[variant.id].inventory_quantity}`}
            </h6>
          </div>
        );
      });
      return toBeReturned;
    }
  };

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
    if (this.state.response) {
      console.log(this.state.response == null);
      const oldestInv = this.state.response[0].inventory[0];
      const newestInv = this.state.response[0].inventory[
        this.state.response[0].inventory.length - 1
      ];
      var velocityObject = {};
      var inStockState = this.state.stockObject;
      console.log(oldestInv, newestInv);
      var avgOOS = 0;
      const velocityData = oldestInv.variants.map((inv, i) => {
        const velocity =
          (inv.inventory_quantity - newestInv.variants[i].inventory_quantity) /
          this.state.daysDiff;
        console.log("--------------------------------");
        const title = this.state.response[0].variants[i].title;
        console.log(this.state.response);
        console.log(title);
        console.log("--------------------------------");
        console.log(inv.id, "id");
        console.log(inv, "inv");
        console.log(inStockState, "inStockState");
        velocityObject[inv.id] = {
          title: title,
          velocity: velocity
        };
        var avgOutOfStock =
          inStockState[inv.id].inventory_quantity /
          velocityObject[inv.id].velocity;
        avgOOS = avgOOS + avgOutOfStock;
        // (inStockState[variant.id].inventory_quantity / velocityState[variant.id].velocity)
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
      });

      this.setState({ velocityObject: velocityObject });
      this.setState({ globalStockDays: avgOOS / newestInv.variants.length });
      console.log(velocityObject, "velocity Object");
    }
  };
  velocityRender = () => {
    if (
      Object.keys(this.state.velocityObject).length &&
      Object.keys(this.state.stockObject).length
    ) {
      var velocityState = this.state.velocityObject;
      const inStockState = this.state.stockObject;
      var velocityVar = this.state.response[0].variants.map(variant => {
        console.log("*******");
        console.log(variant);
        var outOfStockDays = (
          inStockState[variant.id].inventory_quantity /
          velocityState[variant.id].velocity
        ).toFixed(0);
        console.log(velocityState);
        console.log(inStockState);
        console.log("*******");
        return (
          <div>
            <h6>
              {velocityState[variant.id].title == "Default Title"
                ? " "
                : `Size: ${velocityState[variant.id].title}`}{" "}
              - Velocity: {velocityState[variant.id].velocity}
              {outOfStockDays != NaN && outOfStockDays != Infinity
                ? `- Out of stock in: ${outOfStockDays} days`
                : " "}
            </h6>
          </div>
        );
      });
      return velocityVar;
    } else {
      return false;
    }
  };
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
          <div className="backButton" style={{display:"flex", justifyContent:"center"}}>
            <a href="/a/dashboard/products">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect back-button">
             Back
            </button>
            </a>
          </div>
          <div className="product_info_container">
            <div className="product_info_card">
              <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div
                  className="mdl-card__title" 
                  style={{ backgroundImage: `url(${imageURL})`,height:"270px" }}
                >
                  <h2 className="mdl-card__title-text">s
                    {this.state.response[0].title} - (
                    {this.state.response[0].product_type})
                  </h2>
                </div>
                <div className="mdl-card__supporting-text">
                  {this.state.globalStock == 0 ? (
                    <h4 style={{ color: "red" }}>Out of Stock</h4>
                  ) : (
                    <h4>Global Stock: {this.state.globalStock}</h4>
                  )}
                  {this.inStockRender()}
                </div>
              </div>
            </div>
            <div className="stat_container">
              <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title" style={{height:"270px"}}>
                  <h2 className="mdl-card__title-text">Statistics</h2>
                </div>
                <div className="mdl-card__supporting-text">
                  {
                    <h4>
                      {this.state.globalStockDays != NaN &&
                      this.state.globalStockDays != Infinity
                        ? `Average Out Of Stock Days: ${
                            this.state.globalStockDays.toFixed(0)
                          }`
                        : "N/A"}
                    </h4>
                  }
                  {this.velocityRender() ? this.velocityRender() : null}
                </div>
              </div>
            </div>
          </div>
          <InventoryChart data={this.state.response} />
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginTop: "150px",
        }}
      >
        <Loading />
      </div>
    );
  }

  render() {
    return <div className="page_container">{this.renderContent()}</div>;
  }
}
export default Inventory;
