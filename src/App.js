import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import Tickets from './Pages/Tickets'
import Home from './Pages/Home'
import Login from './Pages/Login'
import CreateTicket from './Pages/CreateTicket'

function App() {
  return (
    <Layout>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='tickets' element={<Tickets />} />
        <Route path='create-ticket' element={<CreateTicket />} />
      </Routes>
    </Layout>
  )
}

export default App
