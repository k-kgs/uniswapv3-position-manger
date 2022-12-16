import { useQuery } from "@tanstack/react-query";
import fetchUniswapPosition from "../services/fetchUniswapvPositions";
import { Card } from "@mui/material";
import NextLink from 'next/link';
import styles from '../styles/Home.module.css'


export default function FetchUniswapV3Position(props: any) {
  const wallet = props.wallet;
  const chain = props.chain;
  const {
    data: result = [],
    isLoading,
    isError,
    error,
  } = useQuery(["UniswapV3Position"], () =>
    fetchUniswapPosition(wallet, chain)
  );
  if (result.length) {
    return (
      <div>
        {result?.map((item) => {
          return (
            <NextLink 
            href={{
                pathname: '/manage',
                query: {tokenId: item}
            }}
            >
              <Card
              sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '20px',
                  width: '400px'
              }}
              className={styles.card}
              >Position : {item}</Card>
            </NextLink>
          );
        })}
      </div>
    );
  } else {
    return <div>{<h5> Fetching Positions..... </h5>}</div>;
  }
}
