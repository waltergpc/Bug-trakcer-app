import React, { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate, Link } from 'react-router-dom'
import { useTickets } from '../Context/TicketContext'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import styled from 'styled-components'
import OwnTicket from '../Components/OwnTicket'

const Dashboard = () => {
	const { user, getUsers, errorMsg } = useUser()
	const { fetchTickets, ownTickets, ticketErrorMsg } = useTickets()
	//console.log(ownTickets)

	useEffect(() => {
		if (user) {
			fetchTickets(user.userId)
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		getUsers()
		// eslint-disable-next-line
	}, [])

	if (!user) return <Navigate to="/" />

	const { name, userId, image, team, verified } = user

	return (
		<Wrapper>
			<h4 className="greeting">Welcome back {name}</h4>
			{errorMsg && <div className="error-section user-error">{errorMsg}</div>}
			<img className="profile-pic" src={image} alt={name} />
			<h5 className="team">Your team: {team}</h5>
			{verified ? (
				<h5 className="user-verified">
					User Verified
					<span className="verified">
						<MdOutlineVerifiedUser />
					</span>
				</h5>
			) : (
				<h5 className="user-verified not-verified">
					Email verification pending!
				</h5>
			)}
			<Link to={`/update-user/${user.userId}`} className="update-link">
				Update My Information
			</Link>
			<Link to={`/change-password`} className="update-link">
				Change my password
			</Link>
			<div className="chart-div">
				<h3>Charts are being redesigned</h3>
			</div>
			<div className="my-tickets">
				<h5 className="tickets-length">Your Tickets: {ownTickets.length}</h5>
				{ticketErrorMsg && (
					<div className="error-section ticket-error">{ticketErrorMsg}</div>
				)}
				{ownTickets.map((ticket) => {
					const {
						_id: id,
						title,
						description,
						priority,
						status,
						updatedAt,
						category,
						createdBy
					} = ticket
					return (
						<OwnTicket
							key={id}
							id={id}
							userId={userId}
							title={title}
							description={description}
							priority={priority}
							status={status}
							updatedAt={updatedAt}
							category={category}
							createdBy={createdBy}
						/>
					)
				})}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: center;
	padding-bottom: 1rem;

	h4 {
		margin-bottom: 1rem;
	}
	h5 {
		margin-top: 1rem;
	}

	.user-error {
		margin-bottom: 1rem;
	}

	.profile-pic {
		height: 13rem;
		width: 13rem;
		border-radius: 50%;
	}

	.chart-div {
		width: 70%;
	}

	.my-tickets {
		text-align: center;
		width: 80%;
		display: grid;
		grid-template-columns: 1fr;
		justify-content: center;
		gap: 1rem;
	}

	.verified {
		color: forestgreen;
		font-size: 1rem;
	}

	.not-verified {
		font-size: 0.8rem;
		background-color: #fff7839e;
		padding: 1rem;
		border-radius: 1rem;
		font-weight: bold;
		color: #885a08;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	}

	.update-link {
		font-size: 0.8rem;
		margin: 0.5rem;
		font-weight: bold;
		color: navy;
	}

	@media (min-width: 900px) {
		grid-template-columns: 1fr 1fr;

		.greeting,
		.profile-pic,
		.team,
		.user-verified,
		.update-link {
			grid-column: 1/ 2;
		}

		.user-error {
			grid-column: 1/ 3;
		}

		.chart-div {
			grid-column: 2 / 3;
			grid-row: 2 / 5;
			width: 80%;
		}

		.my-tickets {
			grid-column: 1/3;
			grid-template-columns: 1fr 1fr;
			gap: 2em;
		}

		.ticket-error {
			grid-column: 1 / 3;
		}

		.tickets-length {
			grid-column: 1 / 3;
		}
	}
`
export default Dashboard
