import { Routes,Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/Navbar.jsx'
import viteLogo from '/vite.svg'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { axiosInstance } from './lib/axios.js'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'


function App() {

  const {authUser,checkAuth, isCheckingAuth,onlineUsers}= useAuthStore();
  const {theme}= useThemeStore();
    useEffect(()=>{
      checkAuth();
    },[checkAuth])

    console.log({onlineUsers})

    if(isCheckingAuth && !authUser) return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  return (
    
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
       <Route path="/" element={authUser? <HomePage/> : <Navigate to="/login"/>}></Route>
       <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/login" />}></Route>
       <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to='/'/>}></Route>
       <Route path="/settings" element={<SettingsPage/>}></Route>
       <Route path="/profile" element={authUser? <ProfilePage/> : <Navigate to="/login"/>}></Route>
      </Routes>

      <Toaster/>
    </div>

  )
}

export default App
