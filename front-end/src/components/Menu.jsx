/**
 * Component for the navigation menu that displays when a user is not logged in.
 * Has restricted nav options compared to UserMenu component for when user is logged in.
 */

 import React, { useState } from "react";
 import {
   Navbar,
   NavbarBrand,
 } from "reactstrap";
 import { NavLink as ReactLink } from "react-router-dom";
 
 function Menu() {
   // Set states to toggle the navbar
   // Adapted from reactstrap docs
  
 
   return (
    <div className='container'>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/">
            <div className='nav'>
            COMP 90024 Twitter Analysis
            </div>
            </NavbarBrand>
      </Navbar>
    </div>
  );
}
 
 
 export default Menu;
 