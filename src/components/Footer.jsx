import React from "react";
import Button from "../helpers/Button";
import { useConnectWallet } from '@web3-onboard/react'

export default function Footer() {

    let name = "Samuil Boriosv";
    let day = new Date().getFullYear();

    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()


    return(
        <footer>
            
        {wallet ? 
        <Button func={() => (wallet ? disconnect(wallet) : connect())} text={connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'} color="#ffa07a"/>
        :
        null
        }
        <p>{name} Copyright © {day} </p>
        </footer>
    )
}