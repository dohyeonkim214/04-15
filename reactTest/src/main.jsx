import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import TodoListPage from './todolist.jsx'
import './style.css'

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todolist" element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
