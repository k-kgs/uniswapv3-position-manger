import { ethers } from "hardhat";

async function main() {
  const UniswapLiquidityProvider = await ethers.getContractFactory("UniswapLiquidityProvider");
  const uniswapLiquidityProvider = await UniswapLiquidityProvider.deploy()

  await uniswapLiquidityProvider.deployed();

  console.log(`Deployed to ${uniswapLiquidityProvider.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
