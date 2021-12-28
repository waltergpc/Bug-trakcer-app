import axios from 'axios'

const fetchSingleTicket = async (id) => {
  const { data } = await axios.get(`/tickets/${id}`)
  return data
}

export default fetchSingleTicket
