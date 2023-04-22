import React, { useEffect } from 'react'
import { useUser } from '../Context/UserContext'
import { Navigate } from 'react-router-dom'
import FilteredTicketList from '../Components/FilteredTicketList'
import styled from 'styled-components'
import { useTickets } from '../Context/TicketContext'
import Loading from '../Components/Loading'
import TicketLabels from '../Components/TicketLabels'

const Tickets = () => {
	const { user } = useUser()
	const { isTicketsLoading, fetchTickets, ticketErrorMsg } = useTickets()

	useEffect(() => {
		if (user) {
			fetchTickets(user.userId)
		}
		// eslint-disable-next-line
	}, [])

	if (!user) return <Navigate to="/" />

	if (isTicketsLoading) return <Loading />

	const { team } = user

	return (
		<Wrapper className="section section-center">
			<h3>{user.role === 'admin' ? 'All' : team} tickets</h3>
			<hr />
			{ticketErrorMsg && <div className="error-section">{ticketErrorMsg}</div>}
			<TicketLabels />
			<div className="tickets-grid">
				<FilteredTicketList status="new" />

				<FilteredTicketList status="in progress" />

				<FilteredTicketList status="pending" />

				<FilteredTicketList status="solved" />

				<FilteredTicketList status="cancelled" />
			</div>
			<div className="chart-div">
				<h3>Charts are being redesigned</h3>
			</div>
		</Wrapper>
	)
}

export default Tickets

const Wrapper = styled.section`
	.tickets-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		width: 85%;
		padding: 1rem;
		border-radius: 2rem;
		font-size: 0.7rem;
		overflow-x: scroll;
	}

	.chart-div {
		width: 90%;
		padding-left: 1rem;
		padding-top: 2rem;
	}

	@media (min-width: 900px) {
		.tickets-grid {
			grid-template-columns: 15rem 15rem 15rem 15rem 15rem;
			width: 95%;
			font-size: 0.8rem;
		}
		.chart-div {
			width: 95%;
			padding-left: 1.2rem;
		}
	}
`
