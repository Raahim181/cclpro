import React, { Component } from "react";
import * as d3 from "d3";
import states from "./States";
import axios from "axios";


class PIIP_USMAP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      dataReady: false,
      data: new Map(),
      items: null
    };
    this.drawChart = this.drawChart.bind(this);
  }

  drawChart() {
    function tooltipHtml(n, d) {
      var htmlTable = "<h4>" + n + "</h4><table>";
      htmlTable +=
        "<tr><td><b>SNAP/Poverty: </b></td><td><b>" +
        d.SNAP +
        "</b></td></tr></table>";
      return htmlTable;
    }

    var mapData = {};
    let data = this.state.data;
    ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",  
    "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",  
    "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",  
    "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",  
    "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"].forEach(function(d) {
      let SNAP = 0;
      // if (
      //   data.get(d.slice(0, 2)) != null &&
      //   data.get(d.slice(0, 2)).get(d.slice(2, 4)) != null
      // ) {
      //   SNAP = data.get(d.slice(0, 2)).get(d.slice(2, 4));
      // }

      mapData[d] = {
        SNAP,
        color: d3.interpolate("#AF0000 ", "#28F209")(SNAP)
      };
    });

    states.draw("#statesvgem", mapData, tooltipHtml);

    d3.select(window.frameElement).style("height", "600px");
  }

  getData() {
    let stateValues = {
      AK: [0],
      AL: [0],
      AR: [0],
      AZ: [0],
      CA: [0],
      CO: [0],
      CT: [0],
      DC: [0],
      DE: [0],
      FL: [0],
      GA: [0],
      HI: [0],
      IA: [0],
      ID: [0],
      IL: [0],
      IN: [0],
      KS: [0],
      KY: [0],
      LA: [0],
      MA: [0],
      MD: [0],
      ME: [0],
      MI: [0],
      MN: [0],
      MO: [0],
      MS: [0],
      MT: [0],
      NC: [0],
      ND: [0],
      NE: [0],
      NH: [0],
      NJ: [0],
      NM: [0],
      NV: [0],
      NY: [0],
      OH: [0],
      OK: [0],
      OR: [0],
      PA: [0],
      RI: [0],
      SC: [0],
      SD: [0],
      TN: [0],
      TX: [0],
      UT: [0],
      VA: [0],
      VT: [0],
      WA: [0],
      WI: [0],
      WV: [0],
      WY: [0]
    };

    this.setState({ isLoaded: true, items: stateValues });
  }

  componentDidMount() {
    this.getData();
    const data = new Map();
    // fetch("https://api.foodmeonce.me/Districts?limit=439")
    //   .then(res => res.json())
    //   .then(res => {
    //     res.data.forEach(cd => {
    //       const snap = parseFloat(cd.snap_rate);
    //       const poverty = parseFloat(cd.poverty_rate);
    //       const rate = snap / poverty;
    //       if (data.has(cd.state_abbreviation)) {
    //         data
    //           .get(cd.state_abbreviation)
    //           .set(cd.congressional_district, rate);
    //       } else {
    //         let cdMap = new Map();
    //         cdMap.set(cd.congressional_district, rate);
    //         data.set(cd.state_abbreviation, cdMap);
    //       }
    //     });
    //     this.setState({ dataReady: true, data: data });
    //   });
    this.setState({ dataReady: true, data: data });
  }

  render() {
    if (this.state.isLoaded && this.state.dataReady) {
      this.drawChart();
    }
    return (
      <div className="text-center">
        <div width="100" height="100" id="tooltip"></div>
        <svg
          id="statesvgem"
          width="1500"
          height="800"
          style={{ marginTop: "0%" }}
        ></svg>
      </div>
    );
  }
}

export default PIIP_USMAP;
