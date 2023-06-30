import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip
} from 'recharts'
import { filterTicketsStatus } from '../utils/filterTickets'

const TicketReChart = ({ data, page }) => {
	const chartColors = ['#0088FE', '#16ab48', '#FFBB28', '#e86827', '#a63fd2']

	const chartData = [
		{
			name: 'New tickets',
			value: filterTicketsStatus(data, 'new').length
		},
		{
			name: 'In progress',
			value: filterTicketsStatus(data, 'in progress').length
		},
		{
			name: 'Solved',
			value: filterTicketsStatus(data, 'solved').length
		},
		{
			name: 'Pending',
			value: filterTicketsStatus(data, 'pending').length
		},
		{
			name: 'Cancelled',
			value: filterTicketsStatus(data, 'cancelled').length
		}
	]

	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={chartData}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{chartData.map((_, index) => (
						<Cell
							key={`cell-${index}`}
							fill={chartColors[index % chartColors.length]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	)
}

export default TicketReChart
