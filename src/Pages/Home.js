import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../images/ScarabLogo.png'
import Dashboard from '../images/Dashboard.png'
import Center from '../images/Center.png'
import Chart from '../images/Chart.png'
import Team from '../images/Team.png'

const Home = () => {
  return (
    <Wrapper>
      <div className='info row-1'>
        <h2 className='font-link'>Scarab IO</h2>
        <h4 className='font-link'>Bug-Tracker/Project Manager App</h4>
        <h4 className='font-link'>
          Customer based and customizable to most team needs
        </h4>
        <Link to='/login' className='font-link sign-link'>
          Join or Login HERE!
        </Link>
      </div>
      <div className='image-div'>
        <img src={logo} className='logo' alt='Scarab-Io Logo' />
      </div>
      <h4 className='font-link row-2'>
        Clean dashboards views with your tasks
      </h4>
      <div className='view-div'>
        <img className='logo' src={Dashboard} alt='dashboard view' />
      </div>
      <h4 className='font-link row-3'>
        Ticket center for all team tasks based on categories
      </h4>
      <div className='view-div'>
        <img className='logo' src={Center} alt='ticket center view' />
      </div>
      <h4 className='font-link row-4'>
        Easy visual charts to optimize your work priority
      </h4>
      <div className='view-div'>
        <img className='logo' src={Chart} alt='ticket center view' />
      </div>
      <h4 className='font-link row-5'>
        Views with all team members and much more!
      </h4>
      <div className='view-div'>
        <img className='logo' src={Team} alt='ticket center view' />
      </div>
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.section`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  text-align: center;
  background-color: #d0d0d08a;
  margin: 1rem;
  border-radius: 0.5rem;
  letter-spacing: 1px;
  color: #515151;

  .font-link {
    margin: 0.3rem;
  }

  .image-div {
    background-color: #116466;
    padding: 1rem;
    border-radius: 50%;
    margin: 2rem;
  }

  .view-div {
    padding: 0.1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  }

  .intro-text {
    color: #eae7dc;
    font-weight: bold;
    text-align: center;
    font-size: 0.7rem;
  }

  .sign-link {
    font-size: 1.3rem;
    color: forestgreen;
    text-decoration: underline;
  }

  .sign-link:link {
    color: forestgreen;
  }

  .sign-link:visited {
    color: forestgreen;
  }

  .logo {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    .font-link {
      align-self: center;
    }

    .row-2 {
      grid-column: 2/3;
      grid-row: 2 / 3;
    }

    .row-4 {
      grid-column: 2/3;
      grid-row: 4 / 5;
    }
  }
`
