import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "../data/output.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import Menu from "./Menu"

class MyMap extends Component {
  state = {};

  componentDidMount() {
    console.log(mapData);
  }

  countryStyle = {
    fillColor: "white",
    fillOpacity: 0.2,
    color: "black",
    weight: 0.2,
  };

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  onEachCountry = (state, layer) => {

      const stateName = state.properties.STE_NAME16;
      layer.bindPopup(stateName);

    
  }

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div>
        <Menu />
        <Map style={{ height: "100vh" }} zoom={5} center={[-25, 130]}>
          <GeoJSON
            style={this.countryStyle}
            data={mapData}
            onEachFeature={this.onEachCountry}
          />
        </Map>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        />
      </div>
    );
  }
}

export default MyMap;
