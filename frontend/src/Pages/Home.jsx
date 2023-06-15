import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import Button from "@mui/material/Button";
import { Web3 } from "web3";

function Home(props) {
    console.log("🚀 ~ file: Home.jsx:7 ~ Home ~ props:", props)
    const api = process.env.REACT_APP_API_URL
  const [walletAddress, setWalletAddress] = useState("");
  const username = localStorage.getItem("username");

  const connectWallet = async () => {
    const ethereum = window.ethereum;
    // const web3 = window.web3;
    const web3Instance = new Web3(ethereum);
    const enabledWeb3 = await ethereum.enable();
    const account = await web3Instance.eth.getAccounts();
    const accountAddress = await account[0];
    setWalletAddress(accountAddress)
    const authToken = localStorage.getItem('jwt-auth-token')
    const data = await fetch(`${api}/addWalletAddress`,{
        method: "POST",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`
        },
        body: JSON.stringify({
          walletAddress
        })
      })
  };

  useEffect(() => {
    console.log(walletAddress);
  }, [walletAddress, username]);
  return (
    <div className="home">
      <h2>Hii, {username}</h2>
      <br />
      <p>{walletAddress}</p>
      <br />
      <Button variant="contained" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </div>
  );
}

export default Home;
