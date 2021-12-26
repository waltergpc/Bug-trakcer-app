import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/UserContext'
import { TicketProvider } from './Context/TicketContext'
import { CloudinaryContext } from 'cloudinary-react'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TicketProvider>
          <CloudinaryContext cloudName='dgsy6fc2b'>
            <App />
          </CloudinaryContext>
        </TicketProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
