import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import MyList from './components/MyList'
import './App.css'

function App() {
  const token = localStorage.getItem('token');
  const [currentView, setCurrentView] = useState('dashboard');

  if (!token) {
    return <Home />;
  }

  return (
    <>
      {currentView === 'dashboard' && <Dashboard onViewChange={setCurrentView} />}
      {currentView === 'mylist' && <MyList onViewChange={setCurrentView} />}
    </>
  )
}

export default App

