import React from 'react'
import { RiMenuFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Layout = ({ children }) => {
  return (
    <>
      <HeaderWrapper>
        <div className='main-header'>
          <h1>Silver Manager</h1>
          <button type='button' className='sidebar-btn'>
            <RiMenuFill />
          </button>
        </div>
        <nav className='navbar'>
          <ul className='nav-list'>
            <li className='list-element'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li className='list-element'>
              <Link to='login' className='nav-link'>
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
    </>
  )
}

const HeaderWrapper = styled.header`
  background-color: rgb(168, 105, 0);
  color: beige;
  height: 5rem;

  .main-header {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 0 0.5rem;
  }

  .sidebar-btn {
    background-color: transparent;
    color: beige;
    font-weight: bold;
    border: none;
    padding: none;
    font-size: 1.5rem;
    padding-top: 0.3rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .sidebar-btn:hover {
    color: teal;
  }

  .navbar {
    display: none;
    color: beige;
  }

  @media (min-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 20%;
    .main-header {
      height: 15%;
    }
    .sidebar-btn {
      display: none;
    }
    .navbar {
      display: flex;
    }
    .nav-list {
      padding-left: 0.5rem;
    }

    .list-element {
      margin-bottom: 1.5rem;
    }
    .nav-link {
      font-weight: bold;
    }
  }
`
const MainWrapper = styled.main`
  @media (min-width: 900px) {
    margin-left: 20%;
    padding: 1rem;
    top: 0;
    height: 100%;
  }
`
export default Layout
