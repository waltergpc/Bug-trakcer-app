import React, { useState, useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate, useParams, Link, useNavigate } from 'react-router-dom'
import CommentForm from '../Components/CommentForm'
import { useTickets } from '../Context/TicketContext'
import Comment from '../Components/Comment'
import styled from 'styled-components'
import moment from 'moment'
import AssignTicketInput from '../Components/AssignTicketInput'
import { RiDeleteBack2Line } from 'react-icons/ri'

const SingleTicket = () => {
  const { user } = useUser()
  const { fetchSingleTicket, singleTicket, deleteTicket, unAssignTicket } =
    useTickets()
  const { id } = useParams()
  const [confirmDelete, setConfirmDelete] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    fetchSingleTicket(id)
    // eslint-disable-next-line
  }, [id])

  if (!user) return <Navigate to='/' />

  if (!singleTicket) return <pre>Loading</pre>

  const { ticket, comments } = singleTicket

  let date = moment(ticket.updatedAt)
  date = date.format('L')

  const confirmDeleteToggle = () => {
    setConfirmDelete(!confirmDelete)
  }

  const confirmDeleteTicket = () => {
    deleteTicket(id)
    navigate('/dashboard')
  }

  return (
    <Wrapper>
      <div className='ticket-info'>
        <h4 className='ticket-title'>{ticket.title}</h4>
        <p className='ticket-created-by'>
          <span className='ticket-spec'>Created by:</span>
          {ticket.createdBy.name}
        </p>
        <div>
          <span className='ticket-spec'>Assigned:</span>
          {ticket.assignedTo.length < 1 ? (
            <span> Assignation Pending</span>
          ) : (
            ticket.assignedTo.map((dev) => (
              <div className='assigned-to' key={dev._id}>
                <span>{dev.name}</span>
                {user.role === ('admin' || 'leader') && (
                  <span>
                    <button
                      type='button'
                      className='unassign-btn'
                      onClick={() => unAssignTicket(id, dev._id)}
                    >
                      <RiDeleteBack2Line />
                    </button>
                  </span>
                )}
              </div>
            ))
          )}
        </div>
        <p className='ticket-date'>
          <span className='ticket-spec'>Last Update:</span> {date}
        </p>

        {user.role === ('admin' || 'leader') && <AssignTicketInput id={id} />}
        <p className='ticket-description'>{ticket.description} </p>
        {(singleTicket.ticket.createdBy._id === user.userId ||
          user.role === 'admin' ||
          user.role === 'leader') && (
          <div className='ticket-operations'>
            <Link to={`/update-ticket/${id}`} className='update-link'>
              Update
            </Link>
            <button
              type='button'
              className={
                !confirmDelete ? 'delete-ticket-btn' : 'stop-delete-btn'
              }
              onClick={confirmDeleteToggle}
            >
              {!confirmDelete ? 'Delete' : 'Stop Delete'}
            </button>
            <div
              className={
                !confirmDelete
                  ? 'confirm-delete-div'
                  : 'confirm-delete-div show'
              }
            >
              <span>Are you sure you want to delete?</span>
              <button
                type='button'
                className='delete-ticket-btn'
                onClick={confirmDeleteTicket}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='comments'>
        <h4>Comments</h4>
        <hr />
        {comments.length < 1 ? (
          <h5>No comments for this ticket</h5>
        ) : (
          comments.map((comm) => {
            const {
              _id: commentId,
              title,
              comment,
              user: createdBy,
              updatedAt,
            } = comm
            return (
              <Comment
                key={commentId}
                id={commentId}
                title={title}
                comment={comment}
                createdBy={createdBy}
                updatedAt={updatedAt}
              />
            )
          })
        )}
      </div>
      <CommentForm ticketId={id} />
    </Wrapper>
  )
}

export default SingleTicket

const Wrapper = styled.section`
  h4 {
    margin: 0;
  }
  p {
    margin: 0.3rem;
  }
  .ticket-info {
    margin: 1rem;
    padding: 2rem;
    text-align: center;
    display: grid;
    gap: 1rem;
    justify-content: center;
    border-radius: 1rem;
    font-size: 0.8rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .ticket-title {
    padding-bottom: 0.2rem;
    border-bottom: 2px solid lightgray;
  }

  .ticket-spec {
    font-weight: bold;
  }

  .assigned-to {
    margin-top: 0.5rem;
  }

  .unassign-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .unassign-btn:hover {
    color: darkred;
  }

  .ticket-operations {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .comments {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin: 1rem;
    padding: 1rem;
    height: 50vh;
    overflow: scroll;
  }

  .confirm-delete-div {
    display: none;
  }

  .show {
    display: block;
    flex-basis: 90%;
    margin-top: 1rem;
  }

  .update-link {
    color: forestgreen;
    font-weight: bold;
  }

  .delete-ticket-btn {
    background-color: red;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .stop-delete-btn {
    background-color: navy;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  @media (min-width: 900px) {
    .ticket-info {
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;

      p {
        font-size: 1rem;
      }
    }
    .ticket-description {
      grid-column: 1 / 4;
    }

    .ticket-operations {
      grid-column: 1 / 4;
    }
    .ticket-created-by {
      grid-column: 3 / 4;
      justify-self: start;
    }
    .ticket-date {
      grid-column: 3 / 4;
    }

    .comments {
      height: 30vh;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
  }
`
