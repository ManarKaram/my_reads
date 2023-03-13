import React from "react";
import Shelf from "./Shelf";

const Shelves = ({books}) => {
  // state of shelves
  const currentlyReading = books.filter(book=>book.type === 'currentlyReading');
  const wantToRead = books.filter(book=>book.type === 'wantToRead');;
  const read = books.filter(book=>book.type === 'read');;

  return (
    <>
      <Shelf books={currentlyReading}/>
      <Shelf books={wantToRead}/>
      <Shelf books={read}/>
    </>
  );
};

export default Shelves;
