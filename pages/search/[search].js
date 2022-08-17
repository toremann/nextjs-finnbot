import styles from "../../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Countdown } from "../../components/Countdown";
import { Clock } from "./../../components/Clock";
import Head from "next/head";

function SearchResults({ results, search, serverTime }) {
  const router = useRouter();
  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Reloading");
      router.reload();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  console.log(results);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Beep boop im a robot</title>
          <meta name="Im some meta name" content="This page has some results" />
        </Head>
        <div className={styles.results__header}>
          <h1>
            Viser resultat for: <i>{search}</i>
          </h1>
          <button
            className={styles.search__button}
            type="button"
            onClick={() => router.back()}
          >
            Nytt søk
          </button>
          <Countdown />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Annonse tekst:</th>
                <th>Lokasjon:</th>
                <th>Pris:</th>
                <th>
                  <Clock serverTime={serverTime} />
                </th>
              </tr>
            </thead>
            <tbody>
              {results.docs
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((results, id) => {
                  return (
                    <tr key={id}>
                      <td>
                        <a
                          href={`https://www.finn.no/bap/forsale/ad.html?finnkode=${results.ad_id}`}
                          rel="noopener"
                        >
                          {results.heading}
                        </a>
                      </td>
                      <td>{results.location}</td>
                      <td>{JSON.stringify(results.price.amount)} kr</td>
                      <td>
                        {new Date(results.timestamp).toLocaleString("en-GB")}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default SearchResults;

export async function getServerSideProps(context) {
  const { params } = context;
  const { search } = params;
  const response = await fetch(
    `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&q=${search}&sort=RELEVANCE&page=2&vertical=bap`
  );

  const data = await response.json();

  return {
    props: {
      results: data,
      search,
      serverTime: Date.now(),
    },
  };
}
