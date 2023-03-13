import "./App.css";
import * as BooksAPI from  './BooksAPI';
import React, { useState, useEffect } from "react";
import Shelves from "./components/Shelves";

const App = () => {

  useEffect(()=>{
    BooksAPI.getAll().then(data=>
      {
        console.log(data);
        setBooks(data)
      })
  }, []);

  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);
  
  const updateBookShelf = (bookToUpdate, newShelf) => {

    console.log(bookToUpdate);
    console.log(newShelf)
    const updatedBooks = books.map(book => {
      if(book.id === bookToUpdate.id) {
        bookToUpdate.shelf = newShelf;
        return bookToUpdate;
      }
      return book;
    });
    setBooks(updatedBooks);
  }
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Shelves books={books} updateBookShelf= {updateBookShelf }/>
          </div>
          <div className="open-search">
          <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
