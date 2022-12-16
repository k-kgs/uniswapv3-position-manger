import { useQuery, gql } from "@apollo/client";
import { initialDepositQuery } from "../utils/query/initialDepositDetails";
import caculateIL from "../services/calculateImpermanentLoss";
import { Button, Card, Typography } from "@mui/material";
import { CardContent } from "@mui/material";
import ManageImpermanentLoss from "./manageImpermanentLoss";
import { useState } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { ethers } from "ethers";

export default function FetchImpermanentLoss(props: any) {
  const avgBlockTimeInSec = 12;
  const tickBase = 1.0001;
  const [details, setDetails] = useState({});
  const [ilDetails, setIlDetails] = useState({});
  const [msg, setMsg] = useState("");
  const position_id = props.tokenId;
  const { threshold, provider, user } = useContext(UserContext);
  const handleExit = async () => {
    const signer = provider.getSigner(user.address);
    const contract = require("../artifacts/contracts/UniswapLiquidityProvider.sol/UniswapLiquidityProvider.json");
    const uniSwapPositionManager = new ethers.Contract(
      "0xDe4e66ED9AB6aCDdf78310759d4A4f7420E8729A",
      contract.abi,
      signer
    );
    const liquidity = details.initial["liquidity"];
    const token0 = details.initial["token0"]["id"];
    const token1 = details.initial["token1"]["id"];
    const owner = user.address;
    try {
      const message = await uniSwapPositionManager.decreaseLiquidity(
        position_id,
        liquidity,
        token0,
        token1,
        owner
      );
      await message.wait();

      // const message = await uniSwapPositionManager.decreaseLiquidity(
      //   47258,
      //   1,
      //   "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      //   "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      //   "0x50C419A9354556f764790B4C918fc74543595f60"
      // );
      // await message.wait();
      await setMsg("Transferred your asset to your wallet Successfully!!");
    } catch (error) {
      await setMsg("OOPS!! Caught Some Error");
    }
  };

  const initialDepositDetails = useQuery(initialDepositQuery, {
    variables: {
      position_id: position_id,
      pollInterval: avgBlockTimeInSec * 1000,
    },
  });
  if (initialDepositDetails?.loading) {
    return <h4>Loading.....</h4>;
  }

  if (initialDepositDetails?.error) {
    return null;
  }

  if (initialDepositDetails?.data) {
    if (Object.keys(details).length == 0) {
      setDetails({
        initial: initialDepositDetails?.data.positions[0],
      });
    }

    const initialDepDetail = initialDepositDetails?.data.positions[0];
    const IL = caculateIL(initialDepDetail, tickBase);
    if (IL < threshold.threshold) {
      handleExit();
    }
    if (Object.keys(ilDetails).length == 0) {
      setIlDetails({
        IL: IL,
      });
    }
    if (Object.keys(ilDetails).length !== 0 && IL !== ilDetails.IL) {
      setIlDetails({
        IL: IL,
      });
      setDetails({
        initial: initialDepositDetails?.data.positions[0],
      });
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            width: "400px",
            marginBottom: "20px",
          }}
        >
          <CardContent>
            <Typography variant="h4">Details</Typography>
            {ilDetails.IL && (
              <Typography variant="h5">IL: {ilDetails.IL}%</Typography>
            )}
            {ilDetails.IL && (
              <Typography variant="h5">Position ID: {position_id}</Typography>
            )}
          </CardContent>
        </Card>
        <ManageImpermanentLoss position_id={position_id} />
        <Button
          size="large"
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "60px",
            width: "400px",
            marginTop: "20px",
            backgroundColor: "darkorange",
          }}
          onClick={handleExit}
        >
          Exit Position
        </Button>
        <Typography variant="h5">{msg}</Typography>
      </div>
    );
  }
}
