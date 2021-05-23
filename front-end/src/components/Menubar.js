import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class Menubar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
  
    return (
      <div>

    <Navbar className="menu" variant="dark">
    <Navbar.Brand href="/">Tweets Analysis</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/map">Map</Nav.Link>
      <Nav.Link href="/personal_income">Chart</Nav.Link>
    </Nav>

  </Navbar>
  
</div>
    )
  }
}