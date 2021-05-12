import React, { Component } from "react";
import { Map, GeoJSON } from "react-leaflet";
import infoData from "../data/output.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";


class MyMap extends Component {
  state = { color: "red" };


  componentDidMount() {
    console.log(infoData);
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

  onEachState= (state, layer) => {

      const stateName = state.properties.SA4_NAME16;
      const unEmp= state.properties.SA4_UNEMP;
      layer.bindPopup("SA4_Name: "+stateName + " \n" + "Unemployment rate: "+unEmp);

    layer.on({
      click: this.changeCountryColor,
    });
    
  }

  changeCountryColor = (event) => {
    event.target.setStyle({
      fillColor: this.state.color,
      fillOpacity: 0.2,
    });
  };

  render() {
    return (
      <div>
      
        <Map style={{ height: "100vh" }} zoom={4} center={[-25, 130]}>
          <GeoJSON
            style={this.countryStyle}
            data={infoData}
            onEachFeature={this.onEachState}
         
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
