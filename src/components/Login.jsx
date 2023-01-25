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

    // login and sign 

    // const [signed, setSigned] = React.useState(false);
    // const { web3 } = useAppState({
    //   requiredNetwork: 1, //1 for mainnet, 3 for ropsten, etc.
    //   wallets: ['metamask'],
    // });
  

    //   const handleSign = async (e) => {
    //     e.preventDefault();
      
    //     const accounts = await web3.eth.getAccounts();
    //     if(accounts.length === 0) {
    //         alert("Please connect to a wallet first!");
    //         return;
    //     }
    //     const msg = 'This is a message to sign';
    //     const signature = await web3.eth.personal.sign(msg, accounts[0]);
      
    //     const data = {
    //       address: accounts[0],
    //       msg,
    //       signature
    //     };
      
    //     // send the data to the server using fetch
    //     fetch('/sign', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data)
    //     })
    //       .then(response => response.json())
    //       .then(responseData => {
    //         console.log(responseData);
    //         setSigned(true);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   };
    
  
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

        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
      }

      };
    


    return(


    
        <button style={{backgroundColor: mouseOv ? "black" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
        onClick={handleSign}
        >Login</button>



    )
}