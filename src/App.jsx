
import { BrowserRouter } from 'react-router'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { NavBar } from './ui/NavBar'


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
