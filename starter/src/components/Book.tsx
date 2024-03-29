import React from "react";

const Book = ({ book, changeBookType }:any) => {
  const bookDetails = book;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${bookDetails.imageLinks.thumbnail})`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            defaultValue={bookDetails.hasOwnProperty('shelf') ? bookDetails.shelf : "none"}
            onChange={e => changeBookType(bookDetails, e.target.value)}
          >
            <option value="disabled" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{bookDetails?.title}</div>
      <div className="book-authors">{bookDetails?.authors?.join(",")}</div>
    </div>
  );
};

export default Book;
