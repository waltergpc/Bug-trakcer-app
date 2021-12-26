import axios from 'axios'

const getSingleTicket = async (id) => {
  const { data } = await axios.get(`/tickets/${id}`)
  console.log(data)
  return data
}

export { getSingleTicket }
