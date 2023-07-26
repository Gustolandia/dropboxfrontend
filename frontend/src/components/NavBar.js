import SidebarMenu from 'react-bootstrap-sidebar-menu';
import "./NavBar.css";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import Nav from 'react-bootstrap/Nav';

function NavBar({reloaded}) {
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    console.log("Logout")
    reloaded('Done2');
    console.log("Logout")
  }
  const [open, setOpen] = useState(false);
  const handleCollapse = () => setOpen(!open);
  useEffect(() => {
    if (window.innerWidth >= 576) {
      setOpen(true);
    }
  },[open])

  return (
 
    <SidebarMenu>
      <SidebarMenu.Header onClick={handleCollapse}>
        <SidebarMenu.Brand>
          <h1>FileBox</h1>
        </SidebarMenu.Brand>
      </SidebarMenu.Header>
      <SidebarMenu.Body className={open?'collapse show':'collapse'}>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
              <Nav.Link href="/"><NavLink exact to="/" className="nav-logo"> FileBox </NavLink></Nav.Link>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
            <Nav.Link eventKey="link-1"><NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
              >
                Home
              </NavLink></Nav.Link>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
            <Nav.Link eventKey="link-2"><NavLink
                exact
                to="/sharing"
                activeClassName="active"
                className="nav-links"
              >
                Sharing
              </NavLink></Nav.Link>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
            <Nav.Link eventKey="link-3" >
            <NavLink
                exact
                to="/requests"
                activeClassName="active"
                className="nav-links"
              >
                File requests
              </NavLink>
            </Nav.Link>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
            <Nav.Link eventKey="link-4"><NavLink
                exact
                to="/deleted"
                activeClassName="active"
                className="nav-links"
              >
                Deleted Files
              </NavLink></Nav.Link>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <div className='logout'>
          <Button variant="link" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </SidebarMenu.Body>
      
    </SidebarMenu>

);
}

export default NavBar;