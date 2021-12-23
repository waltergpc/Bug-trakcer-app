import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Sidebar from './Components/Sidebar'
import Home from './Pages/Home'
import Login from './Pages/Login'

function App() {
  return (
    <Layout>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App
