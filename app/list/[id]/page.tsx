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
  return res.json();
}

export default async function ListPage({
  params,
  searchParams: {},
}: BookListProps) {
  console.log("params", params.id);
  const bookList = await getBookList(params.id);
  console.log("bookList", bookList);

  return (
    <div>
      <h1>List Page</h1>
      <p>Path Parameter: {bookList.results.list_name} </p>
      {bookList["results"]["books"].map((book: Book) => (
        <div key={book.primary_isbn13}>
          <img src={book.book_image} alt={book.title} />
          <h2>{book.title}</h2>
          <h3>{book.author}</h3>
          <a href={book.amazon_product_url}>구매하기</a>
        </div>
      ))}
    </div>
  );
}
