import React, { Component } from "react";

class Menu extends React.Component {
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "#2C2C46",
      padding: "10px",
      fontSize:"20px",
      fontFamily: "Arial"
    };
    return (
      <div>
      <h1 style={mystyle}>COMP90024 Twitter Analysis</h1>
      </div>
    );
  }
}

export default Menu