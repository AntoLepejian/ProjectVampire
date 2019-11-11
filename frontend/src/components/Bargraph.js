import React from "react";
import ReactApexChart from "react-apexcharts";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false
          }
        },

        xaxis: {
          type: "category",
          categories: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },
        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      series: [
        {
          name: "Screened",
          data: [44, 55, 41, 67, 22, 43, 34, 53]
        },
        {
          name: "Unscreened",
          data: [13, 23, 20, 8, 13, 27, 35, 23]
        }
      ]
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="350"
          width="600"
        />
      </div>
    );
  }
}
