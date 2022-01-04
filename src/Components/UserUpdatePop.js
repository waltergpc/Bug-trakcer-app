import React from 'react'
import styled from 'styled-components'
import { useUser } from '../Context/UserContext'
import { Link } from 'react-router-dom'

const UserUpdatePop = ({ updateUserComplete, updateMsg }) => {
  const { startUserUpdate } = useUser()
  return (
    <Wrapper>
      <div className={!updateUserComplete ? 'update-pop' : 'update-pop show'}>
        {updateUserComplete && <h4 className='update-msg'>{updateMsg}</h4>}
        <Link
          className='pop-link'
          to='/dashboard'
          onClick={() => startUserUpdate()}
        >
          Back to Dashboard
        </Link>
      </div>
    </Wrapper>
  )
}

export default UserUpdatePop

const Wrapper = styled.div`
  .update-pop {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgb(55, 52, 52);
    color: white;
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    transform: scale(0);
    transition: all 0.4s ease;
  }

  .update-msg {
    margin: 0;
  }

  .show {
    transform: scale(1);
  }

  .pop-link {
    font-size: 0.8rem;
    font-weight: bold;
    text-decoration: underline;
    color: #56e556;
  }

  .pop-link:link {
    color: #56e556;
  }

  .pop-link:visited {
    color: #56e556;
  }

  @media (min-width: 900px) {
    .update-pop {
      top: 0;
      bottom: auto;
      right: 0;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }
  }
`
