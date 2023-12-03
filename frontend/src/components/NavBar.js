import SidebarMenu from 'react-bootstrap-sidebar-menu';
import "./NavBar.css";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


function NavBar({reloaded, isItLoading, logout}) {


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
      reloaded('Done2');
      logout(true);
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
 
    <SidebarMenu className='MainNav py-5 px-5'>
      <SidebarMenu.Header onClick={handleCollapse}>
        <SidebarMenu.Brand>
          <h1>FileBox</h1>
        </SidebarMenu.Brand>
      </SidebarMenu.Header>
      <SidebarMenu.Body className={open?'collapse show':'collapse'}>
        <SidebarMenu.Nav className='py-1'>


              <NavLink to="/" className="nav-logo"> FileBox </NavLink>

          
        </SidebarMenu.Nav>
        <SidebarMenu.Nav className='py-1'>
          

            <NavLink
                
                to="/"
                className="nav-links"
              >
                Home
              </NavLink>

          
        </SidebarMenu.Nav>
        <SidebarMenu.Nav className='py-1'>
          

            <NavLink
                
                to="/snapshots"
                className="nav-links"
              >
                Snapshots
              </NavLink>

          
        </SidebarMenu.Nav>
        <SidebarMenu.Nav className='py-1'>
          

            <NavLink
                
                to="/deleted"
                className="nav-links"
              >
                Deleted Files
              </NavLink>

          
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