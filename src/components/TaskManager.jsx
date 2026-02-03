import React, { useEffect, useState } from 'react'
import { addNewTaskAPI, deleteTaskAPI, getAllTasksAPI, updateTaskAPI } from '../services/allAPI'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function TaskManager() {
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteTaskId, setDeleteTaskId] = useState(null)

    const [newTask, setNewTask] = useState({
        taskName: "",
        taskDescription: "",
        priority: "Medium",
        dueDate: ""
    })

    const token = localStorage.getItem("token")
    const reqHeader = { Authorization: `Bearer ${token}` }

    //create
    const handleAddNewTask = async () => {
        try {
            await addNewTaskAPI(newTask, reqHeader)

            toast.success("Task added successfully")

            setShowModal(false)
            setNewTask({
                taskName: "",
                taskDescription: "",
                priority: "Medium",
                dueDate: ""
            })

            handleGetAllTasks()
        } catch (error) {
            error.status == 400 && toast.info('Task already exist. Please add other task')
            error.status == 404 && toast.error('User not found')
            error.status == 500 && toast.error('Failed to create new task')
        }
    }

    // read
    const handleGetAllTasks = async () => {
        try {
            const res = await getAllTasksAPI(reqHeader)
            setTaskData(res.data)
        } catch (error) {
            console.log(error.status)
            error.status == 400 && toast.info('No tasks yet. Click “Add Task” to create your first one')
            error.status == 404 && toast.error('User not found')
            error.status == 500 && toast.error('Failed to fetch tasks')
        }
    }

    // update
    const handleEditTask = async () => {
        try {
            await updateTaskAPI(newTask, reqHeader)

            toast.success("Task updated successfully")

            setShowEditModal(false)
            setNewTask({
                taskName: "",
                taskDescription: "",
                priority: "Medium",
                dueDate: ""
            })

            handleGetAllTasks()
        } catch (error) {
            error.status == 400 && toast.info('Task already exist. Please add other task')
            error.status == 404 && toast.error('User not found')
            error.status == 500 && toast.error('Failed to create new task')
        }
    }

    // delete
    const handleDeleteTask = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?")

        if (!confirmDelete) return

        try {
            await deleteTaskAPI(deleteTaskId, reqHeader)

            toast.success("Task deleted successfully")
            setShowDeleteModal(false)
            setDeleteTaskId(null)
            handleGetAllTasks()
        } catch (error) {
            error.status == 404 && toast.error('User not found')
            error.status == 500 && toast.error('Failed to create new task')
        }
    }

    useEffect(() => {
        !token && navigate('/login')
        handleGetAllTasks()
    }, [])

    return (
        <div className="w-screen min-h-screen p-8 bg-linear-to-br from-[#D8C7B5] via-[#C9B6A2] to-[#B9A48E]">
            <div className="max-w-6xl mx-auto bg-[#F3E9DD] p-6 rounded-xl shadow-xl">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[#67625C]">Task Manager</h2>
                    <button onClick={() => setShowModal(true)} className="bg-[#67625C] text-[#F3E9DD] px-4 py-2 rounded"> + Add Task </button>
                </div>
                {/* table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#67625C] text-[#F3E9DD] text-sm">
                                <th className="p-3 text-left">Task</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Priority</th>
                                <th className="p-3 text-left">Created</th>
                                <th className="p-3 text-left">Due</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {taskData.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center">
                                        No tasks found
                                    </td>
                                </tr>
                            ) : (
                                taskData.map((task) => (
                                    <tr key={task._id} className="border-b text-sm hover:bg-black/5">
                                        <td className="p-3">{task.taskName}</td>
                                        <td className="p-3">{task.taskDescription}</td>
                                        <td className="p-3">{task.priority}</td>
                                        <td className="p-3">{task.createdAt?.slice(0, 10)}</td>
                                        <td className="p-3">{task.dueDate?.slice(0, 10)}</td>
                                        <td className="p-3">{task.status}</td>
                                        <td className="p-3 flex gap-2">
                                            <button onClick={() => (setShowEditModal(true), setNewTask(task))} className="border px-3 py-1 rounded"> Edit </button>
                                            <button onClick={() => (setDeleteTaskId(task._id), setShowDeleteModal(true))} className="border px-3 py-1 rounded"> Delete </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* new task add modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-[#F3E9DD] p-6 rounded-xl w-96">
                        <h3 className="text-lg mb-4">Add New Task</h3>

                        <input placeholder="Task Name" className="p-2 border rounded w-full mb-2" value={newTask.taskName} onChange={e => setNewTask({ ...newTask, taskName: e.target.value })} />

                        <textarea placeholder="Description" className="p-2 border rounded w-full mb-2" value={newTask.taskDescription} onChange={e => setNewTask({ ...newTask, taskDescription: e.target.value })} />

                        <select className="p-2 border rounded w-full mb-2" value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>

                        <input type="date" className="p-2 border rounded w-full mb-4" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleAddNewTask} className="bg-[#67625C] text-white px-4 py-2 rounded">Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* edit task modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-[#F3E9DD] p-6 rounded-xl w-96">
                        <h3 className="text-lg mb-4">Edit Task</h3>

                        <input className="p-2 border rounded w-full mb-2" value={newTask.taskName} onChange={e => setNewTask({ ...newTask, taskName: e.target.value })} />

                        <textarea className="p-2 border rounded w-full mb-2" value={newTask.taskDescription} onChange={e => setNewTask({ ...newTask, taskDescription: e.target.value })} />

                        <select className="p-2 border rounded w-full mb-2" value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <select className="p-2 border rounded w-full mb-2" value={newTask.status} onChange={e => setNewTask({ ...newTask, status: e.target.value })}>
                            <option>Pending</option>
                            <option>Completed</option>
                        </select>

                        <input type="date" className="p-2 border rounded w-full mb-4" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button onClick={handleEditTask} className="bg-[#67625C] text-white px-4 py-2 rounded">Update</button>
                        </div>
                    </div>
                </div>
            )}

            {/* delete task modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-[#F3E9DD] p-6 rounded-xl w-96 shadow-lg">

                        <h3 className="text-lg font-semibold text-[#67625C] mb-2">
                            Delete Task
                        </h3>

                        <p className="text-sm text-[#67625C]/80 mb-6">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => { setShowDeleteModal(false), setDeleteTaskId(null) }} className="px-4 py-2 border rounded-md">
                                Cancel
                            </button>

                            <button onClick={handleDeleteTask} className="px-4 py-2 bg-red-600 text-white rounded-md hover:opacity-90 transition"> Delete </button>
                        </div>

                    </div>
                </div>
            )}


        </div>
    )
}

export default TaskManager
