import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout  from './Layout/Layout'
function App() {
  const [count, setCount] = useState(0)
  
  return (
    
    <Router>
      <Layout />
    </Router>
    
  )
}

export default App
