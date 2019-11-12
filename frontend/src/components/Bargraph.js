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
          data: this.props.screened
        },
        {
          name: "Unscreened",
          data: this.props.unscreened
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.screened !== this.props.screened ||
      nextProps.unscreened !== this.props.unscreened
    ) {
      this.setState(state => ({
        ...state,
        series: [
          { name: "Screened", data: nextProps.screened },
          { name: "Unscreened", data: nextProps.unscreened }
        ]
      }));
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="450"
          width="800"
        />
      </div>
    );
  }
}
