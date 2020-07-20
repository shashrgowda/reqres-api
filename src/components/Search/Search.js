import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Search.css";
import Loader from "../Loader/Loader";

const Search = React.memo((props) => {
  const [searchParam, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { onFetch } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      Axios.get(
        `https://api.github.com/search/users?q=${searchParam}+location:bangalore&per_page=100`
      ).then((response) => {
        // console.log(response.data.items);
        const usersArr = [];
        for (const key in response.data.items) {
          const obj = response.data.items;
          usersArr.push({
            avatar: obj[key].avatar_url,
            username: obj[key].login,
            url: obj[key].html_url,
            id: obj[key].id,
            followers: obj[key].followers_url,
          });
        }
        if (usersArr.length === 0) {
          setError(true);
          setLoading(false);
        } else {
          setError(false);
        }
        onFetch(usersArr);
        setLoading(false);
      });
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchParam, onFetch]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  let loader = null;
  let errorMessage = null;

  if (loading) {
    loader = <Loader />;
  }

  if (error) {
    errorMessage = <h2>No users found</h2>;
  }

  return (
    <React.Fragment>
      {loader}
      {errorMessage}
    </React.Fragment>
  );
});

export default Search;
