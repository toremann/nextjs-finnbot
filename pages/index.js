import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const { params, req, res, query } = context
  
  var searchQuery = "lego";

  const defaultEndpoint = `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&abTestKey=controlsuggestions&q=${searchQuery}&sort=PUBLISHED_DESC&page=1&include_filters=false`;
  console.log(searchQuery);
  const r = await fetch(defaultEndpoint);

  const data = await r.json();

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [time, setTime] = useState(new Date());


  useEffect(() => {
    let TimeId = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(TimeId);
    };
  });

  // {new Date(time).toLocaleString("en-GB")}

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>Auto-finn</h3>
          </div>
          <div>asd</div>
        </div>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Annonse tekst:</th>
                <th>Lokasjon:</th>
                <th>Pris:</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.docs.map((data, id) => {
                return (
                  <tr key={id}>
                    <td>
                      <a
                        href={`https://www.finn.no/bap/forsale/ad.html?finnkode=${data.ad_id}`}
                        rel="noopener"
                      >
                        {data.heading}
                      </a>
                    </td>
                    <td>{data.location}</td>
                    <td>
                      {JSON.stringify(data.price.amount)}{" "}
                      {JSON.stringify(data.price.currency_code)}
                    </td>
                    <td>{new Date(data.timestamp).toLocaleString("en-GB")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
