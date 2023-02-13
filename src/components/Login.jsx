import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../helpers/Button";


export default function Login(props) {

  const navigate = useNavigate();

//login and sign with address
    const [signatures, setSignatures] = useState([]);

    const handleSign = async (e) => {
      e.preventDefault();
      const data = "Do you want to Log In?";

      const sig = await props.sign({
        message: data
      });
      if (sig) {
        setSignatures([...signatures, sig]);

          const response = await fetch(
            'http://localhost:4000/login',
            {
              mode:'cors',
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sig)
            }
          );
          if (!response.ok) {
            if (response.status === 401) {
              alert('Using address without registration!')
              console.error('Unauthorized');
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          }

          const data = await response.json();
          localStorage.setItem('token', data.token);
          alert('You are Logged!')
          navigate("/")
      }
    };

    var tokenStored = localStorage.getItem('token'); 
    
    return(

      <div>
        {!tokenStored ?
          <div>
          <h3>Login requires a signature from your wallet!</h3>
          <Button func={handleSign} text="Login" color="#B1B1B1"/>
          </div>
        :
        <h3>You are already logged!</h3>
        }

    </div>
        

    )
}