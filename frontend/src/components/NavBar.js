import SidebarMenu from 'react-bootstrap-sidebar-menu';
import "./NavBar.css";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

import React, { useState } from "react";
import { NavLink } from "react-router-dom";


import Nav from 'react-bootstrap/Nav';

function NavBar({reloaded}) {
  const [click, setClick] = useState(false);
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    console.log("Logout")
    reloaded('Done2');
    console.log("Logout")
  }
  
  const handleClick = () => setClick(!click);
  return (
    <SidebarMenu>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <h1>FileBox</h1>
        </SidebarMenu.Brand>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
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
                onClick={handleClick}
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
                onClick={handleClick}
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
                onClick={handleClick}
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
                onClick={handleClick}
              >
                Deleted Files
              </NavLink></Nav.Link>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
      <div className='logout'>
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </SidebarMenu>

);
}

export default NavBar;