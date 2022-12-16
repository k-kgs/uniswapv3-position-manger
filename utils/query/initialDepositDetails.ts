import gql from "graphql-tag";

export const initialDepositQuery = gql`
  query get_position($position_id: ID!) {
    positions(where: { id: $position_id }) {
      pool {
        id
        tick
        sqrtPrice
      }
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
      liquidity
      depositedToken0
      depositedToken1
      collectedFeesToken0
      collectedFeesToken1
      tickLower {
        tickIdx
      }
      tickUpper {
        tickIdx
      }
    }
  }
`;
