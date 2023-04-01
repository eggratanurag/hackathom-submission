import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Assignment from './Assignment'
import EditSubmission from './EditSubmission'
import Submission from './Submission'

function App() {
 
  return (
     <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assignment" element={<Assignment />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/submission/edit" element={<EditSubmission />} />
        </Routes>
     </HashRouter>
  )
}

export default App
