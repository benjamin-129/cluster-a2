import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/sa2_geojson_low.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
  state = {};

  colors = ["green", "blue", "yellow", "orange", "grey"];

  componentDidMount() {
    console.log(mapData);
  }

  countryStyle = {
    fillColor: "red",
    fillOpacity: 0.5,
    color: "black",
    weight: 0.2,
  };

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: "red",
      fillColor: this.state.color,
      fillOpacity: 0.2,
    });
  };

  onEachCountry = (country, layer) => {
    const countryName = country.properties.SA3_NAME16;
    console.log(countryName);
    layer.bindPopup(countryName);

    layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length);
    // layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
      click: this.changeCountryColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div>
        <Map style={{ height: "100vh" }} zoom={4} center={[-25, 130]}>
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
