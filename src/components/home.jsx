import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { users } from "..";
import "../css/style.css";
import img from "../img/imgNotFound.png";
export const Home = () => {
  const [search, useSearch] = React.useState([]);
  const [values, useValues] = React.useState("");
  const { me } = React.useContext(users);
  const [message, setMessage] = React.useState("");
  const [favoris, setFavoris] = React.useState([]);

  const films = (e) => {
    e.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${values}`)
      .then((res) => res.json())
      .then((data) => useSearch(data))
      .catch((err) => console.log(err));
  };

  const shows = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/favoris/shows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shows: p.show.id,
          users: me,
        }),
      });
      if (res.status === 201) {
        setMessage({ id: p.show.id, message: "add the film " });
        setFavoris((prev) => [...prev, { shows: p.show.id }]);
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/users/favoris/${me}`)
      .then((res) => res.json())
      .then((data) => setFavoris(data.favoris))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Accueil</h1>
      <Link to="/favoris">Favoris</Link>
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
              <img
                src={`${p.show.image?.medium ? p.show.image?.medium : img}`}
              />
              <Link to={`${p.show.id}`}>{p.show.name}</Link>
              <div>
                <button
                  disabled={
                    favoris.find((f) => f.shows.showsId === p.show.id) ? true : false
                  }
                  onClick={() => shows(p)}
                >
                  add films
                </button>
                {p.show.id === message.id && message.message}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
