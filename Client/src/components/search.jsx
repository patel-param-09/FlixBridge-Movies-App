import React from "react";

function Search({ onChange }) {
  return (
    <input
      type="search"
      placeholder="Search Here"
      className="search-input"
      onChange={onChange}
    />
  );
}

export default Search;
