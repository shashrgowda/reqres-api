import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resultsPerPage] = useState(4);
  const [currentPage, setPageNumber] = useState(1);
  const [searchParam, setSearch] = useState("");

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const arr = [];
        const res = await Axios.get(`https://reqres.in/api/users?per_page=12`);
        console.log(res);
        for (const key in res.data.data) {
          const obj = res.data.data;
          arr.push({
            id: obj[key].id,
            email: obj[key].email,
            avatar: obj[key].avatar,
            first_name: obj[key].first_name,
            last_name: obj[key].last_name,
          });
        }
        setResults(arr);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  let errorMessage = null;

  if (error) {
    errorMessage = <h2>Something went wrong!</h2>;
  }

  const activePageNum = (currentPage) => {
    setPageNumber(currentPage);
  };

  const searchingFor = (searchParam) => {
    return (val) => {
      return (
        val.first_name.toLowerCase().includes(searchParam.toLowerCase()) ||
        !searchParam
      );
    };
  };

  let loader = null;

  if (loading) {
    return <Loader />;
  }

  let resultsToSearch = (
    <Table
      results={currentResults}
      term={searchParam}
      searching={(searchParam) => searchingFor(searchParam)}
    />
  );

  if (searchParam.length > 0) {
    resultsToSearch = (
      <Table
        results={results}
        term={searchParam}
        searching={(searchParam) => searchingFor(searchParam)}
      />
    );
  }

  return (
    <div className="App">
      <section className="search">
        <div className="search-input">
          <label>Search by First name</label>
          <input
            type="text"
            value={searchParam}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>
      {loader}
      {errorMessage}
      {resultsToSearch}
      <Pagination
        resultsPerPage={resultsPerPage}
        totalResults={results.length}
        currentPage={activePageNum}
      />
    </div>
  );
}
