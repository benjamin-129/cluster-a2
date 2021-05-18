import React, { Component } from "react";
import { Popup } from "react-map-gl";
import Chart from "./Chart"
class Tooltip extends Component {


  

  render() {
    const { details, fields, handleCloseTooltip,  chartfields} = this.props;

 

    const regex = /\B(?=(\d{3})+(?!\d))/g;


    return (
      <div>

      <Popup
        tipSize={0}
        longitude={details.coordinates[0]}
        latitude={details.coordinates[1]}
        closeButton={true}
        onClose={() => handleCloseTooltip()}
      >

      <Chart
             details={details}
             />
       
        <div className="map-tooltip">
          <div className="map-tooltip-field">
            <div className="map-tooltip-header">{details.sa4_name}</div>
          </div>
           
          <div className="margin" />

          {fields.map((field, index) => (
            <div className="map-tooltip-field" key={index}>
              <div className="map-tooltip-label">{field}:</div>
              <div className="map-tooltip-value">
                {details[field].toString().replace(regex, ",")}
             
              </div>
            </div>
          ))}
        </div>
      
      </Popup>
      </div>
    );
  }
}

export default Tooltip;
