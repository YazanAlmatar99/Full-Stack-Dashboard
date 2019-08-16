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
          className="demo-card-image mdl-card mdl-shadow--2dp product-card"
          style={{
            background: ` url(${props.image}) center / cover`
          }}
        >
          <div className="mdl-card__title mdl-card--expand" />
        </div>
      </div>
      <div className = "product-des-container">
        <h6>{props.title}</h6>
        <h6>{totalInventory}{(numberOfVariants == 1) ? '' : ` of ${numberOfVariants}`   }</h6>
        <h6>{props.product_type}</h6>
        <h6>{props.variants[0].price}</h6>
      </div>
          <a href={`/a/dashboard/products/inventory/${props.id}`} className="details-button-a">
        
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored details-button icon material-icon" id="details-button"  >
         Details
        </button>
         
          </a>
        

    </div>
  );
};

export default ProductComponenet;
