import React from "react";
import QRCode from "qrcode-react";

class QRCodeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      url: "",
      downloadName: ""
    }; //s
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

  render() {
    return (
      <div>
        <input
          type="text"
          id="generate_qr_input"
          onChange={this.onChangeHandler}
        />
        <div id="generate-qr-wrapper">
          <QRCode
            value={this.state.inputValue}
            logo={require("../assets/analuisa-icon.png")}
            logoWidth={40}
          />
        </div>
        <a
          onClick={this.prepHref}
          href={this.state.url}
          download={this.state.downloadName}
          target="_blank"
          rel="noopener noreferrer"
        >
          Click To Download
        </a>
        <label id="qr-generator-label">{this.state.inputValue}</label>
      </div>
    );
  }
}

export default QRCodeGenerator;
