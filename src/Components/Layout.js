import React, { useState } from 'react'
import { RiMenuFill, RiTeamLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../Context/UserContext'
import {
  AiOutlineDashboard,
  AiFillCaretDown,
  AiFillCaretUp,
} from 'react-icons/ai'
import { TiTicket, TiPlus } from 'react-icons/ti'
import { MdBusinessCenter } from 'react-icons/md'

const Layout = ({ children }) => {
  const { openSidebar, user, logout } = useUser()
  const [accordionOpen, setAccordionOpen] = useState(false)

  return (
    <>
      <HeaderWrapper>
        <div className='main-header'>
          <h1>Scarab IO</h1>
          <button type='button' className='sidebar-btn' onClick={openSidebar}>
            <RiMenuFill />
          </button>
        </div>
        <nav className='navbar'>
          {!user ? (
            <ul className='nav-list'>
              <li className='list-element'>
                <div className='nav-div'>
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                </div>
              </li>
              <li className='list-element'>
                <div className='nav-div'>
                  <Link to='login' className='nav-link'>
                    Sign in
                  </Link>
                </div>
              </li>
            </ul>
          ) : (
            <ul className='nav-list'>
              <li className='list-element'>
                <div className='nav-div'>
                  <Link to='dashboard' className='nav-link'>
                    <AiOutlineDashboard className='nav-icon' /> Dashboard
                  </Link>
                </div>
              </li>
              <li className='list-element'>
                <div className='nav-div'>
                  <div
                    className='accordion-title'
                    onClick={() => setAccordionOpen(!accordionOpen)}
                  >
                    <TiTicket className='nav-icon' /> Tickets
                    <span className='arrow-icon'>
                      {!accordionOpen ? <AiFillCaretDown /> : <AiFillCaretUp />}
                    </span>
                  </div>
                  <div
                    className={
                      !accordionOpen
                        ? 'tickets-accordion'
                        : 'tickets-accordion open'
                    }
                  >
                    <Link to='tickets' className='nav-link'>
                      <MdBusinessCenter className='nav-icon' /> Ticket center
                    </Link>
                    <Link to='create-ticket' className='nav-link'>
                      <TiPlus className='nav-icon' /> New Ticket
                    </Link>
                  </div>
                </div>
              </li>
              <li className='list-element'>
                <div className='nav-div'>
                  <Link to='my-team' className='nav-link'>
                    <RiTeamLine className='nav-icon' /> My team
                  </Link>
                </div>
              </li>
              <li className='list-element'>
                <div className='nav-div'>
                  <button type='button' className='nav-link' onClick={logout}>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          )}
        </nav>
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
    </>
  )
}

const HeaderWrapper = styled.header`
  background-color: #116466;
  color: #eae7dc;
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
    color: #eae7dc;
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
      overflow: hidden;
    }
    .nav-list {
      padding-left: 0;
      width: 100%;
    }

    .nav-div {
      border-style: solid;
      border-color: #eae7dc;
      border-width: 2px 0 0 0;
      width: 100%;
      height: 100%;
      padding: 1rem;
      font-weight: bold;
    }

    .list-element {
      margin-bottom: 0;
      width: 100%;
    }
    .nav-link {
      font-weight: bold;
    }

    .accordion-title {
      cursor: pointer;
    }
    .tickets-accordion {
      height: 0;
      overflow-y: hidden;
      display: grid;
      align-items: center;
      transition: height 0.3s ease;
    }

    .arrow-icon {
      margin-left: 45%;
    }

    .open {
      height: 110px;
    }
  }
`
const MainWrapper = styled.main`
  background-color: #eae7dc;
  @media (min-width: 900px) {
    margin-left: 20%;
    padding: 1rem;
    top: 0;
  }
`
export default Layout
