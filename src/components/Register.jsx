import React from "react"

import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'


export default function Register(props) {


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
            //console.log(wallet.accounts[0].address)
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
                    let {serverRes} = data
                    if(serverRes){
                        alert(serverRes)
                        localStorage.setItem('serverReso', serverRes);
                        console.log(serverRes)
                    }
             }
        }


    return (
    <div>
        {localStorage.getItem('serverReso') ? 
            <h3>This address already has registration!</h3>
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