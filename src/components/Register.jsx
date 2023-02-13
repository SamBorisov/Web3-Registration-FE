import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import Button from "../helpers/Button";

import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'


export default function Register(props) {

    const navigate = useNavigate();

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
    const [signatures, setSignatures] = useState([]);
  
    const handleDelete = async (e) => {
      e.preventDefault();
      const data = "Do you want to Delete your registation and data?";

      const sig = await props.sign({
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
            <Button func={handleDelete} text="Delete Profile" color="#ffa07a"/>
            </div>
            :
            <form onSubmit={handleSubmit} className="form">
            <h3>Register your address!</h3>
            <input name="name" type="text" placeholder="Name" required/>
            <input name="username" type="text" placeholder="Username" required/>
            <input name="email" type="email" placeholder="E-mail" required/>

            <Button type="submit" text="Register" color="#B1B1B1"/>
                

        </form>
        }

        
       
    </div>

    )
}