import React from "react";
import { Link } from "react-router-dom";

function Search({ onChange }) {
  return (
    <div className="main-search-div">
      <input
        type="search"
        placeholder="Search Here"
        className="search-input"
        onChange={onChange}
      />
      <Link to="/watchlater">
        <button className="watch-later-btn">Watch Later</button>
      </Link>
    </div>
  );
}

export default Search;
