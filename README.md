# To-Do Application – Frontend

A React-based frontend for a full-stack To-Do application.  
This application allows users to register, log in, and manage their personal tasks securely.

---

## 🚀 Tech Stack
- React (Vite)
- JavaScript (ES6+)
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

---

## ✨ Features
- User Registration and Login
- JWT-based authentication
- Reusable authentication page for Login and Register
- Create, view, update, and delete tasks
- Mark tasks as completed or pending
- Auth-protected task management
- Simple and user-friendly UI

---

## 🔐 Authentication Design

The application uses a **single `Auth.jsx` component** for both Login and Register.

- A prop determines whether the component behaves as:
  - Login form
  - Register form
- This approach:
  - Reduces code duplication
  - Centralizes authentication logic
  - Improves maintainability

This design decision is intentional and follows common React best practices.

---

## 📂 Folder Structure

src/

├── pages/

│ ├── Auth.jsx

│ ├── ToDoTasks.jsx

├── services/

│ ├── commonAPI.js

│ ├── allAPI.js

├── assets/

├── App.jsx

└── main.jsx

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/dev-suryajith/To-Do-Application-frontend.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

🔗 Backend Integration

This frontend communicates with a RESTful backend API built using Node.js and Express.

Ensure the backend server is running before using the application.

📌 Notes

JWT token is stored in localStorage

Token is sent via the Authorization header for protected API requests

Unauthorized users are redirected to the authentication page

---
