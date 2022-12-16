import { useRouter } from "next/router";
import { useContext } from "react";
import ClientOnly from "../components/ClientOnly";
import FetchImpermanentLoss from "../components/fetchImpermanentloss";


export default function Manage() {
  const router = useRouter();

  const tokenItem = router.query;

  return (
    <div>
      <ClientOnly>
        <FetchImpermanentLoss tokenId={tokenItem.tokenId}/>
      </ClientOnly>
    </div>
  );
}
