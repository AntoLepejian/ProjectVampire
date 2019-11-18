/*import React from "react";
import ReactApexChart from "react-apexcharts";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    let obj = {
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
        title: {
          text: "Blood Inventory",
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "32px",
            color: "#263238"
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
          categories: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          title: {
            text: "Blood Categories"
          }
        },
        yaxis: {
          title: {
            text: "Blood Levels (mLs)"
          }
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
        }
      ],
      legend: {
        show: true
      }
    };

    if (this.props.isBatmobile === true) {
      console.log("ture");
      obj.series.push({
        name: "Unscreened",
        data: this.props.unscreened
      });
    }
    this.state = obj;
    console.log(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.screened !== this.props.screened ||
      nextProps.unscreened !== this.props.unscreened
    ) {
      let lst = [{ name: "Screened", data: nextProps.screened }];
      console.log(this.state);
      if (this.props.isBatmobile === true) {
        lst.push({
          name: "Unscreened",
          data: nextProps.unscreened
        });
      }
      this.setState(state => ({
        ...state,
        series: lst
      }));
      console.log(this.state);
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
*/
