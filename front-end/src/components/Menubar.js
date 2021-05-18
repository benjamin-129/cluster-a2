import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class Menubar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>

    <Navbar className="menu" variant="dark">
    <Navbar.Brand href="#home">Tweets Analysis</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#Map">Map Chart</Nav.Link>
    </Nav>

  </Navbar>
  
</div>
    )
  }
}