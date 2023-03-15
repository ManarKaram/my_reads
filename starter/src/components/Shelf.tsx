import React from "react";
import Book from "./Book";

const Shelf = ({ title, books, updateBookShelf }: any) => {
  const shelfBooks = books;
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book: any) => (
              <li key={book.id}>
                <Book book={book} changeBookType={updateBookShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Shelf;
