import React from 'react'
import moment from 'moment'

const Comment = ({ title, comment, user, updatedAt }) => {
  let date = moment(updatedAt)
  date = date.format('L')
  return (
    <article>
      <h5>{title}</h5>
      <h6>{user.name}</h6>
      <h6>{date}</h6>
      <p>{comment}</p>
    </article>
  )
}

export default Comment
