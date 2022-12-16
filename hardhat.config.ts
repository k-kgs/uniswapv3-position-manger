import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();
const { API_KEY, PRIVATE_KEY } = process.env;
const GOERLI_PRIVATE_KEY = PRIVATE_KEY
const ALCHEMY_API_KEY = API_KEY
const config: HardhatUserConfig = {
  solidity: "0.7.5",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};

export default config;
