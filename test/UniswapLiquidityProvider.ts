import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("UniswapLiquidityProvider", function () {
  
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const UniswapLiquidityProvider = await ethers.getContractFactory("UniswapLiquidityProvider");
    const uniswapLiquidityProvider = await UniswapLiquidityProvider.deploy();

    return { uniswapLiquidityProvider, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Should decrease the liquidity", async function () {
      const { uniswapLiquidityProvider, owner } = await loadFixture(deployOneYearLockFixture);
      const receipt = await uniswapLiquidityProvider.decreaseLiquidity(
        47258,
        100,
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "0x50C419A9354556f764790B4C918fc74543595f60"
      )
      console.log("response:",receipt);

    });

    
  })})