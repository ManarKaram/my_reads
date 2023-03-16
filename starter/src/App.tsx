import "./App.css";
import * as BooksAPI from "./BooksAPI";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Shelves from "./components/Shelves";
import Book from "./components/Book";

const App = () => {
  // search
  const [showSearchPage, setShowSearchpage] = useState(false);

  // original books
  const [books, setBooks] = useState([]);

  // search data of Input
  const [searchValue, setSearchValue] = useState("");

  // search books
  const [searchBooks, setSearchBooks] = useState([]);

  // combined books after searching
  const [combinedBooks, setCombinedBooks] = useState<any>([]);

  // map of Id books to differ them from original ones
  const [mapOfIdsBooks, setMapOfIdsBooks] = useState(new Map<any,any>());


  // updateing book shelf method
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

  // views search component
   const handleShowSearchPage = () => {
     setShowSearchpage(!showSearchPage);
   };


   // creates map of ids of books
   const createMapOfIdsdata = (data:any): any => {
    const map = new Map();
    data.map((book:any, index:any) => {
      map.set(book.id, book);
    });
    return map;
   }

  // gets all books 
  useEffect(() => {
    BooksAPI.getAll().then((data:any) => {
      setBooks(data);
      // construct mapOfIds of books
      setMapOfIdsBooks(createMapOfIdsdata(data));
    });
  }, []);


    // searching effect
    useEffect(() => {
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

    // combine arrays
    useEffect(()=>{
      const combined = searchBooks.map((book:any)=> {
        if(book?.id){
          if(mapOfIdsBooks.has(book.id)){
            return mapOfIdsBooks.get(book.id);
          }
          else {
            return book;
          }
        }
        
      });

      // fill combined books array state
      setCombinedBooks(combined);

    }, [searchBooks]);
  return (
    <>
    <div className="app">
    <Router>
        <Routes>
              {/* Search Page */}
          <Route path="/search" element={
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/"><button className="close-search">Close</button></Link>
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
                    {combinedBooks?.length
                      ? combinedBooks.map((book:any) => (
                          <li key={book?.id}>
                            <Book book={book} changeBookType={updateBookShelf} />
                          </li>
                        ))
                      : null}
                  </ol>
                </div>
              </div>
              }>
  
          </Route>


            {/* Home Page */}
          <Route path="/" element={ 
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <Shelves books={books} updateBookShelf={updateBookShelf} />
                </div>
                <div className="open-search">
                  <Link to="/search"><a>Add a book</a></Link>
                </div>
              </div>
            }>
          </Route>
        </Routes>
    </Router>
    </div>
    </>
  );
};

export default App;
