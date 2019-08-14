import React from "react";
import "../App.css";
import ProductComponent from "./ProductComponent";
import Loading from "./Loading";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsArray: [],
      costOfGoods: null,
      costOfRetail: null
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }
  renderProducts() {
    if (this.state.productsArray[0]) {
      const title = this.state.productsArray[0].title;
      console.log(title);
      const productsArray = this.state.productsArray;
      const productsRendered = productsArray.map(product => {
        return (
          <ProductComponent
            id={product.id}
            title={product.title}
            image={product.image}
            product_type={product.product_type}
            variants={product.variants}
          />
        );
      });

      return (
        <div className="product-component-main-container">
          {productsRendered}
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          alignItems: "center",
          marginTop: "100px"
        }}
      >
        <Loading />
      </div>
    );
  }

  fetchProducts = async () => {
    const response = await fetch("/api/v1/inventory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(products => {
        this.setState({ productsArray: products.data });
        this.costOfGoodsAndRetail();
      });
  };
  costOfGoodsAndRetail = () => {
    var costOfGoods = 0;
    var costOfRetail = 0;
    var productsArray = this.state.productsArray;
    productsArray.map(product => {
      product.variants.map(prdct => {
        var tempCost = prdct.inventory_quantity * parseInt(prdct.cost_per_item);
        costOfGoods = costOfGoods + tempCost;
        var tempCost2 = prdct.inventory_quantity * parseInt(prdct.price);
        costOfRetail = costOfRetail + tempCost2;
      });
    });
    this.setState({ costOfGoods: costOfGoods, costOfRetail: costOfRetail });
    console.log(costOfGoods);
    console.log(costOfRetail);
  };
  render() {
    return (
      <div className="products-page-wrapper">
        <h4>Cost of retail: {this.state.costOfRetail}$</h4>
        <h4>Cost of goods: {this.state.costOfGoods}$</h4>
        <div className="products-page-header">
          <h4 className="item">Product</h4>
          <h4 className="item">Title</h4>
          <h4 className="item">Inventory</h4>
          <h4 className="item">Product Type</h4>
          <h4 className="item">Price</h4>
        </div>

        {this.renderProducts()}
      </div>
    );
  }
}

export default Products;
