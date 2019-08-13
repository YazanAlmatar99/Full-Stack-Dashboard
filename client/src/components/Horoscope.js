import React from 'react';
import "../App.css"

class Horoscope extends React.Component {

render(){

   




    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">Horoscope</h2>
            </div>
            <div className="mdl-card__supporting-text">
                Manage and view Horoscope Data
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

 export default Horoscope;