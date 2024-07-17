import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./App.css";
import Heading from "./components/heading";
import Herosection from "./components/Herosection";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./components/search";
import debouce from "lodash.debounce";

function App() {
  const [data, setData] = useState([]);
  const [cuurPage, setCurrPage] = useState(1);
  const cardPerPage = 5;
  const lastIndex = cuurPage * cardPerPage;
  const firstIndex = lastIndex - cardPerPage;
  const totalCards = data.slice(firstIndex, lastIndex);
  const noOfPages = Math.ceil(data.length / cardPerPage);
  const pageNumbers = [...Array(noOfPages + 1).keys()].slice(1);
  const [searchTerm, setSearchTerm] = useState("");
  // this use effect run on the first time when you open the site because atataht time the search field was empty and also runs when the search field was changed
  useEffect(() => {
    if (searchTerm === "") {
      axios
        .get("https://dummyapi.online/api/movies")
        .then((res) => setData(res.data));
    } else if (searchTerm !== "") {
      const searchMovie = data.filter((movie) => {
        return movie.movie.includes(searchTerm);
      });
      setData(searchMovie);
    }
    return () => {
      debouncedResults.cancel();
    };
  }, [searchTerm]);
  // main by which card rendered
  const allData = totalCards.map((ele) => {
    return (
      <Herosection
        title={ele.movie}
        src={ele.image}
        rating={ele.rating}
        url={ele.imdb_url}
      />
    );
  });
  // Search logic
  function handleChange(e) {
    setCurrPage(1);
    setSearchTerm(e.target.value);
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 1000);
  }, []);

  function handleCurrPage(id) {
    setCurrPage(id);
  }
  // changepage logic
  const allPageNo = pageNumbers.map((num, i) => {
    return (
      <li key={i} className={`page-item ${cuurPage === num ? "active" : ""}`}>
        <a href="#" className="page-link" onClick={() => handleCurrPage(num)}>
          {num}
        </a>
      </li>
    );
  });

  return (
    <div className="main-div">
      <Heading />
      <Search onChange={debouncedResults} />
      <div className="outer-div">{allData}</div>
      <nav className="navbar">
        <ul className="pagination pagination-md">{allPageNo}</ul>
      </nav>
    </div>
  );
}

export default App;
