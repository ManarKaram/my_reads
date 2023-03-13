import React from "react";
import Book from "./Book";

const Shelf = ({ books }) => {
  const shelfBooks = books;
  return (
    <>
   
        <div className="bookshelf">
          <h2 className="bookshelf-title">Manar</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {shelfBooks.map(book => ( 
              <li key={book.key}>
              <Book book={book}/>
            </li>
            ))}
              
            </ol>
          </div>
        </div>
      
    </>
  );
};

export default Shelf;
