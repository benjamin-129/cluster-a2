import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "../data/SA4_2016_AUST_geojson.json";
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

  onEachCountry = (country, layer) => {
    const countryName = country.properties.SA4_NAME16;
    console.log(countryName);
    layer.bindPopup(countryName);
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
            data={mapData.features}
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
