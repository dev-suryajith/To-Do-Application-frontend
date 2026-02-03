import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginAPI, registerAPI } from "../services/allAPI"
import { toast } from "react-toastify"

function Auth({ login }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        setFormData({
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }, [login])

    const handleSubmit = async (e) => {
        if (loading) return

        try {
            setLoading(true)

            if (login) {
                if (!formData.email || !formData.password) return alert("Email and password required")

                const res = await loginAPI({ email: formData.email, password: formData.password })
                console.log(res.status)
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token)
                    navigate("/tasks")
                }
            } else {
                if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword)
                    return setErrorMessage("All fields are required")

                if (formData.password !== formData.confirmPassword)
                    return setErrorMessage("Passwords do not match")

                await registerAPI(formData)
                toast.success("Account created successfully")
                navigate("/tasks")
            }
        } catch (err) {
            const status = err.response?.status

            if (status === 400) setErrorMessage("Invalid request data")
            else if (status === 401) setErrorMessage("Incorrect password")
            else if (status === 404) setErrorMessage(login ? "User not found" : "User already exists")
            else if (status === 500) setErrorMessage("Server error. Please try again later")
            else setErrorMessage("Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-linear-to-br from-[#D8C7B5] via-[#C9B6A2] to-[#B9A48E]">
            <div className="w-87.5 p-6 rounded-xl shadow-xl bg-[#F3E9DD]">
                <h1 className="text-xl text-center text-[#67625C] font-semibold mb-6 tracking-wide">
                    {login ? "LOGIN" : "REGISTER"}
                </h1>

                <form  className="flex flex-col gap-4">
                    {!login && (
                        <input value={formData.userName} onChange={e => setFormData({ ...formData, userName: e.target.value })} type="text" placeholder="Username" className="px-3 py-2 rounded border border-black/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#67625C]" />
                    )}

                    <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="Email" className="px-3 py-2 rounded border border-black/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#67625C]" />

                    <input value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} type="password" placeholder="Password" className="px-3 py-2 rounded border border-black/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#67625C]" />

                    {!login && (
                        <input value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} type="password" placeholder="Confirm Password" className="px-3 py-2 rounded border border-black/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#67625C]" />
                    )}

                    <button disabled={loading} type="button" onClick={handleSubmit} className="mt-2 bg-[#67625C] text-[#F3E9DD] py-2 rounded hover:opacity-90 transition disabled:opacity-60">{loading ? "Please wait..." : login ? "Login" : "Register"}</button>
                </form>

                <p className="text-sm text-center mt-4 text-[#e62525]">
                    {errorMessage}
                </p>
                <p className="text-sm text-center mt-4 text-[#67625C]">
                    {login ? <>Don’t have an account?<Link to="/register" className="ml-1 font-medium underline">Register</Link></>
                        : <>Already have an account?<Link to="/login" className="ml-1 font-medium underline">Login</Link></>}
                </p>
            </div>
        </div>
    )
}

export default Auth
