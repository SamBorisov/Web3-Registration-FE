import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route, useNavigate} from 'react-router-dom';


import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { APP_INFURA_API_KEY } from './helpers/costants';
import { ethers } from 'ethers'

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


export default function App() {

  const navigate = useNavigate();

    //button styles
   const [mouseOv, setMouseOv] = React.useState(false)

   function chageColor() {
       setMouseOv(true)
      }
   function changeBack(){
       setMouseOv(false)
      }

    //conect wallet
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    
    if (wallet) {
        new ethers.providers.Web3Provider(wallet.provider, 'any')
        console.log(wallet.accounts[0].address)
      }

    return(
        <div>
        {!wallet ? 
            <div>
            <h1 style={{paddingTop:"10%"}}>Welcome, please connect your wallet to use this App!</h1>
            <button 
            style={{ backgroundColor: mouseOv ? "black" : "white", marginTop:"15%"}} onMouseOver={chageColor} onMouseLeave={changeBack}
            disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect().then(navigate("/register")))}> {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
            </button>
            </div>
            :
            <div>
            <Header />
            <Routes>
                <Route  path="/" element={<Profile />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
            </Routes>
            </div>
        }

            <Footer />
            
             
             </div>
        
    )
}