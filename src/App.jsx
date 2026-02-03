import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ToDoTasks from './pages/ToDoTasks'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'


function App() {
  const lightTheme = "text-[#67625C] bg-[#D8C7B5]"
  const darkTheme = "bg-[#67625C] text-[#D8C7B5]"
  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tasks' element={<ToDoTasks />} />
        <Route path='/login' element={<Auth login={true} />} />
        <Route path='/register' element={<Auth login={false} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  )
}

export default App