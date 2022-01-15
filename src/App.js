import React from 'react'
import {Routes, Route} from 'react-router-dom'


// COMPONENTS
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'


// CSS
import './app.scss'

const App = () => {

    return (
        <>
            <div className="app-main">
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/user-panel' element={<Dashboard />} />    
                    <Route path='/create-user' element={<Register />} />
                </Routes>
            </div>
        </>
    )
}

export default App
