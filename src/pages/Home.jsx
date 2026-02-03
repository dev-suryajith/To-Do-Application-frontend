import React from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="w-screen min-h-screen bg-linear-to-br from-[#D8C7B5] via-[#C9B6A2] to-[#B9A48E]">
            <Navbar />
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="bg-[#F3E9DD] rounded-2xl shadow-lg p-8 sm:p-12 text-center">

                    <h1 className="text-3xl sm:text-4xl font-semibold text-[#67625C] mb-4">
                        Manage Your Tasks Simply
                    </h1>

                    <p className="text-[#67625C]/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
                        Stay organized, track your work, and focus on what matters.
                        A simple task manager built for everyday productivity.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to='/register' className="bg-[#67625C] text-[#F3E9DD] px-6 py-3 rounded-md hover:opacity-90 transition">
                            Get Started
                        </Link>

                        <Link to='/tasks' className="border border-[#67625C] text-[#67625C] px-6 py-3 rounded-md hover:bg-black/5 transition">
                            View Tasks
                        </Link>
                    </div>

                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-[#F3E9DD] p-6 rounded-xl shadow-sm">
                        <h3 className="font-medium text-[#67625C] mb-2">
                            Simple Task Management
                        </h3>
                        <p className="text-sm text-[#67625C]/80">
                            Add, edit, and delete tasks easily without unnecessary complexity.
                        </p>
                    </div>

                    <div className="bg-[#F3E9DD] p-6 rounded-xl shadow-sm">
                        <h3 className="font-medium text-[#67625C] mb-2">
                            Secure & Personal
                        </h3>
                        <p className="text-sm text-[#67625C]/80">
                            Your tasks are linked to your account and protected using JWT authentication.
                        </p>
                    </div>

                    <div className="bg-[#F3E9DD] p-6 rounded-xl shadow-sm">
                        <h3 className="font-medium text-[#67625C] mb-2">
                            Clean & Responsive
                        </h3>
                        <p className="text-sm text-[#67625C]/80">
                            Designed to work smoothly on mobile, tablet, and desktop devices.
                        </p>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home
