import React from 'react';
import "../App.css"

class OrdersCard extends React.Component {

render(){

   




    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title orders">
                <h2 className="mdl-card__title-text">Orders</h2>
            </div>
            <div className="mdl-card__supporting-text">
                Manage and view Orders
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Orders
                </a>
            </div>            
        </div>
    )
}
}

 export default OrdersCard;