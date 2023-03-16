import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Shelves from "../components/Shelves";

const Home = ({ books, updateBookShelf }: any) => {
  return (
    <>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelves books={books} updateBookShelf={updateBookShelf} />
        </div>
        <div className="open-search">
          <Link to="/search">
            <a>Add a book</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
