import React from "react";

const Book = ({book, changeBookType}) => {
  const bookDetails = book;
 
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url(${bookDetails.url})`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select defaultValue={bookDetails.shelf} onChange={(e) => changeBookType(bookDetails, e.target.value) }>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookDetails.title}</div>
      <div className="book-authors">{bookDetails.author}</div>
    </div>
  );
};

export default Book;
