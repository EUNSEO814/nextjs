import styles from "../../styles/detail.module.css";

interface BookListProps {
  params: {
    id: string;
  };
  searchParams: {};
}

interface Book {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: string;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: Isbn[];
  buy_links: Buylink[];
  book_uri: string;
}

interface Buylink {
  name: string;
  url: string;
}
interface Isbn {
  isbn10: string;
  isbn13: string;
}

async function getBookList(id: string) {
  const res = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${id}`
  );
  const json = res.json();
  return json;
}

export default async function ListPage({
  params,
  searchParams: {},
}: BookListProps) {
  const bookList = await getBookList(params.id);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{bookList.results.list_name}</h1>
      <div className={styles.cardContainer}>
        {bookList["results"]["books"].map((book: Book) => (
          <div key={book.primary_isbn13} className={styles.card}>
            <img
              className={styles.img}
              src={book.book_image}
              alt={book.title}
            />
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <h3 className={styles.author}>{book.author}</h3>
            <a className={styles.bookLink} href={book.amazon_product_url}>
              Buy now &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
