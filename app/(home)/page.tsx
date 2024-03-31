import Link from "next/link";
import styles from "../styles/home.module.css";
import { API_URL } from "../constants";
export const metadata = {
  title: "Home",
};

async function getList() {
  const res = await fetch(API_URL);
  const json = await res.json();
  return json;
}

export default async function HomePage() {
  const bestSeller = await getList();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>THE NEW YORK TIMES BEST SELLER EXPLORER</h1>
      </div>
      <div className={styles.boxContainer}>
        {bestSeller.results.map((book, index) => (
          <div className={styles.box} key={index}>
            <li>
              <Link href={`/list/${book.list_name_encoded}`}>
                {book.list_name} &rarr;
              </Link>
            </li>
          </div>
        ))}
        h
      </div>
    </div>
  );
}
