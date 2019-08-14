import React from "react";
import "../App.css";
const ProductComponenet = props => {

    var variants = props.variants;
    var totalInventory = 0;
    var numberOfVariants = variants.length;
    
    variants.map(item=>{
        totalInventory = item.inventory_quantity + totalInventory
    }) 

  return (
    <div className="product-container">
      <div className="product-image-container">
        <div
          className="demo-card-image mdl-card mdl-shadow--2dp"
          style={{
            background: ` url(${props.image}) center / cover`
          }}
        >
          <div className="mdl-card__title mdl-card--expand" />
          <div className="mdl-card__actions">
            <span className="demo-card-image__filename"></span>
          </div>
        </div>
      </div>
      <div className = "product-des-container">
        <h6>{props.variants[0].price}</h6>
        <h6>{totalInventory}{(numberOfVariants == 1) ? '' : ` of ${numberOfVariants}`  }</h6>
        <h6>{props.product_type}</h6>
        <h6>{props.title}</h6>
      </div>
          <a href={`/a/dashboard/products/inventory/${props.id}`}>
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" >
         Details
        </button>
          </a>
        

    </div>
  );
};

export default ProductComponenet;
