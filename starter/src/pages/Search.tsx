import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Book from "../components/Book";

const Search = ({ combinedBooks ,setSearchValue ,searchValue, updateBookShelf }: any) => {
  return (

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
  ); 
}
  export default Search;