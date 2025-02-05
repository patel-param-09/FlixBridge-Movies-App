import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Heading from "./components/heading";
import Herosection from "./components/Herosection";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./components/search";
import debouce from "lodash.debounce";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import fetchClient from "./Services/Instance";
import { jwtDecode } from "jwt-decode";

function App() {
  const [data, setData] = useState([]);
  const [cuurPage, setCurrPage] = useState(1);
  const [cardPerPage, setCardPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [watchLaterIds, setWatchLaterIds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const axiosInstance = fetchClient();
  // Main Logic
  // {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      if (searchTerm === "") {
        axiosInstance
          .get(`movies/?page=${cuurPage}&perpage=${cardPerPage}`)
          .then((res) => {
            setPages(res.data.page);
            setPages(res.data.pageNumbers);
            setData(res.data.movies);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              navigate("/login");
            }
          });
      } else {
        axiosInstance
          .get(
            `search-movie/?searchElement=${searchTerm}&page=${cuurPage}&perpage=${cardPerPage} `
          )
          .then((res) => {
            setPages(res.data.pageNumbers);
            setData(res.data.searchMovies);
          });
      }
    } else {
      navigate("/login");
    }
  }, [cuurPage, cardPerPage, searchTerm]);
  // }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      axiosInstance.get(`show-watch-later/${userId}`).then((res) => {
        setWatchLater(res.data);
      });
    } else {
      navigate("/login");
    }
  }, [cuurPage]);

  useEffect(() => {
    const ids = watchLater.map((movie) => movie.movieId);
    setWatchLaterIds(ids);
  }, [watchLater]);

  // Main-Logic by which card rendered
  // {
  const allData = data.map((ele) => {
    const isWatchLater = watchLaterIds.includes(ele.id);
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
        isWatchLater={isWatchLater}
      />
    );
  });

  // Search logic
  // {
  function handleChange(e) {
    setCurrPage(1);
    setSearchTerm(e.target.value);
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleChange, 300);
  }, []);

  const searchParams = new URLSearchParams(location.search);

  function handleCurrPage(id) {
    setCurrPage(id);
    searchParams.set("page", id);
    navigate(`/?${searchParams.toString()}`);
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
  }, [location.search]);
  // }

  // carde per page logic
  // {
  const perPageCard = [5, 10, 15];

  const allCards = perPageCard.map((card, i) => {
    return (
      <option className="per-page-card" key={i}>
        {card}
      </option>
    );
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
              searchParams.set("page", 1);
              setCardPerPage(e.target.value);
              navigate(`/?${searchParams.toString()}`);
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
