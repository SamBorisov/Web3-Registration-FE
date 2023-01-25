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

    const [message, setMessage] = React.useState("");


    React.useEffect(() => {
      fetch("http://localhost:4000/")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);


   

    // clock
    const [time, setTime] = React.useState(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'))
  
    function rederTime() {
      const time2 = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      setTime(time2)
    }
    setInterval(rederTime, 60000);


    return(
    <div className="note">


        <h1>{time}</h1>

        {wallet ? 
        <div>

         <h2>Your address</h2>
         <p>spesification on your profile</p>

        <button 
        style={{backgroundColor: mouseOv ? "black" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
        disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}> {connecting ? 'connecting' : wallet ? 'LogOut' : 'connect'}
        </button>

        </div>
        :
        <div>
            <h1>{message}</h1>

        <p>To see your profile please register! <br></br> If you already have an account, log in!</p>

       </div>
    }

    </div>

    )
}