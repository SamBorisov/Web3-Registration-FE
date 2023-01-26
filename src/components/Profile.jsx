import React from "react";

import { useConnectWallet } from '@web3-onboard/react'

export default function Profile(props) {

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

   //button styles
   const [mouseOv, setMouseOv] = React.useState(false)

   function chageColor() {
       setMouseOv(true)
      }
   function changeBack(){
       setMouseOv(false)
      }

   //Get JSON data to the server 

    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");

    let token= localStorage.getItem('token');
    React.useEffect(() => {
      fetch("http://localhost:4000/profile", {
        mode:'cors',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
          }
        })
        .then((res) => res.json())
        .then((data) => {
          setName(data.name)
          setUsername(data.username)
          setEmail(data.email)
          setAddress(data.address)
        });
    }, []);


   

    // clock
    const [time, setTime] = React.useState(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))
  
    function rederTime() {
      const time2 = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      setTime(time2)
    }
    setInterval(rederTime, 60000);


    return(
    <div>

        {wallet ? 
        <div>

         <h3>Hello {name} <br></br>{time}</h3>
         <h2>Here's your account information:</h2>
         <div style={{"textAlign":"left"}}>
         <p><b>Name:</b> {name}</p>
         <p><b>Username:</b> {username}</p>
         <p><b>E-mail:</b> {email}</p>
         <p><b>Blockchain address:</b> {address}</p>
         </div>

        <button 
        style={{backgroundColor: mouseOv ? "black" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
        disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}> {connecting ? 'connecting' : wallet ? 'LogOut' : 'connect'}
        </button>

        </div>
        :
        <div>
            <h3>Greetings <br></br>{time}</h3>

        <p>To see your profile please register! <br></br> If you already have an account, log in!</p>

       </div>
    }

    </div>

    )
}