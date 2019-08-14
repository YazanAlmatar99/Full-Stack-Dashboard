import React from "react";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";

class InventoryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         data:this.props.data
        };
      }
  componentDidMount() {
    //console.log(this.props.data)
    this.handleData()
  }
  data = {
    labels: ["1","2","3"],
    datasets: [
      {
        label: "My First dataset",
        //backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45]
      }, {
        label: "My First dataset",
        //backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 1, 3, 20, 30, 45]
      }
    ]
  };

  handleData = () => {
      const data = this.state.data;
      data[0].inventory.map(item=>{
          console.log(item)
      })
  }
  render() {
    return (
      <div className = "chart-comp-container">
        <Line data={this.data} />
      </div>
    );
  }
}
export default InventoryChart;
