import React from 'react';
import { Link } from 'react-router-dom';

import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { APP_INFURA_API_KEY } from '../helpers/costants';


// using onBoard 
const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/' + APP_INFURA_API_KEY;

const injected = injectedModule()

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ]
})

export default function Header() {


    //conect wallet
const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  // create an ethers provider

  if (wallet) {
    new ethers.providers.Web3Provider(wallet.provider, 'any')
    console.log(wallet.accounts[0].address)
    let address = wallet.accounts[0].address;

    fetch('http://localhost:4000/create-jwt', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address })
    })
  }
  


  

    return(
        <header>
        
        {wallet ?  
        <div style={{"display": "flex"}}>
            <h4> <Link to="/">Profile</Link>  </h4>
            <h4><button
             disabled={connecting}
             onClick={() => (wallet ? disconnect(wallet) : connect())}>
             {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
              </button></h4>  </div>
        :
        <div style={{"display": "flex"}}>
        <h4> <Link to="/">Profile</Link>  </h4>
         <h4> <Link to="/login">Login</Link> </h4>
         <h4> <Link to="/register">Register</Link> </h4>
         <h4>  <button
                disabled={connecting}
                onClick={() => (wallet ? disconnect(wallet) : connect())}>
               {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
              </button> </h4>
   
         </div>
    }
         

        </header>
    )
}