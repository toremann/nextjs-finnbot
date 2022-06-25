import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [someParam, setParam] = useState("");
  const router = useRouter();

  const handleOnClick = () => {
    const paramz = {
      "Search": someParam,
    };
    router.push(`/search/${someParam}`);
  };

  return (
    <div className={styles.container}>
    <div><h1>Finn scraper</h1></div>
    <div className={styles.main}>
      <input
        type="text"
        placeholder="Søk torget"
        onChange={(e) => setParam(e.target.value)}
      />
      <button type="button" onClick={handleOnClick}>
        Scrape it!
      </button>
    </div>
    </div>
  );
}
