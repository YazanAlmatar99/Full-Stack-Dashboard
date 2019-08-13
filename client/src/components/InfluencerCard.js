import React from 'react';
import "../App.css"

class InfluencerCard extends React.Component {

render(){
    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">Influencer</h2>
            </div>
            <div className="mdl-card__supporting-text">
                View your orders, share-revenue and more...
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                Enter
                </a>
            </div>            
        </div>
    )
}
}

 export default InfluencerCard;