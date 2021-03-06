import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import logo from '../images/ScarabLogo.png'
import { Link } from 'react-router-dom'
import { useUser } from '../Context/UserContext'

const Sidebar = () => {
  const { sideBarOpen, closeSidebar, user, logout } = useUser()

  return (
    <SidebarContainer>
      <aside className={sideBarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className='sidebar-header'>
          <img src={logo} className='logo' alt='bug-tracker-app' />
          <button className='close-btn' type='button' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        {!user ? (
          <ul className='links'>
            <li>
              <Link to='/' onClick={closeSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to='login' onClick={closeSidebar}>
                Sign In
              </Link>
            </li>
          </ul>
        ) : (
          <ul className='links'>
            <li>
              <Link to='dashboard' onClick={closeSidebar}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to='tickets' onClick={closeSidebar}>
                Ticket Center
              </Link>
            </li>
            <li className='list-element'>
              <Link
                to='create-ticket'
                className='nav-link'
                onClick={closeSidebar}
              >
                New Ticket
              </Link>
            </li>
            <li className='list-element'>
              <Link to='my-team' className='nav-link' onClick={closeSidebar}>
                My team
              </Link>
            </li>
            <li className='list-element'>
              <button type='button' className='nav-link' onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        )}
      </aside>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: rgb(221, 177, 23);
    transition: all 0.2s linear;
    cursor: pointer;
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: white;
  }
  .logo {
    justify-self: center;
    height: 60px;
  }
  .links {
    margin-bottom: 2rem;
    list-style: none;
    padding-left: 0;
  }
  .logout,
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
    padding: 1rem 0;
    margin-left: 0;
    color: beige;
    transition: all 0.2s linear;
    text-decoration: none;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  .logout:hover,
  .links a:hover {
    background: rgb(211, 222, 232, 0.1);
    color: #f13c20;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
    background-color: #116466;
    color: #eae7dc;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  @media screen and (min-width: 990px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
