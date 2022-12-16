import gql from "graphql-tag";

export const poolDetailsQuery = gql`
  query get_pools($pool_id: ID!) {
    pools(where: { id: $pool_id }) {
      tick
      sqrtPrice
    }
  }
`;
