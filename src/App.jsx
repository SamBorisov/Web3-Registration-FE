import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer"
import Profile from "./components/Profile"
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Button from "./helpers/Button";


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


    //conect wallet
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    
    if (wallet) {
        new ethers.providers.Web3Provider(wallet.provider, 'any')
        console.log(wallet.accounts[0].address)
      }


 //create signature
const signMessage = async ({ setError, message }) => { 
  
  try {
    console.log({ message });
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(wallet.provider);
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

    return(
        <div>
        {!wallet ? 
            <div>
            <h3 style={{paddingTop:"10%"}}>Welcome, please connect your wallet to use this App!</h3>
            <Button func={() => (wallet ? disconnect(wallet) : connect().then(navigate("/register")))} text={connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'} color="#B1B1B1"/>
            </div>
            :
            <div>
            <Header />
            <Routes>
                <Route  path="/" element={<Profile />} />
                <Route exact path="/login" element={<Login sign={signMessage}/>} />
                <Route exact path="/register" element={<Register sign={signMessage} />} />
            </Routes>
            </div>
        }

            <Footer />
            
             
             </div>
        
    )
}