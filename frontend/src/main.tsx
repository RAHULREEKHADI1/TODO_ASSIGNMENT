import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home.tsx'
import Signup from './components/Signup.tsx'
import Todo from './components/Todo.tsx'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/PrivateRoutes.tsx'
import { ForgotPassword } from './components/ForgotPassword.tsx'
import { ResetPassword } from './components/ResetPassword.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/signup" element={<Signup initialMode="signup" />} />
      <Route path="/login" element={<Signup initialMode="login" />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      <Route
        path='/todo'
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      />
    </Routes>

  </BrowserRouter>
)
