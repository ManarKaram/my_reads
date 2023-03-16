import "./App.css";
import * as BooksAPI from "./BooksAPI";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";

const App = () => {
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
    //updating UI
    if(!mapOfIdsBooks.has(bookToUpdate.id)) {
      bookToUpdate.shelf = newShelf;
      updatedBooks.push(bookToUpdate);
    }
    setBooks(updatedBooks);
    BooksAPI.update(bookToUpdate, newShelf);
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
            <Search combinedBooks = {combinedBooks}
                    setSearchValue ={setSearchValue}
                    searchValue = {searchValue}
                    updateBookShelf ={updateBookShelf}>
            </Search>
              }>
  
          </Route>


            {/* Home Page */}
          <Route path="/" element={ 
            <Home books={books} updateBookShelf={updateBookShelf}></Home>
            }>
          </Route>
        </Routes>
    </Router>
    </div>
    </>
  );
};

export default App;
