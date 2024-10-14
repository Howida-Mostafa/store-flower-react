import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { Link } from 'react-router-dom';
import data from '../data/data.json'; 
import '../css/styles.css';

function Header() {
    const [logo, setLogo] = useState('');
    
    useEffect(() => {
        setLogo(data.logos[0].image); // تم تعديل هنا إلى 'logos'
        console.log("Logo set to:", data.logos[0].image); // تحقق من الصورة المعينة
    }, []);
    
    return (
        <div className="allnavs">
            <div className='back'>
                <p>
                    $9.99 daytime delivery is available Monday to Friday
                </p>
            </div>
            <Navbar className="allnav" bg="light" expand="lg">
                <div className='navbar-style'>
                    <Navbar.Brand href="#home" className='navbar-style'>
                        {logo && (
                            <LazyLoadImage className="logo"
                                src={logo} // Use the link from JSON
                                alt="Tonic Blooms Logo"
                                effect="opacity"
                            />
                        )}
                    </Navbar.Brand>
                </div>
                <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/"><span style={{ color: '#cc19ff' }}>Home</span></Nav.Link>
                            <Nav.Link as={Link} to="/flowers">Flowers</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                            <div className="nav-other">
                    <ul className="nav-otherList">
                        <Nav.Link as={Link} to="/pages/login" className="remove-hover" aria-label="Account Login">
                            <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00032" style={{ height: '31px' }}>
                                <title>account</title>
                                <path d="M16 16.75c4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75c-4.28 0-7.75 3.47-7.75 7.75v0c0.005 4.278 3.472 7.745 7.75 7.75h0zM16 2.75c3.452 0 6.25 2.798 6.25 6.25s-2.798 6.25-6.25 6.25c-3.452 0-6.25-2.798-6.25-6.25v0c0.004-3.45 2.8-6.246 6.25-6.25h0zM30.41 29.84c-1.503-6.677-7.383-11.59-14.41-11.59s-12.907 4.913-14.391 11.491l-0.019 0.099c-0.011 0.048-0.017 0.103-0.017 0.16 0 0.414 0.336 0.75 0.75 0.75 0.357 0 0.656-0.25 0.731-0.585l0.001-0.005c1.351-5.998 6.633-10.41 12.945-10.41s11.594 4.413 12.929 10.322l0.017 0.089c0.076 0.34 0.374 0.59 0.732 0.59 0 0 0.001 0 0.001 0h-0c0.057-0 0.112-0.007 0.165-0.019l-0.005 0.001c0.34-0.076 0.59-0.375 0.59-0.733 0-0.057-0.006-0.112-0.018-0.165l0.001 0.005z"></path>
                            </svg>
                        </Nav.Link>
                        <li className="nav-otherListItem nav-otherListItem--cart">
                            <Nav.Link as={Link} to="/shoppingcart"aria-label="Cart" className="nav-cartButton">
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.24in" height="0.21in" viewBox="0 0 17 15.05" style={{ height: '31px' }}>
                                    <title>cart</title>
                                    <circle cx="7.41" cy="13.95" r="1.09" fill="#3c3660"></circle>
                                    
                                    <circle cx="13.95" cy="13.95" r="1.09" fill="#3c3660"></circle>
                                    <path d="M6.27,12.41a2,2,0,0,1-1.9-1.57L3.15,4.76s0,0,0,0L2.5,1.5H0A.5.5,0,0,1-.5,1,.5.5,0,0,1,0,.5H2.91A.5.5,0,0,1,3.4.9l.65,3.24H16a.49.49,0,0,1,.49.59l-1.16,6.1a2,2,0,0,1-2,1.58H6.27Zm-2-7.27l1.1,5.5a.93.93,0,0,0,1,.77h7.08a.93.93,0,0,0,1-.77l1.05-5.5Z" transform="translate(0.5 -0.5)" fill="#3c3660"></path>
                                </svg>
                            </Nav.Link>
                            <span className="nav-cartQty"></span>
                        </li>
                    </ul>
                </div>
                        </Nav>
                    </Navbar.Collapse>
                </div>
                
            </Navbar>
        </div>
    );
}

export default Header;
