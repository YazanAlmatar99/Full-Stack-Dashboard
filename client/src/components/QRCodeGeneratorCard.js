import React from 'react';
import "../App.css"

class QRCodeGeneratorCard extends React.Component {

render(){
    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title qrcode">
                <h2 className="mdl-card__title-text">QR Code</h2>
            </div>
            <div className="mdl-card__supporting-text">
                Generate QR Codes with Ana Luisa Logo on it
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/a/dashboard/qrgenerator">
                Generate
                </a>
            </div>            
        </div>
    )
}
}

 export default QRCodeGeneratorCard ;