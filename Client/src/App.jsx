import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/heading";
import Herosection from "./components/Herosection";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./components/search";
import debouce from "lodash.debounce";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const [data, setData] = useState([]);
  const [cuurPage, setCurrPage] = useState(1);
  const [cardPerPage, setCardPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState([]);
  const location = useLocation();
  // Main Logic
  // {
  useEffect(() => {
    if (searchTerm === "") {
      axios
        .get(
          `http://localhost:3000/movies/?page=${cuurPage}&perpage=${cardPerPage}`
        )
        .then((res) => {
          setPages(res.data.page);
          setPages(res.data.pageNumbers);
          setData(res.data.movies);
        });
    } else {
      axios
        .get(
          `http://localhost:3000/search-movie/?searchElement=${searchTerm}&page=${cuurPage}&perpage=${cardPerPage} `
        )
        .then((res) => {
          setPages(res.data.pageNumbers);
          setData(res.data.searchMovies);
        });
    }
  }, [cuurPage, cardPerPage, searchTerm]);
  // }

  // Main-Logic by which card rendered
  // {
  const allData = data.map((ele) => {
    return (
      <Herosection
        title={ele.movie}
        src={ele.image}
        rating={ele.rating}
        url={ele.imdb_url}
        name={ele.movie}
        data={ele}
        key={ele.id}
        id={ele.id}
        isWatchLater={ele.isWatchLater}
      />
    );
  });
  // }

  // Search logic
  // {
  function handleChange(e) {
    setCurrPage(1);
    setSearchTerm(e.target.value);
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  function handleCurrPage(id) {
    setCurrPage(id);
  }
  // }

  // changepage logic
  // {
  const allPageNo = pages.map((num, i) => {
    return (
      <li key={i} className={`page-item ${cuurPage === num ? "active" : ""}`}>
        <Link
          to={`/?page=${num}`}
          className="page-link"
          onClick={() => handleCurrPage(num)}
        >
          {num}
        </Link>
      </li>
    );
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrPage(page);
  }, [location.search]);
  // }

  // carde per page logic
  // {
  const perPageCard = [5, 10, 15];

  const allCards = perPageCard.map((card, i) => {
    return <option key={i}>{card}</option>;
  });
  // }

  return (
    <div className="main-div">
      <ToastContainer />
      <div>
        <Heading />
        <Search onChange={debouncedResults} />
        <div className="outer-div">{allData}</div>
        <div className="select-div">
          <ul className="pagination pagination-md">{allPageNo}</ul>
          <select
            onChange={(e) => {
              setCurrPage(1);
              setCardPerPage(e.target.value);
            }}
            className="pages"
          >
            {allCards}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
