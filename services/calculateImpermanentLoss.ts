export default function caculateIL(positionValue: any, tickBase) {
  const positionValueDetails = positionValue;
  const [adjustedCurrentPrice, adjustedAmount0, adjustedAmount1] =
    caculateCurrentPrice(positionValueDetails, tickBase);
  const collectedFeesToken0 = positionValue.collectedFeesToken0;
  const collectedFeesToken1 = positionValue.collectedFeesToken1;
  const depositedToken0 = positionValue.depositedToken0;
  const depositedToken1 = positionValue.depositedToken1;
  const IL =
    (adjustedAmount0 +
      +collectedFeesToken0 +
      adjustedCurrentPrice * (adjustedAmount1 + +collectedFeesToken1)) /
    (+depositedToken0 + +depositedToken1 * adjustedCurrentPrice);

  return (IL - 1) * 100;
}

function tickToPrice(tick, tickBase) {
  return tickBase ** tick;
}

function caculateCurrentPrice(data, tickBase) {
  const positionValue = data;
  const currentTick = data.pool["tick"];
  const tickLower = data.tickLower["tickIdx"];
  const tickUpper = data.tickUpper["tickIdx"];
  const liquidity = data.liquidity;
  const currentSqrtPrice = data.pool["sqrtPrice"];
  const decimal0 = data.token0["decimals"];
  const decimal1 = data.token1["decimals"];
  const tokensymbol0 = data.token0["symbol"];
  const tokensymbol1 = data.token1["symbol"];

  const currentPrice = tickToPrice(currentTick, tickBase);
  const adjustedCurrentPrice = currentPrice / 10 ** (decimal1 - decimal0);
  const sa = tickToPrice(tickLower / 2, tickBase);
  const sb = tickToPrice(tickUpper / 2, tickBase);
  let amount0, amount1;
  if (tickUpper <= currentTick) {
    //    Only token1 locked
    amount0 = 0;
    amount1 = liquidity * (sb - sa);
  } else if (tickLower < currentTick < tickUpper) {
    //   Both tokens present
    amount0 = (liquidity * (sb - currentSqrtPrice)) / (currentSqrtPrice * sb);
    amount1 = liquidity * (currentSqrtPrice - sa);
  } else {
    //    Only token0 locked
    amount0 = (liquidity * (sb - sa)) / (sa * sb);
    amount1 = 0;
  }

  const adjustedAmount0 = amount0 / 10 ** decimal0;
  const adjustedAmount1 = amount1 / 10 ** decimal1;

  return [adjustedCurrentPrice, adjustedAmount0, adjustedAmount1];
}
