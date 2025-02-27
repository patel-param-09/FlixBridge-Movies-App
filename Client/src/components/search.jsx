import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Search({ onChange }) {
  const navigate = useNavigate();

  function handelClick() {
    toast.info("You have been logged out.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
          <button className="logout-btn bg-danger" onClick={handelClick}>
            LogOut
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
