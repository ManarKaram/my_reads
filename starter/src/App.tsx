import "./App.css";
import * as BooksAPI from "./BooksAPI";
import React, { useState, useEffect } from "react";
import Shelves from "./components/Shelves";
import Book from "./components/Book";

const App = () => {
  // search
  const [showSearchPage, setShowSearchpage] = useState(false);

  const [books, setBooks] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [searchBooks, setSearchBooks] = useState([]);


  const updateBookShelf = (bookToUpdate: any, newShelf:any) => {
    const updatedBooks: any = books.map((book : any) => {
      if (book.id === bookToUpdate.id) {
        bookToUpdate.shelf = newShelf;
        return bookToUpdate;
      }
      return book;
    });
    setBooks(updatedBooks);
    BooksAPI.update(bookToUpdate, newShelf);
  };

   const handleShowSearchPage=()=>{
     setShowSearchpage(!showSearchPage)
   }

    useEffect(() => {
      BooksAPI.getAll().then((data:any) => setBooks(data));
    }, []);

    useEffect(() => {
      console.log(searchValue)
      if(searchValue){
        BooksAPI.search(searchValue).then((data:any) => {
          if(data.error) {
            setSearchBooks([]);
          } else {
            setSearchBooks(data);
          }
        });
      }
      return () => {
        setSearchBooks([]);
      }
  
  }, [searchValue]);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <button
              className="close-search"
              onClick={() => {setShowSearchpage(!showSearchPage); window.location.reload()}}
            >
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchBooks?.length
                ? searchBooks.map((book:any) => (
                    <li key={book.id}>
                      <Book book={book} changeBookType={updateBookShelf} />
                    </li>
                  ))
                : null}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Shelves books={books} updateBookShelf={updateBookShelf} />
          </div>
          <div className="open-search">
            <a onClick={handleShowSearchPage}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
