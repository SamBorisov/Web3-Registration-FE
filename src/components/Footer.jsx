import React from "react";
import { useConnectWallet } from '@web3-onboard/react'

export default function Footer() {

    let name = "Samuil Boriosv";
    let day = new Date().getFullYear();

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
     //button styles
   const [mouseOv, setMouseOv] = React.useState(false)

   function chageColor() {
       setMouseOv(true)
      }
   function changeBack(){
       setMouseOv(false)
      }

    return(
        <footer>
            
        {wallet ? 
        <button 
        style={{backgroundColor: mouseOv ? "black" : "white"}} onMouseOver={chageColor}  onMouseLeave={changeBack}
        disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}> {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
        </button>
        :
        null
        }


         <p>{name} Copyright © {day} </p>
        </footer>
    )
}