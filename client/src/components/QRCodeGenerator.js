import React from "react";
import QRCode from "qrcode-react";
import Menu from './Menu'
class QRCodeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      url: "",
      downloadName: "",
      logoSize: 40,
      sizeValue: 128
    };
  }

  onChangeHandler = event => {
    this.setState({ inputValue: event.target.value });
    var inputText = this.state.inputValue;
    if (inputText.indexOf("youtube.") >= 0 && inputText.indexOf(" ") === -1) {
      document.getElementById("qr-generator-label").style.color = "green";
      var youtubeURLARR = inputText.split("watch?v=");
      this.setState({ downloadName: youtubeURLARR[1] });
    } else {
      document.getElementById("qr-generator-label").style.color = "red";
    }
  };
  prepHref = () => {
    var myDiv = document.getElementById("generate-qr-wrapper");
    var canvas = myDiv.children[0];
    var img = canvas.toDataURL("image/png");
    const rawURL = img;
    const finalURL = rawURL.replace(
      "data:image/png;base64,",
      "data:application/octet-stream;base64,"
    );
    this.setState({ url: finalURL });
  };

  biggerQR = () => {
    const qr = document.getElementsByClassName("qr-code-size")[0].checked;
    if (qr) {
      var currentSize = this.state.sizeValue;
      if (currentSize < 270) {
        this.setState({ sizeValue: currentSize + 10 });
      } else {
        this.toggleHander();
      }
    } else if (document.getElementsByClassName("logo-size")[0].checked) {
      
      var currentSize = this.state.logoSize;
      console.log(currentSize)
      if (currentSize < 110) {
        this.setState({ logoSize: currentSize + 10 });
      } else {
        this.toggleHander();
      }
    }
  };
  smallerQR = () => {
    const logo = document.getElementsByClassName("qr-code-size")[0].checked;
    console.log(logo);
    if (logo) {
      var currentSize = this.state.sizeValue;
      if (currentSize > 70) {
        this.setState({ sizeValue: currentSize - 10 });
      } else {
        this.toggleHander();
      }
    } else if (document.getElementsByClassName("logo-size")[0].checked) {
      var currentSize = this.state.logoSize;
      if (currentSize > 10) {
        this.setState({ logoSize: currentSize - 10 });
      } else {
        this.toggleHander();
      }
      console.log(currentSize)
    }
  };
  resetSize = () => {
    this.setState({ sizeValue: 120, logoSize: 40 });
  };

  toggleHander = () => {
    "use strict";
    var snackbarContainer = document.querySelector("#demo-snackbar-example");
    var showSnackbarButton = document.querySelector("#demo-show-snackbar");
    var handler = function(event) {};
    (function() {
      "use strict";
      Math.floor(Math.random() * 0xffffff).toString(16);
      var data = {
        message: "You reached the maximum/minumum",
        timeout: 2000,
        actionHandler: handler,
        actionText: "Reset"
      };
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    })();
  };

  render() {
    return (
     
      <div className="generate-qr-main-wrapper">
        <div
          id="demo-snackbar-example"
          className="mdl-js-snackbar mdl-snackbar"
        >
          <div className="mdl-snackbar__text" />
          <button
            className="mdl-snackbar__action"
            type="button"
            onClick={this.resetSize}
          />
        </div>

        <div id="generate-qr-wrapper">
          <QRCode
            value={this.state.inputValue}
            logo={require("../assets/analuisa-icon.png")}
            logoWidth={this.state.logoSize}
            size={this.state.sizeValue}
          />
        </div>
   
        <div className="download-button-wrapper">
          <a
            style={{ color: "black" }}
            onClick={this.prepHref}
            href={this.state.url}
            download={this.state.downloadName}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
              Download QR
            </button>
          </a>
        </div>
        <div className="input-text-wrapper">
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              id="generate_qr_input"
              onChange={this.onChangeHandler}
            />
            <label className="mdl-textfield__label" htmlFor="sample3">
              Text...
            </label>
          </div>
        </div>

        <div className="radio-wrapper">
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="option-1"
          >
            <input
              type="radio"
              id="option-1"
              className="mdl-radio__button qr-code-size"
              name="options"
              value="1"
            />
            <span className="mdl-radio__label">QR Code</span>
          </label>
          <label
            className="mdl-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="option-2"
          >
            <input
              type="radio"
              id="option-2"
              className="mdl-radio__button logo-size"
              name="options"
              value="2"
            />
            <span className="mdl-radio__label">Logo</span>
          </label>
        </div>

        <div className="qr-size-buttons">
          <button
            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
            onClick={this.biggerQR}
          >
            <i className="material-icons">add</i>
          </button>
          <button
            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
            onClick={this.smallerQR}
          >
            -
          </button>
        </div>

        <label id="qr-generator-label">{this.state.inputValue}</label>  
      </div>
    );
  }
}

export default QRCodeGenerator;
