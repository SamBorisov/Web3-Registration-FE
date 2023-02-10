import React from "react"
import { useNavigate } from "react-router-dom";

import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'


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


export default function Register(props) {

    const navigate = useNavigate();

    //button animation
    const [mouseOv, setMouseOv] = React.useState(false)

    function chageColor() {
        setMouseOv(true)
    }
    function changeBack() {
        setMouseOv(false)
    }

    // to get the wallet 
    const [{ wallet}] = useConnectWallet()

    //send JSON data to the server 
    async function handleSubmit(event) {
        event.preventDefault()

        if (wallet) {
            new ethers.providers.Web3Provider(wallet.provider, 'any')
            let address = wallet.accounts[0].address;

        const object = {
            name: event.target.name.value,
            username: event.target.username.value,
            email: event.target.email.value,
            address: address,
        }
        let response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
        })

                    let data = await response.json();
                    let {serverRes} = data;
                    let {message} = data;
                    if(message) {
                      alert(message)
                    }
                    if(serverRes){
                        alert(serverRes)
                        localStorage.setItem('serverReso', serverRes);
                        console.log(serverRes)
                        navigate("/login")
                    }
             }
        }

        //delete account 
    const [signatures, setSignatures] = React.useState([]);
  
    const handleDelete = async (e) => {
      e.preventDefault();
      const data = "Do you want to Delete your registation and data?";

      const sig = await signMessage({
        message: data
      });
      if (sig) {
        setSignatures([...signatures, sig]);

          const response = await fetch(
            'http://localhost:4000/delete',
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
          } else {
            alert('Profile Deleted!')
            localStorage.removeItem("token");
            localStorage.removeItem("serverReso");
            navigate("/register")
          }

      }
    };


    return (
    <div>
        {localStorage.getItem('serverReso') ? 
            <div>
            <h3>This address already has registration!</h3>
            <button style={{ backgroundColor: mouseOv ? "#FF7377" : "white" }} onMouseOver={chageColor} onMouseLeave={changeBack}
            onClick={handleDelete}>Delete Profile</button>
            </div>
            :
            <form onSubmit={handleSubmit} className="form">
            <h3>Register your address!</h3>
            <input name="name" type="text" placeholder="Name" required/>
            <input name="username" type="text" placeholder="Username" required/>
            <input name="email" type="email" placeholder="E-mail" required/>


            <button type="submit" style={{ backgroundColor: mouseOv ? "black" : "white" }}
                onMouseOver={chageColor}
                onMouseLeave={changeBack}>Register</button>

        </form>
        }

        
       
    </div>

    )
}