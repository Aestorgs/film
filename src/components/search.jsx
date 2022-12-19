import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import img from "../img/imgNotFound.png";

//rechercher un film
export const Search = () => {
  const [search, useSearch] = React.useState([]);
  const [values, useValues] = React.useState("");

  const films = (e) => {
    e.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${values}`)
      .then((res) => res.json())
      .then((data) => useSearch(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Accueil film</h1>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
      <h2 className="search">Rechercher le film ou serie</h2>
      <form onSubmit={films}>
        <input
          value={values}
          type="search"
          onChange={(e) => useValues(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className="list">
        {search.map((p, index) => {
          return (
            <div key={index}>
              <img className="imgSearch"
                src={`${p.show.image?.medium ? p.show.image?.medium : img}`}
              />
              <Link className="aSearch" to={`${p.show.id}`}>{p.show.name}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};
