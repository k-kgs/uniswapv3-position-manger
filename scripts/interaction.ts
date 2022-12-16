import { ethers } from "hardhat";
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/UniswapLiquidityProvider.sol/UniswapLiquidityProvider.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
   "goerli",
  API_KEY
);

// Signer
const signer = new ethers.Wallet(
  PRIVATE_KEY,
  alchemyProvider
);

// Contract
const uniswapLiquidityProvider = new ethers.Contract(
  "0xDe4e66ED9AB6aCDdf78310759d4A4f7420E8729A",
  contract.abi,
  signer
);

async function main() {
  const message = await uniswapLiquidityProvider.decreaseLiquidity(
    47258,
    1,
    "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    "0x50C419A9354556f764790B4C918fc74543595f60"
  );
  await message.wait();

  console.log("The message is: " + message);
}
main();
