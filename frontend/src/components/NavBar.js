import SidebarMenu from 'react-bootstrap-sidebar-menu';
import "./NavBar.css";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import Nav from 'react-bootstrap/Nav';

function NavBar({reloaded, isItLoading}) {


  const handleLogout = async () => {
    try {
      isItLoading(true)
      const response = await fetch(process.env.REACT_APP_API+'/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain',
          'Authorization': 'Bearer '+Cookies.get('token')} 
        })


      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      //const result = await response.json();

      Cookies.remove('token');
      Cookies.remove('user');
      reloaded('Done2');
    } catch (err) {
      console.log(err)
    } finally {
      isItLoading(false)

      
      

    }
  }
  const [open, setOpen] = useState(false);

  const handleCollapse = () => setOpen(!open);
  useEffect(() => {
    if (window.innerWidth >= 576) {
      setOpen(true);
    }
  },[open,isItLoading])

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
            <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
              >
                Home
              </NavLink>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
            <NavLink
                exact
                to="/sharing"
                activeClassName="active"
                className="nav-links"
              >
                Sharing
              </NavLink>
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>

            <NavLink
                exact
                to="/requests"
                activeClassName="active"
                className="nav-links"
              >
                File requests
              </NavLink>

            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Title>
            <NavLink
                exact
                to="/deleted"
                activeClassName="active"
                className="nav-links"
              >
                Deleted Files
              </NavLink>
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