import { network } from "hardhat";
import { useState } from "react";
import {createContext} from "react";


interface IuserContextProps {
    user: any;
    loading: boolean;
    balance: any;
    threshold: any;
    provider: any;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
    setBalance: (balance: any) => void;
    setThreshold: (threshold: any) => void;
    setProvider: (provider: any) => void;
  }
  
  export const UserContext = createContext<IuserContextProps>({
    user: {},
    loading: true,
    balance: "",
    threshold: {},
    provider: {},
    setUser: () => {},
    setLoading: () => {},
    setBalance: () => {},
    setThreshold: () => {},
    setProvider: () => {}
  });
  
  export const UserContextProvider = (props:any) => {
    const [currentUser, setCurrentUser] = useState({
        address: "",
        network: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState("");
    const [threshold, setThreshold] = useState({});
    const [provider, setProvider] = useState({})

  
    return (
      <UserContext.Provider
        value={{
          user: currentUser,
          loading: isLoading,
          balance: balance,
          threshold: threshold,
          provider: provider,
          setUser: setCurrentUser,
          setLoading: setIsLoading,
          setBalance: setBalance,
          setThreshold: setThreshold,
          setProvider: setProvider
        }}
      >
        {props.children}
      </UserContext.Provider>
    );
  };