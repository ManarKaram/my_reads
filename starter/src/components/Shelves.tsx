import React from "react";
import Shelf from "./Shelf";

const Shelves = ({ books, updateBookShelf }: any) => {
  // state of shelves
  const currentlyReading = books.filter(
    (book: any) => book.shelf === "currentlyReading"
  );
  const wantToRead = books.filter((book: any) => book.shelf === "wantToRead");
  const read = books.filter((book: any) => book.shelf === "read");

  return (
    <>
      <Shelf
        title="Currently reading"
        books={currentlyReading}
        updateBookShelf={updateBookShelf}
      />
      <Shelf
        title="Want to read"
        books={wantToRead}
        updateBookShelf={updateBookShelf}
      />
      <Shelf title="Read" books={read} updateBookShelf={updateBookShelf} />
    </>
  );
};

export default Shelves;
