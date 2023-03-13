import React, { Component } from "react";
import Shelf from "./Shelf";

const Shelves = () => {
  // state of shelves
  const currentlyReading = [];
  const whatToRead = [];
  const read = [];

  return (
    <>
      <Shelf />
      <Shelf />
    </>
  );
};

export default Shelves;
