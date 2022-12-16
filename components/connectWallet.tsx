import { useState } from "react";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import { useContext, useEffect } from "react";

export default function ConnectWallet() {
  const { push } = useRouter();
  const { user, setUser, balance, setBalance, provider, setProvider } =
    useContext(UserContext);

  const getProvider = async () => {
    await setProvider(new ethers.providers.Web3Provider(window?.ethereum));
  };
  useEffect(() => {
    getProvider();
    if (user.address !== "") {
      push("/position");
    }
  }, [user]);

  const providerValue = provider;
  const [errorMessage, setErrorMessage] = useState("");

  const connectwalletHandler = () => {
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
  };

  const accountChangedHandler = async (newAccount: any) => {
    const address = await newAccount.getAddress();
    const network = await provider.getNetwork();
    await setUser({
      address: address,
      chain: network.name,
    });
    const balance = await newAccount.getBalance();
    await setBalance(balance);
    await getuserBalance(address);
  };
  const getuserBalance = async (address: any) => {
    const balance = await provider.getBalance(address, "latest");
  };
  return (
    <div>
      <Button
        size="large"
        variant="contained"
        style={{
          marginTop: "10px",
          height: "40px",
          fontWeight: "bold",
          width: "150px",
          fontSize: "15px",
        }}
        onClick={connectwalletHandler}
      >
        {user.address ? "Connected!!" : "Connect"}
      </Button>
    </div>
  );
}
