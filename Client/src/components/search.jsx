import React from "react";
import { Link } from "react-router-dom";

function Search({ onChange }) {
  function handelClick() {
    localStorage.removeItem("token");
    alert("LogOut Successfully");
  }
  return (
    <div className="main-search-div">
      <input
        type="search"
        placeholder="Search Here"
        className="search-input"
        onChange={onChange}
      />
      <div className="btn-div">
        <Link to="/watchlater">
          <button className="watch-later-btn">Watch Later</button>
        </Link>
        <Link to="/login">
          <button className="logout-btn bg-danger" onClick={handelClick}>
            LogOut
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Search;
