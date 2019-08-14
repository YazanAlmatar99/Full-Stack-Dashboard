
import React from 'react';
import "../App.css"

class ProductsCard extends React.Component {

render(){

   




    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title products">
                <h2 className="mdl-card__title-text">Products</h2>
            </div>
            <div className="mdl-card__supporting-text">
                Manage and view Products
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/a/dashboard/products">
                Products
                </a>
            </div>            
        </div>
    )
}
}

 export default ProductsCard;