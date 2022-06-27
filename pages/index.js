import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function Home() {
  const [someParam, setParam] = useState("");
  const router = useRouter();

  const handleOnClick = (e) => {
    e.preventDefault();
    const paramz = {
      Search: someParam,
    };
    router.push(`/search/${someParam}`);
  };

  return (
    <div className={styles.search}>
      <Head>
        <title>Beep boop im a robot</title>
        <meta name="Im some meta name" content="Content.. great for SEO and Lighthouse score" />
      </Head>
      <div>
        <h1>Finn scraper</h1>
      </div>
      <div className={styles.search__container}>
        <input
          className={styles.search__field}
          type="text"
          placeholder="Søk torget"
          onChange={(e) => setParam(e.target.value)}
        />
        <form onSubmit={handleOnClick}>
          <button className={styles.search__button} type="Submit">
            {" "}
            Søk{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
