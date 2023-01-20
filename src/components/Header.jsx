import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <header>
         <h4> <Link to="/">Profile</Link>  </h4>
         <h4> <Link to="/login">Login</Link> </h4>
         <h4> <Link to="/register">Register</Link> </h4>
         <h4> <Link to="/logout">LogOut</Link> </h4>
        </header>
    )
}