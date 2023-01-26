import React from "react"
import { useState, useRef } from "react";
import { ethers } from "ethers";
import { useAppState  } from '@web3-onboard/react';



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

    //button styles
    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
       }
    function changeBack(){
        setMouseOv(false)
       }

    
//login and sign with address

    const resultBox = useRef();
    const [signatures, setSignatures] = useState([]);
    const [error, setError] = useState();
  
    const handleSign = async (e) => {
      e.preventDefault();
      const data = "Do you want to Log In?";
      setError();
      const sig = await signMessage({
        setError,
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
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          localStorage.setItem('token', data.token);
      }

    };
    
    return(


    
        <button style={{backgroundColor: mouseOv ? "black" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
        onClick={handleSign}
        >Login</button>



    )
}