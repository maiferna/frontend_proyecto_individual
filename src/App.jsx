
import { BrowserRouter } from 'react-router'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import { NavBar } from './ui/NavBar'
import { AuthProvider } from './context/AuthContext'
import { FavoriteProvider } from './context/FavoriteContext'



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
