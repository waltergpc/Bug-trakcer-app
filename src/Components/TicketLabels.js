import React from 'react'
import styled from 'styled-components'
import { TiTicket } from 'react-icons/ti'

const TicketLabels = () => {
  const categories = ['UX', 'API', 'Miscelleanous', 'Design']
  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <div key={category} className='category-label'>
            <div className={`color-label ${category}`}>
              <TiTicket />
            </div>
            <span>{category}</span>
          </div>
        )
      })}
    </Wrapper>
  )
}

export default TicketLabels

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  background-color: rgb(80, 78, 78);
  color: white;
  font-weight: 400;
  padding: 1rem;
  border-radius: 1.5rem;

  .category-label {
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
  }

  .color-label {
    margin-right: 0.3rem;
    font-size: 1rem;
  }

  .UX {
    color: rgb(26, 200, 154);
  }

  .API {
    color: rgb(11, 52, 213);
  }

  .Design {
    color: rgba(200, 113, 26, 0.5);
  }

  .Miscelleanous {
    color: rgba(200, 26, 26, 0.5);
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .category-label {
      font-size: 1rem;
      font-weight: 500;
    }

    .color-label {
      margin-right: 0.3rem;
      font-size: 1.3rem;
    }
  }
`
