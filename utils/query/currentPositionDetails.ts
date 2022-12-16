import { gql } from "@apollo/client";

export const currentPositionQuery = gql`
  query get_position($position_id: ID!) {
    positions(where: { id: $position_id }) {
      liquidity
      tickLower {
        tickIdx
      }
      tickUpper {
        tickIdx
      }
      collectedFeesToken0
      collectedFeesToken1
    }
  }
`;
