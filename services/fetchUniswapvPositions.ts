import axios from "axios";

export default async function fetchUniswapPosition(
  walletAddress: string,
  chain: string
) {
  const MORALIS_API_KEY = process.env.API_KEY;
  const MoralisClient = axios.create({
    baseURL: "https://deep-index.moralis.io/api/v2/",
    timeout: 1000,
    headers: {
      Accept: "*/*",
      "x-api-key": MORALIS_API_KEY,
    },
  });
  const fetchUniswapPositions = async function getPositionById() {
    try {
      const res = await MoralisClient.get(
        `${walletAddress}/nft?chain=${chain}&format=decimal&token_addresses=0xC36442b4a4522E871399CD717aBDD847Ab11FE88&normalizeMetadata=true`
      );
      if (res?.status === 200) {
        return res.data.result;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
  const resp = await fetchUniswapPositions();
  const tokenIds = resp.map((item: any) => {
    return item.token_id;
  });

  return tokenIds;
}
