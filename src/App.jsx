
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { LoginForm, RegisterForm } from './auth/pages'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

// FALTAN: login, registro y login con google, revisar vistas y cambiarlas, recuperar contraseña


// <AuthProvider>
//   <BrowserRouter>
//     <Routes>
//       <Route path="/register" element={<RegisterForm />} />

//     </Routes>
//   </BrowserRouter>
// </AuthProvider>