import Link from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://books-api.nomadcoders.workers.dev/lists";

async function getList() {
  const res = await fetch(API_URL);
  const json = await res.json();
  return json;
}

export default async function HomePage() {
  const bestSeller = await getList();

  return (
    <>
      <h1>test</h1>
      <div>
        {bestSeller.results.map((book, index) => (
          <li key={index}>
            <Link href={`/list/${book.list_name_encoded}`}>
              {book.list_name}
            </Link>
          </li>
        ))}
      </div>
    </>
  );
}
