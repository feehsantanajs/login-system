

import './styles/main.css'
import { Login } from './pages/Login'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Register } from './pages/Register'



function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/register" element={ <Register />} />
      </Routes>
    </Router>
   
  )
}
export default App
