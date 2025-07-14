
import { BrowserRouter } from 'react-router'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { NavBar } from './ui/NavBar'
import { AuthProvider } from './context/AuthContext'



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
            <NavBar />
            <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
