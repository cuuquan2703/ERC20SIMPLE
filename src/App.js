import logo from './logo.svg';
import './App.css';
import {abi} from "./abi/ABI"
import {ethers} from "ethers"
import {useState,useEffect} from 'react'

function App() {

    const [address,setAddress] = useState("")
    const [balanceToken,setBalanceToken]= useState(0)
    const [signer,setSigner] = useState()
    const [changeToken, setChangeToken] = useState(false)
    async function Connect() {
        if (window.ethereum !== "undefined"){
            try {
                await window.ethereum.request({method:"eth_requestAccounts"})
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                setSigner(provider.getSigner())
                console.log(signer)
            }catch(e){
                console.log(e)
            }
        }
    }

    const ContractToken = new ethers.Contract("0x6aa51cCF37b6DF27f36cb3322bdA7783D2012301",abi,signer)
    console.log(abi)
    console.log(ContractToken)
    async function Buy() {
        try {
            await ContractToken.Buy({value:5})
            setChangeToken(!changeToken)
        }catch (e){
            console.log(e)
        }
    }

    async function Claim(){
        try{
            await ContractToken.Claim(5)
            setChangeToken(!changeToken)
        }catch(e){
            console.log(e)
        }
    }

  return (
      <div className="Wrapper">
          <div>
          <div className="Button">
            
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4 mb-4" onClick={Connect}>
          Connect
        </button>
        <button class="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded mr-4 mb-4" onClick={Buy}>Buy Token</button>
        <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mr-4 mb-4" onClick={Claim}>Claim Token</button>
          </div>       

          </div>
      </div>
  );
}

export default App;

//@1 Check Provider
//@2 App Provider to Etherjs
//@3 Request Account ~ Open Metamask
//@4 Setupo network
//Additionnal @ : - Create Smart Contract
//                - Deploy Smart Contract onto Network
//                - Get Contract.Address vs Contract.abi
//@5 Connect Account to smart contract with abi and address
//@6 Call Method
//
//
//
//@1-->4:
//      * UseState to update state account on Web app
//      * Wanna call at the first time render --> useEffect
//      * Setup properly network on Metamask
//      
//      
//
//
// * Use Hardhat deploy onto testnet Ethereum
// (Contract):
//          * Array Accounts
//          * Buy token 
//          * Claim token
//          * Get Balance
// 
