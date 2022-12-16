import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import FetchUniswapV3Position from "../components/fetchUniswapPosition";


export default function Positions() {
  const queryClient = new QueryClient();

  const { push } = useRouter();
  const { user, setUser, balance, setBalance } = useContext(UserContext);
  useEffect(() => {
    if (user.address == "") {
      push("/");
    }
  }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
        }}>
      <div id="welcome">
        <Typography component="div" variant="h3">
          Your UniswapV3 Positions.....
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Please select one to calculate its impermanent loss and exit.
        </Typography>
      </div>
      <FetchUniswapV3Position wallet={user.address} chain={user.chain} />
      </div>
    </QueryClientProvider>
  );
}
