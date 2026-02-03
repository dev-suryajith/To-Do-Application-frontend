import React from 'react'
import TaskManager from '../components/TaskManager'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ToDoTasks() {
  return (
    <div>
      <Navbar />
      <TaskManager />
      <Footer />
    </div>
  )
}

export default ToDoTasks