import React from 'react'; // let's also import Component
// components
import { Navbar as BtsNavbar, Nav } from 'react-bootstrap';

const Navbar: React.FC = (props) => {
    return (
        <div className="Navbar">
            <BtsNavbar collapseOnSelect>
                <BtsNavbar.Brand href="home">Toggler Manager</BtsNavbar.Brand>
                <BtsNavbar.Toggle aria-controls="responsive-navbar-nav" />
                <BtsNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="toggles">Toggles</Nav.Link>
                        <Nav.Link href="features">Services</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="example">Example</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="about">About</Nav.Link>
                    </Nav>
                </BtsNavbar.Collapse>
            </BtsNavbar>
        </div>
    );
}

export default Navbar;
