import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import Tickets from './Pages/Tickets'
import Home from './Pages/Home'
import Login from './Pages/Login'
import CreateTicket from './Pages/CreateTicket'
import UpdateTicket from './Pages/UpdateTicket'
import SingleTicket from './Pages/SingleTicket'

function App() {
  return (
    <Layout>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='tickets' element={<Tickets />} />
        <Route path='tickets/:id' element={<SingleTicket />} />
        <Route path='create-ticket' element={<CreateTicket />} />
        <Route path='update-ticket/:id' element={<UpdateTicket />} />
      </Routes>
    </Layout>
  )
}

export default App
