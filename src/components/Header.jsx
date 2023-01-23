import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

    let isLogged = false;

    return(
        <header>
        {isLogged ?  
        <h4> <Link to="/">Profile</Link>  </h4>
        :
        <div style={{"display": "flex"}}>
        <h4> <Link to="/">Profile</Link>  </h4>
         <h4> <Link to="/login">Login</Link> </h4>
         <h4> <Link to="/register">Register</Link> </h4>
         </div>
    }
         

        </header>
    )
}