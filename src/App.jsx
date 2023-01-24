import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route} from 'react-router-dom';




export default function App() {


  

    return(
        <div>
            <Header />


            <Routes>
                <Route  path="/" element={<Profile />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
            </Routes>


            <Footer />
            
    </div>
    )
}