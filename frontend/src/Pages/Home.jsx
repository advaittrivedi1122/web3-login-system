import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import Button from "@mui/material/Button";
import { Web3 } from "web3";

function Home() {
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
    const data = fetch(`${api}/addWalletAddress`,{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          walletAddress
        })
      })
  };

  useEffect(() => {
    console.log(walletAddress);
  }, [walletAddress]);
  return (
    <div className="home">
      <p>Hii, {username}</p>
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