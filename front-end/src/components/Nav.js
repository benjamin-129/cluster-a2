import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'

export default class NavMenu extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
  
    return (
      <div>

    <Nav fill variant="tabs" >

    <Nav.Item>
      <Nav.Link href="/personal_income">Personal Income</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link href="/unemployment_rate">Unemployment Rate</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link href="/house_price">Median House Price</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link href="/average_monthly_morgage">Average Monthly Mortgage</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link href="/weekly_household_income">Weekly Household Income</Nav.Link>
      </Nav.Item>
    </Nav>


</div>
    )
  }
}