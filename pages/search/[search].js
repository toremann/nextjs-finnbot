import styles from "../../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Countdown } from "../../components/Countdown";

function SearchResults({ results, search }) {
  const router = useRouter();
  const MINUTE_MS = 60000;

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Reloading");
      location.reload();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <>
      <div className={styles.results__header}>
        <h1>
          Viser resultat for: <i>{search}</i>
        </h1>
        <button className={styles.search__button} type="button" onClick={() => router.back()}>
          Nytt søk
        </button>
        <Countdown />
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
            {results.docs.map((results, id) => {
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
                  <td>
                    {JSON.stringify(results.price.amount)}{" "}
                    kr
                  </td>
                  <td>{new Date(results.timestamp).toLocaleString("en-GB")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SearchResults;

export async function getServerSideProps(context) {
  const { params } = context;
  const { search } = params;
  const response = await fetch(
    `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&abTestKey=controlsuggestions&q=${search}&sort=PUBLISHED_DESC&page=1&include_filters=false`
  );

  const data = await response.json();

  return {
    props: {
      results: data,
      search,
    },
  };
}
