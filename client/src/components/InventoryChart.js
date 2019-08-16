import React from "react";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import "../App.css";
class InventoryChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      datesArr: [],
      chartData: [],
      options: {
        legend: {
          labels: {
            fontSize: 30
          }
        }
      }
    };
  }
  componentDidMount() {
    //console.log(this.props.data)
    this.handleData();
  }

  handleData = () => {
    const datasetsData = [];
    const tempDates = [];
    var dates = [];
    var datasetsObject = {};
    const data = this.state.data;
    var datesArray = data[0].inventory;

    function SortDate() {
      data[0].inventory.sort(function(temp1, temp2) {
        return new Date(temp1.date) - new Date(temp2.date);
      });
    }
    SortDate();

    data[0].inventory.map(inv => {});
    data[0].variants.map((variant, i) => {
      datasetsObject[variant.id] = {
        label: variant.title,
        inventory: []
      };
    });

    data[0].inventory.map(inv => {
      tempDates.push(inv.date);
      inv.variants.map(variant => {
        datasetsObject[variant.id].inventory.push(variant.inventory_quantity);
      });
    });
    tempDates.map(date => {
      var value = date.split("T")[0];
      dates.push(value);
    });
    this.setState({ datesArr: dates });
    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const IDs = Object.keys(datasetsObject);
    for (var i = 0; i < IDs.length; i++) {
      if (IDs.length <2) {
        var _label = ""
      }
      else {
        var _label = `Size: ${datasetsObject[IDs[i]].label}`
      }
      var finalObject = {
        data: datasetsObject[IDs[i]].inventory,
        borderColor: getRandomColor(),
        borderWidth: 5,
        fill:false,
        label: _label
      };
      datasetsData.push(finalObject);
    }
    this.setState({ chartData: datasetsData });
    //console.log(datasetsObject)
  };
  render() {
    var data = {
      labels: this.state.datesArr,
      datasets: this.state.chartData

      //  [
      //   {
      //     label: "My First dataset",
      //     //backgroundColor: "rgb(255, 99, 132)",
      //     borderColor: "rgb(255, 99, 132)",
      //     data: [0, 10, 5, 2, 20, 30, 45]
      //   }
      // ]
    };
    return (
      <div className="chart-comp-container">
        <Line data={data} options={this.state.options} />
      </div>
    );
  }
}
export default InventoryChart;
