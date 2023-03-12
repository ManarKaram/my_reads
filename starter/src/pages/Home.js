import React, { Component } from "react";
import Shelf from "../components/Shelf";

class Home extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Shelf/>
        </div>
        <div className="open-search">
          <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default Home;
