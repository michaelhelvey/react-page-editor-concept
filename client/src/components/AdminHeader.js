import React from 'react'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'

export default () => (
  <Navbar bg='light' expand='lg'>
    <Navbar.Brand href='/admin'>React CMS</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>View Site</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
