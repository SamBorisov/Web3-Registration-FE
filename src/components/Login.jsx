import React from "react"
import { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";



const signMessage = async ({ setError, message }) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
  
      return {
        message,
        signature,
        address
      };
    } catch (err) {
      setError(err.message);
    }
  };

export default function Login(props) {

  const navigate = useNavigate();

    //button styles
    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
       }
    function changeBack(){
        setMouseOv(false)
       }

    
//login and sign with address


    const [signatures, setSignatures] = useState([]);


  
    const handleSign = async (e) => {
      e.preventDefault();
      const data = "Do you want to Log In?";

      const sig = await signMessage({
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
          <button style={{backgroundColor: mouseOv ? "black" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
          onClick={handleSign}
          >Login</button>
          </div>
        :
        <h3>You are already logged!</h3>
        }

    </div>
        

    )
}