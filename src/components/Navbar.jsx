import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const token=localStorage.getItem('token')
    return (
        <nav className="w-screen overflow-hidden bg-[#67625C] px-8 py-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                {/* Logo / Title */}
                <Link to='/' className="text-lg font-semibold text-[#F3E9DD]">
                    Task Manager
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6 text-sm text-[#F3E9DD]/90">
                    <Link to='/tasks' className="hover:text-white transition">
                        Tasks
                    </Link>
                    {token?
                    <button onClick={() => (localStorage.removeItem('token'), navigate('/login'))} className="hover:text-white transition">
                        Logout
                    </button>
                    :
                    <Link to='/login'>Login</Link>}
                </div>

            </div>
        </nav>
    )
}

export default Navbar