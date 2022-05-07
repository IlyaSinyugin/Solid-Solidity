import { useState, useEffect } from "react";
import PrimaryButton from "../components/primary-button";
import abi from "../utils/Keyboards.json";
import { ethers } from "ethers";

export default function Home() {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  const [keyboards, setKeyboards] = useState([]);

  const contractAddress = "0xbcf75898e37267D90C16623f051FD348aeb29F9c";
  const contractABI = abi.abi;

  const getKeyboards = async () => {
    if (ethereum && connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const keyboardsContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const keyboards = await keyboardsContract.getKeyboards();
      console.log("Retrieved keyboards...", keyboards);
      setKeyboards(keyboards);
    }
  };
  useEffect(() => getKeyboards(), [connectedAccount]);
  // TODO last step that was done
  const handleAccounts = (accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("We have an authorized account: ", account);
      setConnectedAccount(account);
    } else {
      console.log("No authorized accounts yet");
    }
  };

  const getConnectedAccount = async () => {
    if (window.ethereum) {
      setEthereum(window.ethereum);
    }

    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      handleAccounts(accounts);
    }
  };
  useEffect(() => getConnectedAccount(), []);
  // when metamask installed it sets window.ethereum to an object that we can use to call
  // functions on Metamask and on ETH blockchain

  // connectedAccount - address of the account that is logged in
  const connectAccount = async () => {
    if (!ethereum) {
      alert("MetaMask is required to connect an account");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    handleAccounts(accounts);
  };

  if (!ethereum) {
    return <p>Please install Metamask to connect to this site</p>;
  }

  if (!connectedAccount) {
    return (
      <PrimaryButton onClick={connectAccount}>
        Connect Metamask Wallet
      </PrimaryButton>
    );
    // how this works is it basically calls connectAccount function upon clicking
    // then if the window.ethereum is not empy handleAccounts is called, where accounts are passed
    // on as an argument by calling "eth_requestAccounts" method. handleAccounts basically
    // sets a value to an account if such exists
  }

  return <p>Connected Account: {connectedAccount}</p>;
}

//TODO throws call revert exception
