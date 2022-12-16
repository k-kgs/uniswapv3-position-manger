import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Start from "./start";
import ConnectWallet from "../components/connectWallet";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export default function Home() {
  const { user, setUser, balance, setBalance } = useContext(UserContext);

  const { push } = useRouter();
  useEffect(() => {
    if (user.address !== "") {
      push("/position");
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>UniswapV3 Manager</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Monitor your Impermanent Loss</h1>

        <p className={styles.description}>
          Get started by connecting your wallet
        </p>

        <ConnectWallet></ConnectWallet>
      </main>
    </div>
  );
}
